import * as React from 'react';
import { useState } from 'react';
import './SideNavigation.css';
import logo from '../img/Logo.png';
import { IIconProps} from 'office-ui-fabric-react';
import { IconButton } from '@fluentui/react/lib/Button';

import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const home: IIconProps = { iconName: 'Home' };
const estadistica: IIconProps = { iconName: 'Chart' };
const factura: IIconProps = { iconName: 'TextDocument' };
const orden: IIconProps = { iconName: 'Commitments' };
const registro: IIconProps = { iconName: 'UserFollowed' };
const nota: IIconProps = { iconName: 'OpenEnrollment' };
const reserva: IIconProps = { iconName: 'Clock' };

const SideNavigation = () => {
    const [marginLeft, setMargin] = useState(-15);
    const [width, setWidth] = useState('4.5%');

    const [isMenuOpen, setMenuOpen] = useState(true);

    const MenuOpen = () => {
        setMenuOpen(!isMenuOpen);

        if (isMenuOpen) {
            setMargin(-15);
            setWidth('4.5%');
        } else {
            setMargin(-15);
            setWidth('9%');
        }

    }

    

    return (
        <React.Fragment>
                        <div id="sidebar-menu" className="sideBarMenuContainer">
                            <Navbar style={{ width: '9%', marginLeft: marginLeft, position: 'fixed' }} fluid className="sidebar">

                                 <div className="logoVantaz">
                                    <img src={logo} alt="" />
                                </div>  
                                
                                <div className="marginMenu">
                                     <NavbarToggler id="slider-toggler" onClick={MenuOpen} >
                                        <NavLink className="userMenu">

                                              {/* {isMenuOpen ? <span>Cerrar</span>: <span>Abrir</span>}   */}

                                        </NavLink>
                                    </NavbarToggler> 
                                    <Collapse id="coll">
                                        <NavLink>
                                            <NavbarBrand className="Opcionmenu" tag={Link} to={"/sistema_gestion"}><IconButton iconProps={home} ariaLabel="Alto"/><span>{isMenuOpen ? "Inicio" : ""}</span> </NavbarBrand>
                                            {/* <NavbarBrand className="Opcionmenu" tag={Link} to={"/sistema_gestion"}><span>{isMenuOpen ? "Inicio" : ""}</span> </NavbarBrand> */}
                                        </NavLink>
                                        <NavLink>
                                            <NavbarBrand className="Opcionmenu" tag={Link} to={"/home_ventas"}><IconButton iconProps={reserva} ariaLabel="Alto"/><span>{isMenuOpen ? "Ventas" : ""}</span></NavbarBrand>
                                        </NavLink>
                                        {/* <NavLink>
                                            <NavbarBrand className="Opcionmenu" tag={Link} to={"/sistema_gestion"}><IconButton iconProps={estadistica} ariaLabel="Alto"/><span>{isMenuOpen ? "Reportes" : ""}</span></NavbarBrand>
                                        </NavLink> */}
                                        <NavLink>
                                        <NavbarBrand className="Opcionmenu" tag={Link} to={"/inventario"}><IconButton iconProps={factura} ariaLabel="Alto"/>
                                                <span>{isMenuOpen ? "Inventario" : ""}</span></NavbarBrand>
                                        </NavLink>
                                        <NavLink>
                                        <NavbarBrand className="Opcionmenu" tag={Link} to={"/orden_pedido"}><IconButton iconProps={orden} ariaLabel="Alto"/>
                                                <span>{isMenuOpen ? "Orden de pedido" : ""}</span></NavbarBrand>
                                        </NavLink>
                                         {/*<NavLink>
                                       <NavbarBrand className="Opcionmenu" tag={Link} to={"/mantenedores"}><IconButton iconProps={registro} ariaLabel="Alto"/>
                                                <span>{isMenuOpen ? "Registros" : ""}</span></NavbarBrand>
                                        </NavLink>
                                         <NavLink>
                                        <NavbarBrand className="Opcionmenu" tag={Link} to={"/sistema_gestion"}><IconButton iconProps={nota} ariaLabel="Alto"/>
                                                <span>{isMenuOpen ? "Nota de crédito" : ""}</span></NavbarBrand>
                                        </NavLink> */}

                                    </Collapse>
                                </div>
                            </Navbar>
                        </div>
        </React.Fragment>
    );
     
}

export default SideNavigation;
