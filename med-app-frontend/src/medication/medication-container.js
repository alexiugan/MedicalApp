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
import MedicationForm from "./medication-form";

import * as API_USERS from "./medication-api"
import MedicationTable from "./medication-table";
import PatientRemoveForm from "../patient/components/parient-remove-form";
import PatientUpdateForm from "../patient/components/patient-update-form";
import MedicationRemoveForm from "./medication-remove-form";
import MedicationUpdateForm from "./medication-update-form";


const buttonStyle = {
    marginLeft:"10px"
};

class MedicationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleRemove = this.toggleRemove.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            removeMedication: false,
            updateMedication: false,
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchMedications();
    }

    fetchMedications() {
        return API_USERS.getMedications((result, status, err) => {

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

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    toggleRemove() {
        this.setState({removeMedication: !this.state.removeMedication});
    }

    toggleUpdate() {
        this.setState({updateMedication: !this.state.updateMedication});
    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.setState({
            selected: false,
            removeMedication: false,
            updateMedication: false
        });
        this.fetchMedications();
    }

    render() {
        let data = localStorage.getItem("role");
        if(data === "0" || data === "1"){
            return (
                <div>
                    <CardHeader>
                        <strong> Medication Management </strong>
                    </CardHeader>
                    <Card>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                <Button color="primary" onClick={this.toggleForm} style={buttonStyle}>Add Medication </Button>
                                <Button color="primary" onClick={this.toggleRemove} style={buttonStyle}>Remove Medication </Button>
                                <Button color="primary" onClick={this.toggleUpdate} style={buttonStyle}>Update Medication </Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                {this.state.isLoaded && <MedicationTable tableData = {this.state.tableData}/>}
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
                            <MedicationForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.removeMedication} toggle={this.toggleRemove}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleRemove}> Remove Medication: </ModalHeader>
                        <ModalBody>
                            <MedicationRemoveForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.updateMedication} toggle={this.toggleUpdate}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleUpdate}> Update Medication: </ModalHeader>
                        <ModalBody>
                            <MedicationUpdateForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                </div>
            )}
        else{
            return (
                <div>
                    <CardHeader>
                        <strong> Medication Management </strong>
                    </CardHeader>
                    <h1>Access not allowed!</h1>
                </div>
            )
        }
    }
}


export default MedicationContainer;
