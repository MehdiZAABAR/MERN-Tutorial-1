import express from "express"
import { GrowingUnit, GrowingUnitSchema, ValidateGUData } from "../models/all_collections_models.js";
const router = express.Router();

/*
  export const GrowingUnitSchema = new mongoose.Schema({
    propId: {
        type: String,
        required: true
    },
    name: { type: String, required: true },
    type: {type: String, required:true},    // Soil less, Hydroponic, Soil
    geometry: { type: String},
    area: { type: Number },
    maxNumberOfSlots: { type: Number },
    purchaseDate: { type: Date },
    serialNumber: { type: String },
    reservoir: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservoir' }
  });
*/
router.post('/', async (request, response) => {
    try {
        //Just a quick validation of the inputs, rework it later
        if( !ValidateGUData( request.body))
            return response.status(400).send( `Post all GU required fields ${JSON.stringify(GrowingUnitSchema)}`);
         const newRec = {
            propId: request.body.propId,
            type:request.body.type,
            geometry:request.body.geometry,
            area:request.body.area,
            maxNumberOfSlots: request.body.maxNumberOfSlots,
            purshaseDay:request.body.purshaseDay,
            reservoir:request.body.reservoirId,
            };
        console.log( newRec);
        const mRec = await GrowingUnit.create( newRec);
        return response.status(201).send(mRec);
    } catch (error) {
        console.log( `GU Post Error :${error}` );
        response.status(500).send( { message: error.message});
        
    }

});

// Route for getting all seeds from database
router.get( '/', async ( request, response) => {
    try {
        const mrecs = await GrowingUnit.find( {});
        return response.status(200).json(
        { 
            count: mrecs.length,
            data: mrecs
        }
        );
    } catch (error){
        console.log( `Get all recs GU ${error}`);
        response.status(500).send( { message: error.message});
     }
});

// Route for getting one GU from database by id
router.get( '/:id', async ( request, response) => {
    try {
        const { id } = request.params;
        const mseed = await GrowingUnit.findById( id);
        if( !mseed)
        return response.status(404).json( {message: `${id} not found`});
        return response.status(200).json( mseed);
    } catch (error){
        console.log( `Get all recs GU ${error}`);
        response.status(500).send( { message: error.message});
     }
});

// Route to update a seed
router.put( '/:id', async ( request, response) => {
    try {
        if( !ValidateGUData( request.body))
            return response.status(400).send( "Post all required GU fields ");
        const { id } = request.params;
        const mRec = await GrowingUnit.findByIdAndUpdate( id, request.body);
        if( !mRec)
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
        const result = await GrowingUnit.findByIdAndDelete( id);
        if( !result)
            return response.status(404).json( {message: 'id not found'});
        return response.status(200).send( {message: 'Record deleted successfully !'});
        console.log( `Delete ${id}`);

    } catch( error) {
        console.log( `Delete a record ${error}`);
        response.status(500).send( { message: error.message});
    }
});


export default router;