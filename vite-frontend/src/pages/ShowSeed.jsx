import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import BackendURL from '../components/BackendURL'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowSeed = () => {
    const [seed, setSeed] = useState({});
    const [loading, setLoading] = useState( false);
    const {id} = useParams();

    useEffect( ()=> {
        setLoading(true);
        axios
        .get(`${BackendURL}/seeds/${id}`)
        .then( (response) => {
            setSeed( response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log( error);
            setLoading(false);
        });

    }, [])
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'>Show Seed</h1>
            { loading ? ( <Spinner/>):(
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>Id</span>
                        <span>{seed._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>ID</span>
                        <span>{seed.propId}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>Name</span>
                        <span>{seed.easyName}</span>
                    </div>    
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>Variety</span>
                        <span>{seed.variety}</span>
                    </div>    
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>BotanicName</span>
                        <span>{seed.botanicName}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>Shop</span>
                        <span>{seed.shop}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>Creation</span>
                        <span>{new Date(seed.createdAt).toString()}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 '>Update</span>
                        <span>{new Date(seed.updatedAt).toString()}</span>
                    </div>            
                </div>   
            )}        
    </div>
  )
}
export default ShowSeed