import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackendURL from '../components/BackendURL';
import { useSnackbar } from 'notistack';

const DeleteTraySlots = async (tray_id) => {
  console.log( `Delete Tray slots ${tray_id}`);
  await axios
    .get(`${BackendURL}/slots/tray${tray_id}`)
    .then( async (response) => {
         await response.data.data.forEach( obj => {
           axios
          .delete(`${BackendURL}/slots/${obj._id}`)
          .catch((error) => {
            console.log(`Delete slot id ${obj._id} error ${error}`);
          })
         });      
    })
    .catch((error) => {
      console.log(error);
    });
};

const DeleteTray =  () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteRecord = async () => {
    setLoading(true);
    const response = await axios
      .delete(`${BackendURL}/trays/${id}`)
      .then(() => {
        enqueueSnackbar("Record deleted!", { variant: 'success' });
        // DeleteTraySlots(id);
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        //console.log(`Delete record error ${error}`);
        enqueueSnackbar("Something went wrong, please check console !", { variant: 'error' });
      })
  }
  return (
    <div className='p-4 '><BackButton />
      <h1 className='text-3xl my-4'>Delete</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rouned-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this record ?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteRecord}>
          Yes, absolutely!
        </button>
      </div>
    </div>
  );
};

export default DeleteTray