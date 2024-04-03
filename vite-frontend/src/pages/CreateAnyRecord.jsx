import React, { useState } from 'react';
import axios from 'axios';
import BackendURL from '../components/BackendURL';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

const CreateAnyRecord = ({ collectionName, recordSchema, onSubmit, onClose }) => {
    const [recordData, setRecordData] = useState({});
    const navigate = useNavigate();
    const schemaFields = Object.keys(recordSchema.paths);

    // Log the schema fields to verify
    // console.log('Schema Fields:', schemaFields);

    const handleChange = (e) => {
        setRecordData({ ...recordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BackendURL}/${collectionName}`, recordData);
            // If onSubmit callback is provided, call it with the created record data
            if (typeof onSubmit === 'function') {
                onSubmit(recordData);
            }
            onClose();
            navigate( -1);
        } catch (error) {
            console.error('Error creating record:', error);
        }
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h2 className="text-center font-bold">Create {collectionName} Record</h2>
            <br />
            <form onSubmit={handleSubmit}>
                {schemaFields.map((fieldName) => (
                    // Exclude the '_id' field from being rendered
                    fieldName !== '_id' && (
                        <div key={fieldName} className="mb-4 flex items-center">
                            <label htmlFor={fieldName} className="text-left font-bold w-1/6 px-4">{fieldName}:</label>
                            <input
                                type='text'
                                id={fieldName}
                                name={fieldName}
                                value={recordData[fieldName] || ''}
                                onChange={handleChange}
                                className="border border-black px-2 py-1 w-2/3"
                            />
                        </div>
                    )
                ))}

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto"
                >
                    Create Record
                </button>
            </form>
        </div>
    );
};

export default CreateAnyRecord;
