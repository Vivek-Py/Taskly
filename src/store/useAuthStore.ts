import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useTaskStore } from "./useTaskStore";
import { taskService } from "../api/services/taskService";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  login: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
      login: async () => {
        set({
          user: { id: "1", email: "test@test.com", name: "Test User" },
          isAuthenticated: true,
        });

        const tasks = useTaskStore.getState().tasks;
        if (!tasks || tasks.length === 0) {
          await taskService.getTasks();
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
export type { AuthState };
