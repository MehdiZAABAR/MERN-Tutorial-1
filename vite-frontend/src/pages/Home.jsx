import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import { TbLayoutNavbarCollapseFilled, TbLayoutNavbarExpandFilled } from 'react-icons/tb';
import BackendURL from '../components/BackendURL';
import SeedsTable from '../components/home/SeedsTable';
import SeedsCard from '../components/home/SeedsCard';
import TraysTable from '../components/home/TraysTable';
import TraysCard from '../components/home/TraysCard';
import SlotsTable from '../components/home/SlotsTable';
import ListComponent from '../components/home/List';
import useDataFetching from '../hooks/useDataFetching';

const Home = () => {
    const [seeds, setSeeds] = useState([]);
    const [trays, setTrays] = useState([]);
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [displayType, setDisplayType] = useState('table');
    const [seedTableCollapsed, setSeedTableCollapsed] = useState(false);
    const [trayTableCollapsed, setTrayTableCollapsed] = useState(false);
    const [slotTableCollapsed, setSlotTableCollapsed] = useState(false);
    const [nbSlots, setNbSlots] = useState(0);
    const [nbTrays, setNbTrays] = useState(0);
    const [nbSeeds, setNbSeeds] = useState(0);
    const { data: observations, loading: observationsLoading } = useDataFetching('Observations');


    const toggleSeedTable = () => {
        const newState = !seedTableCollapsed;
        setSeedTableCollapsed(newState);
        sessionStorage.setItem('seedTableCollapsed', JSON.stringify(newState));
    };

    const toggleTrayTable = () => {
        const newState = !trayTableCollapsed;
        setTrayTableCollapsed(newState);
        sessionStorage.setItem('trayTableCollapsed', JSON.stringify(newState));
    };

    const toggleSlotTable = () => {
        const newState = !slotTableCollapsed;
        setSlotTableCollapsed(newState);
        sessionStorage.setItem('slotTableCollapsed', JSON.stringify(newState));
    };
    useEffect(() => {
        const seedTableState = sessionStorage.getItem('seedTableCollapsed');
        if (seedTableState) {
            setSeedTableCollapsed(JSON.parse(seedTableState));
        }
    
        const trayTableState = sessionStorage.getItem('trayTableCollapsed');
        if (trayTableState) {
            setTrayTableCollapsed(JSON.parse(trayTableState));
        }
    
        const slotTableState = sessionStorage.getItem('slotTableCollapsed');
        if (slotTableState) {
            setSlotTableCollapsed(JSON.parse(slotTableState));
        }
    }, []);
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${BackendURL}/Seeds`)
            .then((response) => {
                setSeeds(response.data.data);
                setNbSeeds(response.data.count);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        axios
            .get(`${BackendURL}/Trays`)
            .then((response) => {
                setTrays(response.data.data);
                setNbTrays(response.data.count);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        axios
            .get(`${BackendURL}/Slots`)
            .then((response) => {
                setSlots(response.data.data);
                setNbSlots(response.data.count);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setDisplayType('table')}>Table</button>
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setDisplayType('card')}>Card</button>
            </div>
            <div>
                 {/* Render Observations List */}
      <ListComponent
        title='Observations'
        data={observations}
        loading={observationsLoading}
        renderItem={(observation) => (
          <tr>
            <td>{observation._id}</td><td>{observation._id}</td>
          </tr>
        )}
      />
            </div>
            <div>
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl my-8'>Seeds List ({nbSeeds})</h2>
                    <div className="flex items-center">
                        {seedTableCollapsed ? (
                            <TbLayoutNavbarExpandFilled className="text-gray-600 text-4xl cursor-pointer" onClick={toggleSeedTable} />
                        ) : (
                            <TbLayoutNavbarCollapseFilled className="text-gray-600 text-4xl cursor-pointer" onClick={toggleSeedTable} />
                        )}
                        <Link to='/seeds/create'>
                            <MdOutlineAddBox className='text-sky-800 text-4xl' />
                        </Link>
                    </div>
                </div>
                {!seedTableCollapsed && (
                    <>
                        {loading ? (
                            <Spinner />
                        ) : (displayType === 'table' ? (
                            <SeedsTable seeds={seeds} />
                        ) : (
                            <SeedsCard seeds={seeds} />
                        ))}
                    </>
                )}
            </div>
            <div>
                <div className='flex justify-between items-center'>
                <h2 className='text-2xl my-8'>Trays List ({nbTrays})</h2>
                    <div className="flex items-center">
                        {trayTableCollapsed ? (
                            <TbLayoutNavbarExpandFilled className="text-gray-600 text-4xl cursor-pointer" onClick={toggleTrayTable} />
                        ) : (
                            <TbLayoutNavbarCollapseFilled className="text-gray-600 text-4xl cursor-pointer" onClick={toggleTrayTable} />
                        )}
                        <Link to='/trays/create'>
                            <MdOutlineAddBox className='text-sky-800 text-4xl' />
                        </Link>
                    </div>
                </div>
                {!trayTableCollapsed && (
                    <>
                        {loading ? (
                            <Spinner />
                        ) : (displayType === 'table' ? (
                            <TraysTable trays={trays} />
                        ) : (
                            <TraysCard trays={trays} />
                        ))}
                    </>
                )}
            </div>
            <div>
                <div className='flex justify-between items-center'>
                <h2 className='text-2xl my-8'>Slots List ({nbSlots})</h2>
                    <div className="flex items-center">
                        {slotTableCollapsed ? (
                            <TbLayoutNavbarExpandFilled className="text-gray-600 text-4xl cursor-pointer" onClick={toggleSlotTable} />
                        ) : (
                            <TbLayoutNavbarCollapseFilled className="text-gray-600 text-4xl cursor-pointer" onClick={toggleSlotTable} />
                        )}
                        {/* <Link to='/slots/create'>
                            <MdOutlineAddBox className='text-sky-800 text-4xl' />
                        </Link> */}
                    </div>
                </div>
                {!slotTableCollapsed && (
                    <>
                        {loading ? (
                            <Spinner />
                        ) : (displayType === 'table' ? (
                            <SlotsTable slots={slots} />
                        ) : (
                            <TraysCard trays={trays} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;