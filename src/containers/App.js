import React, {} from 'react';
import './App.css';
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {setUser} from "../actions/authActions";


import NavBar from '../components/navBar';
import Layout from '../components/layout';
import Login from '../components/login';

function App(props) {

    return (
        <Layout>
            <NavBar/>
            <Router>
                <Switch>
                    <Route exact path='/'
                           render={() => <Login check={props.setUser}/>}/>
                    <Route path='/chats'/>
                </Switch>
            </Router>
        </Layout>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (userName) => {
            dispatch(setUser(userName))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
