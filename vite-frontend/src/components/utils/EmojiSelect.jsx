import React, { useState } from 'react';
import Select, { components } from 'react-select';

// Custom Option component to render image alongside label
const Option = ({ data, ...props }) => (
  <components.Option {...props}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={data.image} alt={data.label} style={{ marginRight: '8px', width: '84px', height: '84px' }} />
      {data.label}
    </div>
  </components.Option>
);
const EmojisDir='/emojis';

const EmojiSelect = ({selectedEmoji, setSelectedEmoji}) => {

  // List of Emojis with their image filenames
  const emojis = [
        { value:'ambulance_flat.svg', label:'Ambulance', image:`${EmojisDir}/ambulance_flat.svg` },
        { value:'angry_face_flat.svg', label:'Angry', image:`${EmojisDir}/angry_face_flat.svg` },
        { value:'beaming_face_with_smiling_eyes_flat.svg', label:'Beaming', image:`${EmojisDir}/beaming_face_with_smiling_eyes_flat.svg` },
        { value:'confounded_face_flat.svg', label:'Confounded', image:`${EmojisDir}/confounded_face_flat.svg` },
        { value:'disappointed_face_flat.svg', label:'Disappointed', image:`${EmojisDir}/disappointed_face_flat.svg` },
        { value:'dizzy-face.svg', label:'Dizzy', image:`${EmojisDir}/dizzy-face.svg` },
        { value:'face-with-spiral-eyes.svg', label:'Spiral', image:`${EmojisDir}/face-with-spiral-eyes.svg` },
        { value:'face_without_mouth_flat.svg', label:'No Mouth', image:`${EmojisDir}/face_without_mouth_flat.svg` },
        { value:'face_with_monocle_flat.svg', label:'Monocle', image:`${EmojisDir}/face_with_monocle_flat.svg` },
        { value:'face_with_thermometer_flat.svg', label:'Thermometer', image:`${EmojisDir}/face_with_thermometer_flat.svg` },
        { value:'fire_engine_flat.svg', label:'Fire Engine', image:`${EmojisDir}/fire_engine_flat.svg` },
        { value:'grimacing_face_flat.svg', label:'Grimacing', image:`${EmojisDir}/grimacing_face_flat.svg` },
        { value:'partying_face_flat.svg', label:'Partying', image:`${EmojisDir}/partying_face_flat.svg` },
        { value:'party_popper_flat.svg', label:'Popper', image:`${EmojisDir}/party_popper_flat.svg` },
        { value:'pleading-face.svg', label:'Pleading', image:`${EmojisDir}/pleading-face.svg` },
        { value:'pleading_face_flat.svg', label:'Pleading 2', image:`${EmojisDir}/pleading_face_flat.svg` },
        { value:'skull-and-crossbones.svg', label:'Skull', image:`${EmojisDir}/skull-and-crossbones.svg` },
        { value:'skull_and_crossbones_flat.svg', label:'Skull 2', image:`${EmojisDir}/skull_and_crossbones_flat.svg` },
        { value:'smiling_face_with_smiling_eyes_flat.svg', label:'Smiling', image:`${EmojisDir}/smiling_face_with_smiling_eyes_flat.svg` },
        { value:'smiling_face_with_sunglasses_flat.svg', label:'Smiling Glasses', image:`${EmojisDir}/smiling_face_with_sunglasses_flat.svg` },
        { value:'wailing-face.svg', label:'Wailing', image:`${EmojisDir}/wailing-face.svg` },
        { value:'weary_face_flat.svg', label:'Weary', image:`${EmojisDir}/weary_face_flat.svg` },
  ];

  const handleChange = (selectedOption) => {
    setSelectedEmoji(selectedOption);
  };

  return (
    <div>   
      <Select
        value={selectedEmoji}
        onChange={handleChange}
        options={emojis}
        components={{ Option }} // Use the custom Option component
        formatOptionLabel={emoji => (
            <div className="emoji-option" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={emoji.image} alt={emoji.label} style={{ marginRight: '8px', width: '84px', height: '84px' }}/>
              <span>{emoji.label}</span>
            </div>
          )}
      />
      {/* {selectedEmoji && (
        <div>
          <img src={selectedEmoji.image} alt={selectedEmoji.label} style={{ width: '100px', height: '100px' }} />
        </div>
      )} */}
    </div>
  );
};

export default EmojiSelect;