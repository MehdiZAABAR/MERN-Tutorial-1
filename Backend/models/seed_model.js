import mongoose from "mongoose";
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