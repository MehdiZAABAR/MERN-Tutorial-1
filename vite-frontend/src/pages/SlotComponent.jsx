import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateOneContainerSlot from '../components/home/CreateOneContainerSlot';
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
import {GetSlotRecentMood} from '../tools/GetMood.jsx'

const SlotComponent = ({ slots, selectedSlots, containerType, containerId, rowIndex, colIndex, seeds, onContainerUpdate }) => {
  const [seed, setSeed] = useState(null);
  const [slot, setSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [seedIconSize, setSeedIconSize] = useState(150);
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [mood, setMood] = useState({});

  let collectionURL = '';

  if( containerType === 'Tray')
    collectionURL = 'trays'
  else if( containerType === 'GrowingUnit')
    collectionURL = 'growingunits'
  else
    collectionURL = 'undefCollection'



  //  console.log( `selectedSlots = ${JSON.stringify(selectedSlots)} \
  //  containerId = ${containerId} rowIndex ${rowIndex} colIndex ${colIndex}`, {variant:'Success'});

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
  const fetchMood = async () => {
    if (slot) {
        const moodData = await GetSlotRecentMood(slot);
        setMood(moodData);
    }
};

  useEffect(() => {
    fetchMood();
}, [slot]);

  const handleSelectSeed = async (selectedSeed) => {

    let updateSeedQuantity = false;

    if ((selectedSlots.length >= 1) && !(selectedSlots.includes(slot._id))) {
      enqueueSnackbar("Cancel selection first !", { Variant: "Error" });
      return;
    }
    if (selectedSlots.length === 0)
      selectedSlots.push(slot._id);

    const updatedSlots = slots.map(item => {
      if (selectedSlots.includes(item._id)) {
        return { ...item, seed: selectedSeed._id, used: true, startDate: new Date() };
      } else {
        return item;
      }
    });

    selectedSlots.forEach(async (id) => {
      let updatedSlot = updatedSlots.find(item => item._id === id);
      await axios.put(`${BackendURL}/slots/${id}`, updatedSlot);
      // console.log( `Pushed id ${id} to backend updated slot = ${JSON.stringify(updatedSlot)}`);

    });

    // Decrease the seed quantity
    if (selectedSeed.quantity !== null && selectedSeed.quantity !== undefined) {
      updateSeedQuantity = true;
      selectedSeed.quantity = selectedSeed.quantity - selectedSlots.length;
    }
      const updatedSeeds = seeds.map(seed => {
        if (seed._id === selectedSeed._id) 
            return selectedSeed;
        return seed;
      });
    
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


    const observationData = {
      date: new Date(),
      trays: [containerId], // Example container IDs
      growingunits: [containerId], // Example container IDs
      slots: selectedSlots, // Example slot IDs
      photos: [], // Example photo IDs
      text: `${selectedSeed.propId} ${selectedSeed._id} added to ${JSON.stringify(selectedSlots)}`,
      keywords: ['Sowing'], // Example keyword IDs
      mood: 'Es Geht So', // Example mood IDs
    };
    PostToDataBase(`${BackendURL}/observations`, observationData);
    onContainerUpdate('', updatedSlots);
  }

  const moodColors = {
    'Kaput': '#4d2600',       // Dark red
    'Bad': '#ffbf00',         // Firebrick
    'Worrying': '#d9ff66',    // Light salmon
    'Es Geht So': '#bbff33',  // Light green
    'Good': '#33cc33',        // Medium sea green
    'Excellent': '#009900',   // Sea green
    'Wunderbar': '#339966'    // Dark green
};
const MoodBgColor = (mood) => {
    return mood && moodColors[mood] ? moodColors[mood] : 'white'; // Default color is white if mood is not found or undefined
};
  const cellStyle = {
    // width: '100px',
    // height: '100px',
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: slot && slot.used && seed
        ? (mood && mood.mood ? MoodBgColor(mood.mood) : 'white')
        : 'grey',
    borderRadius: '5px',
  };


  const DeleteSlots = async (containerid, selectedSlots) => {
    //  console.log(`selectedSlots to delete = ${JSON.stringify(selectedSlots)}`);
    try {
      selectedSlots.forEach(async element => {
        const response = await axios.delete(`${BackendURL}/slots/${element}`);
      });
      // console.log(`Slots = ${JSON.stringify(slots)}`);
      const updatedSlots = slots.filter(s => !selectedSlots.includes(s._id));
      // console.log(`Updated Slots = ${JSON.stringify(updatedSlots)}`);
      slots = updatedSlots;
      // console.log( "backendURL", BackendURL, "collection url ", collectionURL, "containerId", containerId);
      const updatedTray = await axios.patch(`${BackendURL}/${collectionURL}/${containerid}`, { slots: updatedSlots });
      // console.log( "updated container", updatedTray.data);
      onContainerUpdate(updatedTray.data, slots);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Something went wrong, please check console !", { variant: 'error' });
    }
  }


  const handleCreateOneContainerSlot = (updatedTray, newSlot) => {
    setSeedIconSize((newSlot.sz == 'big') ? 50 : (newSlot.sz == 'medium') ? 35 : 20);
    setSlot(newSlot);
    slots.push(newSlot);
    onContainerUpdate(updatedTray, slots);
  }




  const RemoveDeadSeed = async (selectedSlots, onContainerUpdate) => {
    const containerId = slot.containerId;

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
    //   trays: [containerId], // Example container IDs
    //   slots: selectedSlots, // Example slot IDs
    //   photos: [], // Example photo IDs
    //   text: selectedSlots.length > 1
    //     ? 'User removed plants from selected slots. Are they dead?'
    //     : 'User removed the plant from the slot. Is it dead?',
    //   keywords: [], // Example keyword IDs
    //   mood: [], // Example mood IDs
    // };

    // PostToDataBase(`${BackendURL}/observations`, observationData);
    onContainerUpdate('', updatedSlots);
  };

  // 

  const showModalContent = (content) => {
    setShowModal(true);
    setModalContent(content);
  }


  const HandleAddObservation = () => {
    let selection = [...selectedSlots];
    if ((selection.length >= 1) && !(selection.includes(slot._id))) {
      enqueueSnackbar(`Cancel selection first !`, { variant: 'error' });
      return;
    }
    if (selection.length == 0) selection.push(slot._id);
    showModalContent(<AddObservationForm slots={slots} selectedSlots={selection} seed={seed} containerId={containerId} onClose={ () => { setShowModal(false); selection=[]; fetchMood();}}/>);
  }

  const HandleDeleteManySlots = () => {
    if ((selectedSlots.length >= 1) && !(selectedSlots.includes(slot._id))) {
      enqueueSnackbar(`Cancel selection first`, { variant: 'error' });
      return;
    }
    if (selectedSlots.length == 0)
      selectedSlots.push(slot._id);

    showModalContent(
      <RequestConfirmationForm
        onConfirm={() => DeleteSlots(containerId, selectedSlots)}
        onCancel={() => setShowModal(false)}
        question={selectedSlots && selectedSlots?.length > 1
          ? 'Are you sure you want to remove all the selected slots ?'
          : 'Are you sure you want to remove the slot ?'}
      />);

  }

  const HandleDeleteManyPlants = () => {
    if ((selectedSlots.length >= 1) && !(selectedSlots.includes(slot._id))) {
      enqueueSnackbar(`Cancel selection first`, { variant: 'error' });
      return;
    }
    if (selectedSlots.length == 0)
      selectedSlots.push(slot._id);
    showModalContent(<RequestConfirmationForm
      onConfirm={() => RemoveDeadSeed(selectedSlots, onContainerUpdate)}
      onCancel={() => setShowModal(false)}
      question={selectedSlots && selectedSlots?.length > 1
        ? `Are you sure you want to remove the plants from all selected slots ?`
        : 'Are you sure you want to remove the plants from this slot ?'}
    />);
  }
  return (
    <div key={`${mood?.mood}-${rowIndex}-${colIndex}`} style={cellStyle}>
      {slot ? (
        slot.used && seed ? (
          <div>
            <div className='flex flex-row justify-center gap-x-4 gap-y-4' >
              <div title="+ Care">
                <GiPlantWatering className='text-2xl text-black hover:text-green-200' onClick={() => { showModalContent(<AddCareForm slot={slot} seed={seed} />); }} />
              </div>
              <div title="+ Observation">
                <BsDatabaseAdd className='text-2xl text-black hover:text-white' onClick={HandleAddObservation}/>
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
                <TbTransferOut className='text-2xl text-black hover:text-green-600' onClick={() => { showModalContent(<TransferForm slot={slot} slotId = {slot._id} containerId={containerId} containerType = 'Tray' seed={seed} onClose={() => { setShowModal(false) }}/>); }} />
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
              <RiDeleteBin5Fill size={seedIconSize} onClick={HandleDeleteManySlots} />
            </div>
          </div>
        )
      ) : (
        <CreateOneContainerSlot containerType = {containerType} containerId={containerId} row={rowIndex} col={colIndex} onCreateSlot={handleCreateOneContainerSlot} />
      )}
      {showModal && (<ModalForm content={modalContent} onClose={() => { setShowModal(false) }} />)}

    </div>
  );
};

export default SlotComponent;