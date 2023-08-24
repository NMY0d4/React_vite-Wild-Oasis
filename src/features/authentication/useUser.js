import { useQuery } from '@tanstack/react-query';
import { getCurrentUSer } from '../../services/apiAuth';

export function useUSer() {
  const { mutate: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUSer,
  });

  return { user, isLoading };
}
