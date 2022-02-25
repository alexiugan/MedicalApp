import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_USERS from "../medication/medication-api";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';


class MedicationUpdateForm extends React.Component {

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
                dosage: {
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
        //updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
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

    registerMedication(medication) {
        return API_USERS.postMedication(medication, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted medication: " + result);
                //this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }


    deleteMedication(medication){
        return API_USERS.deleteMedication(medication.name, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully deleted medication");
                //this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    updateMedication(medication){
        return API_USERS.updateMedication(medication, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated medication");
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

        let med = {
            oldName: this.state.formControls.oldName.value,
            newName: this.state.formControls.name.value,
            newDosage: this.state.formControls.dosage.value
        };

        this.updateMedication(med);
        this.reloadHandler();
    }

    render() {
        return (
            <div>

                <FormGroup id='oldName'>
                    <Label for='oldNameField'> Medication to update: </Label>
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

                <FormGroup id='dosage'>
                    <Label for='dosageField'>New dosage: </Label>
                    <Input name='dosage' id='dosageField' placeholder={this.state.formControls.dosage.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.dosage.value}
                           touched={this.state.formControls.dosage.touched? 1 : 0}
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

export default MedicationUpdateForm;
