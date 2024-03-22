// // TrayComponent.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SlotComponent from './SlotComponent';
// import { useParams } from 'react-router-dom';
// import BackendURL from '../components/BackendURL';
// const TrayComponent = () => {
//   const [tray, setTray] = useState({});
//   const [slots, setSlots] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   const fetchData = async () => {
//     try {
//       // Fetch tray data
//       const trayResponse = await axios.get(`${BackendURL}/trays/${id}`);
//       setTray(trayResponse.data);

//       // Fetch slots data belonging to the tray
//       const slotsResponse = await axios.get(`${BackendURL}/slots/tray${id}`);
//       setSlots(slotsResponse.data.data);
//       // console.log( slotsResponse);  
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setTray({});
//       setSlots([]);
//     }
//   };
//   const cellSize = tray.slotSize === 'big' ? '200px' : tray.slotSize === 'medium' ? '150px' : '100px';

//   const cellStyle = {
//     width: cellSize,
//     height: cellSize,
//     border: '1px solid #ddd',
//     padding: '10px',
//     textAlign: 'center',
//     backgroundColor: 'lightblue',
//     borderRadius: '5px',
//   };

//   const trayDetailsStyle = {
//     margin: '20px',
//     padding: '20px',
//     border: '2px solid #ccc',
//     borderRadius: '10px',
//     backgroundColor: '#f9f9f9',
//   };

//   return (
//     <div>
//       <h2 style={{ textAlign: 'center' }}>Tray Details</h2>
//       <div style={{ margin: '20px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
//         <p>ID: {tray._id}</p>
//         <p>Name: {tray.easyName}</p>
//         <p>Slot Size: {tray.slotSize}</p>
//         <p>Number of Rows: {tray.nbRows}</p>
//         <p>Number of Columns: {tray.nbCols}</p>
//         <p>Used: {tray.used ? 'Yes' : 'No'}</p>
//         <p>Creation Date: {new Date(tray.createdAt).toLocaleDateString()}</p>
//         <p>Update Date: {new Date(tray.updatedAt).toLocaleDateString()}</p>
//       </div>
//       <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Slots</h2>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <table style={{ borderCollapse: 'collapse' }}>
//           <tbody>
//             <tr>
//               <td></td>
//               {[...Array(tray.nbCols)].map((_, colIndex) => (
//                 <td key={colIndex} style={cellStyle}>{String(colIndex + 1)}</td>
//               ))}
//             </tr>
//             {[...Array(tray.nbRows)].map((_, rowIndex) => (
//               <tr key={rowIndex}>
//                 <td style={cellStyle}>{rowIndex + 1}</td>
//                 {[...Array(tray.nbCols)].map((_, colIndex) => (
//                   <td key={colIndex} style={cellStyle}>
//                     <SlotComponent slots={slots} trayId={tray._id} rowIndex={rowIndex} colIndex={colIndex} />
//                   </td>
//                 ))}
//               </tr>
//             ))}

//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TrayComponent;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SlotComponent from './SlotComponent';
import { useParams } from 'react-router-dom';
import BackendURL from '../components/BackendURL';
import BackButton from '../components/BackButton';
import { toLetters } from '../utils';

const TrayComponent = () => {
  const [tray, setTray] = useState({});
  const [slots, setSlots] = useState([]);
  const [seeds, setSeeds] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      // Fetch tray data
      const trayResponse = await axios.get(`${BackendURL}/trays/${id}`);
      setTray(trayResponse.data);

      // Fetch slots data belonging to the tray
      const slotsResponse = await axios.get(`${BackendURL}/slots/tray${id}`);
      setSlots(slotsResponse.data.data);

      // Fetch seeds data
      const seedsResponse = await axios.get(`${BackendURL}/seeds`);
      setSeeds(seedsResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTray({});
      setSlots([]);
      setSeeds([]);
    }
  };

  const cellSize = tray.slotSize === 'big' ? '200px' : tray.slotSize === 'medium' ? '150px' : '100px';

  const cellStyle = {
    width: cellSize,
    height: cellSize,
    border: '1px solid #ddd',
    padding: '2px',
    textAlign: 'center',
    backgroundColor: '#ddd',
    borderRadius: '2px',
  };
  const handleTrayUpdate = (updatedTray, updatedSlots) => 
  {
    if( updatedTray)
      setTray( updatedTray);
    if( updatedSlots)
      setSlots( updatedSlots);
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h2 style={{ textAlign: 'center' }}>Tray Details</h2>
      <div style={{ margin: '20px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
        <p>ID: {tray._id}</p>
        <p>Name: {tray.easyName}</p>
        <p>Slot Size: {tray.slotSize}</p>
        <p>Number of Rows: {tray.nbRows}</p>
        <p>Number of Columns: {tray.nbCols}</p>
        <p>Used: {tray.used ? 'Yes' : 'No'}</p>
        <p>Creation Date: {new Date(tray.createdAt).toLocaleDateString()}</p>
        <p>Update Date: {new Date(tray.updatedAt).toDateString()}</p>
        <p>Number of Slots: {tray.slots?.length}</p>
      </div>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Slots</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <table style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td></td>
              {[...Array(tray.nbCols)].map((_, colIndex) => (
                <td key={colIndex} style={cellStyle}>{String(toLetters(colIndex ))}</td>
              ))}
            </tr>
            {[...Array(tray.nbRows)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td style={cellStyle}>{rowIndex +1}</td>
                {[...Array(tray.nbCols)].map((_, colIndex) => (
                  <td key={colIndex} style={cellStyle}>
                    <SlotComponent slots={slots} trayId={tray._id} rowIndex={rowIndex} colIndex={colIndex} seeds={seeds} onTrayUpdate={handleTrayUpdate}/>
                  </td>
                ))}
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrayComponent;