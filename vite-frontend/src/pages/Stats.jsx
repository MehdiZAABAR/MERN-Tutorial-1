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

    // Generate colors
    for (let i = 0; i < numColors; i++) {
        const hue = (baseHue + (i * (360 / numColors))) % 360;
        const backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const borderColor = `hsl(${hue}, ${saturation}%, ${lightness - borderDarkness}%)`;
        
        backgroundColors.push(backgroundColor);
        borderColors.push(borderColor);
    }

    // Shuffle indices
    const indices = [...Array(numColors).keys()]; // Create an array [0, 1, 2, ..., numColors - 1]
    for (let i = numColors - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Rearrange colors based on shuffled indices
    const shuffledBackgroundColors = [];
    const shuffledBorderColors = [];
    for (let i = 0; i < numColors; i++) {
        shuffledBackgroundColors.push(backgroundColors[indices[i]]);
        shuffledBorderColors.push(borderColors[indices[i]]);
    }

    return { backgroundColors: shuffledBackgroundColors, borderColors: shuffledBorderColors };
};
const Stats = () => {   
    const { appTrays, appSeeds } = useContext(AppDataSharingContext);
    const [selectedTray, setSelectedTray] = useState({ _id: '0', easyName: 'AllTrays' });
    const [chartData, setChartData] = useState(null);
    const handleSelectTray = (event) => {
        const selectedTrayId = event.target.value;
        if (selectedTrayId === "All Trays") {
            setSelectedTray({ _id: '0', easyName: 'AllTrays' }); // Set selected tray to an object with easyName 'AllTrays'
        } else {
            // Find the selected tray object from appTrays based on its _id
            const selectedTray = appTrays.find((tray) => tray._id === selectedTrayId);
            setSelectedTray(selectedTray); // Update selected tray state
        }
    };

    useEffect(() => {
        (async () => {
            let trayStats = {};
            if( selectedTray._id === '0') // AllTrays
            {
                trayStats = await ComputeStatsSeedsInTrays({_id:'0', nbRows:1, nbCols:1}, appSeeds);
            }
            else
                trayStats = await ComputeStatsSeedsInTrays(appTrays?.find(tray => tray._id === selectedTray._id), appSeeds);
            // console.log(`tray ${selectedTray.easyName} stats`, trayStats);
            const {backgroundColors, borderColors} = GenerateColors(trayStats.traySeeds?.length);

            setChartData({
                labels: trayStats.traySeeds?.map(seed => seed.easyName),
                datasets: [{
                    label: 'Count',
                    data: trayStats.traySeeds?.map(seed => seed.count),
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                }],
            });
        })();

    }, [selectedTray, appTrays, appSeeds]);

    // const dataOverall = {
    //     labels: ['Total Seeds Used'],
    //     datasets: [
    //         {
    //             label: 'Seeds Usage Overall',
    //             data: [895],
    //             backgroundColor: 'rgba(255, 99, 132, 0.6)',
    //             borderColor: 'rgba(255, 99, 132, 1)',
    //             borderWidth: 1,
    //         },
    //     ],
    // };

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
                <div className="w-1/2">
                    <h2 className="text-center">Seeds Usage for {selectedTray ? selectedTray.easyName : 'All Trays'}</h2>
                    <div className="mt-4">
                    {chartData && (
                            <Doughnut
                                data={chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    plugins: {
                                        // legend: {
                                        //     display: true,
                                        //     position: 'right',
                                        //     align: 'start', // Align legend items vertically
                                        // },
                                        // legend: {
                                        //     display: true,
                                        //     position: 'right',
                                        //     align: 'start',
                                        //     labels: {
                                        //         padding: 20, // Add padding between legend items
                                        //         boxHeight: 20, // Adjust the height of each legend item box
                                        //         usePointStyle: true, // Use point style (shape) for legend items
                                        //         generateLabels: function(chart) {
                                        //             const data = chart.data;
                                        //             if (data.labels.length && data.datasets.length) {
                                        //                 return data.labels.map((label, i) => {
                                        //                     const meta = chart.getDatasetMeta(0);
                                        //                     const style = meta.controller.getStyle(i);
                                        //                     return {
                                        //                         text: label,
                                        //                         fillStyle: style.backgroundColor,
                                        //                         strokeStyle: style.borderColor,
                                        //                         lineWidth: style.borderWidth,
                                        //                         pointStyle: style.pointStyle,
                                        //                         hidden: isNaN(data.datasets[0].data[i]), // Hide legend item if the corresponding data is NaN
                                        //                     };
                                        //                 });
                                        //             }
                                        //             return [];
                                        //         },
                                        //     },
                                        // },
                                        legend: {
                                            display: true,
                                            position: 'right',
                                            align: 'start',
                                            labels: {
                                                padding: 5, // Add padding between legend items
                                                boxHeight: 20, // Adjust the height of each legend item box
                                                usePointStyle: true, // Use point style (shape) for legend items
                                                maxWidth: 200, // Adjust the maximum width of the legend
                                                generateLabels: function(chart) {
                                                    const data = chart.data;
                                                    if (data.labels.length && data.datasets.length) {
                                                        return data.labels.map((label, i) => {
                                                            const meta = chart.getDatasetMeta(0);
                                                            const style = meta.controller.getStyle(i);
                                                            return {
                                                                text: label,
                                                                fillStyle: style.backgroundColor,
                                                                strokeStyle: style.borderColor,
                                                                lineWidth: style.borderWidth,
                                                                pointStyle: style.pointStyle,
                                                                hidden: isNaN(data.datasets[0].data[i]), // Hide legend item if the corresponding data is NaN
                                                            };
                                                        });
                                                    }
                                                    return [];
                                                },
                                            },
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
