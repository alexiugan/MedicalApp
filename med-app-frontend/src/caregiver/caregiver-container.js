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
import CaregiverForm from "./components/caregiver-form";

import * as API_USERS from '../caregiver/api/caregiver-api'
import CaregiverTable from "./components/caregiver-table";
import CaregiverRemoveForm from "./components/caregiver-remove-form";
import CaregiverUpdateForm from "./components/caregiver-update-form";


const buttonStyle = {
    marginLeft:"10px"
};

class CaregiverContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleRemove = this.toggleRemove.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            removeCaregiver: false,
            updateCaregiver: false,
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchCaregivers();
    }

    fetchCaregivers() {
        return API_USERS.getCaregivers((result, status, err) => {
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
        this.setState({removeCaregiver: !this.state.removeCaregiver});
    }

    toggleUpdate() {
        this.setState({updateCaregiver: !this.state.updateCaregiver});
    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.setState({
            selected: false,
            removeCaregiver: false,
            updateCaregiver: false
        });
        this.fetchCaregivers();
    }

    render() {
        let data = localStorage.getItem("role");
        if(data === "0") {
            return (
                <div>
                    <CardHeader>
                        <strong> Caregiver Management </strong>
                    </CardHeader>
                    <Card>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                <Button color="primary" onClick={this.toggleForm} style={buttonStyle}>Add Caregiver </Button>
                                <Button color="primary" onClick={this.toggleRemove} style={buttonStyle}>Remove Caregiver </Button>
                                <Button color="primary" onClick={this.toggleUpdate} style={buttonStyle}>Update Caregiver </Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm={{size: '8', offset: 1}}>
                                {this.state.isLoaded && <CaregiverTable tableData={this.state.tableData}/>}
                                {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                    errorStatus={this.state.errorStatus}
                                    error={this.state.error}
                                />}
                            </Col>
                        </Row>
                    </Card>

                    <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleForm}> Add Caregiver: </ModalHeader>
                        <ModalBody>
                            <CaregiverForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.removeCaregiver} toggle={this.toggleRemove}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleRemove}> Remove Caregiver: </ModalHeader>
                        <ModalBody>
                            <CaregiverRemoveForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.updateCaregiver} toggle={this.toggleUpdate}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleUpdate}> Update Caregiver: </ModalHeader>
                        <ModalBody>
                            <CaregiverUpdateForm reloadHandler={this.reload}/>
                        </ModalBody>
                    </Modal>

                </div>
            )}
        else{
            return (
                <div>
                    <CardHeader>
                        <strong> Caregiver Management </strong>
                    </CardHeader>
                    <h1>Access not allowed!</h1>
                </div>
            )
        }

    }
}


export default CaregiverContainer;
