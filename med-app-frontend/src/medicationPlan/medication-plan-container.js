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
import MedicationPlanForm from "./medication-plan-form";

import * as API_USERS from "./medication-plan-api"
import MedicationPlanTable from "./medication-plan-table";
import MedicationPlanRemoveForm from "./medication-plan-remove-form";
import MedicationPlanUpdateForm from "./medication-plan-update-form";
import AddMedForm from "./medication-plan-add-med";
import PatientContainer from "../patient/patient-container";

const buttonStyle = {
    marginLeft:"10px"
};

class MedicationPlanContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleRemove = this.toggleRemove.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.toggleAddMed = this.toggleAddMed.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            addMed: false,
            removeMedicationPlan: false,
            updateMedicationPlan: false,
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchMedicationPlans();
    }

    async fetchMedicationPlans() {
        let data = localStorage.getItem("role");
        if (data === "0" || data === "1") {
            return API_USERS.getMedicationPlans((result, status, err) => {
                console.log(result);
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
        } else if (data === "2") {
            let name = localStorage.getItem("name");

            let medplanid = await this.getPatient(name);

            let medplan = {
                id: medplanid
            };

            await this.getMedPlan(medplan);
        }
    }

    getMedPlan(medplan){
        return new Promise((resolve, reject) => {
            return API_USERS.getMedicationPlanByID(medplan, (result, status, err) => {

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

    getPatient(name){
        return new Promise((resolve, reject) => {
            API_USERS.getPatient(name, (result, status, error) => {
                if (result !== null && (status === 200 || status === 201)) {
                    resolve(result.medplanid);
                } else {
                    reject(error);
                }
            })
        });
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    toggleRemove() {
        this.setState({removeMedicationPlan: !this.state.removeMedicationPlan});
    }

    toggleUpdate() {
        this.setState({updateMedicationPlan: !this.state.updateMedicationPlan});
    }

    toggleAddMed() {
        this.setState({addMed: !this.state.addMed});
    }


    reload() {
        this.setState({
            isLoaded: false
        });
        this.setState({
            addMed:false,
            selected: false,
            removeMedicationPlan: false,
            updateMedicationPlan: false
        });
        this.fetchMedicationPlans();
    }

    render() {
        let data = localStorage.getItem("role");
        if(data === "0"){
            return (
                <div>
                    <CardHeader>
                        <strong>Medication Plans</strong>
                    </CardHeader>
                    <Card>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                <Button color="primary" onClick={this.toggleForm} style={buttonStyle}>Add Medication Plan</Button>
                                <Button color="primary" onClick={this.toggleRemove} style={buttonStyle}>Remove Medication Plan </Button>
                                <Button color="primary" onClick={this.toggleUpdate} style={buttonStyle}>Update Medication Plan</Button>
                                <Button color="primary" onClick={this.toggleAddMed} style={buttonStyle}>Add Medication to Plan</Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                {this.state.isLoaded && <MedicationPlanTable tableData = {this.state.tableData}/>}
                                {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                    errorStatus={this.state.errorStatus}
                                    error={this.state.error}
                                />   }
                            </Col>
                        </Row>
                    </Card>

                    <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleForm}> Add Medication Plan: </ModalHeader>
                        <ModalBody>
                            <MedicationPlanForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.removeMedicationPlan} toggle={this.toggleRemove}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleRemove}> Remove Medication Plan: </ModalHeader>
                        <ModalBody>
                            <MedicationPlanRemoveForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.updateMedicationPlan} toggle={this.toggleUpdate}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleUpdate}> Update Medication Plan: </ModalHeader>
                        <ModalBody>
                            <MedicationPlanUpdateForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.addMed} toggle={this.toggleAddMed}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleAddMed}> Add Medication to Plan: </ModalHeader>
                        <ModalBody>
                            <AddMedForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                </div>
            )}
        else if(data === "1"){
            return (
                <div>
                    <CardHeader>
                        <strong>Medication Plans</strong>
                    </CardHeader>
                    <Card>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                <Button color="primary" onClick={this.toggleForm} style={buttonStyle}>Add Medication Plan</Button>
                                <Button color="primary" onClick={this.toggleRemove} style={buttonStyle}>Remove Medication Plan </Button>
                                <Button color="primary" onClick={this.toggleUpdate} style={buttonStyle}>Update Medication Plan</Button>
                                <Button color="primary" onClick={this.toggleAddMed} style={buttonStyle}>Add Medication to Plan</Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                {this.state.isLoaded && <MedicationPlanTable tableData = {this.state.tableData}/>}
                                {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                    errorStatus={this.state.errorStatus}
                                    error={this.state.error}
                                />   }
                            </Col>
                        </Row>
                    </Card>

                </div>
            )
        }
        else if(data === "2"){
            return (
                <div>
                    <CardHeader>
                        <strong>Medication Plans</strong>
                    </CardHeader>
                    <Card>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                {this.state.isLoaded && <MedicationPlanTable tableData = {this.state.tableData}/>}
                                {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                    errorStatus={this.state.errorStatus}
                                    error={this.state.error}
                                />   }
                            </Col>
                        </Row>
                    </Card>

                </div>
            )
        }
        else{
            return (
                <div>
                    <CardHeader>
                        <strong> Medication Plans </strong>
                    </CardHeader>
                    <h1>Access not allowed!</h1>
                </div>
            )
        }
    }
}


export default MedicationPlanContainer;
