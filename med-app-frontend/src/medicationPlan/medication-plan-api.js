import {HOST} from '../commons/hosts';
import RestApiClient from "../commons/api/rest-client";


const endpoint = {
    medplan: '/medicationplan'
};

function getMedicationPlans(callback) {
    let request = new Request(HOST.backend_api + endpoint.medplan, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedicationPlan(medplan, callback){
    let request = new Request(HOST.backend_api + endpoint.medplan + "/save", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medplan)
    });
    RestApiClient.performRequest(request, callback);

}

function deleteMedicationPlan(period, callback) {
    let request = new Request(HOST.backend_api + endpoint.medplan + "/del-by-period/" + period, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationByName(med, callback){
    let name= "";
    for(let i = 0; i<med.length;i++) {
        if(med.charAt(i) === ' ')
            name += '-';
        else
            name += med.charAt(i);

    }
    console.log("Sending " + name);
    let request = new Request(HOST.backend_api + "/medication/name", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(name)
    });

    RestApiClient.performRequest(request, callback);
}

function getMedicationPlanByPeriod(period, callback){
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


function getMedicationPlanByID(id, callback){

    let request = new Request(HOST.backend_api + endpoint.medplan + "/id", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id)
    });

    RestApiClient.performRequest(request, callback);
}

function postMedToPlan(data, callback){
    let request = new Request(HOST.backend_api + endpoint.medplan + "/add-med", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    RestApiClient.performRequest(request, callback);

}

function getPatient(name, callback){

    let request = new Request(HOST.backend_api + "/patient/name", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(name)
    });
    RestApiClient.performRequest(request, callback);
}


function updateMedPlan(plan, callback){
    let request = new Request(HOST.backend_api + endpoint.medplan + "/update" , {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(plan)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);

}

export {
    getMedicationPlans,
    postMedicationPlan,
    deleteMedicationPlan,
    getMedicationByName,
    getMedicationPlanByPeriod,
    postMedToPlan,
    getPatient,
    getMedicationPlanByID,
    updateMedPlan
};
