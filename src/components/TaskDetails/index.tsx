import Button from '@components/atom/Button';
import Drawer from '@components/atom/Drawer';
import Icon from '@components/atom/Icon';
import { useTaskStore } from '@store/useTaskStore';
import {FC, useEffect, useState} from 'react';


const TaskDetail: FC = () => {
  const {tasks,selectedTask, setSelectedTask} = useTaskStore();
  const [taskDetail, setTaskDetail] = useState<any>({
    id: '',
    title: '',
    status: '',
    priority: ''
  });

  useEffect(() => {
     selectedTask !== null && setTaskDetail(tasks.find(task => task.id === selectedTask));
  },[selectedTask, tasks])

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'To Do':
        return 'bg-gray-300 text-gray-800';
      case 'In Progress':
        return 'bg-yellow-300 text-yellow-800';
      case 'Completed':
        return 'bg-green-300 text-green-800';
      default:
        return '';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'bg-blue-200 text-blue-800';
      case 'Medium':
        return 'bg-yellow-200 text-yellow-800';
      case 'High':
        return 'bg-red-200 text-red-800';
      default:
        return '';
    }
  };

  return (
    <Drawer isOpen={selectedTask !== null} onClose={() => setSelectedTask(null)}>
        <div className="relative w-1/1 rounded overflow-hidden bg-rose-100 p-4 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{taskDetail.title}</h2>

            <div className="mt-2">
            <span className={`inline-block py-1 rounded-full text-sm font-medium ${getStatusClass(taskDetail.status)}`}>
                Status: {taskDetail.status}
            </span>
            </div>

            <div className="mt-2">
            <span className={`inline-block py-1 rounded-full text-sm font-medium ${getPriorityClass(taskDetail.priority)}`}>
                Priority: {taskDetail.priority}
            </span>
            </div>
        </div>
        <div className="mt-6">
            <label className="block text-md font-medium text-gray-700">Description:</label>
            <textarea
                value={taskDetail.description}
                onChange={() => {}}
                rows={4}
                className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter task description"
            />
            <div className='flex flex-row justify-end gap-2'>
            <span className='bg-blue-300 rounded-md'>
            <Button id="check" label='check' btnType="icon" icon={<Icon name="check" />} onClick={() => {}} />
            </span>
            <span className='bg-red-300 rounded-md'>
            <Button id="close" label='close' btnType="icon" icon={<Icon name="close" />} onClick={() => {}} />
            </span>
            </div>
        </div>
    </Drawer>
  );
};

export default TaskDetail;
