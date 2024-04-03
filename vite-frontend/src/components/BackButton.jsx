// import {Link} from "react-router-dom"
// import { BsArrowLeft } from 'react-icons/bs'

// const BackButton = ({destination = '/'}) => {
//   return (
//     <div className= 'flex' > 
//         <Link to={destination} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
//             <BsArrowLeft className='text-2lx '/>
//         </Link>
//     </div>
//   )
// }

// export default BackButton
import { Link } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
    return (
        <div className='flex'>
            {destination && destination !== '/' ? (
                <Link to={destination} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
                    <BsArrowLeft className='text-2xl' />
                </Link>
            ) : (
                <button onClick={() => window.history.back()} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
                    <BsArrowLeft className='text-2xl' />
                </button>
            )}
        </div>
    );
};

export default BackButton;
