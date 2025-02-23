import {FC} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import useEscapeKey from '../../hooks/useEscapeKey';
import {DrawerProps} from './type';

const Drawer: FC<DrawerProps> = ({isOpen, onClose, children}) => {
  useEscapeKey(onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
          <motion.div
            initial={{x: '100%'}}
            animate={{x: 0}}
            exit={{x: '100%'}}
            transition={{type: 'spring', stiffness: 300, damping: 30}}
            className="fixed inset-y-0 right-0 w-1/3 bg-white shadow-lg p-4"
          >
            <div className="mt-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
