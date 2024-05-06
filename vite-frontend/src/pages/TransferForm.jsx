import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppDataSharingContext } from '../App';
import BackendURL from '../components/BackendURL';
import { toLetters } from '../utils';
import { useSnackbar } from 'notistack';
import RadioButton from '../components/utils/RadioButton';
import { SlotSchema } from '../../../Backend/models/all_collections_models';
import { CopyObjectWithSchemaFields } from '../components/utils/CopyObjectFromSchema'




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
  const [duplicateSlot, setDuplicateSlot] = useState(false);


  const UpdateGrowingSystem = async (slt, guId, addNotRemove) => {
    const guIndex = appGrowingUnits.findIndex(guIndex => guIndex._id === guId);
    if (guIndex !== -1) {
      const updatedGU = { ...appGrowingUnits[guIndex] };
      if (!addNotRemove)
        updatedGU.slots = updatedGU.slots.filter(slotId => slotId !== slt._id);
      else
        updatedGU.slots.push(slt._id);
      const updatedGUs = [...appGrowingUnits];
      updatedGUs[guIndex] = updatedGU;
      setAppGrowingUnits(updatedGUs);
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
    } else {
      console.log('GU not found');
    }
  }

  useEffect(() => {
    if (selectedGrowingUnit) {
      // Fetch slots of the selected growing unit
      const fetchSlots = async () => {
        try {

          // Fetch slots data belonging to the container
          const response = await axios.get(`${BackendURL}/slots`, {
            params: {
              filter: { "growingSystem": { '$eq': selectedGrowingUnit._id } }
            }
          });
          // const response = await axios.get(`${BackendURL}/slots/growingunit/${selectedGrowingUnit._id}`);
          const slots = response.data.data;
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
    setLoading(true);
    slot.growingSystem = selectedGrowingUnit._id;
    slot.trayCol = selectedColumn;
    slot.trayRow = selectedRow;
    slot.name += `_${selectedGrowingUnit.easyName}_${toLetters(selectedColumn)}.${String(Number(selectedRow) + 1)}`;
    slot.seedlingTray = null;


    const copiedSlot = CopyObjectWithSchemaFields(SlotSchema, slot);
    if (duplicateSlot) {
      const result = await axios.post(`${BackendURL}/slots`, copiedSlot)
        .then((rsp) => {
          copiedSlot['_id'] = rsp.data._id;
        })
        .catch((error) => {
          enqueueSnackbar("Error duplicating the Slot!", { variant: 'error' });
          console.log("Error updating destination Growing system", error);
        });
    }
    else {
      copiedSlot['_id'] = slot._id;
      //Update Slot
      const result = await axios.put(`${BackendURL}/slots/${copiedSlot._id}`, copiedSlot)
        .then((rsp) => {
          enqueueSnackbar("Slot updated properly!", { variant: 'success' });
        })
        .catch((error) => {
          enqueueSnackbar("Error updating the Slot!", { variant: 'error' });
          console.log("Error updating slot", error);
        });
        if (containerType === 'Tray') {
          const trayIndex = appTrays.findIndex(tray => tray._id === containerId);
          if (trayIndex !== -1) {
            // Remove the slot ID from the tray's slots array
            const updatedTray = { ...appTrays[trayIndex] };
            updatedTray.slots = updatedTray.slots.filter(slotId => slotId !== slot._id);
            const updatedAppTrays = [...appTrays];
            updatedAppTrays[trayIndex] = updatedTray;
            setAppTrays(updatedAppTrays);
            const rsp = await axios.put(`${BackendURL}/Trays/${updatedTray._id}`, updatedTray)
              .then(response => {
                setLoading(false);
                enqueueSnackbar('Tray updated successfully!', { variant: 'success' });
              })
              .catch(error => {
                console.error('Error updating Tray:', error);
                setLoading(false);
                enqueueSnackbar('Failed to update slot. Please try again later.', { variant: 'error' });
              });
          } else {
            console.log('Tray not found');
          }
        }
        else {
          UpdateGrowingSystem(slot, containerId, false);
        }
    }

    
    UpdateGrowingSystem(copiedSlot, selectedGrowingUnit._id, true);
    setSelectedGrowingUnit('');
    setSelectedRow('');
    setSelectedColumn('');
    setLoading(false);
    onClose(!duplicateSlot);
  };

  return (
    // <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    //   <h2>Transfer Slot {slot.name} Id:{slot._id} </h2>
    //   <div>
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //       <RadioButton
    //         highlightColor='blue-500'
    //         name="Split"
    //         item={slot}
    //         checked={duplicateSlot}
    //         onChange={() => { setDuplicateSlot(!duplicateSlot) }}
    //       />
    //       <label style={{ marginLeft: '8px' }}>Duplicate It</label>
    //     </div>
    //     <label htmlFor="growingUnit">Select Growing Unit:</label>
    //     <select
    //       id="growingUnit"
    //       value={selectedGrowingUnit._id}
    //       onChange={(e) => {
    //         const selectedUnit = appGrowingUnits.find(unit => unit._id === e.target.value);
    //         setSelectedGrowingUnit(selectedUnit);
    //       }}
    //     >
    //       <option value="">Select a growing unit</option>
    //       {appGrowingUnits.map((unit) => (
    //         <option key={unit._id} value={unit._id}>
    //           {unit.name}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    //   {selectedGrowingUnit && (
    //     <div>
    //       <label htmlFor="row">Select Row:</label>
    //       <select
    //         id="row"
    //         value={selectedRow}
    //         onChange={(e) => setSelectedRow(e.target.value)}
    //       >
    //         <option value="">Select a row</option>
    //         {availableRows.map((row) => (
    //           <option key={row} value={row}>
    //             {String(Number(row) + 1)}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   )}
    //   {selectedGrowingUnit && selectedRow && (
    //     <div>
    //       <label htmlFor="column">Select Column:</label>
    //       <select
    //         id="column"
    //         value={selectedColumn}
    //         onChange={(e) => setSelectedColumn(e.target.value)}
    //       >
    //         <option value="">Select a column</option>
    //         {availableColumns.map((columnIndex) => (
    //           <option key={columnIndex} value={columnIndex}>
    //             {toLetters(columnIndex)}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   )}
    //   <button
    //     onClick={handleTransferSlot}
    //     className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto ${(loading || !selectedGrowingUnit || !selectedRow || !selectedColumn) ? 'opacity-50 cursor-not-allowed' : ''}`}
    //     disabled={loading || !selectedGrowingUnit || !selectedRow || !selectedColumn}
    //   >
    //     Transfer Plant
    //   </button>
    // </div>
<div className="flex flex-col items-center">
  <h2 className="font-bold mb-4">Transfer Slot {slot.name} Id:{slot._id} </h2>
  <div className="flex items-center mb-4">
    <RadioButton
      highlightColor='blue-500'
      name="Split"
      item={slot}
      checked={duplicateSlot}
      onChange={() => { setDuplicateSlot(!duplicateSlot) }}
    />
    <label className="ml-2">Duplicate It</label>
  </div>
  <div className="w-full">
    <select
      id="growingUnit"
      value={selectedGrowingUnit._id}
      onChange={(e) => {
        const selectedUnit = appGrowingUnits.find(unit => unit._id === e.target.value);
        setSelectedGrowingUnit(selectedUnit);
      }}
      className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
    >
      <option value="">Select the destination growing unit</option>
      {appGrowingUnits.map((unit) => (
        <option key={unit._id} value={unit._id}>
          {unit.name}
        </option>
      ))}
    </select>
  </div>
  {selectedGrowingUnit && (
    <div className="w-full">
      <select
        id="row"
        value={selectedRow}
        onChange={(e) => setSelectedRow(e.target.value)}
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
      >
        <option value="">{`Select the target row`}</option>
        {availableRows.map((row) => (
          <option key={row} value={row}>
            {String(Number(row) + 1)}
          </option>
        ))}
      </select>
    </div>
  )}
  {selectedGrowingUnit && selectedRow && (
    <div className="w-full">
      <select
        id="column"
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
      >
        <option value="">{`Select the target column`}</option>
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
    className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading || !selectedGrowingUnit || !selectedRow || !selectedColumn ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={loading || !selectedGrowingUnit || !selectedRow || !selectedColumn}
  >
    Transfer Plant
  </button>
</div>



  );
};

export default TransferForm;
