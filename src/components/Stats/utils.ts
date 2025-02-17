import {ITask, TaskFilter} from '@store/useTaskStore';

export const getTasksCountByStatus = (tasks: ITask[], filter: TaskFilter) =>
  tasks
    .filter((task) => {
      // if (filter.status && task.status !== filter.status) {
      //   return false;
      // }
      if (filter.priority && task.priority !== filter.priority) {
        return false;
      }
      if (filter.search.trim().length > 0 && task.title) {
        return task.title.toLowerCase().includes(filter.search.toLowerCase());
      }
      return true;
    })
    .reduce(
      (prev, curr: ITask) => {
        const temp = prev;
        if (curr.status === 'in_progress') {
          ++temp.in_progress;
        } else if (curr.status === 'not_started') {
          ++temp.not_started;
        } else if (curr.status === 'completed') {
          ++temp.completed;
        }
        ++temp.all;
        return temp;
      },
      {
        all: 0,
        not_started: 0,
        completed: 0,
        in_progress: 0
      }
    );
