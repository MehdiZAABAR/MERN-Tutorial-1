import mongoose from "mongoose";

export const objId = mongoose.Schema.Types.ObjectId;
export const KeywordSchema = mongoose.Schema({
    text: String,
    categoryId: Number,
    category:String,
    priority: Number,
    tooltip: String
});
export const Keyword = mongoose.model('Keyword', KeywordSchema);

export const MoodSchema = mongoose.Schema(
    {
        text: String,
        icon: String,
        value: {
            type: Number,
            required: true,
            min: 1,
            max: 7
        }
    }
);
export const Mood = mongoose.model('Mood', MoodSchema);
export const SlotSchema = mongoose.Schema(
    {
        used:Boolean,
        name:String,
        seed: { type: objId, ref: 'Seed' },
        startDate: Date,
        trayRow: Number,
        trayCol: Number,
        seedlingTray: { type: objId, ref: 'Tray' },
        growingSystem: { type: objId, ref: 'GrowingUnit' },
        sz:String
    }
);
export const Slot = mongoose.model('Slot', SlotSchema);

export const TraysSchema = mongoose.Schema(
    {
        propId: {
            type: String,
            required: true
        },
        easyName: {
            type: String,
        },
        type: {
            type: String,
        },
        slotSize: {
            type: String,
            required: true
        },
        nbRows: {
            type: Number,
            Min: 1,
            required: true
        },
        nbCols: {
            type: Number,
            Min: 1,
            required: true
        },
        slots: [{type: objId, ref: 'Slot'}],
        used:
        {
            type: Boolean,
            required: true
        },
        description: String,
        photo: String,
    },
    {
        timestamps: true,
    });
export const Tray = mongoose.model('Tray', TraysSchema);


const OperationTypeSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the operation type (e.g., "Slot Maintenance", "Reservoir Refill")
    description: { type: String }, // Description of the operation type (optional)
    // Add additional fields as needed
  });
  
export const OperationType = mongoose.model('OperationType', OperationTypeSchema);

export const OperationSchema = new mongoose.Schema({
  operationType: { type: objId, ref: 'OperationType', required: true }, 
  operationDetails: { type: String }, // Additional details about the operation
  user: { type: objId, ref: 'User', required: true }, // User who performed the operation
  targetSlots: [{ type: objId, ref: 'Slot' }], // Associated slot (optional)
  targetGrowingUnit: { type: objId, ref: 'GrowingUnit' }, // Associated growing unit (optional)
  targetReservoir: { type: objId, ref: 'Reservoir' }, // Associated reservoir (optional)
  targetTray: { type: objId, ref: 'Tray' }, // Associated tray (optional)
  // Add additional fields as needed for other components of the system
}, { timestamps: true });
  
export const Operation = mongoose.model('Operation', OperationSchema);


// Schema for the Reservoir (incorporating properties of the solution)
export const ReservoirSchema = new mongoose.Schema({
    maxVolume: { type: Number, required: true },
    availableVolume: { type: Number, required: true },
    pH: { type: Number },
    tds: { type: Number },
    nutrients: { type: String }, // Nutrients added by the user
    freshWaterAdded: { type: Number }, // Volume of fresh water added by the user
    lastFlush: { type: Date } // Date when the solution was last flushed

    //This is not good, That's a mix between solution properties an dphysical Reservoir.
  });
  
  export const Reservoir = mongoose.model('Reservoir', ReservoirSchema);
  // Schema for the Growing Unit
  export const GrowingUnitSchema = new mongoose.Schema({
    propId: {
        type: String,
        required: true
    },
    name: { type: String, required: true },
    easyName: {type: String, required:true},
    type: {type: String, required:true},    // Soil less, Hydroponic, Soil
    geometry: { type: String},
    area: { type: Number },
    maxNumberOfSlots: { type: Number },
    nbRows: { type: Number},
    nbCols: { type: Number},
    slots: [{type: objId, ref: 'Slot'}],
    purchaseDate: { type: Date },
    serialNumber: { type: String },
    reservoir: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservoir', default: null }
  });

  export const GrowingUnit = mongoose.model('GrowingUnit', GrowingUnitSchema);

export const ObservationSchema = mongoose.Schema(
    {
        date: Date,
        trays: [{ type: objId, ref: 'Tray' }],
        slots: [{ type: objId, ref: 'Slot' }],
        growingUnits: [{ type: objId, ref: 'GrowingUnit' }],
        photos: [objId],
        text: String,
        keywords: [String],
        mood: String
    }
);
export const Observation = mongoose.model('Observation', ObservationSchema);
export function ValidateTrayData(obj) {
    if ((!obj.propId) || (!obj.nbRows) || (!obj.nbCols) || (!obj.easyName)) {
        return false;
    }
    return true;
}
export function ValidateSlotData(obj) {

    /*used:Boolean,
    seed: { type: objId, ref: 'SeedSchema' },
    startDate: Date,
    trayRow: Number,
    trayCol: Number,
    seedlingTray: { type: objId, ref: 'TraySchema' },
    growingSystem: String
    sz:String*/
    if (obj.used && !obj.seed && (obj.trayRow === null || obj.trayRow === undefined) && (obj.trayCol === null || obj.trayCol === undefined)) 
        return false;
    return true;
}
export function ValidateObservationData(obj) {



    return true;
}
export function ValidateMoodData(obj) {




    return true;
}
export function ValidateKeyword(obj) {




    return true;
}
export function ValidateGUData(obj) {




    return true;
}
export function ValidateReservoirData(obj) {




    return true;
}
export const phase = mongoose.Schema({ 
    start: {
        type : Number,
        Min: 1,
        Max: 12
        }, 
    end: {    
        type : Number,
        Min: 1,
        Max: 12
    },
});
export const SeedSchema = mongoose.Schema( 
    {
        propId: {
            type: String,
            required: true
        },
        plantType: {
            type: String,
            required: true
        },
        easyName: {
            type: String,
            required: true
        }, 
        botanicName: {
            type: String,
            required: true
        },
        variety: {
            type: String,
            required: true
        }, 
        culturePeriods:{
            germination : 
            {
                type: phase,
                required: true,
                _id:false
            },
            transfer : 
            {
                type: phase,
                required: true,
                _id:false
            },
            harvesting : 
            {
                type: phase,
                required: true,
                _id:false
            },
        },
        shop:
        {
            type: String,
            required: true           
        },
        brand:
        {
            type: String,
            required: true           
        },
        shoppingDate:
        {
            type: Date,
            required: true           
        },
        productionDate:
        {
            type: Date,
        },
        endOfValidity:
        {
            type: Date,
        },
        origin:
        {
            type: String,
            required: true           
        },
        quantity:
        {
            type: Number,
            Min:1           
        }
    },
    {
        timestamps: true,
    });
export const Seed = mongoose.model( 'Seed', SeedSchema );

export function ValidateSeedData( obj)
//obj = request.body
{
    if( ( !obj.easyName) || (!obj.plantType) || (!obj.variety))
        {
            return false;
        }
  return true;
}