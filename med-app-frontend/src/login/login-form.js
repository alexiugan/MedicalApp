import React from 'react';

import * as API_USERS from "./login-api";

import {Button, Form, Label, Input, Jumbotron, NavLink} from 'reactstrap';

import BackgroundImg from "../commons/images/future-medicine.jpg";
import Cookies from 'universal-cookie/es6/Cookies';
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

const loginForm = {
    borderRadius: "10px",
    width: "100%",
    maxWidth: "330px",
    padding: "15px",
    margin: "auto",
    height: "20%",
    backgroundColor: "#708090"
};


const validMsg = {
    textAlign:'center',
    marginBottom: "5px",
    color: "white"
};

const invalidMsg = {
    textAlign:'center',
    marginBottom: "5px",
    color: "red"
};

const loginButton = {
    display: 'inline-block',
    width: "40%",
    marginLeft: "7%",
    height: "15%",
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingLeft: '28px',
    paddingRight: '28px',
    backgroundColor: "black"
};

const registerButton = {
    display: 'inline-block',
    marginTop: "20px",
    marginLeft: "7%",
    backgroundColor: "black",
    color: "white",
    paddingTop: '10px',
    paddingBottom: '14px',
    paddingLeft: '32px',
    paddingRight: '32px',
    textDecoration: 'none',
    boxSizing: 'border-box',
    borderRadius: '6%'
};

class LoginForm extends React.Component {

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

    verifyLogin(login) {
        return API_USERS.postLogin(login, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {

                this.setState({
                    validMsg: "Login successful!",
                    invalidMsg: ""
                });
                //this.reloadHandler();
                switch (result.role){
                    case 0: {
                        localStorage.setItem("role", "0");
                        break;
                    }
                    case 1: {
                        localStorage.setItem("role", "1");
                        break;
                    }
                    case 2: {
                        localStorage.setItem("role", "2");
                        break;
                    }
                }
                localStorage.setItem("name", result.name);

            } else {

                this.setState(({
                    errorStatus: status,
                    error: error,
                    invalidMsg: "Invalid username or password!",
                    validMsg: ""
                }));
            }

        });
    }

    handleSubmit() {
        let login = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value
        };

        console.log(login);
        this.verifyLogin(login);

    }

    initStorage(){
    localStorage.setItem("role", "42");
    localStorage.setItem("name", "-");
    }


    render() {
        this.initStorage();
        console.log(localStorage.getItem("name"));
        // let cookie = new Cookies();
        // cookie.set('role', 42);
        // cookie.set('name', '-');
        // console.log("Cookie: " + cookie.get('role'));
        return (
            <div>
                <Jumbotron style={backgroundStyle}>
                    <Form style={loginForm}>
                        <h1 style={textStyle}>Login</h1>
                        <div className="message" style={validMsg}>{this.state.validMsg}</div>
                        <div className="message" style={invalidMsg}>{this.state.invalidMsg}</div>

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
                        <Button style={loginButton} onClick={this.handleSubmit}> Login </Button>
                        <Link to={`/register`} style={registerButton}> Signup </Link>

                    </Form>


                </Jumbotron>
            </div>
        ) ;
    }
}

export default LoginForm;