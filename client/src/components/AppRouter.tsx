import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { privateRoutes, publicRoutes } from 'routes';
import { RootState } from 'store/store';

export const AppRouter: FC = () => {
  const auth = useSelector((state: RootState) => state.auth.authorized);
  return (
    auth
      ? (
        <Switch>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </Switch>
      )
      : (
        <Switch>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </Switch>
      )
  );
};
