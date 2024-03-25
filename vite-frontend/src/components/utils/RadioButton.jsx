// import React from 'react';
// import { useState } from 'react';

// const RadioButton = ({ name, item, checked, onChange }) => {

//     return (
//         <label className="inline-flex items-center cursor-pointer">
//             <input 
//                 type="radio" 
//                 className="hidden" 
//                 name={name}
//                 onChange={() => {  onChange(item)}} 
//                 checked={checked} 
//             />
//             <span className={`relative block w-6 h-6 border border-gray-300 rounded-full shadow-md ${checked ? 'bg-blue-500 border-blue-500' : 'bg-white'}`}>
//                 <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transition-transform duration-300 scale-0 ${checked? 'scale-100' : ''}`}></span>
//             </span>
//         </label>
//     );
// };

// export default RadioButton;
import React from 'react';

const RadioButton = ({ name, item, checked, onChange, highlightColor}) => {
    let useColor = 'bg-green-500 border-green-500'
    
       try {
         if( highlightColor !== undefined )
             useColor = `bg-${highlightColor} border-${highlightColor}`;
       } catch (error) {
        const useColor = 'bg-green-500 border-green-500'
       }
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input 
                type="checkbox" 
                className="hidden" 
                name={name}
                onChange={() => {  onChange(item)}} 
                checked={checked} 
            />
            <span className={`relative block w-6 h-6 border border-gray-300 rounded-full shadow-md ${checked ? useColor : 'bg-white'}`}>
                {checked && (
                    <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transition-transform duration-300 scale-100`}></span>
                )}
            </span>
        </label>
    );
};

export default RadioButton;