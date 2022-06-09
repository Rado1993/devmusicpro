import Layout from './../../components/Layouts/index';
import { Card, CardBody } from '@paljs/ui/Card';
import { useEffect, useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Tabs, Tab } from '@paljs/ui/Tabs';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Button, ButtonLink } from '@paljs/ui/Button';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, Stack, Label, Checkbox,ComboBox, DayOfWeek, DatePicker } from 'office-ui-fabric-react';

export default function Dashboard() {
    const [usuario, setUsuario] = useState("");
    const [menu, setMenu] = useState("inicio");
    const [logeado, setLogeado] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [idUsuario, setIdUsuario] = useState(0);
    const [nombre, setNombre] = useState("");
    const [clave, setClave] = useState("");

    const [dialogoDatos, setDialogoDatos] = useState(false);

    function cambioMenu(ev: any) {
        let key = ev.target.id;
        let value = ev.target.value;
        setMenu(key);
    };

    function cerrarSesion() {
        setLogeado(false);
        setMenu("inicio");
        setIdUsuario(0);
        setNombre("");
        setClave("");
    }

    function validarLogin(){
        //let log = this.state.log_info;
        if(nombre == "" || clave == ""){
            setDialogoDatos(true);
        }else{
            this.iniciarSesion(this.state.nombre, this.state.clave);
            iniciarSesion(nombre, clave);
        }
    }

    function iniciarSesion(nombre: string, clave: string) {
        console.log("Select");

        window.location.href = '/cliente/gestionproductos';
    
        /*fetchEngine.getAPI(`/api/Login/${nombre}/${clave}`, {
            "Content-Type": "application/json"
        }).then((result: any) => {
          if (result.length > 0) {
            console.log(result);
            if(result[0].ID_ROL === 2){
                //log.LOGEADO = true;
                this.setState({logeado: true, menu: "inicio"});
                console.log(this.state.logeado);
                window.location.href = '/sistema_gestion/';
            }else if(result[0].ID_ROL === 1){
                console.log(this.state.logeado);
                this.setState({logeado: true, menu: "inicio"});
                this.obtenerDatosUsuario(result[0].ID);
            }else{
                this.setState({datosCorrectos: false});
            }
            //this.setState({id_usuario: result[0].ID});
          } else {

            if(this.state.nombre === "rdiaz" && this.state.clave === "administrador"){
                //log.LOGEADO = true;
                this.setState({logeado: true, menu: "inicio"});
                window.location.href = '/sistema_gestion/';
            }else{
                this.setState({datosCorrectos: false});
            }

            //this.setState({datosCorrectos: false});
            console.log(result);
          }
        }).catch(err => {
            console.log(err);
        });*/
    }

    function toggle() {
        setIsOpen(!isOpen);
    }

    function textFieldOnChange(ev: any) {
        let key = ev.target.id;
        let value = ev.target.value;

        switch (key) {
            case "nombre":
                setNombre(value);
            break;
        }
    };

    return (
        <div>
            <Row>
                <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    <div style={{ marginTop: '2rem' }}></div>
                </Col>
                <Col breakPoint={{ xs: 12, sm: 12, md: 2, lg: 2 }}>
                    <div style={{ display: 'grid', marginTop: '3rem' }}>
                        <a onClick={(e) => { setMenu("inicio") }} className={menu == "inicio" ? 'textmenuselect' : 'textmenu'}>Inicio</a>
                        <a onClick={(e) => { setMenu("catalogo") }} className={menu == "catalogo" ? 'textmenuselect' : 'textmenu'}>Catálogo</a>
                        <a onClick={(e) => { setMenu("login") }} className={menu == "login" ? 'textmenuselect' : 'textmenu'}>Login</a>
                    </div>
                </Col>


                <Col breakPoint={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
                    {menu == "inicio" ?
                        <div className='divtitulo'>
                            <label>MUSICPRO</label>
                        </div>

                        :
                        menu == "catalogo" ?
                            <div className='divtitulo'>
                                <label>CATÁLOGO</label>
                            </div>
                            :
                            menu == "login" ?
                            <div>
                                <div className="contenedorLogin">
                                <img src={'img/logo.png'} alt="" className="banner" style={{width: '30%', height: '30%', margin: '20px 35%'}}/>  
                                    <div className="login">
                                        <div>
                                            <TextField label="Nombre usuario" 
                                            placeholder={"Ingrese nombre de usuario"}
                                            value={nombre}
                                            id={"nombre"} 
                                            disabled={false}
                                            onChange={(e) => { textFieldOnChange(e) }}
                                            ></TextField>
                                        </div>
        
                                        <div>
                                            <TextField label="Contraseña" 
                                            placeholder={"Ingrese contraseña"}
                                            value={clave} 
                                            id={"clave"} 
                                            type={"password"}
                                            disabled={false}
                                            onChange={(e) => { textFieldOnChange(e) }}
                                            ></TextField>
                                        </div>
                                        
                                        <div className="botonera2">
                                            <PrimaryButton text="Iniciar Sesión" disabled={false} onClick={validarLogin}></PrimaryButton>
                                        </div>
                                    </div>
                                    {/* <div className="texto-clientes">
                                        <label id={"crearCuenta"} className={"cursorPointer"} onClick={(e) => { setMenu("crearCuenta") }} >Crear una cuenta</label>
                                    </div> */}
                                </div>
                            </div>

                                :
                                ""}
                </Col>
            </Row>
        </div>
    );

}