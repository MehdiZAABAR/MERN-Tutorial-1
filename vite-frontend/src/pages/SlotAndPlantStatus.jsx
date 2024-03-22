import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CalculateAge } from './FormatDate';

const SlotAndPlantStatus = ({ slot, seed }) => {
    const [mood, setMood] = useState(null);
    let mAge = {months:'N/A', days:'N/A'};
    if( slot.startDate != null)
        mAge = CalculateAge( slot.startDate);
    useEffect(() => {
        //Load observations, care, needs data for a synthetic status
    }, [slot]);

    return (
<div classname=''>
<div className='overflow-y-auto max-h-[400px]'>
            Info
        </div>
        <p className='text-left font-bold mb-2'>Slot: {slot.name}</p>
        <p className='text-left mb-1'>Seed Id: {seed.propId}</p>
        <p className='text-left mb-1'>Easy name: {seed.easyName}</p>
        <p className='text-left mb-1'>Variety: {seed.variety}</p>
        <p className='text-left mb-1'>Age: {mAge.months} months and {mAge.days} days</p>

        </div>
    );
};

export default SlotAndPlantStatus;