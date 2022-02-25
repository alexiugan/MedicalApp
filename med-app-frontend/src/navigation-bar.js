import React from 'react'
import logo from './commons/images/icon.png';

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '20px'
};

const role = localStorage.getItem("role");

const NavigationBar = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"} alt={"error"}/>
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu right >

                        <DropdownItem>
                            <NavLink href="/caregiver">Caregivers</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/patient">Patients</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/medication">Medication</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/medicationplan">Medication Plans</NavLink>
                        </DropdownItem>

                        <DropdownItem>
                            <NavLink href="/users">{role==='1' || role==='0' || role==='2'? 'Logout' : 'Login'}</NavLink>
                        </DropdownItem>
                        {}



                    </DropdownMenu>

                </UncontrolledDropdown>

            </Nav>
        </Navbar>
    </div>
);

export default NavigationBar
