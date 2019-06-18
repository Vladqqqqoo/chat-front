import React, {} from 'react';
import './App.css';
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import {logIn} from "../../actions/authActions";

import NavBar from '../../components/navBar/navBar';
import Layout from '../../components/layout/layout';
import Login from '../../components/login/login';
import ChatBoard from '../../components/chatBoard/chatBoard';

function App(props) {

    const ProtectedRoute = ({component: Component, ...rest}) => (
        <Route {...rest} render={(outProps) => (
            props.user.isAuthorized === true
                ? <Component {...outProps}/>
                : <Redirect to='/login'/>
        )}/>
    );

    return (
        <Layout>
            <Router>
                <NavBar/>
                <Switch>
                    <Route exact path='/login'
                           render={() => <Login logIn={props.logIn}/>}
                    />
                    <ProtectedRoute
                        path='/'
                        render={(props) => <ChatBoard user={props.user}/>}
                    />
                </Switch>
            </Router>
        </Layout>
    );
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (user) => {
            dispatch(logIn(user))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

