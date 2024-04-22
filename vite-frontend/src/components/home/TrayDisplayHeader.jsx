import { useContext, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AppDataSharingContext } from '../../App'
import {ContextDataManager} from '../utils/ContextDataManager'
import ComputeStatsSeedsInTrays from '../../tools/ComputeStatsSeedsInTrays';
import { GenerateColors } from '../../pages/Stats';
ChartJS.register(ArcElement, Tooltip, Legend);


const TrayDisplayHeader = ({ tray, containerType }) => {
  const { appTrays, appSeeds, appGrowingUnits } = useContext(AppDataSharingContext);
  const [chartSize, setCharSize] = useState('w-1/4');
  const [selectedTray, setSelectedTray] = useState({ _id: '0', easyName: 'AllTrays' });
  let trayStats = {};
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    (async () => {

        if (tray._id === '0') // AllTrays
        {
            trayStats = await ComputeStatsSeedsInTrays(containerType, { _id: '0', nbRows: 1, nbCols: 1 }, appSeeds);
        }
        else
            trayStats = await ComputeStatsSeedsInTrays(containerType, tray, appSeeds);
        // console.log(`tray ${selectedTray.easyName} stats`, trayStats);
        const { backgroundColors, borderColors } = GenerateColors(trayStats.traySeeds?.length);

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
        //let chSz = Math.min(1 + Math.ceil((trayStats.traySeeds?.length || 0) / 8), 3);
        let chSz = Math.min(3 + Math.ceil((trayStats.traySeeds?.length || 0) / 14), 12);
        setCharSize(`w-${chSz}/12`);
    })();

}, [tray, appTrays, appSeeds]);

  return (
    <div>
      <ContextDataManager />
      <h2 style={{ textAlign: 'center' }}>Tray Details</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
        <div>
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
        <div className={`mt-4 ${chartSize}`}>
          {chartData && (
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: true,
                    position: 'right',
                    align: 'start',
                    labels: {
                      padding: 10, // Add padding between legend items
                      boxHeight: 20, // Adjust the height of each legend item box
                      usePointStyle: true, // Use point style (shape) for legend items
                      maxWidth: 200, // Adjust the maximum width of the legend
                      generateLabels: function (chart) {
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
  );
};

export default TrayDisplayHeader;
