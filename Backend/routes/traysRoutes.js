import express from "express"
import { Tray, Slot, ValidateTrayData, objId } from "../models/all_collections_models.js"
const router = express.Router();

//Route for saving a new tray
function toLetters(num) {
    let letters = '';
    while (num >= 0) {
      letters = String.fromCharCode(num % 26 + 65) + letters;
      num = Math.floor(num / 26) - 1;
    }
    return letters;
  }
router.post('/', async (request, response) => {
    try {
        //Just a quick validation of the inputs, rework it later
        if (!ValidateTrayData(request.body))
            return response.status(400).send("Post all required fields propId, nbSlots, slotSize");
        const newRecord = {
            propId: request.body.propId,
            type: request.body.type,
            nbRows: request.body.nbRows,
            nbCols: request.body.nbCols,
            easyName: request.body.easyName,
            slotSize: request.body.slotSize,
            description:request.body.description,
            slots: [],
            used: false,
        };
        const mRecord = await Tray.create(newRecord);
        if(( mRecord) && (request.body.createSlots)) {
            var mslots = [];
           
            for (var row = 0; row < newRecord.nbRows; row++)
                for (var col = 0; col < newRecord.nbCols; col++) 
                {
                    var slot = {
                        /* 
                                used:Boolean,
                                seed: { type: objId, ref: 'SeedSchema' },
                                startDate: Date,
                                trayRow: Number,
                                trayCol: Number,
                                seedlingTray: { type: objId, ref: 'TraySchema' },
                                growingSystem: String,
                                size:String
                        */
                        used: Boolean,
                        trayRow: Number,
                        trayCol: Number,
                        seedlingTray: String,
                        sz: String
                    };
                    slot.used = false;
                    slot.seedlingTray = mRecord._id;
                    slot.sz = newRecord.slotSize;
                        slot.trayCol = col;
                        slot.trayRow = row;
                        slot.name = `${newRecord.easyName}_${toLetters(col)}.${row + 1}`;
                        console.log( `insert ${slot.name} row ${slot.trayRow} col ${slot.trayCol}`);
                        mslots.push( slot);
                }
        const res = await Slot.insertMany(mslots);
        if( res)
        {
            res.forEach(element => {
                newRecord.slots.push( element._id);
            });
            const updateRecord = await Tray.findByIdAndUpdate(mRecord._id, newRecord);
            if (!updateRecord)
            return response.status(404).json({ message: 'id not found' });
        return response.status(200).send({ message: 'Record updated successfully !' });
        }
    }
        return response.status(201).send(mRecord);
    } catch (error) {
        console.log(`Record Post Error :${error}`);
        response.status(500).send({ message: error.message });

    }

});

// Route for getting all records from collection
router.get('/', async (request, response) => {
    try {
        const mRecord = await Tray.find({});
        return response.status(200).json(
            {
                count: mRecord.length,
                data: mRecord
            }
        );
    } catch (error) {
        console.log(`Get all records ${error}`);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting one record from collection by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const mRecord = await Tray.findById(id);
        if (!mRecord)
            return response.status(404).json({ message: `${id} not found` });
        return response.status(200).json(mRecord);
    } catch (error) {
        console.log(`Get all records ${error}`);
        response.status(500).send({ message: error.message });
    }
});

// Route to update a Record
router.put('/:id', async (request, response) => {
    console.log( "Patch / Update Tray");
    try {
        if (!ValidateTrayData(request.body))
            return response.status(400).send("Post all required record fields");
        const { id } = request.params;
        const mRecord = await Tray.findByIdAndUpdate(id, request.body);
        if (!mRecord)
            return response.status(404).json({ message: 'id not found' });
        return response.status(200).send({ message: 'Record updated successfully !' });
    } catch (error) {
        console.log(`Update a record ${error}`);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a record with id
// router.delete('/:id', async (request, response) => {
//     try {
//         const { id } = request.params;
//         const result = await Tray.findByIdAndDelete(id);
//         if (!result)
//             return response.status(404).json({ message: 'id not found' });
//         console.log(`Deleted ${id}`);
//         return response.status(200).send({ message: 'Record deleted successfully !' });

//     } catch (error) {
//         console.log(`Delete a record ${error}`);
//         return response.status(500).send({ message: error.message });
//     }
// });


// Route to delete a tray and its slots with id
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        console.log( `Find and delete all slots belonging to tray ${JSON.stringify(request.params)}`);
        const mRecord = await Slot.deleteMany({ seedlingTray: id });
        if (!mRecord ) 
            console.log( "No slots found for tray");
        //Now delete the tray
        const result = await Tray.findByIdAndDelete(id);
        if (!result)
            return response.status(404).json({ message: 'id not found' });
        console.log(`Deleted ${id}`);
        return response.status(200).send({ message: 'Record deleted successfully !' });

    } catch (error) {
        console.log(`Delete a record ${error}`);
        response.status(500).send({ message: error.message });
    }
});

router.patch('/:trayId', async (req, res) => {
    try {
      const { trayId } = req.params;
      const { slots } = req.body;
  
      // Update the tray document with the new slot data
      const updatedTray = await Tray.findByIdAndUpdate(trayId, { slots }, { new: true });
  
      // Return the updated tray
      res.json(updatedTray);
    } catch (error) {
      console.error("Error updating tray:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default router;