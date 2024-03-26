import React from 'react';
import { Link } from 'react-router-dom';
import ListComponent from '../components/home/ListComponent';
import useDataFetching from '../hooks/useDataFetching';
import { AiFillCamera, AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlinePreview, MdOutlineDelete } from 'react-icons/md';
import { TfiCommentsSmiley } from 'react-icons/tfi'
import CreateTraysSlots from '../components/home/CreateTraysSlots'
import { PiPianoKeysFill } from 'react-icons/pi'
import GetEditAnyRecord from './GetEditAnyRecord';
import { useState } from 'react';
import ModalForm from './ModalForm';
import { enqueueSnackbar } from 'notistack';
import * as Schemas from '../components/home/SchemasForFrontEnd'
import { onEditClick } from '../components/home/onEditClickComponent';
import DebugListComponent from '../components/utils/DebugListComponent';
import Spinner from '../components/Spinner';

const ShowTables = ( {pageTitle, dataSources, showModal, setModal, modalContent}) => {

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center' >
            <h1 className='text-2xl my-4'>{pageTitle}</h1>       
            </div>
            <div>
            {dataSources.map(element => (
                <React.Fragment key={element.title + "_"}>
                    <div>
                        {element.data.loading ? <Spinner /> : (
                            <ListComponent
                                onEditClick={(item) => () => element?.onEditClick(item, element)}
                                key={element.title}
                                title={element.title}
                                dataLoader={element.data}
                                loading={element.data.loading}
                                renderHeader={element.renderHeader}
                                renderItem={(item) => element.renderItem(item, element)}
                            />
                        )}
                    </div>
                </React.Fragment>
            ))}
            {showModal && (<ModalForm content={modalContent} onClose={() => { setModal(false) }} />)} 
            </div>
        </div>
    );
};
export default ShowTables;
