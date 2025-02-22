import {FC, createContext, useContext, useState, useCallback, ReactNode} from 'react';
import {createPortal} from 'react-dom';
import Icon from './Icon';
import {Toast, ToastContextProps, ToastProviderProps, ToastType} from './type';

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

const getToastIcon = (type: ToastType): ReactNode => {
  switch (type) {
    case 'success':
      return <Icon name="check_circle" />;
    case 'error':
      return <Icon name="error" />;
    case 'info':
      return <Icon name="info" />;
    default:
      return <Icon name="notification" />;
  }
};

const toastClasses = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return 'bg-green-500 text-white';
    case 'error':
      return 'bg-red-500 text-white';
    case 'info':
      return 'bg-blue-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const ToastProvider: FC<ToastProviderProps> = ({children}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, {id, message, type}]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{addToast}}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex flex-row justify-center gap-2 items-center p-4 rounded shadow-md ${toastClasses(
                toast.type
              )}`}
            >
              {getToastIcon(toast.type)}
              {toast.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
