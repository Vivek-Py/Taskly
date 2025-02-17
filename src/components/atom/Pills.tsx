import {useState} from 'react';
import {PillProps} from './type';

const Pill: React.FC<PillProps> = ({count, text, icon, active = false, onClick}) => {
  const [isShrinking, setIsShrinking] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsShrinking(true);
    if (onClick) onClick();
    setTimeout(() => setIsShrinking(false), 300); // Duration of the shrink animation
  };

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors h-11
        ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
      onClick={handleClick}
    >
      <div
        className={`${isShrinking ? 'transform scale-75' : ''} transition-transform duration-300`}
      >
        {icon}
      </div>
      <span className="font-medium">{text}</span>
      <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-sm w-[42px] text-center">
        {count}
      </span>
    </div>
  );
};

export default Pill;
