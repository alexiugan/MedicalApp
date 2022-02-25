import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import PatientForm from "./components/patient-form";

import * as API_USERS from "./api/patient-api"
import PatientTable from "./components/patient-table";
import PatientRemoveForm from "./components/parient-remove-form";
import PatientUpdateForm from "./components/patient-update-form";
import {getCaregiverByName} from "./api/patient-api";

const buttonStyle = {
    marginLeft:"10px"
};

class PatientContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleRemove = this.toggleRemove.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            removePatient: false,
            updatePatient: false,
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchPatients();

    }

    getCaregiver(name){
        return new Promise((resolve, reject) => {
            API_USERS.getCaregiverByName(name, (result, status, error) => {
                if (result !== null && (status === 200 || status === 201)) {
                    resolve(result);
                } else {
                    reject(error);
                }
            })
        });
    }

    getPatientsForCaregiver(caregiverid){
        return new Promise((resolve, reject) => {
            return API_USERS.getPatientsForCaregiver(caregiverid, (result, status, err) => {

                if (result !== null && status === 200) {
                    this.setState({
                        tableData: result,
                        isLoaded: true
                    });
                } else {
                    this.setState(({
                        errorStatus: status,
                        error: err
                    }));
                }
            });
        });
    }

    async fetchPatients() {
        let data = localStorage.getItem("role");
        if(data === "0")
        {
            return API_USERS.getPatients((result, status, err) => {

                if (result !== null && status === 200) {
                    this.setState({
                        tableData: result,
                        isLoaded: true
                    });
                } else {
                    this.setState(({
                        errorStatus: status,
                        error: err
                    }));
                }
            });
        }
        else if(data === "1")
        {
            let name = localStorage.getItem("name");
            let caregiverid = await this.getCaregiver(name);

            let caregiver = {
                id: caregiverid.id
            };

            await this.getPatientsForCaregiver(caregiver);

    }}

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    toggleRemove() {
        this.setState({removePatient: !this.state.removePatient});
    }

    toggleUpdate() {
        this.setState({updatePatient: !this.state.updatePatient});
    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.setState({
            selected: false,
            removePatient: false,
            updatePatient: false
        });

        let data = localStorage.getItem("role");

        this.fetchPatients();

    }

    render() {
        let data = localStorage.getItem("role");
        if(data === "0"){
            return (
                <div>
                    <CardHeader>
                        <strong> Patient Management </strong>
                    </CardHeader>
                    <Card>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                <Button color="primary" onClick={this.toggleForm} style={buttonStyle}>Add Patient </Button>
                                <Button color="primary" onClick={this.toggleRemove} style={buttonStyle}>Remove Patient </Button>
                                <Button color="primary" onClick={this.toggleUpdate} style={buttonStyle}>Update Patient </Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                {this.state.isLoaded && <PatientTable tableData = {this.state.tableData}/>}
                                {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                                errorStatus={this.state.errorStatus}
                                                                error={this.state.error}
                                                            />   }
                            </Col>
                        </Row>
                    </Card>

                    <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleForm}> Add Patient: </ModalHeader>
                        <ModalBody>
                            <PatientForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.removePatient} toggle={this.toggleRemove}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleRemove}> Remove Patient: </ModalHeader>
                        <ModalBody>
                            <PatientRemoveForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.updatePatient} toggle={this.toggleUpdate}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleUpdate}> Update Patient: </ModalHeader>
                        <ModalBody>
                            <PatientUpdateForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                </div>
            )}
        else if(data === "1"){
            return (
                <div>
                    <CardHeader>
                        <strong> Patient Management </strong>
                    </CardHeader>
                    <Card>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                <Button color="primary" onClick={this.toggleUpdate} style={buttonStyle}>Update Patient </Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                {this.state.isLoaded && <PatientTable tableData = {this.state.tableData}/>}
                                {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                    errorStatus={this.state.errorStatus}
                                    error={this.state.error}
                                />   }
                            </Col>
                        </Row>
                    </Card>

                    <Modal isOpen={this.state.updatePatient} toggle={this.toggleUpdate}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleUpdate}> Update Patient: </ModalHeader>
                        <ModalBody>
                            <PatientUpdateForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                </div>
            )
        }
        else{
            return (
                <div>
                    <CardHeader>
                        <strong> Patient Management </strong>
                    </CardHeader>
                    <h1>Access not allowed!</h1>
                </div>
            )
        }
    }
}


export default PatientContainer;
