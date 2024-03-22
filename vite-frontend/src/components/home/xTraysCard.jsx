import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from "react-icons/pi"
import { PiUserCircle } from 'react-icons/pi';
import { AiOutlineEdit, AiFillCamera } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import TrayCard from './TrayCard';

const TraysCard = ({ trays }) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {trays.map((item) => (
               <TrayCard key = {item._id} tray={item} />
            )
            )}
        </div>
    )
};

export default TraysCard