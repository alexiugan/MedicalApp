import React from 'react';

import * as API_USERS from "../login/login-api";

import {Button, Form, Label, Input, Jumbotron, NavLink} from 'reactstrap';

import BackgroundImg from "../commons/images/future-medicine.jpg";
import {Link} from "react-router-dom";


const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};

const textStyle = {
    fontSize: "44px",
    color: 'white',
    textAlign:'center',
    borderBottom: "solid",
    borderWidth: "2px",
    borderColor: "lightgrey",
    padding: "7px",
    marginBottom:"10px"
};

const registerForm = {
    borderRadius: "10px",
    width: "100%",
    maxWidth: "330px",
    padding: "15px",
    margin: "auto",
    height: "28%",
    backgroundColor: "#708090"
};

const registerButton = {
    display: 'inline-block',
    marginTop: "30px",
    marginLeft: "8%",
    backgroundColor: "black",
    color: "white",
    paddingTop: '12px',
    paddingBottom: '17px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textDecoration: 'none',
    boxSizing: 'border-box',
    borderRadius: '6%'
};


class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        //this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,
            validMsg: '',
            invalidMsg: '',

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
                name: {
                    value: '',
                    placeholder: '',
                    //valid: false,
                    touched: false,
                },
                role: {
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

    registerUser(login) {
        return API_USERS.registerLogin(login, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {

                console.log("Signup successful");
            } else {
                console.log("There was an error");
            }

        });
    }

    handleSubmit() {
        let login = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
            role: this.state.formControls.role.value,
            name: this.state.formControls.name.value
        };

        console.log(login);
        this.registerUser(login);
    }

    render() {

        return (
            <div>
                <Jumbotron style={backgroundStyle}>
                    <Form style={registerForm}>
                        <h1 style={textStyle}>Login</h1>

                        <Label htmlFor='name'>Name: </Label>
                        <Input name='name' id='name' type='name'
                               onChange={this.handleChange}
                               touched={this.state.formControls.name.touched? 1 : 0}
                               required
                        />

                        <Label htmlFor='username'> Username: </Label>
                        <Input type='text' name='username' id='username'
                               onChange={this.handleChange}
                               touched={this.state.formControls.username.touched? 1 : 0}
                               required
                        />


                        <Label htmlFor='password'> Password: </Label>
                        <Input name='password' id='password' type='password'
                               onChange={this.handleChange}
                               touched={this.state.formControls.password.touched? 1 : 0}
                               required
                        />

                        <Label htmlFor='role'> Role: </Label>
                        <Input name='role' id='role' type='role'
                               onChange={this.handleChange}
                               touched={this.state.formControls.role.touched? 1 : 0}
                               required
                        />

                        <Link to={`/users`} style={registerButton} onClick={this.handleSubmit}> Register </Link>
                        <Link to={`/users`} style={registerButton} > Cancel </Link>

                    </Form>


                </Jumbotron>
            </div>
        ) ;
    }
}

export default RegisterForm;