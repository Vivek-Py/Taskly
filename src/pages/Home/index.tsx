import React, {useState} from 'react';
import useAuthStore from '@store/useAuthStore';
import {useTaskStore} from '@store/useTaskStore';
import Button from '@components/atom/Button';
import AddTask from '@components/AddTask';
import TaskList from '@components/TaskList';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to the Home Page</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">
            This is an example of using Tailwind CSS classes
            <Button id="logout" label="Logout" onClick={() => useAuthStore.getState().logout()} />
          </p>
        </div>
        <Button id="add-task" onClick={() => setShowModal(true)} label="Add Task" />
        <TaskList />
        <AddTask isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
};

export default Home;
