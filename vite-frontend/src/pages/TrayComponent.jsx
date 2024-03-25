// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import SlotComponent from './SlotComponent';
// // import { useParams } from 'react-router-dom';
// // import BackendURL from '../components/BackendURL';
// // import BackButton from '../components/BackButton';
// // import { toLetters } from '../utils';
// // import RadioButton from '../components/utils/RadioButton';
// // import TrayDisplayHeader from '../components/home/TrayDisplayHeader';

// // const TrayComponent = () => {
// //   const [tray, setTray] = useState({});
// //   const [slots, setSlots] = useState([]);
// //   const [seeds, setSeeds] = useState([]);
// //   const { id } = useParams();
// //   const [selectionEnabled, setSelectionEnabled] = useState(false);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [selectedSlots, setSelectedSlots] = useState([]);

// //   useEffect(() => {
// //     fetchData();
// //   }, [id]);

// //   const fetchData = async () => {
// //     try {
// //       // Fetch tray data
// //       const trayResponse = await axios.get(`${BackendURL}/trays/${id}`);
// //       setTray(trayResponse.data);

// //       // Fetch slots data belonging to the tray
// //       const slotsResponse = await axios.get(`${BackendURL}/slots/tray${id}`);
// //       setSlots(slotsResponse.data.data);

// //       // Fetch seeds data
// //       const seedsResponse = await axios.get(`${BackendURL}/seeds`);
// //       setSeeds(seedsResponse.data.data);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //       setTray({});
// //       setSlots([]);
// //       setSeeds([]);
// //     }
// //   };

// //   const cellSize = tray.slotSize === 'big' ? '200px' : tray.slotSize === 'medium' ? '150px' : '100px';

// //   const cellStyle = {
// //     width: cellSize,
// //     height: cellSize,
// //     border: '1px solid #ddd',
// //     padding: '2px',
// //     textAlign: 'center',
// //     backgroundColor: '#ddd',
// //     borderRadius: '2px',
// //   };

// //   const toggleSelection = () => {
// //     cancelSelection();
// //     setSelectionEnabled(prevState => !prevState);
// //   };

// //   const selectAllSlots = () => {
// //     setSelectAll(true);
// //     setSelectedSlots(slots.map(slot => slot._id));
// //   };

// //   const cancelSelection = () => {
// //     setSelectAll(false);
// //     setSelectedSlots([]);
// //   };

// //   const handleSlotClick = (slotId) => {
// //     if (selectAll) return;
  
// //     setSelectedSlots(prevSelectedSlots => {
// //       if (prevSelectedSlots.includes(slotId)) {
// //         return prevSelectedSlots.filter(id => id !== slotId);
// //       } else {
// //         return [...prevSelectedSlots, slotId];
// //       }
// //     });
// //   };

// //   const handleTrayUpdate = (updatedTray, updatedSlots) => {
// //     if (updatedTray)
// //       setTray(updatedTray);
// //     if (updatedSlots)
// //       setSlots(updatedSlots);
// //   };

// //   return (
// //     <div className='p-4'>
// //       <BackButton />
// //       <TrayDisplayHeader tray={tray}/>
// //       <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Slots</h2>
// //       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
// //         <table style={{ borderCollapse: 'collapse' }}>
// //           <tbody>
// //             <tr>
// //               <td></td>
// //               {[...Array(tray.nbCols)].map((_, colIndex) => (
// //                 <td key={colIndex} style={cellStyle}>{String(toLetters(colIndex))}</td>
// //               ))}
// //             </tr>
// //             {[...Array(tray.nbRows)].map((_, rowIndex) => (
// //               <tr key={rowIndex}>
// //                 <td style={cellStyle}>{rowIndex + 1}</td>
// //                 {[...Array(tray.nbCols)].map((_, colIndex) => (
// //                   <td key={colIndex} style={cellStyle}>
// //                     <SlotComponent
// //                       slots={slots}
// //                       trayId={tray._id}
// //                       rowIndex={rowIndex}
// //                       colIndex={colIndex}
// //                       seeds={seeds}
// //                       onTrayUpdate={handleTrayUpdate}
// //                     />
// // {selectionEnabled && slots.length > 0 && (
// //   <RadioButton
// //     name={`slot-${rowIndex}-${colIndex}`}
// //     item={slots.find(slot => slot.rowIndex === rowIndex && slot.colIndex === colIndex)?._id}
// //     checked={selectedSlots.includes(slots.find(slot => slot.rowIndex === rowIndex && slot.colIndex === colIndex)?._id)}
// //     onChange={() => handleSlotClick(slots.find(slot => slot.rowIndex === rowIndex && slot.colIndex === colIndex)?._id)}
// //   />
// // )}
// //                   </td>
// //                 ))}
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //       {selectionEnabled && (
// //         <div>
// //           <button onClick={selectAllSlots}>Select All</button>
// //           <button onClick={cancelSelection}>Cancel Selection</button>
// //         </div>
// //       )}
// //       <button onClick={toggleSelection}>Toggle Selection</button>
// //     </div>
// //   );
// // };

