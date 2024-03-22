// import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../Spinner.jsx';
import EmojiSelect from '../utils/EmojiSelect.jsx';
import BackendURL from '../BackendURL.jsx';
import BackButton from '../BackButton.jsx';

const CreateMood = () => {
  const [text, setText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveMood = async () => {
    setLoading(true);

    // Check if the provided value already exists in the database
    await axios.get(`${BackendURL}/Moods?value=${value}`)
      .then(response => {
        console.log( JSON.stringify(response));
        if (response.data.data.length > 0) {
          enqueueSnackbar('Mood value already exists. Please choose a different value.', { variant: 'error' });
          setLoading(false);
        } else {
          // Assuming the Mood schema has a field 'icon' for the selected emoji
          const newMood = {
            text: text,
            icon: selectedEmoji.image,
            value: value
          };
          console.log( `selectedEmoji.image = ${ selectedEmoji.image}, selectedEmoji ${JSON.stringify(selectedEmoji)}`);
          enqueueSnackbar( `Mood to post = ${JSON.stringify(newMood)}`);
           axios.post(`${BackendURL}/Moods`, newMood)
            .then(response => {
              setLoading(false);
              enqueueSnackbar('Mood created successfully!', { variant: 'success' });
              navigate('/');
            })
            .catch(error => {
              console.error('Error creating mood:', error);
              setLoading(false);
              enqueueSnackbar('Failed to create mood. Please try again later.', { variant: 'error' });
            });
        }
      })
      .catch(error => {
        console.error('Error checking if mood value exists:', error);
        setLoading(false);
        enqueueSnackbar('Failed to create mood. Please try again later.', { variant: 'error' });
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Mood</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Mood Text</label>
          <input
            type='text'
            value={text}
            onChange={e => setText(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Select Emoji</label>
          <EmojiSelect setSelectedEmoji={setSelectedEmoji} selectedEmoji={selectedEmoji} />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Mood Value</label>
          <input
            type='number'
            value={value}
            onChange={e => setValue(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveMood}>Create</button>
      </div>
    </div>
  );
};

export default CreateMood;
