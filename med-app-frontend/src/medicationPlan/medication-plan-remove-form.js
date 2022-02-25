import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_USERS from "../medicationPlan/medication-plan-api";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';


class MedicationPlanRemoveForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {
            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
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

    deleteMedicationPlan(medicationPlan) {
        return API_USERS.deleteMedicationPlan(medicationPlan.period, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully deleted medication plan");
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }




    async handleSubmit() {

        let medicationPlan = {
            period: this.state.formControls.period.value,
        };

        console.log(medicationPlan);
        this.deleteMedicationPlan(medicationPlan);
        this.reloadHandler();
    }

    render() {
        return (
            <div>

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

export default MedicationPlanRemoveForm;
