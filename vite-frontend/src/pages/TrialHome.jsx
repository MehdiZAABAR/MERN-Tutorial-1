import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useDataFetching from '../hooks/useDataFetching';
import DebugListComponent from '../components/utils/DebugListComponent';
import Spinner from '../components/Spinner';

const Home = () => {
    const [showModal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    // Fetch data for each collection separately
    const moodsData = useDataFetching('Moods');
    const observationsData = useDataFetching('Observations');
    const seedsData = useDataFetching('Seeds');

    return (
        <div>
            <div className='p-4'>
                <Link to={`/Moods/create`}>
                    <span>Create Mood</span>
                </Link>
                <Link to={`/Keywords/create`}>
                    <span>Create Keyword</span>
                </Link>
            </div>
            <div className='p-4'>
            {moodsData.loading ? <Spinner/> : <DebugListComponent id="Moods" element={moodsData} />} 
            {observationsData.loading ? <Spinner/> : <DebugListComponent id="Observations" element={observationsData} />} 
            {moodsData.loading ? <Spinner/> : <DebugListComponent id="Seeds" element={seedsData} />} 
            </div>
            {showModal && (
                <ModalForm content={modalContent} onClose={() => { setModal(false) }} />
            )}
        </div>
    );
};

export default Home;