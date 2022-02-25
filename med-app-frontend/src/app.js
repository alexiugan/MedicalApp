import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PatientContainer from './patient/patient-container'

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import CaregiverContainer from "./caregiver/caregiver-container";
import DoctorContainer from "./doctor/doctor-container";
import LoginForm from "./login/login-form";
import Login from "./login/login-container";
import MedicationPlanContainer from "./medicationPlan/medication-plan-container";
import MedicationContainer from "./medication/medication-container";
import Welcome from "./welcome/welcome";
import RegisterForm from "./register/register";


class App extends React.Component {


    render() {

        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <Route
                            exact
                            path='/welcome'
                            render={() => <Welcome/>}
                        />

                        <Route
                            exact
                            path='/register'
                            render={() => <RegisterForm/>}
                        />

                        <Route
                            exact
                            path='/doctor'
                            render={() => <DoctorContainer/>}
                        />

                        <Route
                            exact
                            path='/users'
                            render={() => <LoginForm/>}
                        />

                        <Route
                            exact
                            path='/patient'
                            render={() => <PatientContainer/>}
                        />

                        <Route
                            exact
                            path='/caregiver'
                            render={() => <CaregiverContainer/>}
                        />

                        <Route
                            exact
                            path='/medication'
                            render={() => <MedicationContainer/>}
                        />

                        <Route
                            exact
                            path='/medicationplan'
                            render={() => <MedicationPlanContainer/>}
                        />

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
