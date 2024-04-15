import React from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const ObservationMood = ({ item, appMoods }) => {
    const foundMood = appMoods?.find(mood => mood.text === item.mood);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {foundMood ? (
                <img src={foundMood.icon} alt={foundMood.text} style={{ width: '24px', height: '24px' }} />
            ) : (
                <AiOutlineQuestionCircle style={{ fontSize: '24px' }} />
            )}
        </div>
    );
}

export default ObservationMood;
