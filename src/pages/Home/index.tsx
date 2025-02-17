import React from 'react';
import useAuthStore from '@store/useAuthStore';
import Button from '@components/atom/Button';
import TaskView from '@components/TaskView';
import Icon from '@atomComponents/Icon';
import {getFormattedDate, getGreeting} from '@utils/index';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Button
        id="logout"
        label="Logout"
        onClick={() => useAuthStore.getState().logout()}
        icon={<Icon name="logout" />}
      />
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-center mb-4">
          <div>
            <p className="mb-2">{getFormattedDate()}</p>
            <h3 className="text-2xl font-bold text-gray-900 align-middle">
              {getGreeting()}! User,
            </h3>
          </div>
        </div>
        <TaskView />
      </div>
    </div>
  );
};

export default Home;
