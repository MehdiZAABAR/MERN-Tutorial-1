import React from 'react'

const TrayDisplayHeader = (tray) => {
  return (
    <div><h2 style={{ textAlign: 'center' }}>Tray Details</h2>
    <div style={{ margin: '20px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      <p>ID: {tray._id}</p>
      <p>Name: {tray.easyName}</p>
      <p>Slot Size: {tray.slotSize}</p>
      <p>Number of Rows: {tray.nbRows}</p>
      <p>Number of Columns: {tray.nbCols}</p>
      <p>Used: {tray.used ? 'Yes' : 'No'}</p>
      <p>Creation Date: {new Date(tray.createdAt).toLocaleDateString()}</p>
      <p>Update Date: {new Date(tray.updatedAt).toDateString()}</p>
      <p>Number of Slots: {tray.slots?.length}</p>
    </div>
    </div>
  )
}

export default TrayDisplayHeader