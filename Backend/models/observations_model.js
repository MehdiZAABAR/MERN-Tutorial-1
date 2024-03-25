import mongoose from "mongoose";
import { Seed } from './seed_model.js'

export const objId = mongoose.Types.ObjectId;
export const KeywordSchema = mongoose.Schema(
    {
        text: String,
    }
);
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
        growingSystem: String,
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
export const ObservationSchema = mongoose.Schema(
    {
        date: Date,
        trays: [{ type: objId, ref: 'Tray' }],
        slots: [{ type: objId, ref: 'Slot' }],
        photos: [objId],
        text: String,
        keywords: [{ type: objId, ref: 'Keyword' }],
        mood: [{ type: objId, ref: 'Mood' }]
    }
);
export const Observation = mongoose.model('Observation', ObservationSchema);

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
const ReservoirSchema = new mongoose.Schema({
    maxVolume: { type: Number, required: true },
    availableVolume: { type: Number, required: true },
    pH: { type: Number },
    tds: { type: Number },
    nutrients: { type: String }, // Nutrients added by the user
    freshWaterAdded: { type: Number }, // Volume of fresh water added by the user
    lastRefreshDate: { type: Date } // Date when the solution was last refreshed
  });
  
  export const Reservoir = mongoose.model('Reservoir', ReservoirSchema);
  // Schema for the Growing Unit
  const GrowingUnitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    area: { type: Number },
    maxNumberOfSlots: { type: Number },
    maxInternalWaterVolume: { type: Number },
    purchaseDate: { type: Date },
    serialNumber: { type: String },
    reservoir: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservoir' }
  });

  export const GrowingUnit = mongoose.model('GrowingUnit', GrowingUnitSchema);


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