import express from "express"
import {Slot, ValidateSlotData} from "../models/all_collections_models.js"
const router = express.Router();

/*
        used:Boolean,
        seed: { type: objId, ref: 'SeedSchema' },
        startDate: Date,
        trayRow: Number,
        trayCol: Number,
        seedlingTray: { type: objId, ref: 'TraySchema' },
        growingSystem: String
*/


//Route for saving a new record
router.post('/', async (request, response) => {
    try {
        console.log( "Slot post")
        if( !ValidateSlotData( request.body))
            return response.status(400).send( "Post all required slot fields");
         const newRecord = {
            used: request.body.used,
            name: request.body.name,
            seed : request.body.seed,
            startDate : request.body.startDate,
            trayRow : request.body.trayRow,
            trayCol: request.body.trayCol,
            seedlingTray : request.body.seedlingTray,
            growingSystem: request.body.growingSystem,
            sz: request.body.sz
            };
        const mRecord = await Slot.create( newRecord);
        return response.status(201).send(mRecord);
    } catch (error) {
        console.log( `Record Post Error :${error}` );
        response.status(500).send( { message: error.message});
        
    }

});

// Route for getting all records from collection
router.get( '/', async ( request, response) => {
    try {
        const mRecord = await Slot.find( {});
        return response.status(200).json(
        { 
            count: mRecord.length,
            data: mRecord
        }
        );
    } catch (error){
        console.log( `Get all records ${error}`);
        response.status(500).send( { message: error.message});
     }
});
router.get('/:container/:id', async (request, response) => {
    // console.log( "request params", request.params);
    try {
        const containerType = request.params.container;
        const containerId = request.params.id;
        let criterion;


        if (containerType !== 'tray' && containerType !== 'growingunit') {
            return response.status(400).json({ message: 'Invalid container type' });
        }

        // console.log(`Find all slots belonging to ${containerType} ${containerId}`);
        if(containerType === 'tray')
            criterion = { seedlingTray: containerId };
        else if( containerType === 'growingunit')
            criterion = {growingSystem : containerId};
        else
            return response.status(400).json({ message: 'Invalid container type' });

        
        const mRecord = await Slot.find(criterion); // Assuming 'seedlingTray' is the field containing the tray or growing unit ID

        return response.status(200).json({
            count: mRecord.length,
            data: mRecord
        });
    } catch (error) {
        console.log(`Get all records error: ${error}`);
        response.status(500).send({ message: error.message });
    }
});
// Route for getting one record from collection by id
router.get( '/:id', async ( request, response) => {
    console.log( "should not be here");
    try {
        const { id } = request.params;
        const mRecord = await Slot.findById( id);
        if( !mRecord)
            return response.status(404).json( {message: `${id} not found`});
        return response.status(200).json( mRecord);
    } catch (error){
        console.log( `Get all records ${error}`);
        response.status(500).send( { message: error.message});
     }
});

// Route to update a Record
router.put( '/:id', async ( request, response) => {
    try {
        // console.log( `Update slot request with ${JSON.stringify(request.body)}`);
        if( !ValidateSlotData( request.body))
            return response.status(400).send( "Post all required record fields");
        const { id } = request.params;
        // console.log( `updating now the slot with ${JSON.stringify(request.body)}`);
        const mRecord = await Slot.findByIdAndUpdate( id, request.body);
        if( !mRecord)
            return response.status(404).json( {message: 'id not found'});
        return response.status(200).send( {message: 'Record updated successfully !'});
    } catch (error){
        console.log( `Update a record ${error}`);
        response.status(500).send( { message: error.message});
     }
});

// Route to delete a record with id
router.delete( '/:id', async ( request, response) => {
    try {
        const { id } = request.params;
        const result = await Slot.findByIdAndDelete( id);
        if( !result)
            return response.status(404).json( {message: 'id not found'});
        return response.status(200).send( {message: 'Record deleted successfully !'});
        console.log( `Deleted ${id}`);

    } catch( error) {
        console.log( `Delete a record ${error}`);
        response.status(500).send( { message: error.message});
    }
});


export default router;