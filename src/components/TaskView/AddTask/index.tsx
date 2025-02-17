import {useState} from 'react';
import Modal from '@atomComponents/Modal';
import Button from '@atomComponents/Button';
import {useTaskStore} from '@store/useTaskStore';
import {PRIORITY, STATUS} from '@utils/constants';
import {formDefaultValues} from './constants';
import {TAddTaskProps, TFormData, TFormEvent, TOnChangeHandler} from './type';
import {generateUniqueId} from '@utils/index';

const AddTask: React.FC<TAddTaskProps> = ({isOpen, onClose}) => {
  const {addTask} = useTaskStore();
  const [formData, setFormData] = useState<TFormData>(formDefaultValues);

  const handleChange = (e: TOnChangeHandler) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const submitHandler = (e: TFormEvent) => {
    e.preventDefault();
    addTask({id: generateUniqueId(), ...formData});
    onClose();
  };

  return (
    <Modal title="Add task" isOpen={isOpen}>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="task-title">Title</label>
          <input id="task-title" name="title" required onChange={handleChange} />
          <label htmlFor="priority-select">Priority</label>
          <select id="priority-select" name="priority" required onChange={handleChange}>
            <option value={PRIORITY.NONE.KEY}>{PRIORITY.NONE.LABEL}</option>
            <option value={PRIORITY.LOW.KEY}>{PRIORITY.LOW.LABEL}</option>
            <option value={PRIORITY.MEDIUM.KEY}>{PRIORITY.MEDIUM.LABEL}</option>
            <option value={PRIORITY.HIGH.KEY}>{PRIORITY.HIGH.LABEL}</option>
            <option value={PRIORITY.URGENT.KEY}>{PRIORITY.URGENT.LABEL}</option>
          </select>
          <label htmlFor="status-select" defaultValue="not_started">
            Status
          </label>
          <select id="status-select" name="status" required onChange={handleChange}>
            <option value={STATUS.NOT_STARTED.KEY}>{STATUS.NOT_STARTED.LABEL}</option>
            <option value={STATUS.IN_PROGRESS.KEY}>{STATUS.IN_PROGRESS.LABEL}</option>
            <option value={STATUS.COMPLETED.KEY}>{STATUS.COMPLETED.LABEL}</option>
          </select>
        </div>
        <div className="form-actions">
          <Button
            id="form-button-close"
            onClick={onClose}
            label="Close"
            autoFocus
            aria-label="form-action-close"
          />
          <Button
            id="form-button-submit"
            label="Add"
            type="submit"
            autoFocus
            aria-label="form-action-submit"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddTask;
