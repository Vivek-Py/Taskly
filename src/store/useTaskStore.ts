import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface ITask {
  id: number | string;
  title: string;
  priority: string;
  status: string;
}

interface TaskStore {
  tasks: ITask[];
  setTasks: (tasks: ITask[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  addTask: (task: ITask) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
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
      name: 'task-storage'
    }
  )
);

export type {ITask};
