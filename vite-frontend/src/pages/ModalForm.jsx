import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

const ModalForm = ( {content, onClose} ) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
        <div className="bg-black bg-opacity-60 absolute top-0 left-0 right-0 bottom-0" onClick={onClose}></div>
        <div className="bg-white rounded-xl p-4 relative overflow-hidden" style={{ minWidth: '600px', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <AiOutlineClose className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer' onClick={onClose} />
          {content}
        </div>
      </div>
    );
}

export default ModalForm