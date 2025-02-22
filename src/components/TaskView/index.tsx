import {useState} from 'react';
import AddTaskModal from './AddTask';
import TaskList from './TaskList';
import Button from '@atomComponents/Button';
import Icon from '@atomComponents/Icon';
import Stats from '@components/Stats';
import Drawer from '@components/atom/Drawer';

const TaskView = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-4">
        <Stats />
        <Button
          id="add-task"
          onClick={() => setShowModal(true)}
          label="Add Task"
          icon={<Icon name="add" />}
        />
      </div>
      <TaskList />
      <AddTaskModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <Drawer isOpen={showDrawer} onClose={() => setShowDrawer(false)}>
        <div>Hello</div>
      </Drawer>
    </div>
  );
};

export default TaskView;
