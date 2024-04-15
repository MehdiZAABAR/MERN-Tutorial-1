import React, { useRef, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const ModalForm = ({ content, onClose }) => {
  const modalContentRef = useRef(null);
  const [exceedsHeight, setExceedsHeight] = useState(false);

  useEffect(() => {
    if (modalContentRef.current) {
      const maxHeight = 400; // Define your maximum height here
      const contentHeight = modalContentRef.current.scrollHeight;
      setExceedsHeight(contentHeight > maxHeight);
    }
  }, [content]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
      <div className="bg-black bg-opacity-60 absolute top-0 left-0 right-0 bottom-0" onClick={onClose}></div>
      <div className="bg-white rounded-xl p-4 relative overflow-hidden" style={{ minWidth: '600px' }}>
        <AiOutlineClose className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer' onClick={onClose} />
        <div ref={modalContentRef} className={`flex flex-col justify-center ${exceedsHeight ? 'max-h-400 overflow-y-auto' : ''}`}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default ModalForm;
