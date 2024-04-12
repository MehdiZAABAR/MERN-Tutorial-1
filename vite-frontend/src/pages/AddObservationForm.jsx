// import React, { useContext, useState, useEffect } from 'react';
// import BackendURL from '../components/BackendURL';
// import { AppDataSharingContext } from '../App'
// import ContextDataManager from '../components/utils/ContextDataManager';
// import SelectMood from '../tools/SelectMood';
// import { PostToDataBase, PutToDataBase } from "../utils.jsx"
// import { KeywordSelector } from '../components/utils/KeywordSelector.jsx';

// const AddObservationForm = ({ slots, selectedSlots, seed, trayId, GUId, onClose }) => {
//     const { appTrays, appSeeds, appMoods, appGrowingUnits, appKeywords } = useContext(AppDataSharingContext);
//     const [observationData, setObservationData] = useState({
//         date: new Date().toISOString().substr(0, 10), // Prefill date with today's date
//         trays: [trayId],
//         slots: selectedSlots,
//         growingUnits: [],
//         mood: '',
//         text: '',
//         keywords: [], // Modified to store only keyword text
//     });
//     const [mood, setMood] = useState('');
//     const [trays, setTrays] = useState([]);
//     const [growingUnits, setGrowingUnits] = useState([]);
//     const [moods, setMoods] = useState([]);
//     const [keywords, setKeywords] = useState([]);
//     const [changesMade, setChangesMade] = useState(false);
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         setTrays(appTrays);
//         setGrowingUnits(appGrowingUnits);
//         setMoods(appMoods);
//         setKeywords(appKeywords);
//     }, [appTrays, appGrowingUnits, appMoods, appKeywords]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setObservationData({ ...observationData, [name]: value });
//         setChangesMade(true);

//         // Remove error message and styling when the user corrects their mistake
//         setErrors({ ...errors, [name]: '' });
//     };

//     const handleMoodChange = (selectedMood) => {
//         setMood(selectedMood);
//         const moodText = selectedMood.text; // Extract mood text from selectedMood object
//         setObservationData({ ...observationData, mood: moodText }); // Store mood text in observation data
//         setChangesMade(true);
//         setErrors({ ...errors, mood: '' });
//     };

//     const handleKeywordSelect = (selectedKeywords) => {
//         setObservationData({ ...observationData, keywords: selectedKeywords }); // Store only keyword text
//         setChangesMade(true);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Validate compulsory fields
//         const errors = {};
//         if (!observationData.mood) {
//             errors.mood = 'Mood is required';
//         }
//         if (observationData.keywords.length === 0 && !observationData.text) {
//             errors.text = 'At least one keyword or observation text is required';
//         }

//         // Set errors state
//         setErrors(errors);

//         // Submit observationData to the server if no errors
//         if (Object.keys(errors).length === 0) {
//             PostToDataBase(`${BackendURL}/observations`, observationData);
//             onClose();
//         }
//     };

//     return (
//         <div>
//             <ContextDataManager />
//             <h2>Add Observation</h2>
//             <form onSubmit={handleSubmit} className="flex flex-col text-left">
//                 <div className="mb-4">
//                     <label htmlFor="date"><b>Date:</b></label>
//                     <input type="date" id="date" name="date" value={observationData.date} onChange={handleChange} />
//                 </div>
//                 <div className="mb-4">
//                     <label>
//                         <b>Mood:</b>
//                         <SelectMood selectedMood={mood} setSelectedMood={handleMoodChange} />
//                         {errors.mood && <span className="text-red-500">*</span>}
//                     </label>
//                 </div>
//                 <div>
//                     <KeywordSelector keywords={appKeywords} onKeywordSelect={handleKeywordSelect} />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="text"><b>Observation Text:</b>{errors.text && <span className="text-red-500">*</span>}</label>
//                     <textarea
//                         id="text"
//                         name="text"
//                         value={observationData.text}
//                         onChange={handleChange}
//                         rows="4"
//                         className={`border ${errors.text ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full`}
//                     ></textarea>
//                     {errors.text && <span className="text-red-500">{errors.text}</span>}
//                 </div>
//                 <button
//                     type="submit"
//                     className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto ${(!changesMade) ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     disabled={!changesMade} // Disable button if no changes made or mood/text is empty
//                 >
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddObservationForm;
import React, { useContext, useState, useEffect } from 'react';
import BackendURL from '../components/BackendURL';
import { AppDataSharingContext } from '../App'
import ContextDataManager from '../components/utils/ContextDataManager';
import SelectMood from '../tools/SelectMood';
import { PostToDataBase, PutToDataBase } from "../utils.jsx"
import { KeywordSelector } from '../components/utils/KeywordSelector.jsx';
import { FaQuestionCircle } from 'react-icons/fa';

