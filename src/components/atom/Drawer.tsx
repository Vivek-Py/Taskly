import {FC, ReactNode} from 'react';
import useEscapeKey from '../../hooks/useEscapeKey';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Drawer: FC<DrawerProps> = ({isOpen, onClose, children}) => {
  useEscapeKey(onClose);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="fixed inset-y-0 right-0 w-1/3 bg-white shadow-lg p-4">
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
