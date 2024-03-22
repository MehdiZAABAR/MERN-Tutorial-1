import { Link } from 'react-router-dom'
import { AiFillCamera, AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
/*
SlotSchema = mongoose.Schema(
    {
        used:Boolean,
        seed: { type: objId, ref: 'SeedSchema' },
        startDate: Date,
        trayRow: Number,
        trayCol: Number,
        seedlingTray: { type: objId, ref: 'TraySchema' },
        growingSystem: String
    }


*/
const SlotsTable = ({slots}) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
    <thead>
        <tr>
            <th className='border border-slate-600 rounded-md'>Name</th>
            <th className='border border-slate-600 rounded-md'>Seed</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Location</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Slot Size</th>
            <th className='border border-slate-600 rounded-md '>Operations</th>
        </tr>
    </thead>
    <tbody>
        {
            slots.map((slot, index) =>
            (
                <tr key={slot._id} className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'> {slot.name}</td>
                    <td className='border border-slate-700 rounded-md text-center'> {slot.used ? ( slot.seed) : ("Free")}</td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{slot.used ?( (slot.tray != '')? (slot.tray):(slot.growingSystem)):("Free")}</td>
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
                </tr>
            ))}
    </tbody>
</table>
  );
}

export default SlotsTable