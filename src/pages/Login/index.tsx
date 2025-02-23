import React from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

const SunIcon = () => (
  <motion.svg
    viewBox="0 0 24 24"
    className="w-32 h-32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    animate={{rotate: 360}}
    transition={{repeat: Infinity, duration: 30, ease: 'linear'}}
  >
    <circle cx="12" cy="12" r="4" className="fill-yellow-400" />
    <motion.path
      className="text-yellow-400"
      d="M12 2v2m0 16v2M2 12h2m16 0h2m-3.172-7.172l1.414-1.414M4.929 19.071l1.414-1.414m0-11.314L4.929 4.929m14.142 14.142l-1.414-1.414"
      animate={{scale: [1, 1.1, 1]}}
      transition={{repeat: Infinity, duration: 1.5, ease: 'easeInOut'}}
    />
  </motion.svg>
);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    await login();
    navigate('/', {replace: true});
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 overflow-hidden relative">
      <motion.div
        className="absolute top-10 left-5 w-32 h-16 bg-white rounded-full opacity-80 shadow-lg"
        animate={{x: [0, 50, -50, 0]}}
        transition={{repeat: Infinity, duration: 8, ease: 'linear'}}
      />
      <motion.div
        className="absolute top-20 right-5 w-40 h-20 bg-white rounded-full opacity-80 shadow-lg"
        animate={{x: [0, -50, 50, 0]}}
        transition={{repeat: Infinity, duration: 10, ease: 'linear'}}
      />
      <motion.div
        initial={{y: -20}}
        animate={{y: 0}}
        transition={{repeat: Infinity, repeatType: 'reverse', duration: 1.5}}
        className="relative mb-8"
      >
        <SunIcon />
      </motion.div>
      <motion.h1
        className="text-3xl font-bold mb-8 text-gray-800 flex flex-row items-center gap-2"
        initial={{opacity: 0, y: -10}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 1}}
      >
        Welcome Back!
        <motion.div
          className="text-3xl self-start"
          animate={{rotate: [0, 20, -20, 20, 0]}}
          transition={{repeat: Infinity, duration: 1, ease: 'easeInOut'}}
        >
          👋
        </motion.div>
      </motion.h1>

      <motion.button
        onClick={handleLogin}
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        className="relative overflow-hidden px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 "
      >
        Continue as Guest
      </motion.button>
    </div>
  );
};

export default Login;
