import mongoose from 'mongoose';

//Bad workaround : schemas have been copied from the backend because of an error in processing nested
export const objId = mongoose.Types.ObjectId;
export const KeywordSchema =
{
    text: String,
};
export const MoodSchema =
{
    text: String,
    icon: String,
    value: {
        type: Number,
        required: true,
        min: 1,
        max: 7
    }
};
export const ObservationSchema =
{
    date: Date,
    trays: [{ type: objId, ref: 'Tray' }],
    slots: [{ type: objId, ref: 'Slot' }],
    photos: [objId],
    text: String,
    keywords: [{ type: objId, ref: 'Keyword' }],
    mood: [{ type: objId, ref: 'Mood' }]
};
export const phase = {
    start: {
        type: Number,
        Min: 1,
        Max: 12
    },
    end: {
        type: Number,
        Min: 1,
        Max: 12
    },
};
export const SeedSchema =
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
    culturePeriods: {
        germination:
        {
            type: phase,
            required: true,
            _id: false
        },
        transfer:
        {
            type: phase,
            required: true,
            _id: false
        },
        harvesting:
        {
            type: phase,
            required: true,
            _id: false
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
        Min: 1
    }
};
export const SlotSchema = 
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
    };
export const TraysSchema = 
    {
        propId: {
            type: String,
            required: true
        },
        easyName: {
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
        slots: [{ type: objId, ref: 'Slot' }],
        used:
        {
            type: Boolean,
            required: true
        },
        photo: String,
    };