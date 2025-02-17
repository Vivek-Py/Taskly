import {useState} from 'react';
import Icon from '@atomComponents/Icon';
import {ITaskStatus, useTaskStore} from '@store/useTaskStore';
import {Status} from './constants';

const StatusDropdown = () => {
  const {filter, setFilter} = useTaskStore();
  const [showPriorityFilter, setShowStatusFilter] = useState<boolean>(false);
  const handleFilter = (filter: ITaskStatus | null) => {
    setFilter({status: filter});
  };
  return (
    <>
      <div
        className={`flex flex-row gap-2 items-center cursor-pointer ${
          filter.status ? 'text-blue-600 font-medium' : ''
        }`}
        onClick={() => setShowStatusFilter(!showPriorityFilter)}
      >
        <Icon name="task" />
        Status
        {filter.status ? `: ${filter.status}` : ''}
        <Icon name="expand_more" />
      </div>
      {showPriorityFilter && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
          <div
            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 ${
              !filter.status ? 'text-blue-600 font-medium' : ''
            }`}
            onClick={() => {
              handleFilter(null);
              setShowStatusFilter(false);
            }}
          >
            All
          </div>
          {Status.map((status) => (
            <div
              key={status}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                filter.status === status ? 'text-blue-600 font-medium' : ''
              }`}
              onClick={() => {
                handleFilter(status);
                setShowStatusFilter(false);
              }}
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StatusDropdown;
