import express from "express"
import {Observation, ValidateObservationData} from "../models/all_collections_models.js"
const router = express.Router();

// export const ObservationSchema = mongoose.Schema(
//     {
//         date: Date,
//         trays: [{ type: objId, ref: 'Tray' }],
//         slots: [{ type: objId, ref: 'Slot' }],
//         photos: [objId],
//         text: String,
//         keywords: [{ type: objId, ref: 'Keyword' }],
//         mood: [{ type: objId, ref: 'Mood' }]
//     }
// );

//Route for saving a new record
router.post('/', async (request, response) => {
    try {
        //Just a quick validation of the inputs, rework it later
        if( !ValidateObservationData( request.body))
            return response.status(400).send( "Post all required observation fields");
         const newRecord = {
            date: request.body.date,
            trays: request.body.trays,
            slots : request.body.slots,
            photos : request.body.photos,
            text : request.body.text,
            keywords: request.body.keywords,
            mood : request.body.mood,
            };
        const mRecord = await Observation.create( newRecord);
        return response.status(201).send(mRecord);
    } catch (error) {
        console.log( `Record Post Error :${error}` );
        response.status(500).send( { message: error.message});
        
    }

});

// Route for getting all records from collection
router.get( '/', async ( request, response) => {
    try {
        const mRecord = await Observation.find( {});
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
// Route for getting all records with tray.id = id 
router.get( '/tray:id', async ( request, response) => {
    try {
        const tid = request.params.id;
        //console.log( `Find all slots belonging to tray ${JSON.stringify(request.params.id)}`);
        const mRecord = await Observation.find( { trays: tid});
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

// Route for getting one record from collection by id
router.get( '/:id', async ( request, response) => {
    try {
        const { id } = request.params;
        const mRecord = await Observation.findById( id);
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
        if( !ValidateObservationData( request.body))
            return response.status(400).send( "Post all required record fields");
        const { id } = request.params;
        // console.log( `updating now the slot with ${JSON.stringify(request.body)}`);
        const mRecord = await Observation.findByIdAndUpdate( id, request.body);
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
        const result = await Observation.findByIdAndDelete( id);
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