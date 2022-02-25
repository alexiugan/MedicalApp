import React from 'react';
import validate from "../../patient/components/validators/patient-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../../patient/api/patient-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';


class PatientForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {
            testpls: '',
            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                name: {
                    value: '',
                    placeholder: '',
                    valid: false,
                    touched: false,
                },
                gender: {
                    value: '',
                    placeholder: '',
                    valid: false,
                    touched: false,
                },
                date: {
                    value: '',
                    placeholder: '',
                    valid: false,
                    touched: false,
                },
                address: {
                    value: '',
                    placeholder: '',
                    valid: false,
                    touched: false,
                },
                medicalRecord: {
                    value: '',
                    placeholder: '',
                    valid: false,
                    touched: false,
                },
                caregiverID: {
                    value: '',
                    placeholder: '',
                    valid: false,
                    touched: false,
                },
                medplanid: {
                    value: '',
                    placeholder: '',
                    valid: false,
                    touched: false,
                },

            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerPatient(patient) {
        console.log("Patient is: " + patient);
        return API_USERS.postPatient(patient, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted patient: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    findCaregiver(name) {
        return new Promise((resolve, reject) => {
            API_USERS.getCaregiverByName(name, (result, status, error) => {
                if (result !== null && (status === 200 || status === 201)) {
                    resolve(result.id);
                } else {
                    reject(error);
                }
            })
        });

    }

    findMedPlan(period) {
        return new Promise((resolve, reject) => {
            API_USERS.getMedPlanByPeriod(period, (result, status, error) => {
                if (result !== null && (status === 200 || status === 201)) {
                    resolve(result.id);
                } else {
                    reject(error);
                }
            })
        });

    }


    async handleSubmit() {

        let name = this.state.formControls.caregiverID.value;
        this.state.formControls.caregiverID.value = await this.findCaregiver(name);

        let period = this.state.formControls.medplanid.value;
        this.state.formControls.medplanid.value = await this.findMedPlan(period);

        let patient = {
            name: this.state.formControls.name.value,
            date: this.state.formControls.date.value,
            gender: this.state.formControls.gender.value,
            address: this.state.formControls.address.value,
            medicalRecord: this.state.formControls.medicalRecord.value,
            caregiverid: this.state.formControls.caregiverID.value,
            medplanid: this.state.formControls.medplanid.value
        };

        console.log(patient);
        this.registerPatient(patient);
        //this.reloadHandler();
    }

    render() {
        return (
            <div>

                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='gender'>
                    <Label for='genderField'> Gender: </Label>
                    <Input name='gender' id='genderField' placeholder={this.state.formControls.gender.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.gender.value}
                           touched={this.state.formControls.gender.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='date'>
                    <Label for='dateField'> Birthday: </Label>
                    <Input name='date' id='dateField' placeholder={this.state.formControls.date.placeholder}
                           type="date"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.date.value}
                           touched={this.state.formControls.date.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='medicalRecord'>
                    <Label for='medicalRecordField'> Record: </Label>
                    <Input name='medicalRecord' id='medicalRecordField' placeholder={this.state.formControls.medicalRecord.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.medicalRecord.value}
                           touched={this.state.formControls.medicalRecord.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='caregiverID'>
                    <Label for='caregiverIDField'> Caregiver: </Label>
                    <Input name='caregiverID' id='caregiverIDField' placeholder={this.state.formControls.caregiverID.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.caregiverID.value}
                           touched={this.state.formControls.caregiverID.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='medplanid'>
                    <Label for='medplanidField'> Medication Plan: </Label>
                    <Input name='medplanid' id='medplanidField' placeholder={this.state.formControls.medplanid.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.medplanid.value}
                           touched={this.state.formControls.medplanid.touched? 1 : 0}
                           required
                    />
                </FormGroup>


                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} onClick={this.handleSubmit}>  Submit </Button>
                        </Col>
                    </Row>
            </div>
        ) ;
    }
}

export default PatientForm;