// // export default TrayComponent;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SlotComponent from './SlotComponent';
// import { useParams } from 'react-router-dom';
// import BackendURL from '../components/BackendURL';
// import BackButton from '../components/BackButton';
// import { toLetters } from '../utils';
// import RadioButton from '../components/utils/RadioButton';
// import TrayDisplayHeader from '../components/home/TrayDisplayHeader';

// const TrayComponent = () => {
//   const [tray, setTray] = useState({});
//   const [slots, setSlots] = useState([]);
//   const [seeds, setSeeds] = useState([]);
//   const { id } = useParams();
//   const [selectionEnabled, setSelectionEnabled] = useState(false);
//   const [selectedSlots, setSelectedSlots] = useState([]);

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

//       // Fetch seeds data
//       const seedsResponse = await axios.get(`${BackendURL}/seeds`);
//       setSeeds(seedsResponse.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setTray({});
//       setSlots([]);
//       setSeeds([]);
//     }
//   };

//   const cellSize = tray.slotSize === 'big' ? '200px' : tray.slotSize === 'medium' ? '150px' : '100px';

//   const cellStyle = {
//     width: cellSize,
//     height: cellSize,
//     border: '1px solid #ddd',
//     padding: '2px',
//     textAlign: 'center',
//     backgroundColor: '#ddd',
//     borderRadius: '2px',
//   };

//   const toggleSelection = () => {
//     cancelSelection();
//     setSelectionEnabled(prevState => !prevState);
//   };

//   const selectAllSlots = () => {
//     console.log( `selectAllSlots = > setSelectedSlots ${slots.map(slot => slot._id)}`);
//     setSelectedSlots(slots.map(slot => slot._id));
//   };

//   const cancelSelection = () => {
//     setSelectedSlots([]);
//   };

//   const handleSlotClick = (slotId) => {
//     console.log( `handleSlotClick = (${slotId}) `);
//     if (selectionEnabled) {
//       setSelectedSlots(prevSelectedSlots => {
//         console.log( `prevSelectedSlots = ${prevSelectedSlots} `);

//         if (prevSelectedSlots.includes(slotId)) {
//           console.log( `remove slot and return prevSelectedSlots = ${prevSelectedSlots.filter(id => id !== slotId)} `);
//           return prevSelectedSlots.filter(id => id !== slotId);
//         } else {
//           console.log( `return add slot to prevSelectedSlots = ${[...prevSelectedSlots, slotId]} `);
//           return [...prevSelectedSlots, slotId];
//         }
//       });
//     }
//   };

//   const handleTrayUpdate = (updatedTray, updatedSlots) => {
//     if (updatedTray)
//       setTray(updatedTray);
//     if (updatedSlots)
//       setSlots(updatedSlots);
//   };

