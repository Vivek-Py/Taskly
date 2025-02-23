import {FC} from 'react';
import {ITask} from '@store/useTaskStore';
import Button from '@components/atom/Button';
import Icon from '@components/atom/Icon';
import {PRIORITY, STATUS} from '@utils/constants';
import {getPriorityClass, getStatusClass} from './util';

interface TaskFormProps {
  taskDetail: ITask;
  setTaskDetail: (task: ITask) => void;
  handleTaskUpdate: () => void;
  onClose: () => void;
}

const TaskForm: FC<TaskFormProps> = ({taskDetail, setTaskDetail, handleTaskUpdate, onClose}) => {
  return (
    <>
      <input
        type="text"
        value={taskDetail.title}
        onChange={(e) => setTaskDetail({...taskDetail, title: e.target.value})}
        className="text-2xl font-semibold text-black mb-4 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
        placeholder="Enter task title"
      />
      <div className="mt-2 flex flex-row justify-start items-center gap-4">
        <label className="block text-md font-medium text-black min-w-[60px]">Status</label>
        <select
          value={taskDetail.status}
          onChange={(e) => setTaskDetail({...taskDetail, status: e.target.value})}
          className={`mt-1 w-[140px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${getStatusClass(
            taskDetail.status
          )}`}
        >
          <option style={{backgroundColor: 'white', color: 'black'}} value={STATUS.NOT_STARTED.KEY}>
            {STATUS.NOT_STARTED.LABEL}
          </option>
          <option style={{backgroundColor: 'white', color: 'black'}} value={STATUS.IN_PROGRESS.KEY}>
            {STATUS.IN_PROGRESS.LABEL}
          </option>
          <option style={{backgroundColor: 'white', color: 'black'}} value={STATUS.COMPLETED.KEY}>
            {STATUS.COMPLETED.LABEL}
          </option>
        </select>
      </div>

      <div className="mt-2 flex flex-row justify-start items-center gap-4">
        <label className="block text-md font-medium text-black min-w-[60px]">Priority</label>
        <select
          value={taskDetail.priority}
          onChange={(e) => setTaskDetail({...taskDetail, priority: e.target.value})}
          className={`mt-1 w-[140px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${getPriorityClass(
            taskDetail.priority
          )}`}
        >
          <option style={{backgroundColor: 'white', color: 'black'}} value={PRIORITY.NONE.KEY}>
            {PRIORITY.NONE.LABEL}
          </option>
          <option style={{backgroundColor: 'white', color: 'black'}} value={PRIORITY.LOW.KEY}>
            {PRIORITY.LOW.LABEL}
          </option>
          <option style={{backgroundColor: 'white', color: 'black'}} value={PRIORITY.MEDIUM.KEY}>
            {PRIORITY.MEDIUM.LABEL}
          </option>
          <option style={{backgroundColor: 'white', color: 'black'}} value={PRIORITY.HIGH.KEY}>
            {PRIORITY.HIGH.LABEL}
          </option>
          <option style={{backgroundColor: 'white', color: 'black'}} value={PRIORITY.URGENT.KEY}>
            {PRIORITY.URGENT.LABEL}
          </option>
        </select>
      </div>
      <div className="mt-6">
        <label className="block text-md font-medium text-black">Description</label>
        <textarea
          value={taskDetail.description}
          onChange={(e) => setTaskDetail({...taskDetail, description: e.target.value})}
          rows={4}
          className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          placeholder="Enter task description"
        />
        <div className="flex flex-row justify-end gap-2 mt-4">
          <span className="items-center bg-blue-100 rounded-md">
            <Button
              id="check"
              label="Save"
              btnType="icon-with-text"
              icon={<Icon name="check" />}
              onClick={handleTaskUpdate}
            />
          </span>
          <span className="bg-red-100 rounded-md">
            <Button
              id="close"
              label="Discard"
              btnType="icon-with-text"
              icon={<Icon name="close" />}
              onClick={onClose}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
