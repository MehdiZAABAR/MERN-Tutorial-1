import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton.jsx'
import BackendURL from '../components/BackendURL.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'


const EditSeed = () => {
  const [propId, setPropId] = useState('');
  const [plantType, setPlantType] = useState('');
  const [easyName, setEasyName] = useState('');
  const [botanicName, setBotanicName] = useState('');
  const [variety, setVariety] = useState('');
  const [germination, setGermination] = useState({});
  const [transfer, setTransfer] = useState({});
  const [harvesting, setHarvesting] = useState({});
  const [culturePeriods, setCulturePeriods] = useState({});
  const [shop, setShop] = useState('');
  const [brand, setBrand] = useState('');
  const [shoppingDate, setShoppingDate] = useState('');
  const [productionDate, setProductionDate] = useState('');
  const [endOfValidity, setEndOfValidity] = useState('');
  const [origin, setOrigin] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();
  useEffect( () => {
    setLoading( true);
    axios
    .get( `${BackendURL}/seeds/${id}`)
    .then( (response) => {
      setPropId(response.data.propId);
      setPlantType(response.data.plantType);
      setEasyName(response.data.easyName);
      setBotanicName(response.data.botanicName);
      setVariety(response.data.variety);
      setGermination(response.data.culturePeriods.germination);
      setTransfer(response.data.culturePeriods.transfer);
      setHarvesting(response.data.culturePeriods.harvesting);
      setCulturePeriods(response.data.culturePeriods);
      setShop(response.data.shop);
      setBrand(response.data.brand);
      setShoppingDate(response.data.shoppingDate);
      setProductionDate(response.data.productionDate);
      setEndOfValidity(response.data.endOfValidity);
      setOrigin(response.data.origin);
      setQuantity(response.data.quantity);
      setLoading(false);
    })
    .catch((error) => {
      setLoading( false);
      console.log( error);
      alert( "Something wrong happened, please check console !");

    })


  }, []);
  const HandleEditSeed = () => {
    const data = {
      propId,
      plantType,
      easyName,
      botanicName,
      variety,
      culturePeriods:{ germination, transfer, harvesting},
      shop,
      brand,
      shoppingDate,
      productionDate,
      endOfValidity,
      origin,
      quantity
    };
    setLoading(true);
    
    axios
      .put(`${BackendURL}/seeds/${id}`, data)
      .then(() => {
        console.log( data);
        setLoading(false);
        enqueueSnackbar( 'Record updated successfully !', { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar( 'An error happened while updating the record ! Check console', { variant: 'error'});
      })
  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 '>Edit Seed
      </h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Proprietary Id</label>
          <input
            type='text'
            value={propId}
            onChange={(e) => setPropId(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Plant Type</label>
          <input
            type='text'
            value={plantType}
            onChange={(e) => setPlantType(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>EasyName</label>
          <input
            type='text'
            value={easyName}
            onChange={(e) => setEasyName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Botanic Name</label>
          <input
            type='text'
            value={botanicName}
            onChange={(e) => setBotanicName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Variety</label>
          <input
            type='text'
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Germination Start</label>
          <input
            type='text'
            value={germination["start"]}
            onChange={(e) => germination["start"] = (e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Germination End</label>
          <input
            type='text'
            value={germination["end"]}
            onChange={(e) => germination["end"] = (e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Transfer Start</label>
          <input
            type='text'
            value={transfer["start"]}
            onChange={(e) => transfer["start"] = (e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Transfer End</label>
          <input
            type='text'
            value={transfer["end"]}
            onChange={(e) => transfer["end"] = (e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Harvest Start</label>
          <input
            type='text'
            value={harvesting["start"]}
            onChange={(e) => harvesting["start"] = (e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Harvest End</label>
          <input
            type='text'
            value={harvesting["end"]}
            onChange={(e) => harvesting["end"] = (e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Shop</label>
          <input
            type='text'
            value={shop}
            onChange={(e) => setShop(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Brand</label>
          <input
            type='text'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Shopping Date</label>
          <input
            type='text'
            value={shoppingDate}
            onChange={(e) => setShoppingDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Production Date</label>
          <input
            type='text'
            value={productionDate}
            onChange={(e) => setProductionDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>End Of Validity</label>
          <input
            type='text'
            value={endOfValidity}
            onChange={(e) => setEndOfValidity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Origin</label>
          <input
            type='text'
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='text'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={HandleEditSeed}>Save</button>
      </div>
    </div>
  )
}

export default EditSeed