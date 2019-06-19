import React from 'react';
import {Route, Redirect} from 'react-router-dom'

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (rest.user.isAuthorized) {
                    return <Component {...props} user={rest.user}/>
                } else {
                    return <Redirect to='/login'/>
                }
            }
        }/>
    )
}
