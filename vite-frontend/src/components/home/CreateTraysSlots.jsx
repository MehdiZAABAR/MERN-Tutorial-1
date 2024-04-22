import React, { useState } from 'react'
import axios from 'axios';
import BackendURL from '../BackendURL';
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { toLetters } from '../../utils';

const CreateTraysSlots = ({ tray }) => {
    const [loading, seLoading] = useState(false);
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const HandleCreateSlots = async (id, name, rows, cols, sz) => {
        var data = {
            used: Boolean,
            seed: String,
            startDate: Date,
            trayRow: Number,
            trayCol: Number,
            seedlingTray: String,
            growingSystem: String,
            sz: String
        };
        data.used = false;
        data.seedlingTray = id;
        data.sz = sz;
        for (var row = 0; row < rows; row++)
            for (var col = 0; col < cols; col++) {
                data.trayCol = col;
                data.trayRow = row;
                data.name = `${name}_${toLetters(col)}.${row + 1}`;
                await axios
                    .post(`${BackendURL}/slots`, data)
                    .then((response) => {
                        tray.slots.push(response.data._id);
                    })
                    .catch((error) => {
                        console.log(error);
                        alert('An error happened while creating the record ! Check console');
                    });

        };
        //Update Tray
        await axios
        .put(`${BackendURL}/trays/${tray._id}`, tray)
        .then(() => {
        })
        .catch((error) => {
          console.log(error);
        })
        window.location.reload(false);
    };


    return (

        <div key={tray._id} >
            {
                    <button className='p-2 bg-red-300 m-8 rounded-lg' onClick={() => { HandleCreateSlots(tray._id, tray.easyName, tray.nbRows, tray.nbCols, tray.slotSize) }}>
                    Create Slots
                    </button>
        }</div>

    )
};

export default CreateTraysSlots