import React from 'react';
import BackgroundImg from '../commons/images/future-medicine.jpg';

import {Jumbotron} from 'reactstrap';
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



class Home extends React.Component {


    render() {

        return (
            <Jumbotron fluid style={backgroundStyle}>

            </Jumbotron>
        )
    };

}
export default Home