// const buttonStyle = {
//   position: 'absolute',
//   top: '0',
//   left: '0',
// };
// // return (
// //   <div className='p-4'>
// //     <BackButton />
// //     <TrayDisplayHeader tray={tray}/>
// //     <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Slots</h2>
// //     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
// //       <table style={{ borderCollapse: 'collapse' }}>
// //         <tbody>
// //           <tr>
// //             <td></td>
// //             {[...Array(tray.nbCols)].map((_, colIndex) => (
// //               <td key={colIndex} style={cellStyle}>{String(toLetters(colIndex))}</td>
// //             ))}
// //           </tr>
// //           {[...Array(tray.nbRows)].map((_, rowIndex) => (
// //             <tr key={rowIndex}>
// //               <td style={cellStyle}>{rowIndex + 1}</td>
// //               {[...Array(tray.nbCols)].map((_, colIndex) => {
// //                 const slot = slots.find(slot => slot.trayRow === rowIndex && slot.trayCol === colIndex);
// //                 return (
// //                   <td key={colIndex} style={{ ...cellStyle, position: 'relative' }}>
// //                     <SlotComponent
// //                       slots={slots}
// //                       trayId={tray._id}
// //                       rowIndex={rowIndex}
// //                       colIndex={colIndex}
// //                       seeds={seeds}
// //                       onTrayUpdate={handleTrayUpdate}
// //                     />
// //                     {selectionEnabled && slots.length > 0 && (
// //                       <div style={{ position: 'absolute', top: '5px', left: '5px' }}>
// //                         <RadioButton
// //                           name={`slot-${rowIndex}-${colIndex}`}
// //                           item={slot?._id}
// //                           checked={selectedSlots.includes(slot?._id)}
// //                           onChange={() => handleSlotClick(slot?._id)}
// //                         />
// //                       </div>
// //                     )}
// //                   </td>
// //                 );
// //               })}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //     {selectionEnabled && (
// //       <div>
// //         <button onClick={selectAllSlots}>Select All</button>
// //         <button onClick={cancelSelection}>Cancel Selection</button>
// //       </div>
// //     )}
// //     <button onClick={toggleSelection}>Toggle Selection</button>
// //   </div>
// // );
// return (
//   <div className='p-4'>
//     <BackButton />
//     <TrayDisplayHeader tray={tray}/>
//     <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Slots</h2>
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <table style={{ borderCollapse: 'collapse' }}>
//         <tbody>
//           <tr>
//             <td></td>
//             {[...Array(tray.nbCols)].map((_, colIndex) => (
//               <td key={colIndex} style={{ ...cellStyle, minWidth: '50px', padding: '10px' }}>{String(toLetters(colIndex))}</td>
//             ))}
//           </tr>
//           {[...Array(tray.nbRows)].map((_, rowIndex) => (
//             <tr key={rowIndex}>
//               <td style={{ ...cellStyle, minWidth: '50px', padding: '10px' }}>{rowIndex + 1}</td>
//               {[...Array(tray.nbCols)].map((_, colIndex) => {
//                 const slot = slots.find(slot => slot.trayRow === rowIndex && slot.trayCol === colIndex);
//                 return (
//                   <td key={colIndex} style={{ ...cellStyle, minWidth: '50px', padding: '10px', position: 'relative' }}>
//                     <SlotComponent
//                       slots={slots}
//                       trayId={tray._id}
//                       rowIndex={rowIndex}
//                       colIndex={colIndex}
//                       seeds={seeds}
//                       onTrayUpdate={handleTrayUpdate}
//                     />
//                     {selectionEnabled && slots.length > 0 && (
//                       <div style={{ position: 'absolute', top: '5px', left: '5px' }}>
//                         <RadioButton
//                           name={`slot-${rowIndex}-${colIndex}`}
//                           item={slot?._id}
//                           checked={selectedSlots.includes(slot?._id)}
//                           onChange={() => handleSlotClick(slot?._id)}
//                         />
//                       </div>
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     {selectionEnabled && (
//       <div>
//         <button onClick={selectAllSlots}>Select All</button>
//         <button onClick={cancelSelection}>Cancel Selection</button>
//       </div>
//     )}
//     <button onClick={toggleSelection}>Toggle Selection</button>
//   </div>
// );


// };

//  export default TrayComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SlotComponent from './SlotComponent';
import { useParams } from 'react-router-dom';
import BackendURL from '../components/BackendURL';
import BackButton from '../components/BackButton';
import { toLetters } from '../utils';
import RadioButton from '../components/utils/RadioButton';
import TrayDisplayHeader from '../components/home/TrayDisplayHeader';
import { FaToggleOn, FaToggleOff, FaCheckSquare, FaTimes } from 'react-icons/fa'; // Import icons

const TrayComponent = () => {
  const [tray, setTray] = useState({});
  const [slots, setSlots] = useState([]);
  const [seeds, setSeeds] = useState([]);
  const { id } = useParams();
  const [selectionEnabled, setSelectionEnabled] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [cellSize, setCellSize] = useState('100px'); // Default cell size

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

      // Set cell size based on tray size
      setCellSize(trayResponse.data.slotSize === 'big' ? '200px' : trayResponse.data.slotSize === 'medium' ? '150px' : '100px');
    } catch (error) {
      console.error('Error fetching data:', error);
      setTray({});
      setSlots([]);
      setSeeds([]);
    }
  };

  const cellStyle = {
    width: cellSize,
    height: cellSize,
    border: '1px solid #ddd',
    padding: '10px', // Adjust padding as needed
    textAlign: 'center',
    backgroundColor: '#ddd',
    borderRadius: '2px',
    position: 'relative', // Needed for positioning checkbox
  };

  const toggleSelection = () => {
    cancelSelection();
    setSelectionEnabled(prevState => !prevState);
  };

  const selectAllSlots = () => {
    setSelectedSlots(slots.map(slot => slot._id));
  };

  const cancelSelection = () => {
    setSelectedSlots([]);
  };

  const handleSlotClick = (slotId) => {
    if (selectionEnabled) {
      setSelectedSlots(prevSelectedSlots => {
        if (prevSelectedSlots.includes(slotId)) {
          return prevSelectedSlots.filter(id => id !== slotId);
        } else {
          return [...prevSelectedSlots, slotId];
        }
      });
    }
  };

  const handleTrayUpdate = (updatedTray, updatedSlots) => {

    cancelSelection();
    setSelectionEnabled(false);
    if (updatedTray) setTray(updatedTray);
    if (updatedSlots) setSlots(updatedSlots);
  };


// return (
//   <div className='p-4'>
//     <BackButton />
//     <TrayDisplayHeader tray={tray}/>
//     <h2 className="text-center mt-20">Slots</h2>
//     <div className="flex justify-center items-center">
//       <table className="border-collapse">
//         <tbody>
//           <tr>
//             <td className="relative" style={{ width: cellSize }}>
//               <div className="absolute top-0 left-0">
//                 {selectionEnabled ? (
//                   <FaToggleOn onClick={toggleSelection} className="cursor-pointer text-green-500 text-2xl" />
//                 ) : (
//                   <FaToggleOff onClick={toggleSelection} className="cursor-pointer text-2xl" />
//                 )}
//               </div>
//               {selectionEnabled && (
//                 <div className="absolute bottom-0 left-0 flex gap-2">
//                   <FaCheckSquare onClick={selectAllSlots} className="cursor-pointer text-green-500 text-2xl" />
//                   <FaTimes onClick={cancelSelection} className="cursor-pointer text-2xl" />
//                 </div>
//               )}
//             </td>
//             {[...Array(tray.nbCols)].map((_, colIndex) => (
//               <td key={colIndex} className="border p-4">{String(toLetters(colIndex))}</td>
//             ))}
//           </tr>
//           {[...Array(tray.nbRows)].map((_, rowIndex) => (
//             <tr key={rowIndex}>
//               <td className="border p-4">{rowIndex + 1}</td>
//               {[...Array(tray.nbCols)].map((_, colIndex) => {
//                 const slot = slots.find(slot => slot.trayRow === rowIndex && slot.trayCol === colIndex);
//                 return (
//                   <td key={colIndex} className="border p-4 relative" style={{ width: cellSize }}>
//                     <SlotComponent
//                       slots={slots}
//                       trayId={tray._id}
//                       rowIndex={rowIndex}
//                       colIndex={colIndex}
//                       seeds={seeds}
//                       onTrayUpdate={handleTrayUpdate}
//                     />
//                     {selectionEnabled && slots.length > 0 && (
//                       <div className="absolute top-0 left-0">
//                         <RadioButton
//                           highlightColor='green-500'
//                           name={`slot-${rowIndex}-${colIndex}`}
//                           item={slot?._id}
//                           checked={selectedSlots.includes(slot?._id)}
//                           onChange={() => handleSlotClick(slot?._id)}
//                         />
//                       </div>
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );
return (
  <div className='p-4'>
    <BackButton />
    <TrayDisplayHeader tray={tray}/>
    <h2 className="text-center mt-20">Slots</h2>
    <div className="flex justify-center items-center">
      <table className="border-collapse">
        <tbody>
          <tr>
            <td className="relative" style={cellStyle}>
              <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
                {selectionEnabled ? (
                  <FaToggleOn onClick={toggleSelection} className="cursor-pointer text-green-500 text-2xl" />
                ) : (
                  <FaToggleOff onClick={toggleSelection} className="cursor-pointer text-2xl" />
                )}
              </div>
              {selectionEnabled && (
                <div className="absolute bottom-2 left-0 w-full flex justify-center items-center gap-2">
                  <FaCheckSquare onClick={selectAllSlots} className="cursor-pointer text-green-500 text-2xl" />
                  <FaTimes onClick={cancelSelection} className="cursor-pointer text-2xl" />
                </div>
              )}
            </td>
            {[...Array(tray.nbCols)].map((_, colIndex) => (
              <td key={colIndex} className="border p-4" style={cellStyle}>{String(toLetters(colIndex))}</td>
            ))}
          </tr>
          {[...Array(tray.nbRows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border p-4" style={cellStyle}>{rowIndex + 1}</td>
              {[...Array(tray.nbCols)].map((_, colIndex) => {
                const slot = slots.find(slot => slot.trayRow === rowIndex && slot.trayCol === colIndex);
                return (
                  <td key={colIndex} className="border p-4 relative" style={{ width: cellSize, height: cellSize }}>
                    <SlotComponent
                      slots={slots}
                      trayId={tray._id}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      seeds={seeds}
                      selectedSlots={selectedSlots}
                      onTrayUpdate={handleTrayUpdate}
                    />
                    {selectionEnabled && slots.length > 0 && (
                      <div className="absolute top-0 left-0">
                        <RadioButton
                          highlightColor='green-500'
                          name={`slot-${rowIndex}-${colIndex}`}
                          item={slot?._id}
                          checked={selectedSlots.includes(slot?._id)}
                          onChange={() => handleSlotClick(slot?._id)}
                        />
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


    }
export default TrayComponent;

