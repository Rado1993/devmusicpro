import React, { useState, useEffect } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import '../custom.css'


const NavMenu = () => {
    const [isOpen, setToggle] = useState(false);
    const [alto, setAlto] = useState(0);
    const [userOpen, setuserOpen] = useState(false);

    const toggle = () => {
        setToggle(!isOpen);
    }

    const toggleUser = () => {
        setuserOpen(!userOpen);
    }


    return (
                    <React.Fragment>
                        <header>
                            {/* <div className="barraHeader"></div> */}
                            <Navbar className="navbar-expand-sm navbar-toggleable-sm border-vantaz box-shadow mb-3" light>
                                <Container fluid>
                                <div className="ms-Grid-col ms-sm1 ms-md2 ms-lg2"></div>
                                <div className="ms-Grid-col ms-sm5 ms-md5 ms-lg5">
                                    <NavbarBrand tag={Link} to="/" className="SGP">Tienda de instrumentos de música "MusicPro"</NavbarBrand>
                                    <NavbarToggler id="nav-toggler" onClick={toggle} className="mr-2" />
                                </div>
                                 <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        {/* <Collapse id="principal" className={"d-sm-inline-flex flex-sm-row-reverse "}
                                            isOpen={isOpen} navbar>
                                            <ul className="navbar-nav flex-grow">
                                                <Input type="text" className="inputBuscador"></Input>
                                                <a href="" className="icoBuscar"></a>

                                               
                                            </ul>
                                        </Collapse> */}
                                </div> 
                                    
                                    
                                </Container>
                            </Navbar>
                        </header>
                    </React.Fragment>
    ); 
}

export default NavMenu;
