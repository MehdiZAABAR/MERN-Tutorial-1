import React from 'react';

const GrowingSystemsTable = () => {
  // List of growing systems with their image filenames
  const growingSystems = [
    { name: 'Growing System 1', image: 'ambulance_flat.svg' },
    { name: 'Growing System 2', image: 'angry_face_flat.svg' },
    { name: 'Growing System 3', image: 'beaming_face_with_smiling_eyes_flat.svg' },
    { name: 'Growing System 4', image: 'confounded_face_flat.svg' },
    { name: 'Growing System 5', image: 'disappointed_face_flat.svg' }
  ];

  return (
    <div>
      <h2>Growing Systems</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {growingSystems.map((system, index) => (
            <tr key={index}>
              <td>{system.name}</td>
              <td>
                <img src={`emojis/${system.image}`} alt={`Growing System ${index + 1}`} style={{ width: '100px', height: '100px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrowingSystemsTable;
