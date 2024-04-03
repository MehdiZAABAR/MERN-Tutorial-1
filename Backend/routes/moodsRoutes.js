import express from "express"
import { Mood, ValidateMoodData } from "../models/all_collections_models.js"
const router = express.Router();

// export const MoodSchema = mongoose.Schema(
//     {
//         text: String,
//         icon: String,
//         value: {
//             type: Number,
//             required: true,
//             min: 1,
//             max: 7
//         }
//     }
// );

//Route for saving a new record
router.post('/', async (request, response) => {
    try {
        //Just a quick validation of the inputs, rework it later
        if (!ValidateMoodData(request.body))
            return response.status(400).send("Post all required mood fields");
        const newRecord = {
            text: request.body.text,
            icon: request.body.icon,
            value: request.body.value
        };
        const mRecord = await Mood.create(newRecord);
        return response.status(201).send(mRecord);
    } catch (error) {
        console.log(`Record Post Error :${error}`);
        response.status(500).send({ message: error.message });

    }

});

// Route for getting all records from collection
router.get('/', async (request, response) => {
    try {
        // console.log(`Router get Moods with query params ${JSON.stringify(request.query)}`);

        const { value } = request.query;
        if (value) {
            const mRecord = await Mood.find({ value: parseInt(value)});
            return response.status(200).json(
                {
                    count: mRecord.length,
                    data: mRecord
                }
            );
        }
        else {
            const mRecord = await Mood.find({});
            return response.status(200).json(
                {
                    count: mRecord.length,
                    data: mRecord
                }
            );
        }
    } catch (error) {
        console.log(`Get all records ${error}`);
        response.status(500).send({ message: error.message });
    }
});
// Route for getting one record from collection by id
router.get('/:id', async (request, response) => {

    try {
        
        const { id } = request.params;
        console.log( `find record with id = ${id}`);
        const mRecord = await Mood.findById(id);
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
    try {
        // console.log( `Update slot request with ${JSON.stringify(request.body)}`);
        if (!ValidateMoodData(request.body))
            return response.status(400).send("Post all required record fields");
        const { id } = request.params;
        // console.log( `updating now the slot with ${JSON.stringify(request.body)}`);
        const mRecord = await Mood.findByIdAndUpdate(id, request.body);
        if (!mRecord)
            return response.status(404).json({ message: 'id not found' });
        return response.status(200).send({ message: 'Record updated successfully !' });
    } catch (error) {
        console.log(`Update a record ${error}`);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a record with id
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Mood.findByIdAndDelete(id);
        if (!result)
            return response.status(404).json({ message: 'id not found' });
        return response.status(200).send({ message: 'Record deleted successfully !' });
        console.log(`Deleted ${id}`);

    } catch (error) {
        console.log(`Delete a record ${error}`);
        response.status(500).send({ message: error.message });
    }
});


export default router;