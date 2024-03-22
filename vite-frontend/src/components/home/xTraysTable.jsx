import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillCamera, AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete, MdOutlinePreview } from 'react-icons/md'
import BackendURL from '../BackendURL'
import React from 'react'
import CreateTraysSlots from './CreateTraysSlots'


const TraysTable = ({trays}) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
    <thead>
        <tr>
            <th className='border border-slate-600 rounded-md'>ID</th>
            <th className='border border-slate-600 rounded-md'>Used</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Name</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Slot Size</th>
            <th className='border border-slate-600 rounded-md '>Nb of Row</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Nb of Cols</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Slots</th>
            <th className='border border-slate-600 rounded-md '>Operations</th>
        </tr>
    </thead>
    <tbody>
        {
            trays.map((tray, index) =>
            (
                <tr key={tray._id} className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'> {tray.propId}</td>
                    <td className='border border-slate-700 rounded-md text-center'> {tray.used ? ( "Used") : ("Free")}</td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{tray.easyName}</td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{tray.slotSize}</td>
                    <td className='border border-slate-700 rounded-md text-center '>{tray.nbRows}</td>
                    <td className='border border-slate-700 rounded-md text-center '>{tray.nbCols}</td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                        { tray.slots.length === tray.nbRows*tray.nbCols  ?  (
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
                </div>):( <CreateTraysSlots tray={tray}/> ) 
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
                </tr>
            ))}
    </tbody>
</table>
  );
}

export default TraysTable