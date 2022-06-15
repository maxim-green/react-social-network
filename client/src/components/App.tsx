import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { deinitializeApp, initializeApp } from 'store/reducers/app.reducer';
import { Spinner } from 'components/_shared/Spinner/Spinner';
import { AppRouter } from './AppRouter';

export const App: React.FC = () => {
  const initialized = useSelector((state: RootState) => state.app.initialized);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeApp());
    return () => { dispatch(deinitializeApp()); };
  }, [dispatch]);

  if (!initialized) return <Spinner size={100} thickness={4} fullscreen />;
  return (
    <Suspense fallback={<Spinner size={100} thickness={4} fullscreen />}>
      <AppRouter />
    </Suspense>
  );
};
