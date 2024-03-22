// CreateKeyword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { MdCheckBox } from 'react-icons/md';

const CreateKeyword = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveRecord = () => {
    const data = { text };

    axios
      .post(`${BackendURL}/keywords`, data)
      .then(() => {
        enqueueSnackbar('Keyword created successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('An error occurred while creating the keyword.', { variant: 'error' });
      });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4 '>Create Keyword</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Text</label>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveRecord}>Create</button>
      </div>
    </div>
  );
};

export default CreateKeyword;