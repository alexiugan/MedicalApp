import React from 'react';
import validate from "./validators/caregiver-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/caregiver-api";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';


class CaregiverUpdateForm extends React.Component {

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

    updateCaregiver(caregiver){
        return API_USERS.updateCaregiver(caregiver, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated caregiver");
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

        let caregiver = {
            oldName: this.state.formControls.oldName.value,
            newName: this.state.formControls.name.value,
            newGender: this.state.formControls.gender.value,
            newDate: this.state.formControls.date.value,
            newAddress: this.state.formControls.address.value,
        };

        console.log(caregiver);
        this.updateCaregiver(caregiver);
        this.reloadHandler();
    }

    render() {
        return (
            <div>

                <FormGroup id='oldName'>
                    <Label for='oldNameField'> Caregiver to update: </Label>
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

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} onClick={this.handleSubmit}>  Submit </Button>
                    </Col>
                </Row>
            </div>
        ) ;
    }
}

export default CaregiverUpdateForm;
