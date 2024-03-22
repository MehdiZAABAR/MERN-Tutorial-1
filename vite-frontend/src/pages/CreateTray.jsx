import React, { useState } from 'react'
import BackButton from '../components/BackButton.jsx'
import BackendURL from '../components/BackendURL.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { MdCheckBox } from 'react-icons/md'

const CreateTray = () => {
  const [propId, setPropId] = useState('');
  const [nbRows, setNbRows] = useState(1);
  const [nbCols, setNbCols] = useState(1);
  const [easyName, setEasyName] = useState('');
  const [slotSize, setSlotSize] = useState('small');
  const [slots, setSlots] = useState(['']);
  const [used, setUsed] = useState(false);
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [createSlots, setCreate] = useState(true);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const HandleSaveRecord = () => {
    const data = {
      propId,
      easyName,
      slotSize,
      nbRows,
      nbCols,
      slots,
      used,
      photo,
      createSlots
    };
    setLoading(true);
    axios
      .post(`${BackendURL}/trays`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar( 'Please create Tray slots now !', { variant:'success'});
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        //alert('An error happened while creating the record ! Check console');
        enqueueSnackbar( 'An error happened while creating the record ! Check console', { variant: 'error'});
      })
  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 '>Create Tray
      </h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Proprietary Id</label>
          <input
            type='text'
            value={propId}
            onChange={(e) => setPropId(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            value={easyName}
            onChange={(e) => setEasyName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>slotSize</label>
          <select id="slotSizes" value={slotSize} className='border-2 border-gray-500 px-4 py-2 w-full' onChange = {(e) => setSlotSize(e.target.value)}>
          <option value='small'> Small size (3cm diagonal)</option>
          <option value='medium'> Medium size </option> 
          <option value='big'> Big Size (7 cm diam) </option>  
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Number of Slot Rows</label>
          <input
            type='text'
            value={nbRows}
            onChange={(e) => setNbRows(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Number of Slot Columns</label>
          <input
            type='text'
            value={nbCols}
            onChange={(e) => setNbCols(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
         <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Picture</label>
          <input
            type='text'
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Create Related Slots ?</label>
          <input
            type='checkbox'
            checked={createSlots}
            onChange={(e) => setCreate(e.target.checked)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={HandleSaveRecord}>Create</button>
      </div>
    </div>
  );
}

export default CreateTray