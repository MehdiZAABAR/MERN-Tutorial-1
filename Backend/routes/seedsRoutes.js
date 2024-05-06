import express from "express"
import {Seed, ValidateSeedData} from "../models/all_collections_models.js"
const router = express.Router();

//Route for saving a new seed
router.post('/', async (request, response) => {
    try {
        //Just a quick validation of the inputs, rework it later
        if( !ValidateSeedData( request.body))
            return response.status(400).send( "Post all required fields easyName, plantType, variety");
        console.log( request.body.culturePeriods);
         const newSeed = {
            propId: request.body.propId,
            plantType : request.body.plantType,
            easyName : request.body.easyName,
            botanicName: request.body.botanicName,
            variety : request.body.variety,
            culturePeriods: request.body.culturePeriods,
            shop: request.body.shop,
            brand: request.body.brand,
            shoppingDate: request.body.shoppingDate,
            productionDate: request.body.productionDate,
            endOfValidity: request.body.endOfValidity,
            origin: request.body.origin,
            quantity: request.body.quantity
            };
        console.log( newSeed.culturePeriods);
        console.log( `Created a seed ${JSON.stringify(newSeed)}`);
        const mseed = await Seed.create( newSeed);
        return response.status(201).send(mseed);
    } catch (error) {
        console.log( `Seed Post Error :${error}` );
        response.status(500).send( { message: error.message});
        
    }

});

// Route for getting all seeds from database
router.get( '/', async ( request, response) => {

    try {
        const mseeds = await Seed.find( );
        return response.status(200).json(
        { 
            count: mseeds.length,
            data: mseeds
        }
        );
    } catch (error){
        console.log( `Get all seeds ${error}`);
        response.status(500).send( { message: error.message});
     }
});

// Route for getting one seed from database by id
router.get( '/:id', async ( request, response) => {
    try {
        const { id } = request.params;
        const mseed = await Seed.findById( id);
        if( !mseed)
        return response.status(404).json( {message: `${id} not found`});
        return response.status(200).json( mseed);
    } catch (error){
        console.log( `Get all seeds ${error}`);
        response.status(500).send( { message: error.message});
     }
});

// Route to update a seed
router.put( '/:id', async ( request, response) => {
    try {
        if( !ValidateSeedData( request.body))
            return response.status(400).send( "Post all required fields easyName, plantType, variety");
        const { id } = request.params;
        const mseed = await Seed.findByIdAndUpdate( id, request.body);
        if( !mseed)
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
        const result = await Seed.findByIdAndDelete( id);
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