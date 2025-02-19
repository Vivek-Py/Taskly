import React from 'react';
import TaskView from '@components/TaskView';
import Greeting from '@components/Greeting';
import Navbar from '@components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <Greeting />
        <TaskView />
      </div>
    </div>
  );
};

export default Home;
