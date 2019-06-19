import React, {} from 'react';
import './App.css';
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {logIn} from "../../actions/authActions";

import NavBar from '../navBar/navBar';
import Layout from '../../components/layout/layout';
import Login from '../../components/login/login';
import ChatBoard from '../../components/chatBoard/chatBoard';
import {ProtectedRoute} from '../../components/protectedRoute/protectedRoute';
import Registration from "../../components/regestration/registration";


function App(props) {
    return (
        <Layout>
            <Router>
                <NavBar/>
                <Switch>
                    <Route
                        path='/login'
                        render={(routerProps) => <Login {...routerProps} logIn={props.logIn} user={props.user}/>}
                    />
                    <ProtectedRoute
                        user={props.user}
                        exact
                        path='/'
                        component={ChatBoard}
                    />
                    <Route
                        path='/registration'
                        render={(routerProps) => <Registration {...routerProps} logIn={props.logIn} user={props.user}/>}
                    />
                    <Route path='*' component={() => '404 NOT FOUND'}/>
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

