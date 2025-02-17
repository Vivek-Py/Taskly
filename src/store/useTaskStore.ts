import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type ITaskStatus = 'completed' | 'not_started' | 'in_progress';
type ITaskPriority = 'none' | 'low' | 'medium' | 'high' | 'urgent';

interface ITask {
  id: number | string;
  title: string;
  priority: string;
  status: string;
}

interface TaskFilter {
  status: ITaskStatus | null;
  priority: ITaskPriority | null;
  search: string;
}

interface TaskStore {
  tasks: ITask[];
  filter: TaskFilter;
  setFilter: (filter: Partial<TaskFilter>) => void;
  setTasks: (tasks: ITask[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  addTask: (task: ITask) => void;
}

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      filter: {
        status: null,
        priority: null,
        search: ''
      },
      setFilter: (newFilter) =>
        set((state) => ({
          filter: {...state.filter, ...newFilter}
        })),
      setTasks: (tasks) => set({tasks}),
      isLoading: false,
      setIsLoading: (loading) => set({isLoading: loading}),
      addTask: (task) => {
        set((state) => ({
          tasks: [...state.tasks, task]
        }));
      }
    }),
    {
      name: 'task-storage',
      partialize: (state) => ({tasks: state.tasks, isLoading: state.isLoading})
    }
  )
);

export type {ITask, ITaskStatus, ITaskPriority, TaskFilter};

export {useTaskStore};
