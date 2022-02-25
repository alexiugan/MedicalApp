import {HOST} from '../commons/hosts';
import RestApiClient from "../commons/api/rest-client";


const endpoint = {
    user: '/users'
};


function registerLogin(login, callback){
    let request = new Request(HOST.backend_api + endpoint.user + "/signup" , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login)
    });

    RestApiClient.performRequest(request, callback);

}


function postLogin(login, callback){
    let request = new Request(HOST.backend_api + endpoint.user + "/login" , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login)
    });

    console.log("URL: " + request.url);
    //localStorage.setItem("login", login.role.toString());
    RestApiClient.performRequest(request, callback);

}

export {
    postLogin,
    registerLogin
};
