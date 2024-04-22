import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import BackendURL from '../BackendURL';
import { toLetters } from '../../utils';

const CreateOneContainerSlot = ({ containerType, containerId, row, col, onCreateSlot }) => {
    const [loading, setLoading] = useState(false);
    const [container, setContainer] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    let collectionURL, nameprefix;
    if (containerType === 'Tray')
        collectionURL = 'trays'
    else if (containerType === 'GrowingUnit')
    {
        collectionURL = 'growingunits'
        nameprefix = 'name';
    }
    else
    {
        collectionURL = 'undefinedContainer'
        nameprefix = easyName;
}

    const handleCreateOneSlot = async () => {
        setLoading(true);

        try {

            const containerResponse = await axios.get(`${BackendURL}/${collectionURL}/${containerId}`);
            setContainer(containerResponse.data);
            const slotData = {
                used: false,
                // seed: '',
                startDate: '',
                trayRow: row,
                trayCol: col,
                sz: containerResponse.data.slotSize,
                name: `${containerResponse.data.easyName}_${toLetters(col)}.${row + 1}`
            };

            if (containerType === 'Tray')
                slotData.seedlingTray = containerId;
            else if (containerType === 'GrowingUnit')
                slotData.growingSystem = containerId;


            // Create slot
            const response = await axios.post(`${BackendURL}/slots`, slotData);
            const createdSlotId = response.data._id;
            const mContainer = containerResponse.data;

            // // Update container with the new slot ID
            const updatedContainer = { ...mContainer, slots: [...mContainer.slots, createdSlotId] };

            await axios.put(`${BackendURL}/${collectionURL}/${containerId}`, updatedContainer);
            onCreateSlot(updatedContainer, response.data)
        } catch (error) {
            console.error('Error creating slot:', error);
            enqueueSnackbar('An error occurred while creating the slot', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <button style={{ width: '100%', height: '100%' }}
                className={`p-2 rounded-lg width:100% height:100% ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-300'}`}
                onClick={handleCreateOneSlot}
                disabled={loading}
            >
                {loading ? 'Creating Slot...' : 'Create Slot'}
            </button>
        </div>
    );
};

export default CreateOneContainerSlot;