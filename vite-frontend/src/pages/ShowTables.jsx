import React from 'react';
import ListComponent from '../components/home/ListComponent';
import ModalForm from './ModalForm';
import Spinner from '../components/Spinner';

const ShowTables = ( {pageTitle, dataSources, showModal, setModal, modalContent}) => {

    return (
        <div className='p-4'>
  <div className='flex justify-center items-center' > {/* Change justify-between to justify-center */}
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
