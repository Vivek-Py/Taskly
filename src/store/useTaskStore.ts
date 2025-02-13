import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Task {
  id: string;
  title: string;
  // Add other task properties as needed
}

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "task-storage",
    }
  )
);
