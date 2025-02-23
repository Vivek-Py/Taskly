import Button from '@components/atom/Button';
import Drawer from '@components/atom/Drawer';
import Icon from '@components/atom/Icon';
import {useToast} from '@components/atom/Toast';
import {ITask, useTaskStore} from '@store/useTaskStore';
import {FC, useEffect, useState} from 'react';
import TaskForm from './TaskForm';
import {motion} from 'framer-motion';

const TaskDetail: FC = () => {
  const {tasks, updateTask, selectedTask, setSelectedTask, deleteTask} = useTaskStore();
  const [taskDetail, setTaskDetail] = useState<ITask>({
    id: '',
    title: '',
    status: '',
    priority: '',
    description: ''
  });
  const {addToast} = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (selectedTask !== null) {
      const task = tasks.find((task) => task.id === selectedTask) as ITask;
      setTaskDetail(task);
    }
  }, [selectedTask, tasks]);

  const onClose = () => setSelectedTask(null);

  const handleTaskUpdate = () => {
    try {
      updateTask(taskDetail.id, {
        title: taskDetail.title,
        description: taskDetail.description,
        status: taskDetail.status,
        priority: taskDetail.priority
      });
      onClose();
      addToast('Task updated successfully', 'success');
    } catch (error) {
      addToast('Failed to update task: ' + error, 'error');
    }
  };

  const handleTaskDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      try {
        deleteTask(taskDetail.id);
        setSelectedTask(null);
        addToast('Task deleted successfully', 'success');
      } catch (error) {
        addToast('Failed to delete task: ' + error, 'error');
      } finally {
        setIsDeleting(false);
      }
    }, 700);
  };

  return (
    <Drawer isOpen={selectedTask !== null} onClose={onClose}>
      <motion.div
        className="relative w-full rounded overflow-hidden bg-white p-4"
        animate={
          isDeleting
            ? {y: 200, opacity: 0, rotate: 45, scale: 0.5}
            : {y: 0, opacity: 1, rotate: 0, scale: 1}
        }
        transition={{duration: 0.7}}
      >
        <TaskForm
          taskDetail={taskDetail}
          setTaskDetail={setTaskDetail}
          handleTaskUpdate={handleTaskUpdate}
          onClose={onClose}
        />
      </motion.div>
      <Button
        id="delete-task"
        label="Delete"
        btnType="icon"
        className="absolute bottom-10 right-10 cursor-pointer border border-gray-300 rounded-full p-3 px-4 bg-red-500"
        icon={<Icon name="delete" className="text-white" />}
        onClick={handleTaskDelete}
      />
    </Drawer>
  );
};

export default TaskDetail;
