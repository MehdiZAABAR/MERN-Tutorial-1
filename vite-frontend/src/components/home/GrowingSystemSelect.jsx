// import React, { useState } from 'react';

// const GrowingSystemsSelect = () => {
//   // List of growing systems with their image filenames
//   const growingSystems = [
//     { name: 'Growing System 1', image: 'ambulance_flat.svg' },
//     { name: 'Growing System 2', image: 'angry_face_flat.svg' },
//     { name: 'Growing System 3', image: 'beaming_face_with_smiling_eyes_flat.svg' },
//     { name: 'Growing System 4', image: 'confounded_face_flat.svg' },
//     { name: 'Growing System 5', image: 'disappointed_face_flat.svg' }
//   ];

//   const [selectedSystem, setSelectedSystem] = useState(growingSystems[0].image);

//   return (
//     <div>
//       <h2>Select Growing System</h2>
//       <select
//         value={selectedSystem}
//         onChange={(e) => setSelectedSystem(e.target.value)}
//         className='border-2 border-gray-500 px-4 py-2'
//       >
//         {growingSystems.map((system, index) => (
//           <option key={index} value={system.image}>
//             {system.name}
//           </option>
//         ))}
//       </select>
//       <div>
//         <img src={`/emojis/${selectedSystem}`} alt={`Selected Growing System`} style={{ width: '200px', height: '200px' }} />
//       </div>
//     </div>
//   );
// };

// export default GrowingSystemsSelect;
// import React, { useState } from 'react';

// const GrowingSystemsSelect = () => {
//   // List of growing systems with their image filenames
//   const growingSystems = [
//     { name: 'Growing System 1', image: 'ambulance_flat.svg' },
//     { name: 'Growing System 2', image: 'angry_face_flat.svg' },
//     { name: 'Growing System 3', image: 'beaming_face_with_smiling_eyes_flat.svg' },
//     { name: 'Growing System 4', image: 'confounded_face_flat.svg' },
//     { name: 'Growing System 5', image: 'disappointed_face_flat.svg' }
//   ];

//   const [selectedSystem, setSelectedSystem] = useState(growingSystems[0].image);

//   return (
//     <div>
//       <h2>Select Growing System</h2>
//       <select
//         value={selectedSystem}
//         onChange={(e) => setSelectedSystem(e.target.value)}
//         className='border-2 border-gray-500 px-4 py-2'
//       >
//         {growingSystems.map((system, index) => (
//           <option key={index} value={system.image}>
//             <img src={`/emojis/${system.image}`} alt={system.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
//             {system.name}
//           </option>
//         ))}
//       </select>
//       <div>
//         <img src={`/emojis/${selectedSystem}`} alt={`Selected Growing System`} style={{ width: '200px', height: '200px' }} />
//       </div>
//     </div>
//   );
// };

// export default GrowingSystemsSelect;
// import React, { useState } from 'react';
// import Select from 'react-select';

// const GrowingSystemsSelect = () => {
//   // List of growing systems with their image filenames
//   const growingSystems = [
//     { value: 'ambulance_flat.svg', label: 'Growing System 1' },
//     { value: 'angry_face_flat.svg', label: 'Growing System 2' },
//     { value: 'beaming_face_with_smiling_eyes_flat.svg', label: 'Growing System 3' },
//     { value: 'confounded_face_flat.svg', label: 'Growing System 4' },
//     { value: 'disappointed_face_flat.svg', label: 'Growing System 5' }
//   ];

//   const [selectedSystem, setSelectedSystem] = useState(growingSystems[0]);

//   const customStyles = {
//     option: (provided, state) => ({
//       ...provided,
//       borderBottom: '1px solid gray',
//       backgroundColor: state.isFocused ? '#ccc' : 'white',
//       color: 'black'
//     }),
//     control: () => ({
//       width: 300
//     })
//   };

//   return (
//     <div>
//       <h2>Select Growing System</h2>
//       <Select
//         options={growingSystems}
//         value={selectedSystem}
//         onChange={(selectedOption) => setSelectedSystem(selectedOption)}
//         styles={customStyles}
//       />
//       <div>
//         <img src={`/emojis/${selectedSystem.value}`} alt={`Selected Growing System`} style={{ width: '200px', height: '200px' }} />
//       </div>
//     </div>
//   );
// };

// export default GrowingSystemsSelect;
import React, { useState } from 'react';
import Select, { components } from 'react-select';

// Custom Option component to render image alongside label
const Option = ({ data, ...props }) => (
  <components.Option {...props}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={data.image} alt={data.label} style={{ marginRight: '8px', width: '24px', height: '24px' }} />
      {data.label}
    </div>
  </components.Option>
);

const GrowingSystemsSelect = () => {
  const [selectedSystem, setSelectedSystem] = useState(null);

  // List of growing systems with their image filenames
  const growingSystems = [
    { value: 'ambulance_flat.svg', label: 'Growing System 1', image: '/emojis/ambulance_flat.svg' },
    { value: 'angry_face_flat.svg', label: 'Growing System 2', image: '/emojis/angry_face_flat.svg' },
    { value: 'beaming_face_with_smiling_eyes_flat.svg', label: 'Growing System 3', image: '/emojis/beaming_face_with_smiling_eyes_flat.svg' },
    // Add more growing systems here
  ];

  const handleChange = (selectedOption) => {
    setSelectedSystem(selectedOption);
  };

  return (
    <div>   
      <h2>Select Growing System</h2>
      <Select
        value={selectedSystem}
        onChange={handleChange}
        options={growingSystems}
        components={{ Option }} // Use the custom Option component
      />
      {selectedSystem && (
        <div>
          <img src={selectedSystem.image} alt={selectedSystem.label} style={{ width: '100px', height: '100px' }} />
        </div>
      )}
    </div>
  );
};

export default GrowingSystemsSelect;