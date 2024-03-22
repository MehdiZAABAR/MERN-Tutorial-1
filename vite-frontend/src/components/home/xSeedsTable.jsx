// export default SeedsTable;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCamera, AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BackendURL from '../BackendURL';

const SeedsTable = ({ seeds }) => {
    const defaultSort = { column: null, direction: 'asc' };
    const [sort, setSort] = useState(defaultSort);

    useEffect(() => {
        const savedSort = JSON.parse(sessionStorage.getItem('seedSort'));
        if (savedSort) {
            setSort(savedSort);
        }
    }, []);

    const sortSeeds = (column) => {
        const sortedSeeds = [...seeds].sort((a, b) => {
            const valueA = a[column]?.toLowerCase() ?? '';
            const valueB = b[column]?.toLowerCase() ?? '';
            if (valueA < valueB) return sort.direction === 'asc' ? -1 : 1;
            if (valueA > valueB) return sort.direction === 'asc' ? 1 : -1;
            return 0;
        });
        return sortedSeeds;
    };

    const handleSort = (column) => {
        const direction = sort.column === column && sort.direction === 'asc' ? 'desc' : 'asc';
        const newSort = { column, direction };
        setSort(newSort);
        sessionStorage.setItem('seedSort', JSON.stringify(newSort));
    };

    const sortedSeeds = sort.column ? sortSeeds(sort.column) : seeds;

    return (
        <table className="w-full border-separate border-spacing-2">
            <thead>
            <tr>
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
                </tr>
            </thead>
            <tbody>
                {sortedSeeds.map((seed, index) => (
                    <tr key={seed._id} className="h-8">
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
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SeedsTable;