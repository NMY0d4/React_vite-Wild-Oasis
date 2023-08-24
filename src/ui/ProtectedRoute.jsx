/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useUSer } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { styled } from 'styled-components';
import { useEffect } from 'react';

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
  const { isLoading, isAuthenticated } = useUSer();

  // 2. If therre is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('login');
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
