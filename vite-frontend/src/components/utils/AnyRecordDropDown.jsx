import React, { useState } from 'react';

const AnyRecordDropDown = ({ records, valueKey, textKey, onChange }) => {
  const [selectedRecord, setSelectedRecord] = useState('');

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedRecord(selectedValue);
    onChange(selectedValue);
  };

  return (
    <select value={selectedRecord} onChange={handleSelectChange}>
      <option value="">Select a record</option>
      {records.map(record => (
        <option key={record[valueKey]} value={record[valueKey]}>{record[textKey]}</option>
      ))}
    </select>
  );
};

export default AnyRecordDropDown;