import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    caregiver: '/caregiver'
};

function getCaregivers(callback) {
    let request = new Request(HOST.backend_api + endpoint.caregiver, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregiverById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postCaregiver(caregiver, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + "/save", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(caregiver)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);

}


function deleteCaregiver(caregiver, callback) {

    let name= "";
    for(let i = 0; i<caregiver.length;i++) {
        if(caregiver.charAt(i) === ' ')
            name += '-';
        else
            name += caregiver.charAt(i);

    }

    let request = new Request(HOST.backend_api + endpoint.caregiver + "/del-by-name/" + name, {
        method: 'DELETE'
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function updateCaregiver(caregiver, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + "/update" , {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(caregiver)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);

}


export {
    getCaregivers,
    getCaregiverById,
    postCaregiver,
    deleteCaregiver,
    updateCaregiver
};
