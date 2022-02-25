import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_USERS from "./medication-plan-api";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class AddMedForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                medName: {
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
                medid: {
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

    findMed(name) {
        return new Promise((resolve, reject) => {
            API_USERS.getMedicationByName(name, (result, status, error) => {

                if (result !== null && (status === 200 || status === 201)) {
                    resolve(result);
                } else {
                    reject(error);
                }
            })
        });

    }

    findMedPlan(period) {
        return new Promise((resolve, reject) => {
            API_USERS.getMedicationPlanByPeriod(period, (result, status, error) => {
                console.log("LOOKING FOR : " + period);
                console.log("RESUT IS "+result);
                if (result !== null && (status === 200 || status === 201)) {
                    console.log("OK");
                    resolve(result);
                } else {
                    console.log("not OK: " + result);
                    reject(error);
                }
            })
        });

    }

    addMedToPlan(data) {
        return API_USERS.postMedToPlan(data, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted medication to plan");
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

        let med = this.state.formControls.medName.value;
        let medicationObj = await this.findMed(med);

        let period = this.state.formControls.period.value;
        let planObj = await this.findMedPlan(period);

       let data = {
           med: medicationObj,
           plan: planObj
       };
        this.addMedToPlan(data);
    }

    render() {
        return (
            <div>

                <FormGroup id='medName'>
                    <Label for='medNameField'> Medication to add: </Label>
                    <Input name='medName' id='medNameField' placeholder={this.state.formControls.medName.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.medName.value}
                           touched={this.state.formControls.medName.touched? 1 : 0}
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

export default AddMedForm;
