import {useTaskStore} from '@store/useTaskStore';
import Table from './Table';
import SearchComponent from '@atomComponents/Search';
import {useMemo, useState} from 'react';
import Icon from '@atomComponents/Icon';
import Button from '@atomComponents/Button';
import TaskDetails from '@components/TaskDetails';
import CustomFieldDropdown from './CustomFieldDropdown';

const TaskList: React.FC = () => {
  const {tasks, filter, setFilter} = useTaskStore();
  const [customField, setCustomField] = useState<string | null>(
    tasks.length > 0
      ? Object.keys(tasks.reduce((acc, task) => ({...acc, ...task}), {})).find(
          (key) => !['id', 'title', 'priority', 'status'].includes(key)
        ) || null
      : null
  );

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

  const handleCustomFieldChange = (newField: string | null) => {
    setCustomField(newField);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-2">
        <SearchComponent onSearch={(str) => setFilter({search: str})} />
        <div className="flex flex-row gap-2">
          <CustomFieldDropdown
            tasks={tasks}
            customField={customField}
            onCustomFieldChange={handleCustomFieldChange}
          />
          <Button
            id="clear-filters-btn"
            label="Clear Filters"
            icon={<Icon name="close" />}
            onClick={() => setFilter({priority: null, status: null})}
            btnType="secondary"
          />
        </div>
      </div>
      <Table data={filteredTasks} customField={customField} />
      <TaskDetails />
    </div>
  );
};

export default TaskList;
