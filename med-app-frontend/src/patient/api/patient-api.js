import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    patient: '/patient'
};

function getPatients(callback) {
    let request = new Request(HOST.backend_api + endpoint.patient, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function deletePatient(patient, callback) {

    let name= "";
    for(let i = 0; i<patient.length;i++) {
        if(patient.charAt(i) === ' ')
            name += '-';
        else
            name += patient.charAt(i);

    }

    let request = new Request(HOST.backend_api + endpoint.patient + "/del-by-name/" + name, {
        method: 'DELETE'
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPatientsForCaregiver(id, callback){

    let request = new Request(HOST.backend_api + endpoint.patient + "/find-by-caregiver", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id)
    });
    RestApiClient.performRequest(request, callback);
}

function postPatient(patient, callback){

    let request = new Request(HOST.backend_api + endpoint.patient + "/save", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregiverById(caregiver, callback){

    let request = new Request(HOST.backend_api + "/caregiver/id", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(caregiver)
    });

    RestApiClient.performRequest(request, callback);

}

function getCaregiverByName(caregiver, callback){

    let request = new Request(HOST.backend_api + "/caregiver/name", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(caregiver)
    });

    RestApiClient.performRequest(request, callback);

}

function getMedPlanByPeriod(period, callback){
    let request = new Request(HOST.backend_api + "/medicationplan/period", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: period
    });
    RestApiClient.performRequest(request, callback);

}

function updatePatient(patient, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + "/update" , {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getPatients,
    postPatient,
    getCaregiverById,
    getMedPlanByPeriod,
    deletePatient,
    getPatientsForCaregiver,
    getCaregiverByName,
    updatePatient
};
