import React from 'react';
import validate from "../../patient/components/validators/patient-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../../patient/api/patient-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';


class PatientUpdateForm extends React.Component {

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
                oldName: {
                    value: '',
                    placeholder: '',
                    valid: false,
                    touched: false,
                },
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
                console.log("RESULT: " + result);
                if (result !== null && (status === 200 || status === 201)) {
                    resolve(result.id);
                } else {
                    reject(error);
                }
            })
        });

    }

    updatePatient(patient){
        return API_USERS.updatePatient(patient, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated patient");
                //this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }


    async handleSubmit() {

        let care_name = this.state.formControls.caregiverID.value;
        this.state.formControls.caregiverID.value = await this.findCaregiver(care_name);
        let plan_period = this.state.formControls.medplanid.value;

        this.state.formControls.medplanid.value = await this.findMedPlan(plan_period);

        let patient = {
            oldName: this.state.formControls.oldName.value,
            newName: this.state.formControls.name.value,
            newGender: this.state.formControls.gender.value,
            newDate: this.state.formControls.date.value,
            newAddress: this.state.formControls.address.value,
            newMedicalRecord: this.state.formControls.medicalRecord.value,
            newCaregiverID: this.state.formControls.caregiverID.value,
            newMedplanid: this.state.formControls.medplanid.value
        };

        console.log(patient);
        this.updatePatient(patient);
        this.reloadHandler();
    }

    render() {
        return (
            <div>

                <FormGroup id='oldName'>
                    <Label for='oldNameField'> Patient to update: </Label>
                    <Input name='oldName' id='oldNameField' placeholder={this.state.formControls.oldName.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.oldName.value}
                           touched={this.state.formControls.oldName.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='name'>
                    <Label for='nameField'>New name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='gender'>
                    <Label for='genderField'>New gender: </Label>
                    <Input name='gender' id='genderField' placeholder={this.state.formControls.gender.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.gender.value}
                           touched={this.state.formControls.gender.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='date'>
                    <Label for='dateField'>New birthday: </Label>
                    <Input name='date' id='dateField' placeholder={this.state.formControls.date.placeholder}
                           type="date"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.date.value}
                           touched={this.state.formControls.date.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'>New address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='medicalRecord'>
                    <Label for='medicalRecordField'>New record: </Label>
                    <Input name='medicalRecord' id='medicalRecordField' placeholder={this.state.formControls.medicalRecord.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.medicalRecord.value}
                           touched={this.state.formControls.medicalRecord.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='caregiverID'>
                    <Label for='caregiverIDField'>New caregiver: </Label>
                    <Input name='caregiverID' id='caregiverIDField' placeholder={this.state.formControls.caregiverID.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.caregiverID.value}
                           touched={this.state.formControls.caregiverID.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='medplanid'>
                    <Label for='medplanidField'>New medication Plan: </Label>
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

export default PatientUpdateForm;
