import React from 'react';
import {Route, Redirect} from 'react-router-dom'

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (rest.reduxProps.user.isAuthorized) {
                    return <Component {...props} {...rest.reduxProps}/>
                } else {
                    return <Redirect to='/login'/>
                }
            }
        }/>
    )
}
