import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_USERS from "../medicationPlan/medication-plan-api";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';


class MedicationPlanUpdateForm extends React.Component {

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
                oldPeriod: {
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
                interval: {
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

    registerMedicationPlan(medicationPlan) {
        return API_USERS.postMedicationPlan(medicationPlan, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted medication plan: " + result);
                //this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }


    deleteMedicationPlan(medicationPlan){
        return API_USERS.deleteMedicationPlan(medicationPlan.period, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully deleted medication plan");
                //this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    updateMedPlan(plan){
        return API_USERS.updateMedPlan(plan, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated medication plan");
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
            oldPeriod: this.state.formControls.oldPeriod.value,
            newPeriod: this.state.formControls.period.value,
            newInterval: this.state.formControls.interval.value
        };

        this.updateMedPlan(med);
        this.reloadHandler();
    }

    render() {
        return (
            <div>

                <FormGroup id='oldPeriod'>
                    <Label for='oldPeriodField'> Medication Plan to update (enter period): </Label>
                    <Input name='oldPeriod' id='oldPeriodField' placeholder={this.state.formControls.oldPeriod.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.oldPeriod.value}
                           touched={this.state.formControls.oldPeriod.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='period'>
                    <Label for='periodField'>New period: </Label>
                    <Input name='period' id='periodField' placeholder={this.state.formControls.period.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.period.value}
                           touched={this.state.formControls.period.touched? 1 : 0}
                           required
                    />
                </FormGroup>

                <FormGroup id='interval'>
                    <Label for='intervalField'>New interval: </Label>
                    <Input name='interval' id='intervalField' placeholder={this.state.formControls.interval.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.interval.value}
                           touched={this.state.formControls.interval.touched? 1 : 0}
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

export default MedicationPlanUpdateForm;
