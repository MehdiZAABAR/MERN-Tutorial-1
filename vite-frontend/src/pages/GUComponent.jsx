import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SlotComponent from './SlotComponent';
import { useParams } from 'react-router-dom';
import BackendURL from '../components/BackendURL';
import BackButton from '../components/BackButton';
import { toLetters } from '../utils';
import RadioButton from '../components/utils/RadioButton';
import GUDisplayHeader from '../components/home/TrayDisplayHeader';
import { FaToggleOn, FaToggleOff, FaCheckSquare, FaTimes } from 'react-icons/fa'; // Import icons
import { AppDataSharingContext } from '../App';


const ContainerComponent = ( containerType) => {
  const { appTrays, appSeeds, appGrowingUnits } = useContext(AppDataSharingContext);
  const [container, setContainer] = useState({});
  const [slots, setSlots] = useState([]);
  const { id } = useParams();
  const [selectionEnabled, setSelectionEnabled] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [cellSize, setCellSize] = useState('100px'); // Default cell size

  useEffect(() => {
    fetchData();
  }, [id, appGrowingUnits]);

  const fetchData = async () => {
    let fieldName = 'seedlingTray';
    try {
        // console.log( "looking for container id", id);
        if( !appGrowingUnits || appGrowingUnits.length ===0 )
            return;
        // console.log( "appGU", appGrowingUnits);
        const mContainer = appGrowingUnits.find(unit => unit._id === id);
        if( !mContainer)
            return;
      setContainer( mContainer);
      if( containerType === 'Tray')
        fieldName = 'seedlingTray';
      else
        fieldName = 'growingSystem'
      // Fetch slots data belonging to the container
      const slotsResponse = await axios.get(`${BackendURL}/slots`, {
        params: {
          filter: {[fieldName]: { '$eq': id }}
        }});
      setSlots(slotsResponse.data.data);
      // Set cell size based on tray size
      setCellSize( mContainer.slotSize === 'big' ? '200px' : mContainer.slotSize === 'medium' ? '150px' : '100px');
    } catch (error) {
      console.error('Error fetching data:', error);
      setContainer({});
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

  const handleContainerUpdate = (updatedContainer, updatedSlots) => {

    cancelSelection();
    setSelectionEnabled(false);
    if (updatedContainer) setContainer(updatedContainer);
    if (updatedSlots) setSlots(updatedSlots);
  };
return (
  <div className='p-4'>
    <BackButton />
    <GUDisplayHeader tray={container} containerType = 'GrowingUnit'/>
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
            {[...Array(container.nbCols)].map((_, colIndex) => (
              <td key={colIndex} className="border p-4" style={cellStyle}>{String(toLetters(colIndex))}</td>
            ))}
          </tr>
          {[...Array(container.nbRows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border p-4" style={cellStyle}>{rowIndex + 1}</td>
              {[...Array(container.nbCols)].map((_, colIndex) => {
                const slot = slots.find(slot => slot.trayRow === rowIndex && slot.trayCol === colIndex);
                return (
                  
                  <td key={`Slot_${rowIndex}_${colIndex}`} className="border p-4 relative" style={{ width: cellSize, height: cellSize }}>
                    <SlotComponent
                      slots={slots}
                      containerId={container._id}
                      containerType={'GrowingUnit'}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      seeds={appSeeds}
                      selectedSlots={selectedSlots}
                      onContainerUpdate={handleContainerUpdate}
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
export default ContainerComponent;