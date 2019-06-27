import React, {} from 'react';
import './App.css';
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {logIn, logOut} from "../../actions/authActions";
import userSelector from '../../selectors/userSelector';
import chatSelector from '../../selectors/chatSelector';

import NavBar from '../../components/navBar/navBar';
import Layout from '../../components/layout/layout';
import Login from '../../components/login/login';
import ChatBoard from '../../components/chatBoard/chatBoard';
import {ProtectedRoute} from '../../components/protectedRoute/protectedRoute';
import Registration from "../../components/regestration/registration";
import Room from '../../components/room/room';
import {ToastContainer} from "react-toastify";
import CallAxios from '../../authInterceptor/authInterceptor';


function App(props) {
    return (
        <Layout>
            <Router>
                <CallAxios/>
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                <NavBar user={props.user} logOut={props.logOut}/>
                <Switch>
                    <Route
                        path='/login'
                        render={(routerProps) => <Login {...routerProps} logIn={props.logIn} user={props.user}/>}
                    />
                    <ProtectedRoute
                        reduxProps={props}
                        exact
                        path='/'
                        component={ChatBoard}
                    />
                    <Route
                        path='/registration'
                        render={(routerProps) => <Registration {...routerProps} logIn={props.logIn} user={props.user}/>}
                    />
                    <ProtectedRoute
                        reduxProps={props}
                        exact
                        path='/chat/:id'
                        component={Room}
                    />
                    <Route path='*' component={() => '404 NOT FOUND'}/>
                </Switch>
            </Router>
        </Layout>
    );
}

const mapStateToProps = (state) => {
    return {
        user: userSelector.getUser(state),
        chat: chatSelector.getChat(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (user) => {
            dispatch(logIn(user))
        },
        logOut: () => {
            dispatch(logOut())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

