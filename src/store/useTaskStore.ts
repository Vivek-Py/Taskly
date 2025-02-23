import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type ITaskStatus = 'completed' | 'not_started' | 'in_progress';
type ITaskPriority = 'none' | 'low' | 'medium' | 'high' | 'urgent';
type ITaskId = number | string;

interface ITask {
  id: ITaskId;
  title: string;
  priority: string;
  status: string;
  description?: string;
  [key: string]: any;
}

type CustomField = {
  name: string;
  type: string;
  label: string;
};

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
  selectedTask: ITaskId | null;
  setSelectedTask: (taskId: ITaskId | null) => void;
  updateTask: (taskId: ITaskId, task: Partial<ITask>) => void;
  deleteTask: (taskId: ITaskId) => void;
  customFields: CustomField[];
  addCustomField: (field: CustomField) => void;
  removeCustomField: (fieldName: string) => void;
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
      },
      selectedTask: null,
      setSelectedTask: (taskId) => set({selectedTask: taskId}),
      updateTask: (taskId, task) => {
        set((state) => {
          const idx = state.tasks.findIndex((t) => t.id === taskId);
          const tasks = [...state.tasks];
          tasks[idx] = {...tasks[idx], ...task};
          return {tasks};
        });
      },
      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId)
        }));
      },
      customFields: [],
      addCustomField: (field) => set((state) => ({customFields: [...state.customFields, field]})),
      removeCustomField: (fieldName) =>
        set((state) => ({
          customFields: state.customFields.filter((field) => field.name !== fieldName)
        }))
    }),
    {
      name: 'task-storage',
      partialize: (state) => ({tasks: state.tasks, isLoading: state.isLoading})
    }
  )
);

export type {ITask, ITaskStatus, ITaskPriority, TaskFilter, CustomField};

export {useTaskStore};
