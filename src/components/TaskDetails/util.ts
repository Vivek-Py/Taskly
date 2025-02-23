import {PRIORITY, STATUS} from '@utils/constants';

export const getStatusClass = (status: string) => {
  switch (status) {
    case 'To Do':
    case STATUS.NOT_STARTED.KEY:
      return 'bg-gray-300 text-black';
    case 'In Progress':
    case STATUS.IN_PROGRESS.KEY:
      return 'bg-yellow-300 text-black';
    case 'Completed':
    case STATUS.COMPLETED.KEY:
      return 'bg-green-300 text-black';
    default:
      return '';
  }
};

export const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'Low':
    case PRIORITY.LOW.KEY:
      return 'bg-blue-200 text-black';
    case 'Medium':
    case PRIORITY.MEDIUM.KEY:
      return 'bg-yellow-200 text-black';
    case 'High':
    case PRIORITY.HIGH.KEY:
      return 'bg-red-200 text-black';
    case 'Urgent':
    case PRIORITY.URGENT.KEY:
      return 'bg-pink-200 text-black';
    default:
      return '';
  }
};