const AddObservationForm = ({ slots, selectedSlots, seed, trayId, GUId, onClose }) => {
    const { appTrays, appSeeds, appMoods, appGrowingUnits, appKeywords } = useContext(AppDataSharingContext);
    const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
    const [mood, setMood] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [text, setText] = useState('');
    const [changesMade, setChangesMade] = useState(false);
    const [errors, setErrors] = useState({});
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        // Fetch app data from context
        setDate(new Date().toISOString().substr(0, 10));
        setMood('');
        setSelectedKeywords([]);
        setText('');
        setChangesMade(false);
        setErrors({});
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'date':
                setDate(value);
                break;
            case 'text':
                setText(value);
                break;
            default:
                break;
        }
        setChangesMade(true);
        setErrors({ ...errors, [name]: '' });
    };

    const handleMoodChange = (selectedMood) => {
        setMood(selectedMood);
        setChangesMade(true);
        setErrors({ ...errors, mood: '' });
    };

    const handleKeywordSelect = (selectedKeywords) => {
        setSelectedKeywords(selectedKeywords);
        setChangesMade(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the form data
        const observationData = {
            date: date, // Prefill date with today's date
            trays: [trayId],
            slots: selectedSlots,
            growingUnits: [],
            mood: mood.text,
            text: text,
            keywords: selectedKeywords,
        }
        // Validate compulsory fields
        const errors = {};
        if (!observationData.mood) {
            errors.mood = 'Mood is required';
        }
        if (observationData.keywords.length === 0 && !observationData.text) {
            errors.text = 'At least one keyword or observation text is required';
        }

        // Set errors state
        setErrors(errors);

        // Submit observationData to the server if no errors
        if (Object.keys(errors).length === 0) {
            PostToDataBase(`${BackendURL}/observations`, observationData);
            onClose();
        }
    };

    return (
        <div>
            <ContextDataManager />
            <h2>Add Observation</h2>
            <form onSubmit={handleSubmit} className="flex flex-col text-left">
                <div className="mb-4">
                    <label htmlFor="date"><b>Date:</b></label>
                    <input type="date" id="date" name="date" value={date} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="slots"><b>Slots:</b></label>
                    <div>
                        {selectedSlots.length > 0 ? (
                            selectedSlots.map(slotId => {
                                const slot = slots.find(slot => slot._id === slotId);
                                return (
                                    <span key={slotId}>{slot ? slot.name : 'Slot not found'}</span>
                                );
                            })
                        ) : (
                            <span>No slots selected</span>
                        )}
                    </div>
                </div>
                {
                    trayId ? (
                        <div className="mb-4">
                            <label htmlFor="tray"><b>Tray: </b>{appTrays.find(tray => tray._id === trayId).easyName}</label>
                        </div>
                    ) : !GUId && (
                        <div className="mb-4">
                            <label htmlFor="tray"><b>Tray:</b></label>
                            <select id="tray" name="tray" onChange={handleChange} value={appTrays.find(tray => tray._id === trayId)}>
                                <option value="">Select Tray</option>
                                {appTrays.map(tray => (
                                    <option key={tray._id} value={tray._id}>{tray.easyName}</option>
                                ))}
                            </select>
                        </div>
                    )
                }
                {
                    !trayId && GUId && (
                        <div className="mb-4">
                            <label htmlFor="growingUnit"><b>Growing Unit:</b></label>
                            <select id="growingUnit" name="growingUnit" onChange={handleChange}>
                                <option value="">Select Growing Unit</option>
                                {growingUnits.map(unit => (
                                    <option key={unit._id} value={unit._id}>{unit.name}</option>
                                ))}
                            </select>
                        </div>
                    )
                }
                <div className="mb-4">
                    <label>
                        <b>Mood:</b>
                        <SelectMood selectedMood={mood} setSelectedMood={handleMoodChange} />
                        {errors.mood && <span className="text-red-500">*</span>}
                    </label>
                </div>
                <div>
                <label>
                        <b>Select keywords:</b>
                        <FaQuestionCircle className={`help-icon ${showHelp ? 'active' : ''}`} onClick={(e) => {e.stopPropagation(); setShowHelp(!showHelp)}} />
                    <KeywordSelector keywords={appKeywords} onKeywordSelect={handleKeywordSelect} showHelp={showHelp}/>
                    </label>
                </div>
                <div className="mb-4">
                    <label htmlFor="text"><b>Observation Text:</b>{errors.text && <span className="text-red-500">*</span>}</label>
                    <textarea
                        id="text"
                        name="text"
                        value={text}
                        onChange={handleChange}
                        rows="4"
                        className={`border ${errors.text ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full`}
                    ></textarea>
                    {errors.text && <span className="text-red-500">{errors.text}</span>}
                </div>
                <button
                    type="submit"
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto ${(!changesMade) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!changesMade} // Disable button if no changes made or mood/text is empty
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddObservationForm;
