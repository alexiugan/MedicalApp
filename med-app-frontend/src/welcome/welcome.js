import React from 'react';
import BackgroundImg from '../commons/images/future-medicine.jpg';

import {Button, Form, Input, Jumbotron, Label} from 'reactstrap';
//import {HOST} from "../commons/hosts";
//import RestApiClient from "../commons/api/rest-client";
//import * as API_USERS from "../person/api/person-api";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};

const textStyle = {
    fontSize: "38px",
    color: 'white',
    textAlign:'center',
    borderBottom: "solid",
    borderWidth: "2px",
    borderColor: "lightgrey",
    padding: "7px",
    marginBottom:"10px"
};

const messageStyle = {
    fontSize: "22px",
    color: 'white',
    textAlign:'center',
    padding: "7px",
    marginBottom:"10px"
};


const boxStyle = {
    borderRadius: "10px",
    width: "100%",
    maxWidth: "400px",
    padding: "15px",
    margin: "auto",
    height: "11%",
    backgroundColor: "#708090"
};


class Welcome extends React.Component {


    render() {
        let name = localStorage.getItem("name")
        return (
            <Jumbotron fluid style={backgroundStyle}>
                <div style={boxStyle}>
                    <h1 style={textStyle}>Welcome, {name}</h1>
                    <div style={messageStyle}>
                        Your login was successful!
                    </div>
                </div>



            </Jumbotron>
        )
    };

}
export default Welcome
