import {HOST} from '../commons/hosts';
import RestApiClient from "../commons/api/rest-client";


const endpoint = {
    medication: '/medication'
};

function getMedications(callback) {
    let request = new Request(HOST.backend_api + endpoint.medication, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}



function postMedication(medication, callback){
    let request = new Request(HOST.backend_api + endpoint.medication + "/save" , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);

}

function updateMedication(medication, callback){
    let request = new Request(HOST.backend_api + endpoint.medication + "/update" , {
        method: 'PUT',
        headers : { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);

}

function deleteMedication(medication, callback) {

    let name= "";
    for(let i = 0; i<medication.length;i++) {
        if(medication.charAt(i) === ' ')
            name += '-';
        else
            name += medication.charAt(i);

    }

    let request = new Request(HOST.backend_api + endpoint.medication + "/del-by-name/" + name, {
        method: 'DELETE'
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getMedications,
    postMedication,
    deleteMedication,
    updateMedication
};
