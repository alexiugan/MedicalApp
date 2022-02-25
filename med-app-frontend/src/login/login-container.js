import React from 'react';

import BackgroundImg from '../commons/images/future-medicine.jpg';

import {Button, Container, Jumbotron} from 'reactstrap';
import LoginForm from "./login-form";
import * as API_USERS from "./login-api";
import {Redirect, withRouter} from 'react-router-dom'

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };
const formStyle = {
    color: 'black',
    margin: 'auto',
    width: '20%',
    backgroundColor:'white',
    padding: '40px',
};

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        //this.reloadHandler = this.props.reloadHandler;

        this.state = {
            errorStatus: 0,
            error: null,

            formControls: {
                username: {
                    value: '',
                    placeholder: '',
                    //valid: false,
                    touched: false,
                },
                password: {
                    value: '',
                    placeholder: '',
                    //valid: false,
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
            formIsValid: true
        });

    };

    validateUser(person) {

        return API_USERS.postLogin(person, (result, status, error) => {


            if (result !== null && (status === 200 || status === 201)) {
                console.log("login succesfull");
                //this.reloadHandler();
                //const { history } = this.props;
                //history.push("/")
                //return <Redirect to='/target' />
                this.context.history.push('/doctor');
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let person = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
        };
        console.log(person);
        this.validateUser(person);
    }




    render() {

        return (

            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid >
                        <h1 className="display-3" style={textStyle}>Integrated Medical Monitoring Platform for Home-care assistance</h1>
                        <h2 style={formStyle}>Sign in</h2 >
                        <div style={formStyle}>
                            <label htmlFor="username">Username:</label><br></br>
                            <input type="text" id="username" name="username"
                                   onChange={this.handleChange}
                                   touched={this.state.formControls.username.touched? 1 : 0}
                                   required
                            ></input><br></br>
                            <label htmlFor="password">Password:</label><br></br>
                            <input type="password" id="password" name="password"
                                   onChange={this.handleChange}
                                   touched={this.state.formControls.password.touched? 1 : 0}
                                   required
                            ></input><br></br>
                            <button onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </Container>
                </Jumbotron>
            </div>
        )
    };
}

export default withRouter(Login)