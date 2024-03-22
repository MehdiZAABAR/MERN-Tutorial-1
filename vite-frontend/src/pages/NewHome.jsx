import React from 'react';
import { Link } from 'react-router-dom';
import ListComponent from '../components/home/ListComponent';
import useDataFetching from '../hooks/useDataFetching';
import { AiFillCamera, AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlinePreview, MdOutlineDelete } from 'react-icons/md';
import { TfiCommentsSmiley } from 'react-icons/tfi'
import CreateTraysSlots from '../components/home/CreateTraysSlots'
import { PiPianoKeysFill } from 'react-icons/pi'
import GetEditAnyRecord from './GetEditAnyRecord';
import { useState } from 'react';
import ModalForm from './ModalForm';
import { enqueueSnackbar } from 'notistack';
import * as Schemas from '../components/home/SchemasForFrontEnd'
import { onEditClick } from '../components/home/onEditClickComponent';
import DebugListComponent from '../components/utils/DebugListComponent';
import Spinner from '../components/Spinner';

const Home = () => {
    const [showModal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const dataSources = [
        {
            title: 'Moods',
            schema: Schemas.MoodSchema,
            data: useDataFetching('Moods'),
            onEditClick: (item, dataSource) => onEditClick(item, dataSource, setModalContent, setModal),
            renderHeader: (handleSort) => ((
                <>
                    <th className="border border-slate-600 rounded-md text-center" onClick={() => handleSort('text')}>Text</th>
                    <th className="border border-slate-600 rounded-md text-center" onClick={() => handleSort('value')}>Value</th>
                    <th className="border border-slate-600 rounded-md text-center" onClick={() => handleSort('icon')}>Icon</th>
                </>
            )),
            renderItem: (item, dataSource) => (
                <>
                    <td className="border border-slate-600 rounded-md"  >{item.text}</td>
                    <td className="border border-slate-600 rounded-md text-center">{item.value}</td>
                    <td className="border border-slate-600 rounded-md "><img src={item.icon} alt={item.text} style={{ marginRight: '8px', width: '84px', height: '84px' }} /></td>
                </>
            )
        },
        {
            title: 'Observations',
            schema: Schemas.ObservationSchema,
            data: useDataFetching('Observations'),
            onEditClick: (item, dataSource) => onEditClick(item, dataSource, setModalContent, setModal),
            renderHeader: (handleSort) => ((
                <>
                    <th className="border border-slate-600 rounded-md text-center" onClick={() => handleSort('text')}>Text</th>
                    <th className="border border-slate-600 rounded-md text-center" onClick={() => handleSort('date')}>Date</th>
                    <th className="border border-slate-600 rounded-md text-center" onClick={() => handleSort('Tray')}>Tray</th>
                </>
            )),
            renderItem: (item, dataSource) => (
                <>
                    <td className="border border-slate-600 rounded-md"  >{item.text}</td>
                    <td className="border border-slate-600 rounded-md text-center">{item.date}</td>
                    <td className="border border-slate-600 rounded-md ">{item.trays}</td>
                </>
            )
        },
        {
            title: 'Seeds',
            schema: Schemas.SeedSchema,
            data: useDataFetching('Seeds'),
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
        },
        {
            title: 'Trays',
            schema: Schemas.TraysSchema,
            data: useDataFetching('Trays'),
            onEditClick: (item, dataSource) => onEditClick(item, dataSource, setModalContent, setModal),
            renderHeader: (handleSort) => (
                <>
                    <th className='border border-slate-600 rounded-md'>ID</th>
                    <th className='border border-slate-600 rounded-md'>Used</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>Name</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>Slot Size</th>
                    <th className='border border-slate-600 rounded-md '>Nb of Row</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>Nb of Cols</th>
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
            title: 'Slots',
            schema: Schemas.SlotSchema,
            data: useDataFetching('Slots'),
            onEditClick: (item, dataSource) => onEditClick(item, dataSource, setModalContent, setModal),
            renderHeader: (handleSort) => (
                <>
                    <th className='border border-slate-600 rounded-md'>Name</th>
                    <th className='border border-slate-600 rounded-md'>Seed</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>Location</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>Slot Size</th>
                    <th className='border border-slate-600 rounded-md '>Operations</th>
                </>
            ),
            renderItem: (slot) => (
                <>
                    <td className='border border-slate-700 rounded-md text-center'> {slot.name}</td>
                    <td className='border border-slate-700 rounded-md text-center'> {slot.used ? (slot.seed) : ("Free")}</td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{slot.used ? ((slot.tray != '') ? (slot.tray) : (slot.growingSystem)) : ("Free")}</td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{slot.sz}</td>
                    <td className='border border-slate-700 rounded-md text-center '>
                        <div className='flex justify-center gap-x-4 '>
                            <Link to={`/slots/details/${slot._id}`}>
                                <BsInfoCircle className='text-2xl text-green-800' />
                            </Link>
                            <Link to={`/slots/edit/${slot._id}`}>
                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                            </Link>
                            <Link to={`/slots/delete/${slot._id}`}>
                                <MdOutlineDelete className='text-2xl text-red-600' />
                            </Link>
                            <Link to={`/slots/picture/${slot._id}`}>
                                <AiFillCamera className='text-2xl text-red-600' />
                            </Link>
                        </div>
                    </td>
                </>
            )
        }
    ];

    return (
        <div>
            <div className='p-4'>
                <Link to={`/Moods/create`}>
                    <TfiCommentsSmiley className='text-sky-600 text-4xl' /> <span>Create Mood</span>
                </Link>
                <Link to={`/Keywords/create`}>
                    <PiPianoKeysFill className='text-blue-600 text-4xl' /><span>Create Keyword</span>
                </Link>
            </div>
            <div className='p-4'>
                {dataSources.map(element => (
                    <React.Fragment key={element.title}>
                        <div>
                            {element.data.loading ? <Spinner /> : (
                                <ListComponent
                                    onEditClick={(item) => () => element.onEditClick(item, element)}
                                    key={element.title}
                                    title={element.title}
                                    data={element.data.data}
                                    loading={element.data.loading}
                                    renderHeader={element.renderHeader}
                                    renderItem={(item) => element.renderItem(item, element)}
                                />
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
            {showModal && (<ModalForm content={modalContent} onClose={() => { setModal(false) }} />)} 
        </div>
    );
};
export default Home;