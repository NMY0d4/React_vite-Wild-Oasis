/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useUSer } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { styled } from '@tanstack/react-query-devtools/build/lib/utils';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. load the authenticated user
  const { user, isLoading } = useUSer();

  // 2. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 3. If therre is NO authenticated user, redirect to the /login
  if (!user) navigate('login');

  // 4. If there IS a user, render the app
  if (user) return children;
}

export default ProtectedRoute;
