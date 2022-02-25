import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_USERS from "./medication-plan-api";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class MedicationPlanForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                interval: {
                    value: '',
                    placeholder: '',
                    valid: false,
                    touched: false,
                },
                period: {
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

    registerMedicationPlan(medplan) {
        return API_USERS.postMedicationPlan(medplan, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted medication plan with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let medplan = {
            interval: this.state.formControls.interval.value,
            period: this.state.formControls.period.value
        };

        console.log(medplan);
        this.registerMedicationPlan(medplan);
    }

    render() {
        return (
            <div>

                <FormGroup id='interval'>
                    <Label for='intervalField'> Interval: </Label>
                    <Input name='interval' id='intervalField' placeholder={this.state.formControls.interval.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.interval.value}
                           touched={this.state.formControls.interval.touched? 1 : 0}
                           required
                    />

                </FormGroup>

                <FormGroup id='period'>
                    <Label for='periodField'> Period: </Label>
                    <Input name='period' id='periodField' placeholder={this.state.formControls.period.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.period.value}
                           touched={this.state.formControls.period.touched? 1 : 0}
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

export default MedicationPlanForm;
