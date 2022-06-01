import React, {FC} from 'react'
import {Route, Switch} from 'react-router-dom'
import {privateRoutes, publicRoutes} from '../routes'
import {useSelector} from 'react-redux'
import {RootState} from '../store/store'

const AppRouter: FC = () => {
    const auth = useSelector((state: RootState) => state.auth.authorized)
    return (
        auth ?
            <Switch>
                {privateRoutes.map(route => <Route
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                />)}
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route => <Route
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                />)}
            </Switch>
    )
}

export default AppRouter
