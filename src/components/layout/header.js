import React from 'react';
import {  Navbar, NavbarBrand,  Fade } from "reactstrap";
import { NavLink } from "react-router-dom";
import './header.css'


const Header = () => {

    return (
        <Fade>
            <Navbar light color="light" expand="md" id="navb" >
                <NavbarBrand>
                    <NavLink className="nav-link" to="/" >
                        <h2>Web Scraper</h2>
                    </NavLink>
                </NavbarBrand>
            </Navbar>
        </Fade>
    )
}


export default Header;