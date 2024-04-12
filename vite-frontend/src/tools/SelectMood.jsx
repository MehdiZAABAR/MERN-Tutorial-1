import React, { useState, useEffect, useContext } from 'react';
import Select, { components } from 'react-select';
import { AppDataSharingContext } from '../App';
import ContextDataManager from '../components/utils/ContextDataManager';

// Custom Option component to render image alongside label
const Option = ({ data, ...props }) => (
  <components.Option {...props}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={data.icon} alt={data.text} style={{ marginRight: '8px', width: '84px', height: '84px' }} />
      {data.text}
    </div>
  </components.Option>
);

const EmojisDir = '/emojis';

const SelectMood = ({ selectedMood, setSelectedMood }) => {
  const [moods, setMoods] = useState([]);
  const { appMoods } = useContext(AppDataSharingContext);

  useEffect(() => {
    setMoods(appMoods);
  }, [appMoods]);

  const handleChange = (selectedOption) => {
    setSelectedMood(selectedOption);
  };

  return (
    <div>
      <Select
        value={selectedMood}
        onChange={handleChange}
        options={moods}
        components={{ Option }} // Use the custom Option component
        formatOptionLabel={mood => (
          <div className="mood-option" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={mood.icon} alt={mood.text} style={{ marginRight: '8px', width: '84px', height: '84px' }} />
            <span>{mood.text}</span>
          </div>
        )}
      />
    </div>
  );
};

export default SelectMood;
