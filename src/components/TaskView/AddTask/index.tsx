import {useState} from 'react';
import Modal from '@atomComponents/Modal';
import Button from '@atomComponents/Button';
import {useTaskStore} from '@store/useTaskStore';
import {PRIORITY, STATUS} from '@utils/constants';
import {formDefaultValues} from './constants';
import {TAddTaskProps, TFormData, TFormEvent, TOnChangeHandler} from './type';
import {useToast} from '@components/atom/Toast';
import CustomFieldsManager from './CustomFieldsManager';
import useEscapeKey from 'hooks/useEscapeKey';
import {generateUniqueId} from '@utils/index';

const AddTask: React.FC<TAddTaskProps> = ({isOpen, onClose}) => {
  const {addTask, customFields} = useTaskStore();
  const [formData, setFormData] = useState<TFormData>(formDefaultValues);
  const {addToast} = useToast();
  useEscapeKey(onClose);

  const handleChange = (e: TOnChangeHandler) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const submitHandler = (e: TFormEvent) => {
    e.preventDefault();
    if (formData.title && formData.title.trim() === '') {
      addToast('Title is required', 'error');
      return;
    }
    addTask({id: generateUniqueId(), ...formData});
    onClose();
    addToast('Task added successfully', 'success');
  };

  return (
    <Modal title="Add Task" isOpen={isOpen}>
      <form onSubmit={submitHandler} className="p-6 space-y-6">
        <div className="space-y-2">
          <label htmlFor="task-title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="task-title"
            name="title"
            placeholder="Enter task title"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="priority-select" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority-select"
              name="priority"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value={PRIORITY.NONE.KEY}>{PRIORITY.NONE.LABEL}</option>
              <option value={PRIORITY.LOW.KEY}>{PRIORITY.LOW.LABEL}</option>
              <option value={PRIORITY.MEDIUM.KEY}>{PRIORITY.MEDIUM.LABEL}</option>
              <option value={PRIORITY.HIGH.KEY}>{PRIORITY.HIGH.LABEL}</option>
              <option value={PRIORITY.URGENT.KEY}>{PRIORITY.URGENT.LABEL}</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="status-select" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status-select"
              name="status"
              required
              onChange={handleChange}
              className="min-w-[200px] w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value={STATUS.NOT_STARTED.KEY}>{STATUS.NOT_STARTED.LABEL}</option>
              <option value={STATUS.IN_PROGRESS.KEY}>{STATUS.IN_PROGRESS.LABEL}</option>
              <option value={STATUS.COMPLETED.KEY}>{STATUS.COMPLETED.LABEL}</option>
            </select>
          </div>
        </div>
        {customFields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {field.type === 'text' && (
              <input
                id={field.name}
                name={field.name}
                type="text"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            )}
            {field.type === 'number' && (
              <input
                id={field.name}
                name={field.name}
                type="number"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            )}
          </div>
        ))}
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            id="form-button-close"
            onClick={onClose}
            label="Close"
            aria-label="form-action-close"
            btnType="secondary"
          />
          <Button
            id="form-button-submit"
            label="Add"
            type="submit"
            aria-label="form-action-submit"
            btnType="primary"
          />
        </div>
      </form>
      <CustomFieldsManager />
    </Modal>
  );
};

export default AddTask;
