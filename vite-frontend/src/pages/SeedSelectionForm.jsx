import React, { useState, useEffect } from 'react';
import RadioButton from '../components/utils/RadioButton';

const SeedSelectionForm = ({ seeds, onSelectSeed, onClose }) => {
    const [selectedSeed, setSelectedSeed] = useState(null);
    const [sortedSeeds, setSortedSeeds] = useState([]);

    useEffect(() => {
        // Sort seeds by propId in ascending order
        const sorted = [...seeds].sort((a, b) => (a.propId > b.propId) ? 1 : -1);
        setSortedSeeds(sorted);
    }, [seeds]);

    const handleRadioChange = (seed) => {
        // Update selected seed in state when a radio button is clicked
        setSelectedSeed(seed);
    };

    const handleValidate = () => {
        // Pass the selected seed to the onSelectSeed callback when the Validate button is clicked
        if (selectedSeed) {
            onSelectSeed(selectedSeed);
            onClose();
        }
    };
    return (
        <div >
            <h3 className='text-lg font-bold mb-4'>Select Seed</h3>
            <div className='overflow-y-auto max-h-[400px]'>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Variety</th>
                            <th className="border border-gray-300 px-4 py-2">PropId</th>
                            <th className="border border-gray-300 px-4 py-2">Germination Start</th>
                            <th className="border border-gray-300 px-4 py-2">Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedSeeds.map((seed, index) => (
                            <tr key={seed._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="border border-gray-300 px-4 py-2">{seed.easyName}</td>
                                <td className="border border-gray-300 px-4 py-2">{seed.variety}</td>
                                <td className="border border-gray-300 px-4 py-2">{seed.propId}</td>
                                <td className="border border-gray-300 px-4 py-2">{seed.culturePeriods.germination.start}</td>
                                <td className="border border-gray-300 px-4 py-2 flex items-center justify-center">
                                <RadioButton
                                highlightColor='blue-500'
                                name="seed"
                                item={seed}
                                checked={selectedSeed?._id === seed._id}
                                onChange={() => setSelectedSeed(seed)}
                                />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-end">
                <button onClick={handleValidate} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Validate</button>
            </div>
        </div>
    );
};

export default SeedSelectionForm;