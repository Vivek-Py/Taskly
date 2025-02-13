import React from "react";
import Table from "@components/Table";
import useAuthStore from "@store/useAuthStore";
import { useTaskStore } from "@store/useTaskStore";

const Home: React.FC = () => {
  const { tasks, isLoading } = useTaskStore();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to the Home Page
        </h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">
            This is an example of using Tailwind CSS classes
          </p>
        </div>
        <button onClick={() => useAuthStore.getState().logout()}>logout</button>
        <Table data={tasks} />
      </div>
    </div>
  );
};

export default Home;
