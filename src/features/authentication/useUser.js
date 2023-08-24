import { useQuery } from '@tanstack/react-query';
import { getCurrentUSer } from '../../services/apiAuth';

export function useUSer() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUSer,
  });

  return { user, isLoading, isAuthenticated: user?.role === 'authenticated' };
}
