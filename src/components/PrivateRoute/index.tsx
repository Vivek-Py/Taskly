import {Navigate} from 'react-router-dom';
import useAuthStore, {AuthState} from '@store/useAuthStore';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  const isAuthenticated = useAuthStore((state: AuthState) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
