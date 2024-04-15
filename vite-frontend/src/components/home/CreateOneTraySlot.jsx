import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import BackendURL from '../BackendURL';
import { toLetters } from '../../utils';

const CreateOneTraySlot = ({ trayId, row, col , onCreateSlot }) => {
    const [loading, setLoading] = useState(false);
    const [tray, setTray] = useState({});
    const { enqueueSnackbar } = useSnackbar();

    const handleCreateOneSlot = async () => {
        setLoading(true);

        try {

            // enqueueSnackbar( `Requesting ${BackendURL}/trays/${trayId}`, 'success');
            const trayResponse = await axios.get(`${BackendURL}/trays/${trayId}`);
            setTray(trayResponse.data);
            const slotData = {
                used: false,
                // seed: '',
                startDate: '',
                trayRow: row,
                trayCol: col,
                seedlingTray: trayId,
                growingSystem: null,
                sz: trayResponse.data.slotSize,
                name: `${trayResponse.data.easyName}_${toLetters(col)}.${row + 1}`
            };

            // Create slot
            const response = await axios.post(`${BackendURL}/slots`, slotData);
            const createdSlotId = response.data._id;
            const mTray = trayResponse.data;

            // // Update tray with the new slot ID
             const updatedTray = { ...mTray, slots: [...mTray.slots, createdSlotId] };
            //  enqueueSnackbar(`${JSON.stringify(updatedTray)}`, { variant: 'success' });
             await axios.put(`${BackendURL}/trays/${trayId}`, updatedTray);
             onCreateSlot( updatedTray, response.data)

            // Show success message
            // enqueueSnackbar('Done', { variant: 'success' });
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

export default CreateOneTraySlot;