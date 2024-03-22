import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton.jsx'
import BackendURL from '../components/BackendURL.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'


const EditTray = () => {
  const [propId, setPropId] = useState('');
  const [nbRows, setNbRows] = useState(1);
  const [nbCols, setNbCols] = useState(1);
  const [easyName, setEasyName] = useState('');
  const [slotSize, setSlotSize] = useState('small');
  const [slots, setSlots] = useState(['']);
  const [used, setUsed] = useState(false);
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();
  useEffect( () => {
    setLoading( true);
    axios
    .get( `${BackendURL}/trays/${id}`)
    .then( (response) => {
      setPropId(response.data.propId);
      setNbRows(response.data.nbRows);
      setNbCols(response.data.nbCols);
      setEasyName(response.data.easyName);
      setSlotSize(response.data.slotSize);
      setSlots(response.data.slots);
      setUsed(response.data.used);
      setLoading(false);
    })
    .catch((error) => {
      setLoading( false);
      console.log( error);
      alert( "Something wrong happened, please check console !");

    })
  }, []);
  const HandleEditTray = () => {
    const data = {
      propId,
      easyName,
      slotSize,
      nbRows,
      nbCols,
      used,
      slots,
      photo
    };
    setLoading(true);
    
    axios
      .put(`${BackendURL}/trays/${id}`, data)
      .then(() => {
        console.log( data);
        setLoading(false);
        enqueueSnackbar( 'Record updated successfully !', { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar( 'An error happened while updating the record ! Check console', { variant: 'error'});
      })
  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 '>Edit Tray
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
          <label className='text-xl mr-4 text-gray-500'>EasyName</label>
          <input
            type='text'
            value={easyName}
            onChange={(e) => setEasyName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Growing Slot Size</label>
          <input
            type='text'
            value={slotSize}
            onChange={(e) => setSlotSize(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Nb Slot Rows</label>
          <input
            type='text'
            value={nbRows}
            onChange={(e) => setNbRows(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Nb Slot Columns</label>
          <input
            type='text'
            value={nbCols}
            onChange={(e) => setNbCols(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Used ?</label>
          <input
            type='text'
            value={used}
            onChange={(e) => setUsed(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={HandleEditTray}>Save</button>
      </div>
    </div>
  )
}

export default EditTray