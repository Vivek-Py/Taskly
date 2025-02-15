import {useTaskStore} from '@store/useTaskStore';
import Table from '@components/atom/Table';

const TaskList: React.FC = () => {
  const {tasks} = useTaskStore();
  return (
    <div>
      <Table data={tasks} />
    </div>
  );
};

export default TaskList;
