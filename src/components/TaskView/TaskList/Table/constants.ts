import {ITaskPriority, ITaskStatus} from '@store/useTaskStore';

export const Priorities: Array<ITaskPriority> = ['urgent', 'high', 'medium', 'low', 'none'];
export const Status: Array<ITaskStatus> = ['completed', 'in_progress', 'not_started'];
