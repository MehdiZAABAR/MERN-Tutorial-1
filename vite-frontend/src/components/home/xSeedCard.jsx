import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from "react-icons/pi"
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit, AiFillCamera } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState} from 'react';
import SeedModal from './SeedModal';

const SeedCard = ({seed}) => {
    const [showModal, setShowModal] = useState( false);

  return (
    <div key={seed._id} className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl '>
    <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg '>{seed.easyName}</h2>
    <h4 className='my-2 text-gray-500'>{seed.propId}</h4>
    <div className='flex justify-start items-center gap-x-2 '>
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1 '>{seed.variety}</h2>
    </div>
    <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl ' />
        <h2 className='my-1 '>{seed.quantity}</h2>
    </div>
    <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow className='text-3xl text-blue-800 hover:text-black cursor-pointer' onClick={()=>setShowModal(true)}/>
        <Link to={`/seeds/details/${seed._id}`}><BsInfoCircle className='text-2xl text-green-800 hover:text-black'/></Link>
        <Link to={`/seeds/edit/${seed._id}`}>
                <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
            </Link>
            <Link to={`/seeds/delete/${seed._id}`}>
                <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
            </Link>
            <Link to={`/seeds/picture/${seed._id}`}>
                <AiFillCamera className='text-2xl text-red-600 hover:text-black' />
            </Link>
    </div>
    {
        showModal && (
            <SeedModal seed={seed} onClose={ () => setShowModal(false)}/>
        )
    }
</div>
  )
}

export default SeedCard