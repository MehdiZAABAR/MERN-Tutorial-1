import React, { useContext, useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AppDataSharingContext } from '../App'
import ContextDataManager from '../components/utils/ContextDataManager';
import ComputeStatsSeedsInTrays from '../hooks/ComputeStatsSeedsInTrays';
ChartJS.register(ArcElement, Tooltip, Legend);


const GenerateColors = (numColors) =>  {
    const baseHue = 0; // Starting hue value (0-360)
    const saturation = 80; // Saturation value (0-100)
    const lightness = 60; // Lightness value (0-100)
    const borderDarkness = 20; // Adjust the darkness of border colors

    const backgroundColors = [];
    const borderColors = [];

    for (let i = 0; i < numColors; i++) {
        const hue = (baseHue + (i * (360 / numColors))) % 360;
        const backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const borderColor = `hsl(${hue}, ${saturation}%, ${lightness - borderDarkness}%)`;
        
        backgroundColors.push(backgroundColor);
        borderColors.push(borderColor);
    }

    return { backgroundColors, borderColors };
};
const Stats = () => {   
    const { appTrays, appSeeds } = useContext(AppDataSharingContext);
    const [selectedTray, setSelectedTray] = useState({ _id: '', easyName: 'AllTrays' });
    const [chartData, setChartData] = useState(null);
    const handleSelectTray = (event) => {
        const selectedTrayId = event.target.value;
        if (selectedTrayId === "All Trays") {
            setSelectedTray({ _id: '', easyName: 'AllTrays' }); // Set selected tray to an object with easyName 'AllTrays'
        } else {
            // Find the selected tray object from appTrays based on its _id
            const selectedTray = appTrays.find((tray) => tray._id === selectedTrayId);
            setSelectedTray(selectedTray); // Update selected tray state
        }
    };

    useEffect(() => {
        (async () => {
            const trayStats = await ComputeStatsSeedsInTrays(appTrays?.find(tray => tray._id === selectedTray._id), appSeeds);
            // console.log(`tray ${selectedTray.easyName} stats`, trayStats);
            const {backgroundColors, borderColors} = GenerateColors(trayStats.traySeeds?.length);

            setChartData({
                labels: trayStats.traySeeds?.map(seed => seed.easyName),
                datasets: [{
                    label: 'Seeds Usage',
                    data: trayStats.traySeeds?.map(seed => seed.count),
                    // backgroundColor: [
                    //     'rgba(255, 99, 132, 0.2)',
                    //     'rgba(54, 162, 235, 0.2)',
                    //     'rgba(255, 206, 86, 0.2)',
                    //     'rgba(75, 192, 192, 0.2)',
                    //     'rgba(153, 102, 255, 0.2)',
                    //     'rgba(255, 159, 64, 0.2)',
                    //     // Add more colors as needed
                    // ],
                    backgroundColor: backgroundColors,
                    // borderColor: [
                    //     'rgba(255, 99, 132, 1)',
                    //     'rgba(54, 162, 235, 1)',
                    //     'rgba(255, 206, 86, 1)',
                    //     'rgba(75, 192, 192, 1)',
                    //     'rgba(153, 102, 255, 1)',
                    //     'rgba(255, 159, 64, 1)',
                    //     // Add more colors as needed
                    // ],
                    borderColor: borderColors,
                    borderWidth: 1,
                }],
            });
        })();

    }, [selectedTray, appTrays, appSeeds]);

    // Data for seeds usage overall
    const dataOverall = {
        labels: ['Total Seeds Used'],
        datasets: [
            {
                label: 'Seeds Usage Overall',
                data: [895],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'x', // Use x-axis as category axis
        scales: {
            x: {
                grid: {
                    display: false, // Hide x-axis grid lines
                },
            },
        },
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <BackButton />
                <ContextDataManager />
                <div className="w-1/3 flex justify-end">
                    <label htmlFor="traySelect" className="mr-2">Select Tray:</label>
                    <select
                        id="traySelect"
                        className="border border-gray-300 rounded-md px-2 py-1"
                        onChange={handleSelectTray}
                        value={selectedTray ? selectedTray._id : "All Trays"}
                    >
                        <option value="All Trays">All Trays</option>
                        {appTrays &&
                            appTrays.map((tray) => (
                                <option key={tray._id} value={tray._id}>
                                    {tray.easyName}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="flex justify-start mt-4">
                <div className="w-1/3">
                    <h2 className="text-center">Seeds Usage for {selectedTray ? selectedTray.easyName : 'All Trays'}</h2>
                    <div className="mt-4">
                    {chartData && (
                            <Doughnut
                                data={chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'right',
                                            align: 'start', // Align legend items vertically
                                        },
                                        title: {
                                            display: true,
                                            text: `Seeds Usage for ${selectedTray ? selectedTray.easyName : 'All Trays'}`,
                                            position: 'top',
                                            align: 'center',
                                            fullWidth: true,
                                            font: {
                                                size: 16,
                                                weight: 'bold'
                                            }
                                        }
                                    },
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Stats;
