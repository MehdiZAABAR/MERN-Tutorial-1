import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import BackendURL from '../components/BackendURL';

const GetEditAnyRecord = ({ collectionName, allRecords, recordId, recordSchema, onSubmit, onClose, reloadData }) => {
    const [recordData, setRecordData] = useState({});
    const [loading, setLoading] = useState(false);
    const [changesMade, setChangesMade] = useState(false); // State to track changes
    const { enqueueSnackbar } = useSnackbar();

    const schemaFields = Object.keys(recordSchema.paths);
    // Log the schema fields to verify
    // console.log('Schema Fields:', schemaFields);

    useEffect(() => {
        if (reloadData) {
            const fetchRecord = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${BackendURL}/${collectionName}/${recordId}`);
                    setRecordData(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching record:', error);
                    setLoading(false);
                    enqueueSnackbar('Failed to fetch record. Please try again later.', { variant: 'error' });
                }
            };

            if (recordId) {
                fetchRecord();
            }
        }
        else {
            const nRec = allRecords?.find(item => item._id === recordId);
            if( nRec)
                setRecordData(nRec);
            else
                onClose();
        }

    }, [allRecords, recordId, collectionName]);

    useEffect(() => {
        // Find the record with the given recordId from allRecords and set it as the initial recordData
    }, [allRecords, recordId]);

    const handleChange = (e) => {
        setRecordData({ ...recordData, [e.target.name]: e.target.value });
        setChangesMade(true); // Set changesMade to true when any field changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`${BackendURL}/${collectionName}/${recordId}`, recordData);
            setLoading(false);
            enqueueSnackbar('Record updated successfully!', { variant: 'success' });
            setChangesMade(false); // Reset changesMade after submission
            // If onSubmit callback is provided, call it with updated record data
            if (typeof onSubmit === 'function') {
                onSubmit(recordData);
            }
            onClose();
        } catch (error) {
            console.error('Error updating record:', error);
            setLoading(false);
            enqueueSnackbar('Failed to update record. Please try again later.', { variant: 'error' });
        }
    };

    return (
        <div>
            <h2 className="text-center font-bold">Edit {collectionName} Record</h2>
            <br />
            {loading ? (
                <Spinner />
            ) : (
                <form onSubmit={handleSubmit}>
    {schemaFields.map((fieldName) => (
        // Exclude the '_id' field from being rendered
        fieldName !== '_id' && (
            <div key={fieldName} className="mb-4 flex items-center">
                <label htmlFor={fieldName} className="text-left font-bold w-20">{fieldName}:</label>
                <input
                    type='text'
                    id={fieldName}
                    name={fieldName}
                    value={recordData[fieldName] || ''}
                    onChange={handleChange}
                    readOnly={fieldName === '_id'} // Set readOnly attribute for _id field
                    className="border border-black px-2 py-1 w-4/5"
                />
            </div>
        )
    ))}
    <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto ${changesMade ? '' : 'opacity-50 cursor-not-allowed'}`}
        disabled={!changesMade} // Disable button if no changes made
    >
        Save Changes
    </button>
</form>
            )}
        </div>
    );
};

export default GetEditAnyRecord;
