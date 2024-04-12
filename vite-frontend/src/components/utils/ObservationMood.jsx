// import React from 'react';
// import { AiOutlineQuestionCircle } from 'react-icons/ai';

// const ObservationMood = ({ item, appMoods }) => {
//     console.log("Item:", item);
//     console.log("App Moods:", appMoods);

//     // Find the mood object based on the text value
//     const foundMood = appMoods.find(mood => mood.text === item.mood);
//     console.log("Found Mood:", foundMood);
//     // Check if a mood object was found
//     if (foundMood) {
//         // Display the mood icon
//         return (
//             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <img src={foundMood.icon} alt={foundMood.text} style={{ width: '24px', height: '24px' }} />
//             </div>
//         );
//     } else {
//         // Display a default React icon
//         return (
//             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <AiOutlineQuestionCircle style={{ fontSize: '24px' }} />
//             </div>
//         );
//     }
// };

// export default ObservationMood;
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
