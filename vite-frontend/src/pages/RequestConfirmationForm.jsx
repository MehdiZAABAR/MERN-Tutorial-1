import React from 'react'

const RequestConfirmationForm = ({onConfirm, onCancel, question}) => {
  const handleOnConfirm = () => {
    onConfirm();
    onCancel();
  }
  return (
    <div className='bg-white rounded-xl p-4 relative overflow-hidden flex flex-col justify-between h-full'>
    <div className='flex flex-col justify-center h-full'>
      <h3 className='text-lg font-bold mb-4 text-center'>Confirmation Required</h3>
      <p className='mb-4 text-center'>{question}</p>
    </div>
    <div className='flex justify-center'>
      <button onClick={onCancel} className='mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400'>Cancel</button>
      <button onClick={handleOnConfirm} className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'>Confirm</button>
    </div>
  </div>
  )
}

export default RequestConfirmationForm