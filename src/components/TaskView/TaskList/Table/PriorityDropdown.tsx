import {useState} from 'react';
import Icon from '@atomComponents/Icon';
import {ITaskPriority, useTaskStore} from '@store/useTaskStore';
import {Priorities} from './constants';

const PriorityDropdown = () => {
  const {filter, setFilter} = useTaskStore();
  const [showPriorityFilter, setShowPriorityFilter] = useState<boolean>(false);
  const handleFilter = (filter: ITaskPriority | null) => {
    setFilter({priority: filter});
  };
  return (
    <>
      <div
        className={`flex flex-row gap-2 items-center cursor-pointer ${
          filter.priority ? 'text-blue-600 font-medium' : ''
        }`}
        onClick={() => setShowPriorityFilter(!showPriorityFilter)}
      >
        <Icon name="hotel_class" />
        Priority
        {filter.priority ? `: ${filter.priority}` : ''}
        <Icon name="expand_more" />
      </div>
      {showPriorityFilter && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
          <div
            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 ${
              !filter.priority ? 'text-blue-600 font-medium' : ''
            }`}
            onClick={() => {
              handleFilter(null);
              setShowPriorityFilter(false);
            }}
          >
            All
          </div>
          {Priorities.map((priority) => (
            <div
              key={priority}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                filter.priority === priority ? 'text-blue-600 font-medium' : ''
              }`}
              onClick={() => {
                handleFilter(priority);
                setShowPriorityFilter(false);
              }}
            >
              {priority}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PriorityDropdown;
