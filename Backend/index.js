import express from "express";
import { PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import seedsRouter from "./routes/seedsRoutes.js"
import traysRouter from "./routes/traysRoutes.js"
import slotsRouter from "./routes/slotsRoutes.js"
import observationsRouter from "./routes/observationsRoutes.js"
import moodsRouter from "./routes/moodsRoutes.js"
import kwRouter from "./routes/keywordsRoutes.js"
import cors from "cors"
import { GrowingUnit, GrowingUnitSchema, ValidateGUData, Reservoir, ReservoirSchema, ValidateReservoirData } from "./models/all_collections_models.js";
import {CreateCRUDRoutes} from "./routes/CreateRoutes.js"
const logRequests = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
const app = express();
// app.use(logRequests);
//Middleware to parse request body
//if you forget the two braces of json(), the browser will run undefinitely with no error
app.use( express.json());
//Middleware to handle CORS policy
//Option 1 : Allow all origins with default cors(*)
app.use( cors());
//Option 2 : Selective allow
// app.use(  cors( {
//         origin: "http://localhost:3000",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeader: ['Content-Type'],
//     }
// ));


//Generic CRUD routes for a collection defined by its mongoose Schema and Model
const reservoirRouter = express.Router();
CreateCRUDRoutes(reservoirRouter, Reservoir, ReservoirSchema, ValidateReservoirData, "Reservoir");
//Generic CRUD routes for a collection defined by its mongoose Schema and Model
const growingUnitsRouter = express.Router();
CreateCRUDRoutes(growingUnitsRouter, GrowingUnit, GrowingUnitSchema, ValidateGUData, "Growing Unit");

// Define logging middleware

app.get( '/', (request, response) => {
    console.log( "Request to welcome!");
    return response.status(234).send( "Welcome to EasyHydro !");

})
app.use( '/seeds', seedsRouter);
app.use( '/trays', logRequests, traysRouter);
app.use( '/slots', slotsRouter);
app.use( '/observations', observationsRouter);
app.use( '/moods', moodsRouter);
app.use( '/keywords', kwRouter);
app.use( '/reservoirs', reservoirRouter);
app.use('/growingunits', logRequests, growingUnitsRouter);

// app.use( '/operations', operationsRouter);
// app.use( '/culturePlatforms', platformsRouter);
// app.use( '/PurineBatches', purinesRouter);

mongoose
  .connect( mongoDBURL)
  .then( () => {
    console.log( 'App successfully connected to database !');
    app.listen( PORT, () => {

        console.log( `app is listening on port ${PORT}`);
    });

  })
  .catch( (error) => {


    console.log( `Mongoose connect error : ${error}`);  
  });
