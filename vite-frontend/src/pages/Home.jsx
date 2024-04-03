import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useDataFetching from '../hooks/useDataFetching';
import { AiFillCamera, AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlinePreview, MdOutlineDelete } from 'react-icons/md';
import CreateTraysSlots from '../components/home/CreateTraysSlots'
import { useState } from 'react';
import * as Schemas from '../../../Backend/models/all_collections_models'
import { onEditClick } from '../components/home/onEditClickComponent';
import ShowTables from './ShowTables';
import HomeContent from './HomeContent';
import { SiAzuredataexplorer } from 'react-icons/si'
import { ImStatsDots } from "react-icons/im";
import { AppDataSharingContext } from '../App';

const Home = () => {
    const [showModal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const { appTrays, setAppTrays, appSeeds, setAppSeeds } = useContext(AppDataSharingContext);

    const dataSources = [
        {
            title: 'Trays',
            schema: Schemas.TraysSchema,
            data: useDataFetching('Trays', setAppTrays),
            onEditClick: (item, dataSource) => onEditClick(item, dataSource, setModalContent, setModal),
            renderHeader: (handleSort) => (
                <>
                    <th className='border border-slate-600 rounded-md' onClick={() => handleSort('propId')}>ID</th>
                    <th className='border border-slate-600 rounded-md' onClick={() => handleSort('used')}>Used</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>Name</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden' onClick={() => handleSort('slotSize')}>Slot Size</th>
                    <th className='border border-slate-600 rounded-md ' onClick={() => handleSort('nbRows')}>Nb of Row</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden' onClick={() => handleSort('nbCols')}>Nb of Cols</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>Slots</th>
                    <th className='border border-slate-600 rounded-md '>Operations</th>
                </>
            ),
            renderItem: (tray) => (
                < >
                    <td className='border border-slate-700 rounded-md text-center'> {tray.propId}</td>
                    <td className='border border-slate-700 rounded-md text-center'> {tray.used ? ("Used") : ("Free")}</td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{tray.easyName}</td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{tray.slotSize}</td>
                    <td className='border border-slate-700 rounded-md text-center '>{tray.nbRows}</td>
                    <td className='border border-slate-700 rounded-md text-center '>{tray.nbCols}</td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                        {tray.slots.length === tray.nbRows * tray.nbCols ? (
                            <div className='flex justify-center gap-x-4 '>
                                <Link to={`/trays/details/${tray._id}`}>
                                    <MdOutlinePreview className='text-2xl text-green-800' />
                                </Link>
                                <Link to={`/trays/edit/${tray._id}`}>
                                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                                </Link>
                                <Link to={`/trays/delete/${tray._id}`}>
                                    <MdOutlineDelete className='text-2xl text-red-600' />
                                </Link>
                                <Link to={`/trays/picture/${tray._id}`}>
                                    <AiFillCamera className='text-2xl text-red-600' />
                                </Link>
                            </div>) : (<CreateTraysSlots tray={tray} />)
                        }
                    </td>
                    <td className='border border-slate-700 rounded-md text-center '>
                        <div className='flex justify-center gap-x-4 '>
                            <Link to={`/trays/details/${tray._id}`}>
                                <BsInfoCircle className='text-2xl text-green-800' />
                            </Link>
                            <Link to={`/trays/edit/${tray._id}`}>
                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                            </Link>
                            <Link to={`/trays/delete/${tray._id}`}>
                                <MdOutlineDelete className='text-2xl text-red-600' />
                            </Link>
                            <Link to={`/trays/picture/${tray._id}`}>
                                <AiFillCamera className='text-2xl text-red-600' />
                            </Link>
                        </div>
                    </td>
                </>
            )
        },
        {
            title: 'Seeds',
            schema: Schemas.SeedSchema,
            data: useDataFetching('Seeds', setAppSeeds),
            onEditClick: (item, dataSource) => onEditClick(item, dataSource, setModalContent, setModal),
            renderHeader: (handleSort) => (
                <>
                    <th className="border border-slate-600 rounded-md" onClick={() => handleSort('propId')}>ID</th>
                    <th className="border border-slate-600 rounded-md" onClick={() => handleSort('plantType')}>Type</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden" onClick={() => handleSort('easyName')}>Name</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden" onClick={() => handleSort('botanicName')}>Botanic Name</th>
                    <th className="border border-slate-600 rounded-md" onClick={() => handleSort('variety')}>Variety</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden" onClick={() => handleSort('culturePeriods.germination.start')}>Germination Start</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden" onClick={() => handleSort('culturePeriods.germination.end')}>Germination End</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden" onClick={() => handleSort('culturePeriods.transfer.start')}>Transfer Start</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden" onClick={() => handleSort('culturePeriods.transfer.end')}>Transfer End</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden" onClick={() => handleSort('culturePeriods.harvesting.start')}>Harvest Start</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden" onClick={() => handleSort('culturePeriods.harvesting.end')}>Harvest End</th>
                    <th className="border border-slate-600 rounded-md" onClick={() => handleSort('quantity')}>Quantity</th>
                    <th className="border border-slate-600 rounded-md">Operations</th>
                </>),
            renderItem: (seed) => (
                <>
                    <td className="border border-slate-700 rounded-md text-center">{seed.propId}</td>
                    <td className="border border-slate-700 rounded-md text-center">{seed.plantType}</td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">{seed.easyName}</td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">{seed.botanicName}</td>
                    <td className="border border-slate-700 rounded-md text-center">{seed.variety}</td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">{seed.culturePeriods?.germination?.start}</td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">{seed.culturePeriods?.germination?.end}</td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">{seed.culturePeriods?.transfer?.start}</td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">{seed.culturePeriods?.transfer?.end}</td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">{seed.culturePeriods?.harvesting?.start}</td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">{seed.culturePeriods?.harvesting?.end}</td>
                    <td className="border border-slate-700 rounded-md text-center">{seed.quantity}</td>
                    <td className="border border-slate-700 rounded-md text-center">
                        <div className="flex justify-center gap-x-4">
                            <Link to={`/seeds/Details/${seed._id}`}><BsInfoCircle className="text-2xl text-green-800" /></Link>
                            <Link to={`/seeds/edit/${seed._id}`}><AiOutlineEdit className="text-2xl text-yellow-600" /></Link>
                            <Link to={`/seeds/delete/${seed._id}`}><MdOutlineDelete className="text-2xl text-red-600" /></Link>
                            <Link to={`/seeds/picture/${seed._id}`}><AiFillCamera className="text-2xl text-red-600" /></Link>
                        </div>
                    </td>
                </>
            )
        }
    ];

    return (
        <>
            <HomeContent />
            <div className="p-4 mb-8 flex justify-center items-center text-2xl my-4 text-green-800">
                <Link to="/all" className="mx-4">
                    <span title="Show all system tables">
                        <SiAzuredataexplorer className="text-3xl text-green-800" />
                    </span>
                </Link>
                <Link to="/Stats" className="mx-4">
                    <span title="Statistics">
                        <ImStatsDots className="text-3xl text-green-600" />
                    </span>
                </Link>
            </div>
            <ShowTables pageTitle="Manage your system" dataSources={dataSources} showModal={showModal} setModal={setModal} modalContent={modalContent}></ShowTables>

        </>
    );
};
export default Home;
