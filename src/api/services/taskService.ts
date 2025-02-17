import api from '../config';
import {useTaskStore} from '../../store/useTaskStore';

export const taskService = {
  getTasks: async () => {
    const {setIsLoading, setTasks} = useTaskStore.getState();
    try {
      setIsLoading(true);
      const response = await api.get(
        'https://gist.githubusercontent.com/yangshun/7acbe005af922e43a26dea8109e16aed/raw/01df391c8320df0a37c73fdbf6b8fc7d88aae719/greatfrontend-tasks.json'
      );
      // response.data.length = 10;
      setTasks(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
};
