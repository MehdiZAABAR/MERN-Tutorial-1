import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppDataSharingContext } from '../App';
import BackendURL from '../components/BackendURL';
import { toLetters } from '../utils';
import { useSnackbar } from 'notistack';

const TransferForm = ({ slot, containerType, containerId, slotId, seed, onClose }) => {
  const { appGrowingUnits, setAppGrowingUnits, appTrays, setAppTrays } = useContext(AppDataSharingContext);
  const [selectedGrowingUnit, setSelectedGrowingUnit] = useState('');
  const [availableRows, setAvailableRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState('');
  const [availableColumns, setAvailableColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [loading, setLoading] = useState(false);
  const [OccupationMatrix, setOccupationMatrix] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (selectedGrowingUnit) {
      // Fetch slots of the selected growing unit
      const fetchSlots = async () => {
        try {
          const response = await axios.get(`${BackendURL}/slots/growingunit/${selectedGrowingUnit._id}`);
          const slots = response.data.data;

          console.log('Slots:', slots);
          console.log('Selected Growing Unit:', selectedGrowingUnit);

          // Initialize OccupationMatrix with zeros
          const matrix = Array(selectedGrowingUnit.nbRows).fill(0).map(() => Array(selectedGrowingUnit.nbCols).fill(0));

          // Mark occupied slots in the OccupationMatrix
          slots.forEach(slot => {
            matrix[slot.trayRow][slot.trayCol] = 1;
          });
          setOccupationMatrix(matrix);
          // Sum up OccupationMatrix by row
          const sumByRow = matrix.map(row => row.reduce((acc, val) => acc + val, 0));

          // Filter rows with available columns
          const availableRows = sumByRow.reduce((acc, sum, index) => {
            if (sum < selectedGrowingUnit.nbCols) acc.push(index);
            return acc;
          }, []);

          setAvailableRows(availableRows);
        } catch (error) {
          console.error('Error fetching slots:', error);
        }
      };

      fetchSlots();
    }
  }, [selectedGrowingUnit]);
  useEffect(() => {
    if (selectedGrowingUnit && selectedRow) {
      // Find available columns based on selected row
      const availableCols = [];
      for (let col = 0; col < selectedGrowingUnit.nbCols; col++) {
        if (OccupationMatrix[selectedRow][col] === 0) {
          availableCols.push(col);
        }
      }
      setAvailableColumns(availableCols);
    }
  }, [selectedGrowingUnit, selectedRow, OccupationMatrix]);

  const handleTransferSlot = async () => {
    // Update slots, original tray, and destination growing system locally
    // Here, you can write the logic to update the slots, original tray, and destination growing system based on the selected values
    // For demonstration purposes, let's assume we update the slots, original tray, and destination growing system in the state variables
    setLoading(true);
    console.log( "slot before update", slot);
    console.log( "selected GU", selectedGrowingUnit);
    slot.growingSystem = selectedGrowingUnit._id;
    slot.trayCol = selectedColumn;
    slot.trayRow = selectedRow;
    slot.name += `_${selectedGrowingUnit.easyName}_${toLetters(selectedColumn)}.${String(Number(selectedRow) + 1)}`;
    slot.seedlingTray = null;
    console.log( "Slot after update", slot);
    // Updating slots
    // Implement your logic here to update the slots locally
    console.log('Slot updated locally', slot);
    await axios.put(`${BackendURL}/Slots/${slot._id}`, slot)
      .then(response => {
        setLoading(false);
        enqueueSnackbar('Slot updated successfully!', { variant: 'success' });
      })
      .catch(error => {
        console.error('Error updating slot:', error);
        setLoading(false);
        enqueueSnackbar('Failed to update slot. Please try again later.', { variant: 'error' });
      });



    // Find the original container with the slot
    if( containerType === 'Tray')
    {
    const trayIndex = appTrays.findIndex(tray => tray._id === containerId);
    if (trayIndex !== -1) {
      // Remove the slot ID from the tray's slots array
      const updatedTray = { ...appTrays[trayIndex] };
      updatedTray.slots = updatedTray.slots.filter(slotId => slotId !== slot._id);
      // Update appTrays with the updated tray
      const updatedAppTrays = [...appTrays];
      updatedAppTrays[trayIndex] = updatedTray;
      // Set the updated appTrays state
      setAppTrays(updatedAppTrays);
      console.log('Original tray updated locally', updatedTray);
       const rsp = await axios.put(`${BackendURL}/Trays/${updatedTray._id}`, updatedTray)
       .then( response => {
         setLoading(false);
         enqueueSnackbar('Tray updated successfully!', { variant: 'success' });
         console.log( "response", response);
       })
       .catch(error => {
         console.error('Error updating Tray:', error);
         setLoading(false);
         enqueueSnackbar('Failed to update slot. Please try again later.', { variant: 'error' });
       });
       console.log('Original tray updated in db', updatedTray);
    } else {
      console.log('Tray not found');
    }
  }
  else
  {
    const guIndex = appGrowingUnits.findIndex(guIndex => guIndex._id === slot.growingSystem);
    if (guIndex !== -1) {
      // Remove the slot ID from the GU's slots array
      const updatedGU = { ...appGrowingUnits[guIndex] };
      updatedGU.slots = updatedGU.slots.filter(slotId => slotId !== slot._id);
      // Update appTrays with the updated tray
      const updatedGUs = [...appGrowingUnits];
      updatedGUs[guIndex] = updatedGU;
      // Set the updated appTrays state
      setAppGrowingUnits(updatedGUs);
    // Updating destination growing system
    // Implement your logic here to update the destination growing system locally
    console.log('Source growing system updated locally', selectedGrowingUnit);
    const rsp2 = await axios.put(`${BackendURL}/GrowingUnits/${updatedGU._id}`, updatedGU)
    .then(response => {
      setLoading(false);
      enqueueSnackbar('GU updated successfully!', { variant: 'success' });
    })
    .catch(error => {
      console.error('Error updating GU:', error);
      setLoading(false);
      enqueueSnackbar('Failed to update GU. Please try again later.', { variant: 'error' });
    });
    console.log('Destination GU updated in db', rsp2);
  } else {
    console.log('GU not found');
  }
  }

    const guIndex = appGrowingUnits.findIndex(guIndex => guIndex._id === slot.growingSystem);
    if (guIndex !== -1) {
      // Add the slot ID to the GU's slots array
      const updatedGU = { ...appGrowingUnits[guIndex] };
      updatedGU.slots.push(slot._id);
      // Update appTrays with the updated tray
      const updatedGUs = [...appGrowingUnits];
      updatedGUs[guIndex] = updatedGU;
      // Set the updated appTrays state
      setAppGrowingUnits(updatedGUs);
    // Updating destination growing system
    // Implement your logic here to update the destination growing system locally
    console.log('Destination growing system updated locally', selectedGrowingUnit);
    const rsp2 = await axios.put(`${BackendURL}/GrowingUnits/${updatedGU._id}`, updatedGU)
    .then(response => {
      setLoading(false);
      enqueueSnackbar('GU updated successfully!', { variant: 'success' });
    })
    .catch(error => {
      console.error('Error updating GU:', error);
      setLoading(false);
      enqueueSnackbar('Failed to update GU. Please try again later.', { variant: 'error' });
    });
    console.log('Destination GU updated in db');
  } else {
    console.log('GU not found');
  }
    // Resetting form state
    setSelectedGrowingUnit('');
    setSelectedRow('');
    setSelectedColumn('');
    setLoading(false);
    onClose();
  };

  return (
    <div>
      <h2>Transfer Slot</h2>
      <div>
        <label htmlFor="growingUnit">Select Growing Unit:</label>
        <select
          id="growingUnit"
          value={selectedGrowingUnit._id}
          onChange={(e) => {
            const selectedUnit = appGrowingUnits.find(unit => unit._id === e.target.value);
            setSelectedGrowingUnit(selectedUnit);
          }}
        >
          <option value="">Select a growing unit</option>
          {appGrowingUnits.map((unit) => (
            <option key={unit._id} value={unit._id}>
              {unit.name}
            </option>
          ))}
        </select>
      </div>
      {selectedGrowingUnit && (
        <div>
          <label htmlFor="row">Select Row:</label>
          <select
            id="row"
            value={selectedRow}
            onChange={(e) => setSelectedRow(e.target.value)}
          >
            <option value="">Select a row</option>
            {availableRows.map((row) => (
              <option key={row} value={row}>
                {String(Number(row) + 1)}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedGrowingUnit && selectedRow && (
        // <div>
        //   <label htmlFor="column">Select Column:</label>
        //   <select
        //     id="column"
        //     value={selectedColumn}
        //     onChange={(e) => setSelectedColumn(e.target.value)}
        //   >
        //     <option value="">Select a column</option>
        //     {availableColumns.map((column) => (
        //       <option key={column} value={column}>
        //         {column}
        //       </option>
        //     ))}
        //   </select>
        // </div>
        <div>
          <label htmlFor="column">Select Column:</label>
          <select
            id="column"
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
          >
            <option value="">Select a column</option>
            {availableColumns.map((columnIndex) => (
              <option key={columnIndex} value={columnIndex}>
                {toLetters(columnIndex)}
              </option>
            ))}
          </select>
        </div>
      )}
      <button
        onClick={handleTransferSlot}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto ${(loading || !selectedGrowingUnit || !selectedRow || !selectedColumn) ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading || !selectedGrowingUnit || !selectedRow || !selectedColumn}// Disable button if no changes made or mood/text is empty
      >
        Transfer Plant
      </button>
    </div>
  );
};

export default TransferForm;
