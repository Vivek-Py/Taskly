import {useTaskStore} from '@store/useTaskStore';
import Table from './Table';
import SearchComponent from '@atomComponents/Search';
import {useMemo, useState} from 'react';
import Icon from '@atomComponents/Icon';
import Button from '@atomComponents/Button';
import Pagination from '@atomComponents/Pagination';

const TaskList: React.FC = () => {
  const {tasks, filter, setFilter} = useTaskStore();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter.status && task.status !== filter.status) {
        return false;
      }
      if (filter.priority && task.priority !== filter.priority) {
        return false;
      }
      if (filter.search.trim().length > 0 && task.title) {
        return task.title.toLowerCase().includes(filter.search.toLowerCase());
      }
      return true;
    });
  }, [tasks, filter]);

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-2">
        <SearchComponent onSearch={(str) => setFilter({search: str})} />
        <Button
          id="clear-filters-btn"
          label="Clear Filters"
          icon={<Icon name="close" />}
          onClick={() => setFilter({priority: null, status: null})}
          btnType="secondary"
        />
      </div>
      <Table data={filteredTasks} />
    </div>
  );
};

export default TaskList;
