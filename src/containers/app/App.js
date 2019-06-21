import React, {} from 'react';
import './App.css';
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {logIn} from "../../actions/authActions";
import {connectSocket} from '../../actions/chatActions';

import NavBar from '../navBar/navBar';
import Layout from '../../components/layout/layout';
import Login from '../../components/login/login';
import ChatBoard from '../../components/chatBoard/chatBoard';
import {ProtectedRoute} from '../../components/protectedRoute/protectedRoute';
import Registration from "../../components/regestration/registration";
import Room from '../../components/room/room';
import {ToastContainer} from "react-toastify";


function App(props) {
    return (
        <Layout>
            <Router>
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
                <NavBar/>
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
        user: state.user,
        chat: state.chat
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (user) => {
            dispatch(logIn(user))
        },
        connectSocket: () => {
            dispatch(connectSocket())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

