import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateOneTraySlot from '../components/home/CreateOneTraySlot';
import { GiPlantSeed, GiPlantWatering } from 'react-icons/gi';
import { BsDatabaseAdd } from 'react-icons/bs';
import { RiDeleteBin5Fill } from "react-icons/ri";
import SeedSelectionForm from './SeedSelectionForm';
import { useSnackbar } from 'notistack';
import BackendURL from '../components/BackendURL';
import { AiOutlineDelete } from 'react-icons/ai';
import { TbTransferOut } from 'react-icons/tb';
import { PostToDataBase, PutToDataBase } from "../utils.jsx"
import { MdLocalSee } from "react-icons/md";
import { GiMicroscope } from "react-icons/gi";
import SlotAndPlantStatus from './SlotAndPlantStatus.jsx';
import ObservationsLogForm from './ObservationsLogForm.jsx';
import AddCareForm from './AddCareForm.jsx';
import AddObservationForm from './AddObservationForm.jsx';
import TransferForm from './TransferForm.jsx';
import ModalForm from './ModalForm.jsx';
import RequestConfirmationForm from './RequestConfirmationForm.jsx';
const SlotComponent = ({ slots, selectedSlots, trayId, rowIndex, colIndex, seeds, onTrayUpdate }) => {
  const [seed, setSeed] = useState(null);
  const [slot, setSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [seedIconSize, setSeedIconSize] = useState(150);
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Find the slot corresponding to the given row and column indices
    const foundSlot = Array.isArray(slots) && slots.find(slot =>
      slot.trayRow === rowIndex &&
      slot.trayCol === colIndex
    );
    setSlot(foundSlot);
    if (foundSlot)
      setSeedIconSize((foundSlot.sz == 'big') ? 50 : (foundSlot.sz == 'medium') ? 35 : 20);
    // Fetch seed data if the slot is used and has a seed
    if (foundSlot && foundSlot.used && foundSlot.seed) {
      fetchSeed(foundSlot.seed);
    }
  }, [slots, rowIndex, colIndex]);

  const fetchSeed = async (seedId) => {
    try {
      const response = await axios.get(`${BackendURL}/seeds/${seedId}`);
      setSeed(response.data);
    } catch (error) {
      console.error('Error fetching seed data:', error);
    }
  };
  const handleSelectSeed = (selectedSeed) => {
    // Update the slot with the selected seed _id
    const updatedSlot = { ...slot, seed: selectedSeed._id, used: true, startDate: new Date() };
    const updatedSlots = slots.map(slot => {
      // Check if the current slot is the one being modified
      if (slot._id === updatedSlot._id) {
        // Replace the slot with the updatedSlot
        return updatedSlot;
      } else {
        // If not the modified slot, return the original slot
        return slot;
      }
    });
    // Decrease the seed quantity
    const updatedSeeds = seeds.map(seed => {
      if (seed._id === selectedSeed._id) {
        if (seed.quantity !== null && seed.quantity !== undefined)
          return { ...seed, quantity: seed.quantity - 1 };
      }
      return seed;
    });
    var updateSeedQuantity = false;
    // Perform API calls to update the slot and seed quantities
    axios.put(`${BackendURL}/slots/${updatedSlot._id}`, updatedSlot)
      .then(response => {
        try {
          if (selectedSeed.quantity !== null && selectedSeed.quantity !== undefined) {
            selectedSeed.quantity = selectedSeed.quantity - 1;
            updateSeedQuantity = true;
          }
          else
            updateSeedQuantity = false;
        } catch (error) {

          console.log(`seed ${JSON.stringify(selectedSeed)} has undefined quantity !`);
        }

        if (updateSeedQuantity) {
          axios
            .put(`${BackendURL}/seeds/${selectedSeed._id}`, selectedSeed)
            .then((response) => {
              enqueueSnackbar("Seed Quantity Updated!", { variant: 'success' });
            })
            .catch((error => {
              enqueueSnackbar("Something wrong happened while updating the seed quantity!", { variant: 'error' });
            }));
        }
      })
      .catch(error => {
        // Handle error while updating slot
        enqueueSnackbar("Something wrong happened while updating the slot!", { variant: 'error' });
        console.error('Error updating slot:', error);
      });
    const observationData = {
      date: new Date(),
      trays: [trayId], // Example tray IDs
      slots: [updatedSlot._id], // Example slot IDs
      photos: [], // Example photo IDs
      text: `A new Seed is added id ${selectedSeed._id} ${selectedSeed.propId}`,
      keywords: [], // Example keyword IDs
      mood: [], // Example mood IDs
    };
    PostToDataBase(`${BackendURL}/observations`, observationData);
    onTrayUpdate('', updatedSlots);
  }

  const cellStyle = {
    // width: '100px',
    // height: '100px',
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: slot && slot.used && seed ? 'lightgreen' : slot ? 'white' : 'grey',
    borderRadius: '5px',
  };


  const handleDeleteSlot = async (trayid, slotid) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${BackendURL}/slots/${slotid}`);
      // enqueueSnackbar("Slot deleted!", { variant: 'success' });
      const updatedSlots = slots.filter(s => s._id !== slot._id);
      slots = updatedSlots;
      const updatedTray = await axios.patch(`${BackendURL}/trays/${trayid}`, { slots: updatedSlots });
      enqueueSnackbar("Tray updated!", { variant: 'success' });
      onTrayUpdate(updatedTray.data, updatedSlots);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Something went wrong, please check console !", { variant: 'error' });
    }
    //Update Tray now const rsp = 
  }


  const handleCreateOneTraySlot = (updatedTray, newSlot) => {
    setSeedIconSize((newSlot.sz == 'big') ? 50 : (newSlot.sz == 'medium') ? 35 : 20);
    setSlot(newSlot);
    slots.push(newSlot);
    onTrayUpdate(updatedTray, slots);
  }




  const RemoveDeadSeed = async (selectedSlots, onTrayUpdate) => {
    const trayId = slot.trayId;

    const updatedSlots = slots.map(item => {
      if ((selectedSlots.includes(item._id)) && (item.seed != null)) {
        const updatedSlot = { ...item, seed: null, used: false, startDate: null };
        PutToDataBase(`${BackendURL}/slots/${updatedSlot._id}`, updatedSlot);
        return updatedSlot;
      } else {
        return item;
      }
    });

    // const observationData = {
    //   date: new Date(),
    //   trays: [trayId], // Example tray IDs
    //   slots: selectedSlots, // Example slot IDs
    //   photos: [], // Example photo IDs
    //   text: selectedSlots.length > 1
    //     ? 'User removed plants from selected slots. Are they dead?'
    //     : 'User removed the plant from the slot. Is it dead?',
    //   keywords: [], // Example keyword IDs
    //   mood: [], // Example mood IDs
    // };

    // PostToDataBase(`${BackendURL}/observations`, observationData);
    onTrayUpdate('', updatedSlots);
  };

  // 

  const showModalContent = (content) => {
    setShowModal(true);
    setModalContent(content);
  }

 
  const HandleDeleteManyPlants = () => {
    if ((selectedSlots.length >= 1) && !(selectedSlots.includes(slot._id))) {
      enqueueSnackbar(`Cancel selection first`, { variant: 'error' });
      return;
    }
    if( selectedSlots.length == 0)
      selectedSlots.push(slot._id);
    showModalContent(<RequestConfirmationForm
      onConfirm={() => RemoveDeadSeed(selectedSlots, onTrayUpdate)}
      onCancel={() => setShowModal(false)}
      question={selectedSlots && selectedSlots?.length > 1
        ? `Are you sure you want to remove the plants from all selected slots ?`
        : 'Are you sure you want to remove the plants from this slot ?'}
    />);
  }

  return (
    <div style={cellStyle}>
      {slot ? (
        slot.used && seed ? (
          <div>
            <div className='flex flex-row justify-center gap-x-4 gap-y-4' >
              <div title="+ Care">
                <GiPlantWatering className='text-2xl text-black hover:text-green-200' onClick={() => { showModalContent(<AddCareForm slot={slot} seed={seed} />); }} />
              </div>
              <div title="+ Observation">
                <BsDatabaseAdd className='text-2xl text-black hover:text-white' onClick={() => { showModalContent(<AddObservationForm slot={slot} seed={seed} />); }} />
              </div>
              <div title="Status">
                <GiMicroscope className='text-2xl text-black hover:text-white' onClick={() => { showModalContent(<SlotAndPlantStatus slot={slot} seed={seed} />); }} />
              </div>
            </div>
            <div className='flex flex-row justify-center gap-x-4 gap-y-4'>
              <div title="Remove Dead Seed">
                <AiOutlineDelete className='text-2xl text-black hover:text-red-400' onClick={HandleDeleteManyPlants} />
              </div>
              <div title="Transfer Slot">
                <TbTransferOut className='text-2xl text-black hover:text-green-600' onClick={() => { showModalContent(<TransferForm slot={slot} seed={seed} />); }} />
              </div>
              <div title="Observations">
                <MdLocalSee className='text-2xl text-black hover:text-white' onClick={() => { showModalContent(<ObservationsLogForm slot={slot} seed={seed} />); }} />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div title="Seed It">
              <GiPlantSeed size={seedIconSize} onClick={() => { showModalContent(<SeedSelectionForm seeds={seeds} onSelectSeed={handleSelectSeed} onClose={() => { setShowModal(false) }} />); }} />
            </div>
            <div title="Delete Slot">
              <RiDeleteBin5Fill size={seedIconSize} onClick={() => {
                showModalContent(
                  <RequestConfirmationForm
                    onConfirm={() => handleDeleteSlot(trayId, slot?._id)}
                    onCancel={() => setShowModal(false)}
                    question={selectedSlots && selectedSlots?.length > 1
                      ? 'Are you sure you want to remove all the selected slots?'
                      : 'Are you sure you want to remove the slot?'}
                  />);
              }} />
            </div>
          </div>
        )
      ) : (
        <CreateOneTraySlot trayId={trayId} row={rowIndex} col={colIndex} onCreateSlot={handleCreateOneTraySlot} />
      )}
      {showModal && (<ModalForm content={modalContent} onClose={() => { setShowModal(false) }} />)}

    </div>
  );
};

export default SlotComponent;