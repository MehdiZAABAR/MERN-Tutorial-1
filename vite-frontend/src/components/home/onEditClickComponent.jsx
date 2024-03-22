import React from 'react';
import GetEditAnyRecord from '../../pages/GetEditAnyRecord';

export const onEditClick = (item, dataSource, setModalContent, setModal) => {
    setModalContent(
        <GetEditAnyRecord
            reloadData={false}
            allRecords={dataSource.data.data}
            onSubmit={(newRec) => {
                const updatedData = dataSource.data.data.map(item => item._id === newRec._id ? newRec : item);
                dataSource.data.setData(updatedData);
            }}
            onClose={() => { setModal(false) }}
            collectionName={dataSource.title}
            recordId={item._id}
            recordSchema={dataSource.schema} />
    );
    setModal(true);
};