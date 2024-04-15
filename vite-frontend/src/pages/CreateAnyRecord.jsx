import React, { useState } from 'react';
import axios from 'axios';
import BackendURL from '../components/BackendURL';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import {renderField} from '../tools/FieldFormatting'
import { useParams } from 'react-router-dom';
import * as Schemas from '../../../Backend/models/all_collections_models'

const schemaVariableMap = {
    keywords: 'KeywordSchema',
    reservoirs: 'ReservoirSchema',
    growingunits: 'GrowingUnitSchema',
    slots : 'SlotSchema',
    trays: 'TraysSchema',
    seeds: 'SeedsSchema',
    moods: 'MoodsSchema',
    operationType: 'OperationTypeSchema',
    operations: 'OperationSchema',
    observations: 'ObservationSchema',
    seeds: 'SeedSchema'
    // Add more mappings as needed
  };

export const PrepareAnyRecordCreation = ({onSubmit, onClose}) =>{
    const { collectionName } = useParams();
    const schemaVariableName = `${schemaVariableMap[collectionName.toLowerCase()]}`;
    const recordSchema = Schemas[schemaVariableName];

    return (
        <CreateAnyRecord collectionName = {collectionName} recordSchema={recordSchema} onClose={onClose} onSubmit={ onSubmit}/>
    )

}

const CreateAnyRecord = ({  collectionName, recordSchema, onSubmit, onClose }) => {

    const [recordData, setRecordData] = useState({});
    const [changesMade, setChangesMade] = useState(false); // State to track changes
    const navigate = useNavigate();
    const schemaFields = Object.keys(recordSchema.paths);

    // Log the schema fields to verify
    // console.log('Schema Fields:', schemaFields);

    const handleChange = (e) => {
        setRecordData({ ...recordData, [e.target.name]: e.target.value });
        setChangesMade( true);
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
            navigate(-1);
        } catch (error) {
            console.error('Error creating record:', error);
        }
    };

    return (
<div className='p-4'>
    <BackButton />
    <h2 className="text-center font-bold">Create {collectionName.toUpperCase()} Record</h2>
    <br />
    <form onSubmit={handleSubmit}>
        {schemaFields.map((fieldName) => (
            // Exclude the '_id' field from being rendered
            fieldName !== '_id' && (
                <div key={fieldName} className="mb-4 flex items-start">
                    <label htmlFor={fieldName} className="text-left font-bold w-1/6">{fieldName}:</label>
                    <div className="w-5/6">
                        {renderField(fieldName, recordSchema.paths[fieldName].instance, recordData[fieldName], handleChange)}
                    </div>
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
</div>
    );
};

export default PrepareAnyRecordCreation;
