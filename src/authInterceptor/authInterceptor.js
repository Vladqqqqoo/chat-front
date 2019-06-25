import React from 'react';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import localStorageService from '../services/localStorageService';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {logOut} from "../actions/authActions";

function callAxios(props) {
    axios.interceptors.request.use(request => {
        request.headers['Authorization'] = `Bearer ${localStorageService.getAccessToken()}`;
        return request;
    });

    const refreshAuthLogic = failedRequest => axios.post('http://localhost:3000/refresh', {refreshToken: localStorageService.getRefreshToken()})
        .then(tokenRefreshResponse => {
            console.log(tokenRefreshResponse);
            localStorageService.setTokens(tokenRefreshResponse.data);
            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
            return Promise.resolve();
        })
        .catch((error)=>{
            if(error.response.status===403){
                props.logOut();
                localStorageService.removeTokens();
                return <Redirect to="login"/>
            }
        });

    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    return (
        <div>

        </div>
    );
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            dispatch(logOut())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(callAxios);

