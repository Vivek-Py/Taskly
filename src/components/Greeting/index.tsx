import {getGreeting} from '@utils/index';

const Greeting = () => {
  return (
    <div className="flex flex-row justify-between items-center mb-4">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 align-middle">{getGreeting()}! User,</h3>
      </div>
    </div>
  );
};

export default Greeting;
