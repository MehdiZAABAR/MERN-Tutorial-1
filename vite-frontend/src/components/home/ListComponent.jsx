import React, { useState, useEffect } from 'react';
import { MdOutlineAddBox, MdOutlineEdit, MdOutlineDelete } from 'react-icons/md';
import { TbLayoutNavbarCollapseFilled, TbLayoutNavbarExpandFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';

const ListComponent = ({ title, data, loading, renderHeader, renderItem, onEditClick }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  console.log(`List component Fired for title = ${title}`);
   // Load collapse state from session storage on component mount
  useEffect(() => {
    const savedState = sessionStorage.getItem(`${title}_collapsed`);
    if (savedState) {
      setCollapsed(JSON.parse(savedState));
    }
  }, [title]);

  // Save collapse state to session storage when it changes
  useEffect(() => {
    sessionStorage.setItem(`${title}_collapsed`, JSON.stringify(collapsed));
  }, [collapsed, title]);

  // Toggle collapse state
  const toggleCollapse = () => {
    setCollapsed(prevCollapsed => !prevCollapsed);
  };
  const handleSort = (property) => {
    if (sortBy === property) {
      setSortAsc((prevSortAsc) => !prevSortAsc);
    } else {
      setSortBy(property);
      setSortAsc(true);
    }
  };

  const sortedData = sortBy ? [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) return sortAsc ? -1 : 1;
    if (aValue > bValue) return sortAsc ? 1 : -1;
    return 0;
  }) : data;
 
  return (
    <div className='mb-8'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl my-4'>{title} ({data.length})</h2>
        <div className='flex items-center'>
          {collapsed ? (
            <TbLayoutNavbarExpandFilled className='text-gray-600 text-4xl cursor-pointer' onClick={toggleCollapse} />
          ) : (
            <TbLayoutNavbarCollapseFilled className='text-gray-600 text-4xl cursor-pointer' onClick={toggleCollapse} />
          )}
          <Link to={`/${title.toLowerCase()}/create`}>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
        </div>
      </div>
      {!collapsed && (
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <table className='w-full border-separate border-spacing-2'>
              <thead>
                <tr>
                  <th className='border border-slate-700 rounded-md text-center w-5' >Ops</th>
                  {renderHeader && renderHeader(handleSort)}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item) => (
                  <tr key={item?._id}>
                    <td className='border border-slate-700 rounded-md text-center w-5'>
                      <div className='flex justify-center gap-x-1 '>
                        <MdOutlineEdit className='text-yellow-600 text-2xl mx-2' onClick={onEditClick(item)} />
                        <Link to={`/${title.toLowerCase()}/delete/${item._id}`}>
                          <MdOutlineDelete className='text-red-600 text-2xl mx-2' />
                        </Link>
                      </div>
                    </td>
                    {renderItem(item)}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};
export default ListComponent;