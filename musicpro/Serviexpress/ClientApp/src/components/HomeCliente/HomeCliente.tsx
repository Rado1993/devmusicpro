import React from 'react';
import { connect } from 'react-redux';
import './HomeCliente.css'
import fondo from '../img/Fondo.jpg'
import logo from '../img/Logo.jpg'
import persona from '../img/persona.png'
import taller from '../img/taller.jpg'
import taller1 from '../img/taller1.jpg'
import { validate, format } from 'rut.js'
import servicios from '../img/logoServicios.png'
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton, Stack, Label, Checkbox, ComboBox, DayOfWeek, DatePicker, compareDatePart } from 'office-ui-fabric-react';
import { IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontWeights, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Reserva } from '../../controles/entidades/Reserva';
import { fetchEngine } from '../../fetchData';
import { useEffect, useState } from 'react';
import { ProductoService } from '../../services/producto.service';
import { IIconProps } from 'office-ui-fabric-react';
import { IconButton } from '@fluentui/react/lib/Button';
import { CompraService } from '../../services/compra.service';
import moment from 'moment';

const ver: IIconProps = { iconName: 'ShoppingCart' };

//import { PrimaryButton } from '@fluentui/react/lib/Button';
//import { ComboBox, Stack, Label, on } from 'office-ui-fabric-react';
//import { IDatePickerStrings, DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib-commonjs/DatePicker';
//import { initializeIcons } from '@fluentui/react/lib/Icons';
//import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

//initializeIcons();

const DayPickerStrings: IDatePickerStrings = {
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],

    shortMonths: ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],

    days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],

    shortDays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],

    goToToday: 'Ir a hoy',
    prevMonthAriaLabel: 'Ir al mes previo',
    nextMonthAriaLabel: 'Ir al mes siguiente',
    prevYearAriaLabel: 'Ir al año anterior',
    nextYearAriaLabel: 'Ir al año siguiente',
    closeButtonAriaLabel: 'Cerrar el selector de fechas'

};

const controlClass = mergeStyleSets({
    control: {
        margin: '0 0 15px 0',
        maxWidth: '300px'
    }
});

export class HomeClienteProps { }

export class HomeClienteState {
    dialogo: boolean = false;
    datosCorrectos: boolean = true;
    dialogo_datos: boolean = true;
    isOpen: boolean = false;
    estadodelformulario: boolean = false;
    res_info!: Reserva;

    dialogo_reservando: boolean = true;
    dialogo_reservado: boolean = true;
    dialogo_no_reservado: boolean = true;
    dialogo_faltanCampos: boolean = true;

    dialogo_creandoUsuario: boolean = true;
    dialogo_creado: boolean = true;
    dialogo_no_creado: boolean = true;

    validarCorreo?: boolean;

    clave: string = "";
    nombre: string = "";
    logeado: boolean = false;
    menu: string = "inicio";
    usuario: string = "";
    id_usuario: number = 0;
    rut_cliente: string = "";
    rutValido: boolean = true;

    //Registro Datos Personales
    nombre_cliente: string = "";
    apellido_cliente: string = "";
    direccion_cliente: string = "";
    telefono_cliente: string = "";
    email_cliente: string = "";

    //Registro Datos Usuario
    nombre_usuario: string = "";
    clave_usuario: string = "";
    clave_usuario2: string = "";

    //Reserva Hora
    fecha_reserva?: Date;
    patente_reserva: string = "";
    hora_reserva: any = [];
    descripcion_reserva: string = "";
    opciones_servicios: any = [];
    mecanico: number = 0;
    opciones_mecanicos: any = [];

    agregarProducto: boolean = true;

    data: any = [];
    producto: any = [];
    carrito: any = [];
    cargaInicial: boolean = false;

    verCarrito: boolean = true;

    retiroDespacho: number = 0;

}

export class HomeCliente extends React.Component<HomeClienteProps, HomeClienteState>{

    constructor(props: any) {
        super(props);
        let pathName = window.location.pathname;
        let params = pathName.split('/');
        let hasID = params.length > 2;

        this.state = {
            res_info: {
                ID: 0,
                DETALLE: "",
                ESTADO: 0,
                FECHA: undefined,
                HORA: "",
                APELLIDO: "",
                NOMBRE: "",
                APELL_EMPLEADO: "",
                NOM_EMPLEADO: "",
                RUT_EMPLEADO: "",
                EMAIL: "",
                ID_TIPO_SERVICIO: 0,
                PATENTE: "",
                RUT: "",
                ID_CLIENTE: 0,
                ID_EMPLEADO: 0,
                ID_PRODUCTO_SERVICIO: 0,
                ID_PRODUCTO_SERVICIO2: 0,
                ID_PRODUCTO_SERVICIO3: 0,
                ID_PRODUCTO_SERVICIO4: 0,
                ID_PRODUCTO_SERVICIO5: 0,
                CANTIDAD1: "0",
                CANTIDAD2: "0",
                CANTIDAD3: "0",
                CANTIDAD4: "0",
                CANTIDAD5: "0"
            },
            dialogo: false,
            datosCorrectos: true,
            dialogo_datos: true,
            logeado: false,
            isOpen: false,
            validarCorreo: true,
            rut_cliente: "",
            rutValido: true,
            dialogo_faltanCampos: true,
            dialogo_creandoUsuario: true,
            dialogo_creado: true,
            dialogo_no_creado: true,

            dialogo_no_reservado: true,
            dialogo_reservado: true,
            dialogo_reservando: true,

            usuario: "usuario",
            clave: "",
            nombre: "",
            menu: "",

            id_usuario: 0,

            nombre_cliente: "",
            apellido_cliente: "",
            direccion_cliente: "",
            telefono_cliente: "",
            email_cliente: "",

            nombre_usuario: "",
            clave_usuario: "",
            clave_usuario2: "",

            estadodelformulario: true,
            fecha_reserva: undefined,
            patente_reserva: "",
            hora_reserva: [],
            descripcion_reserva: "",
            opciones_servicios: [],
            mecanico: 0,
            opciones_mecanicos: [],
            agregarProducto: true,
            data: [],
            producto: [],
            carrito: [],
            cargaInicial: false,
            verCarrito: true,
            retiroDespacho: 0
        }

        this.textFieldOnChange = this.textFieldOnChange.bind(this);
        this.validarLogin = this.validarLogin.bind(this);
        this.validarCliente = this.validarCliente.bind(this);
        this.cerrarSesion = this.cerrarSesion.bind(this);
        this.agregarProducto = this.agregarProducto.bind(this);

        console.log(props);

        this.obtenerTipoServicios();
        this.obtenerMecanicos();
        this.cargarData();
    }

    private _onFormatDate = (date: Date | undefined): string => {
        console.log(date);
        if (date != undefined) {
            //date = new Date(date);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
        } else {
            return '01-01-0001';
        }
    };

    private _onChangeServicio = (event: any, item: any): void => {
        let res = this.state.res_info;
        res.ID_TIPO_SERVICIO = item.key;
        this.setState({ res_info: res });

    };

    private _onChangeMecanico = (event: any, item: any): void => {
        this.setState({ mecanico: item.key });

    };

    private async obtenerTipoServicios() {
        console.log("Select");

        fetchEngine.getAPI("/api/GetTiposervicios", {
            "Content-Type": "application/json"
        }).then((result: any) => {
            if (result.length > 0) {
                console.log(result);

                let servicios = result;
                const sv: any[] = [];

                servicios.map((u: any) => {
                    sv.push({
                        key: u.ID,
                        text: u.DESCRIPCION,
                        precio: u.PRECIO
                    });
                })

                this.setState({ opciones_servicios: sv });

            } else {
                console.log(result);
            }
        });
    }

    private async obtenerMecanicos() {
        console.log("Select");

        fetchEngine.getAPI("/api/GetMecanicos", {
            "Content-Type": "application/json"
        }).then((result: any) => {
            if (result.length > 0) {
                console.log(result);

                let mecanicos = result;
                const mc: any[] = [];

                mecanicos.map((u: any) => {
                    mc.push({
                        key: u.ID,
                        text: u.NOM_EMPLEADO + " " + u.APELL_EMPLEADO
                    });
                })

                this.setState({ opciones_mecanicos: mc });

            } else {
                console.log(result);
            }
        });
    }


    public procesarHora(value: any) {
        if (value.includes("_") || value.length > 5) {
            let invalido = false;
            //console.log(value)
            //if(value.length>=5){
            let arr = value.split(':');
            //console.log(arr);
            if (arr[0] === undefined) {
                return;
            }
            if (arr[0].length >= 3) {
                arr[0] = arr[0].slice(0, -1);
            }

            let primer = parseInt(arr[0]);
            let segundo = parseInt(arr[1]);

            if (primer > 23) {
                invalido = true;
            }

            if (segundo > 59) {
                invalido = true;
            }
            if (arr[1] === undefined) {
                return;
            }
            if (arr[1].length === 1) {
                if (segundo > 5) {
                    arr[1] = "0" + segundo;
                } else {
                    arr[1] = segundo + "0";
                }
            }


            value = arr[0] + ":" + arr[1];
            //}

            if (invalido) {
                value = "";
                return;
            }
            value = value.slice(0, -1);
        }
        return value;
    }

    public comprar(int: number) {
        let fechaActual = moment().format('YYYY-MM-DDTHH:mm');
        let total = 0;
        this.setState({ verCarrito: true })
        console.log(this.state.carrito);
        if (this.state.logeado) {
            this.state.carrito.map((a: any) => {
                total = total + a.precio;
                CompraService.postCompra({ detalle: a.detalle, cantidad: 1, fecha_venta: fechaActual, valor_unitario: a.precio_oferta > 0 ? a.precio_oferta : a.precio, valor_total: a.precio_oferta > 0 ? a.precio_oferta : a.precio, valor_neto: (a.precio_oferta > 0 ? a.precio_oferta : a.precio), id_usuario: 3, id_prod: a.id, id_suc: int, id_stock: 1, id_estado: 1 })
                    .then((res: any) => {
                        if (res != null) {
                            console.log("Compra Exitosa")
                        } else {
                            console.log("Error en la compra")
                        }
                    })

                this.setState({ dialogo_reservado: false })
            })
        } else {
            this.state.carrito.map((a: any) => {
                total = total + a.precio;
                CompraService.postCompra({ detalle: a.detalle, cantidad: 1, fecha_venta: fechaActual, valor_unitario: a.precio, valor_total: a.precio, valor_neto: a.precio, id_usuario: 4, id_prod: a.id, id_suc: int, id_stock: 1, id_estado: 1 })
                    .then((res: any) => {
                        if (res != null) {
                            console.log("Compra Exitosa")
                        } else {
                            console.log("Error en la compra")
                        }
                    })
            })
            this.setState({ dialogo_reservado: false })
        }
    }

    public validarLogin() {
        //let log = this.state.log_info;
        if (this.state.nombre == "" || this.state.clave == "") {
            this.setState({ dialogo_datos: false });
        } else {
            this.iniciarSesion(this.state.nombre, this.state.clave);
        }
    }

    public validarCliente() {
        if (this.state.rut_cliente === "" || this.state.rutValido === false || this.state.res_info.NOMBRE === "" ||
            this.state.res_info.APELLIDO === "" || this.state.direccion_cliente === "" ||
            this.state.telefono_cliente === "" || this.state.res_info.EMAIL === "" || this.state.validarCorreo === false ||
            this.state.nombre_usuario === "" || this.state.clave_usuario === "" ||
            this.state.clave_usuario2 === "" || this.state.clave_usuario2 != this.state.clave_usuario) {
            this.setState({ dialogo_faltanCampos: false });
        } else {
            this.crearCliente(this.state.rut_cliente, this.state.res_info.NOMBRE + " " + this.state.res_info.APELLIDO, this.state.direccion_cliente, this.state.telefono_cliente, this.state.res_info.EMAIL,
                this.state.nombre_usuario, this.state.clave_usuario);
        }
    }

    public async crearCliente(rut: string, nombre: string, direccion: string, telefono: string, email: string, nombre_usuario: string, clave: string) {
        this.setState({ dialogo_creandoUsuario: false });

        fetchEngine.postAPI(`/api/CrearCliente/${rut}/${nombre}/${direccion}/${telefono}/${email}/${nombre_usuario}/${clave}/1`, {
            "Content-Type": "application/json"
        }).then((result: any) => {
            console.log(result);
            if (result === "OK") {
                console.log(result);
                this.setState({ dialogo_creandoUsuario: true, dialogo_creado: false });
            } else {
                this.setState({ dialogo_creandoUsuario: true, dialogo_no_creado: false });
            }
        });

    }

    public validarRegistro() {
        //let log = this.state.log_info;
        if (this.state.nombre == "" || this.state.clave == "") {
            this.setState({ dialogo_datos: false });
        } else {
            if (this.state.nombre === "administrador" && this.state.clave === "administrador") {
                //log.LOGEADO = true;
                this.setState({ logeado: true, menu: "inicio" });
                console.log(this.state.logeado);
                window.location.href = '/sistema_gestion/';
            } else if (this.state.nombre === "user" && this.state.clave === "user") {
                console.log(this.state.logeado);
                this.setState({ logeado: true, menu: "inicio" });
            } else {
                this.setState({ datosCorrectos: false });
            }
        }
    }



    public dialogoErrorLogin() {
        return (
            <Dialog
                hidden={this.state.datosCorrectos}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Datos Incorrectos',
                    subText: `Los datos ingresados son incorrectos`
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}>
                <DialogFooter>
                    <DefaultButton text="Cerrar" onClick={() => { this.setState({ datosCorrectos: true }) }}> </DefaultButton>
                </DialogFooter>
            </Dialog>
        );
    }

    public dialogoFaltanCampos() {
        return (
            <Dialog
                hidden={this.state.dialogo_faltanCampos}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Metodos de Pago',
                    subText: `Ingrese su medio de pago`
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}>
                <div style={{ display: 'grid', fontSize: 'larger' }}>
                    <PrimaryButton text="DÉBITO" onClick={() => { this.setState({ dialogo_faltanCampos: true, dialogo_no_creado: false }) }}> </PrimaryButton>
                    &nbsp;&nbsp;&nbsp;
                    <PrimaryButton text="CRÉDITO" onClick={() => { this.setState({ dialogo_faltanCampos: true, dialogo_no_creado: false  }) }}> </PrimaryButton>
                    &nbsp;&nbsp;&nbsp;
                    <PrimaryButton text="TRANSFERENCIA" onClick={() => { this.setState({ dialogo_faltanCampos: true, dialogo_no_creado: false  }) }}> </PrimaryButton>
                    &nbsp;&nbsp;&nbsp;
                </div>
                {/* <DialogFooter>
                    <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_faltanCampos: true }) }}> </DefaultButton>
                </DialogFooter> */}
            </Dialog>
        );
    }

    public dialogoDatosLogin() {
        return (
            <Dialog
                hidden={this.state.dialogo_datos}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Datos no ingresados',
                    subText: `Debe ingresar un nombre y contraseña para iniciar sesión`
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}>
                <DialogFooter>
                    <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_datos: true }) }}> </DefaultButton>
                </DialogFooter>
            </Dialog>
        );
    }

    public carritoCompra() {
        console.log(this.state.carrito);
        let total = 0;
        return (
            <Dialog
                hidden={this.state.verCarrito}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'CARRITO DE COMPRAS',
                    subText: ``
                }}>
                <div style={{ display: 'grid', fontSize: 'larger' }}>
                    {this.state.carrito.map((a: any) => {
                        total = total + a.precio;
                        return (
                            <div>
                                <a>{a.nombre + "      "}</a>  <a style={{ float: 'right' }}>${a.precio}</a>
                            </div>
                        );
                    })}
                    <div style={{ marginTop: '10rem' }}>
                        <a>TOTAL:</a><a style={{ float: 'right' }}>${total}</a>
                    </div>
                </div>
                <DialogFooter>
                    <DefaultButton text="Pagar" onClick={() => { this.setState({ dialogo_faltanCampos: false, verCarrito: true }) }}> </DefaultButton>
                    <DefaultButton text="Cerrar" onClick={() => { this.setState({ verCarrito: true }) }}> </DefaultButton>
                </DialogFooter>
            </Dialog>
        );
    }

    public dialogoReservado() {
        return (
            <Dialog
                hidden={this.state.dialogo_reservado}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Compra Realizada',
                    subText: `Se a realizado la compra con exito`
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}>
                <DialogFooter>
                    <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_reservado: true, menu: "inicio" }) }}> </DefaultButton>
                </DialogFooter>
            </Dialog>
        );
    }

    public dialogoCreado() {
        return (
            <Dialog
                hidden={this.state.dialogo_creado}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Agregado',
                    subText: `Se a agregado el producto con exito`
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}>
                <DialogFooter>
                    <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_creado: true }) }}> </DefaultButton>
                </DialogFooter>
            </Dialog>
        );
    }

    public dialogoNoCreado() {
        return (
            <Dialog
                hidden={this.state.dialogo_no_creado}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Retiro/Envio',
                    subText: `Seleccione su metodo de entrega`
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}>
                {this.state.retiroDespacho == 0 ?
                <div style={{ display: 'grid', fontSize: 'larger' }}>
                    <PrimaryButton text="RETIRO" onClick={() => { this.setState({retiroDespacho: 1}) }}> </PrimaryButton>
                    &nbsp;&nbsp;&nbsp;
                    <PrimaryButton text="DESPACHO" onClick={() => { this.comprar(3); this.setState({dialogo_no_creado: true}) }}> </PrimaryButton>
                    &nbsp;&nbsp;&nbsp;
                </div>
                    : this.state.retiroDespacho == 1?
                    <div style={{ display: 'grid', fontSize: 'larger' }}>
                    <PrimaryButton text="SANTIAGO" onClick={() => { this.comprar(1); this.setState({dialogo_no_creado: true})}}> </PrimaryButton>
                    &nbsp;&nbsp;&nbsp;
                    <PrimaryButton text="QUILPUE" onClick={() => { this.comprar(2); this.setState({dialogo_no_creado: true})}}> </PrimaryButton>
                    &nbsp;&nbsp;&nbsp;
                </div>
                    :
                    ""}
                {/* <DialogFooter>
                    <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_no_creado: true }) }}> </DefaultButton>
                </DialogFooter> */}
            </Dialog>
        );
    }

    public dialogoReservando() {
        return (
            <Dialog
                hidden={this.state.dialogo_reservando}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Reservando hora',
                    subText: `Verificando los datos ingresados`
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}>
                <DialogFooter>
                    {/* <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_datos: true }) }}> </DefaultButton> */}
                </DialogFooter>
            </Dialog>
        );
    }

    public dialogoCreandoUsuario() {
        return (
            <Dialog
                hidden={this.state.dialogo_creandoUsuario}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Creando Usuario',
                    subText: `Verificando los datos ingresados`
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}>
                <DialogFooter>
                    {/* <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_datos: true }) }}> </DefaultButton> */}
                </DialogFooter>
            </Dialog>
        );
    }

    public dialogoNoReservado() {
        return (
            <Dialog
                hidden={this.state.dialogo_no_reservado}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'No reservado',
                    subText: `A ocurrido un error al realizar la reserva`
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}>
                <DialogFooter>
                    <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_no_reservado: true }) }}> </DefaultButton>
                </DialogFooter>
            </Dialog>
        );
    }

    public dialogoAgregar() {
        return (
            <Dialog
                hidden={this.state.agregarProducto}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Agregar Producto',
                    subText: `¿Está seguro que desea agregar este producto?`
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}>
                <DialogFooter>
                    <PrimaryButton text="Aceptar" onClick={() => { this.agregarProducto(); this.setState({ agregarProducto: true, dialogo_creado: false }); }}> </PrimaryButton>
                    <DefaultButton text="Cerrar" onClick={() => { this.setState({ agregarProducto: true }) }}> </DefaultButton>
                </DialogFooter>
            </Dialog>
        );
    }

    private _onSelectDateReserva = (date: Date | null | undefined): void => {
        this.setState({ estadodelformulario: true });
        if (date != null) {
            let fecha = date.getDate() + '/' + (date.getMonth() + 1);
            if (fecha === "1/1" || fecha === "2/4" || fecha === "21/6" || fecha === "3/4" || fecha === "1/5" || fecha === "15/5" || fecha === "16/5" || fecha === "21/5" || fecha === "13/6" || fecha === "28/6" || fecha === "16/7" || fecha === "18/7" || fecha === "15/8" || fecha === "17/9" || fecha === "18/9" || fecha === "19/8" || fecha === "11/10" || fecha === "1/11" || fecha === "8/12" || fecha === "19/12" || fecha === "25/12") {
                this.setState({ agregarProducto: false });
            } else {
                let res = this.state.res_info;
                res.FECHA = date;
                this.setState({ fecha_reserva: date, res_info: res });
            }
        }

    };

    private async iniciarSesion(nombre: string, clave: string) {
        console.log("Select");
        if (nombre == "pedro@gmail.com" && clave == "123") {
            this.setState({ logeado: true, menu: "inicio" });
        } else if (nombre == "admin" && clave == "123") {
            window.location.href = '/sistema_gestion/';
        } else {
            this.setState({ datosCorrectos: false });
        }

    }

    public obtenerDatosUsuario(id: number) {
        fetchEngine.getAPI(`/api/ObtenerUsuario/${id}`, {
            "Content-Type": "application/json"
        }).then((result: any) => {
            console.log(result);
            if (result.length > 0) {
                console.log(result);

                this.setState({ id_usuario: result[0].ID });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    public cerrarSesion() {
        this.setState({ logeado: false, menu: "inicio", id_usuario: 0, nombre: "", clave: "" });
    }

    public async reservarHora(patente: string, fecha: Date | undefined, hora: string, servicio: number, mecanico: number) {
        let fecha2 = "1/1/1"
        if (fecha != undefined) {
            fecha2 = (fecha.getFullYear()) + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
        }

        this.setState({ dialogo_reservando: false });

        fetchEngine.postAPI(`/api/IngresarReserva/${this.state.id_usuario}/${patente}/${fecha2}/${hora}/${servicio}/${mecanico}`, {
            "Content-Type": "application/json"
        }).then((result: any) => {
            console.log(result);
            if (result === "OK") {
                console.log(result);
                this.setState({ dialogo_reservando: true, dialogo_reservado: false });

            } else {
                this.setState({ dialogo_reservando: true, dialogo_no_reservado: false });
                console.log(result);
            }
        }).catch(err => {
            console.log(err);
        });

        //this.reservarHora(this.state.res_info.PATENTE, this.state.res_info.FECHA, this.state.res_info.HORA, this.state.res_info.ID_TIPO_SERVICIO)}

    }

    public textFieldOnChange(ev: any) {
        let key = ev.target.id;
        let value = ev.target.value;
        let res = this.state.res_info;

        switch (key) {
            case "nombre":
                this.setState({ nombre: value });
                break;
            case "clave":
                this.setState({ clave: value });
                break;
            case "nombre_cliente":
                res.NOMBRE = value;
                break;
            case "apellido_cliente":
                res.APELLIDO = value;
                break;
            case "direccion_cliente":
                this.setState({ direccion_cliente: value });
                break;
            case "telefono_cliente":
                this.setState({ telefono_cliente: value });
                break;
            case "email_cliente":
                let regexMail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                console.log(regexMail.test(value))
                res.EMAIL = value;
                if (regexMail.test(value) === false) {
                    this.setState({ validarCorreo: false });
                } else {
                    this.setState({ validarCorreo: true });
                }
                if (value === "") {
                    this.setState({ validarCorreo: true });
                }
                break;
            case "nombre_usuario":
                this.setState({ nombre_usuario: value });
                break;
            case "clave_usuario":
                this.setState({ clave_usuario: value });
                break;
            case "clave_usuario2":
                this.setState({ clave_usuario2: value });
                break;
            case "patente_reserva":
                res.PATENTE = value;
                break;
            case "descripcion_reserva":
                res.DETALLE = value;
                break;
            case "hora_reserva":
                res.HORA = this.procesarHora(value);
                break;
            case "rut_cliente":
                let rut_verificado = format(value);
                let validarRut = validate(rut_verificado);
                this.setState({ rut_cliente: rut_verificado, rutValido: validarRut });
                break;
        }

        this.setState({ res_info: res });

    };

    public cambioMenu(ev: any) {
        let key = ev.target.id;
        let value = ev.target.value;

        this.setState({ menu: key });

    };

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    private cargarData = () => {
        ProductoService.findAll()
            .then((res: any) => {
                console.log(res);
                this.setState({ data: res });
            });
    }

    public agregarProducto = () => {
        console.log("Agregar Producto");
        let carritoCompra = this.state.carrito;

        carritoCompra.push(this.state.producto);
        //this.setState(carrito => [...carrito, producto]);
        this.setState({ carrito: carritoCompra })

        console.log(this.state.carrito);
    }

    render() {

        return (
            <div>
                {this.state.usuario == "usuario" ?
                    <div></div>
                    /*<header>
                    
                     <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarToggler onClick={this.toggle} className="mr-2"/>
                             <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" id={"inicio"} onClick={(e) => { this.cambioMenu(e) }}>Inicio</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" id={"servicios"} onClick={(e) => { this.cambioMenu(e) }}>Servicios</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" id={"nosotros"} onClick={(e) => { this.cambioMenu(e) }}>Nosotros</NavLink>
                                    </NavItem>
                                    {this.state.logeado === false ?
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" id={"login"} onClick={(e) => { this.cambioMenu(e) }}>Iniciar Sesión</NavLink>
                                    </NavItem>
                                    :
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" id={"reserva"} onClick={(e) => { this.cambioMenu(e) }}>Reservar Hora</NavLink>
                                    </NavItem>
                                    }
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar> 
                </header>*/
                    : ""}

                <div className="menuSuperior">
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarToggler onClick={this.toggle} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className={this.state.menu == "inicio" ? 'textmenuselect' : 'textmenu'} id={"inicio"} onClick={(e) => { this.setState({ menu: "inicio" }); }}>Inicio</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className={this.state.menu == "servicios" ? 'textmenuselect' : 'textmenu'} id={"servicios"} onClick={(e) => { this.cambioMenu(e) }}>Catálogo</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className={this.state.menu == "nosotros" ? 'textmenuselect' : 'textmenu'} id={"nosotros"} onClick={(e) => { this.cambioMenu(e) }}>Misión/Visión</NavLink>
                                    </NavItem>
                                    {this.state.logeado === false ?
                                        <NavItem>
                                            <NavLink tag={Link} className={this.state.menu == "login" ? 'textmenuselect' : 'textmenu'} id={"login"} onClick={(e) => { this.cambioMenu(e) }}>Iniciar Sesión</NavLink>
                                        </NavItem>
                                        :
                                        ""
                                    }
                                    {this.state.logeado ?
                                        <NavItem>
                                            <NavLink tag={Link} className={this.state.menu == "micuenta" ? 'textmenuselect' : 'textmenu'} id={"micuenta"} onClick={this.cerrarSesion}>Cerrar sesión</NavLink>
                                        </NavItem>
                                        : ""
                                    }
                                    {/* <IconButton iconProps={ver} onClick={() => { console.log("a") }} className={"logoCarrito"} ariaLabel="Alto" />  */}
                                    <IconButton
                                        iconProps={{ iconName: 'ShoppingCart' }}
                                        onClick={() => { this.setState({ verCarrito: false }) }}
                                        styles={{
                                            icon: { color: 'white', fontSize: 40 },
                                            root: {
                                                width: 0,
                                                height: 0,
                                                marginTop: '5% !important',
                                                marginLeft: '5% !important',
                                                padding: 0,
                                                selectors: {
                                                    '& .ms-Button-icon:hover, .ms-Button-flexContainer:hover': {
                                                        //text-shadow: 0px 0px 10px #72daf9;
                                                        backgroundColor: 'transparent !important',
                                                        textShadow: '0px 0px 10px #72daf9',
                                                        color: 'white'
                                                    },
                                                }
                                            },
                                        }}
                                    /><a className='totalCarrito'>{(this.state.carrito).length}</a>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </div>
                {this.state.menu == "login" ?
                    <div className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row">
                            <div className="contenedorLogin">
                                <img src={logo} alt="" className="banner" style={{ width: '40%', height: '40%', margin: '10px 30%' }} />
                                <div className="login">
                                    <div>
                                        <TextField label="Nombre usuario"
                                            placeholder={"Ingrese nombre de usuario"}
                                            value={this.state.nombre}
                                            id={"nombre"}
                                            disabled={false}
                                            onChange={(e) => { this.textFieldOnChange(e) }}
                                        ></TextField>
                                    </div>

                                    <div>
                                        <TextField label="Contraseña"
                                            placeholder={"Ingrese contraseña"}
                                            value={this.state.clave}
                                            id={"clave"}
                                            type={"password"}
                                            disabled={false}
                                            onChange={(e) => { this.textFieldOnChange(e) }}
                                        ></TextField>
                                    </div>

                                    <div className="botonera2">
                                        <PrimaryButton text="Iniciar Sesión" disabled={false} onClick={this.validarLogin}></PrimaryButton>
                                    </div>
                                </div>
                                {/* <div className="texto-clientes">
                                <label id={"crearCuenta"} className={"cursorPointer"} onClick={(e) => { this.cambioMenu(e) }} >Crear una cuenta</label>
                            </div> */}
                            </div>




                        </div>
                    </div>

                    : this.state.menu == "crearCuenta" ?

                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className="contenedorCrear">
                                    <h2 className="tituloCrearCliente">Registro de Clientes</h2>
                                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                        <label className="titulos-cliente" >Datos Personales</label>
                                    </div>
                                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                        <TextField label="Rut"
                                            placeholder={"Ingrese rut"}
                                            value={this.state.rut_cliente}
                                            id={"rut_cliente"}
                                            disabled={false}
                                            errorMessage={this.state.rutValido === false ? "Formato de rut incorrecto" : ""}
                                            onChange={(e) => { this.textFieldOnChange(e) }}
                                            required={true}
                                        ></TextField>
                                        <TextField label="Nombre"
                                            placeholder={"Ingrese nombre"}
                                            value={this.state.res_info.NOMBRE}
                                            id={"nombre_cliente"}
                                            disabled={false}
                                            onChange={(e) => { this.textFieldOnChange(e) }}
                                            required={true}
                                        ></TextField>
                                        <TextField label="Apellido"
                                            placeholder={"Ingrese apellidos"}
                                            value={this.state.res_info.APELLIDO}
                                            id={"apellido_cliente"}
                                            disabled={false}
                                            onChange={(e) => { this.textFieldOnChange(e) }}
                                            required={true}
                                        ></TextField>

                                        <TextField label="Dirección"
                                            placeholder={"Ingrese dirección"}
                                            value={this.state.direccion_cliente}
                                            id={"direccion_cliente"}
                                            disabled={false}
                                            onChange={(e) => { this.textFieldOnChange(e) }}
                                            required={true}
                                        ></TextField>

                                        <TextField label="Teléfono"
                                            placeholder={"Ingrese teléfono"}
                                            value={this.state.telefono_cliente}
                                            id={"telefono_cliente"}
                                            disabled={false}
                                            type={"number"}
                                            onChange={(e) => { this.textFieldOnChange(e) }}
                                            required={true}
                                        ></TextField>

                                        <TextField label="E-mail"
                                            placeholder={"Ingrese e-mail"}
                                            value={this.state.res_info.EMAIL}
                                            id={"email_cliente"}
                                            disabled={false}
                                            errorMessage={this.state.validarCorreo === false ? "Formato de correo incorrecto" : ""}
                                            onChange={(e) => { this.textFieldOnChange(e) }}
                                            required={true}
                                        ></TextField>
                                    </div>

                                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                        <label className="titulos-cliente">Datos de Usuario</label>

                                        <TextField label="Nombre de usuario"
                                            placeholder={"Ingrese nombre de usuario"}
                                            value={this.state.nombre_usuario}
                                            id={"nombre_usuario"}
                                            disabled={false}
                                            onChange={(e) => { this.textFieldOnChange(e) }}
                                            required={true}
                                        ></TextField>

                                        <TextField label="Contraseña"
                                            placeholder={"Ingrese contraseña"}
                                            value={this.state.clave_usuario}
                                            id={"clave_usuario"}
                                            type={"password"}
                                            disabled={false}
                                            onChange={(e) => { this.textFieldOnChange(e) }}
                                            required={true}
                                        ></TextField>
                                        <TextField label="Repita contraseña"
                                            placeholder={"Repita contraseña"}
                                            value={this.state.clave_usuario2}
                                            type={"password"}
                                            id={"clave_usuario2"}
                                            errorMessage={this.state.clave_usuario != this.state.clave_usuario2 ? "Las contraseñas deben ser iguales" : ""}
                                            disabled={false}
                                            onChange={(e) => { this.textFieldOnChange(e) }}
                                            required={true}
                                        ></TextField>
                                    </div>


                                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg9">
                                    </div>
                                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                                        <PrimaryButton className="botones" text="Registrarse" disabled={false} onClick={this.validarCliente}></PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>

                        : this.state.menu == "reserva" ?

                            <div className="ms-Grid" dir="ltr">
                                <div className="ms-Grid-row">
                                    <div className="contenedorReserva">
                                        <h2 className="tituloCrearCliente">Reserva de Hora</h2>
                                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                            <TextField label="Patente vehículo"
                                                placeholder={"Ingrese patente"}
                                                value={this.state.res_info.PATENTE}
                                                id={"patente_reserva"}
                                                disabled={false}
                                                onChange={(e) => { this.textFieldOnChange(e) }}

                                            ></TextField>
                                            <DatePicker
                                                id="fechareserva"
                                                className={controlClass.control}
                                                firstDayOfWeek={DayOfWeek.Monday}
                                                strings={DayPickerStrings}
                                                placeholder="Fecha reserva"
                                                label="Fecha reserva"
                                                //isRequired={true}
                                                ariaLabel="Seleccione una fecha"
                                                formatDate={this._onFormatDate}
                                                value={this.state.res_info.FECHA}
                                                onSelectDate={this._onSelectDateReserva}
                                            />
                                            <MaskedTextField
                                                id="hora_reserva"
                                                onChange={(e) => { this.textFieldOnChange(e) }}
                                                value={this.state.res_info.HORA}
                                                label="Hora reserva" iconProps={{ iconName: 'Clock' }}
                                                mask="99:99"
                                            />

                                            <ComboBox
                                                label={"Tipo servicio"}
                                                placeholder={"Seleccionar..."}
                                                options={this.state.opciones_servicios}
                                                selectedKey={this.state.res_info.ID_TIPO_SERVICIO}
                                                onChange={this._onChangeServicio}
                                                disabled={false}
                                            />

                                            <ComboBox
                                                label={"Mecánico"}
                                                placeholder={"Seleccionar..."}
                                                options={this.state.opciones_mecanicos}
                                                selectedKey={this.state.mecanico}
                                                onChange={this._onChangeMecanico}
                                                disabled={false}
                                            />
                                        </div>


                                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg9">
                                        </div>
                                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                                            <PrimaryButton className="botones" text="Reservar Hora" disabled={false} onClick={() => { this.reservarHora(this.state.res_info.PATENTE, this.state.res_info.FECHA, this.state.res_info.HORA, this.state.res_info.ID_TIPO_SERVICIO, this.state.mecanico) }}></PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            : this.state.menu == "servicios" ?
                                <div className="ms-Grid" dir="ltr">
                                    <div className="ms-Grid-row">
                                        <div className="home">
                                            <div className="tituloServicios">
                                                <label>Nuestros Productos</label>
                                            </div>

                                            <div className="textoServicios">
                                                <label>Obten acceso a los mejores descuentos solo para clientes registrados.</label>
                                            </div>

                                            <div className="cajaServicios">
                                                {this.state.data.map((a: any) => {
                                                    return (
                                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                                                            <div onClick={(e) => { this.setState({ agregarProducto: false, producto: a }) }} className="listaServicios">
                                                                <img src={servicios} alt="" className="banner" style={{ width: '115px' }} />
                                                                <label>{a.nombre}</label>
                                                                <label className={this.state.logeado && a.precio_oferta ? "precioOferta" : ""}><label className={this.state.logeado && a.precio_oferta > 0 ? 'precioNormal' : ''}>{this.state.logeado && a.precio_oferta > 0 ? '$' + (a.precio).toLocaleString('es-MX').replace(',', '.') : ""}</label>${this.state.logeado && a.precio_oferta > 0 ? (a.precio_oferta).toLocaleString('es-MX').replace(',', '.') : (a.precio).toLocaleString('es-MX').replace(',', '.')}</label>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                : this.state.menu == "nosotros" ?
                                    <div className="ms-Grid" dir="ltr">
                                        <div className="ms-Grid-row">
                                            <div className="home">
                                                <div className="tituloServicios">
                                                    <label>Misión</label>
                                                </div>

                                                <div className="textoNosotros">
                                                    <img src={taller} alt="" className="banner" style={{ width: '400px' }} />
                                                    <div>&nbsp;</div>
                                                    <label>Nuestra misión es proporcionar los mejores instrumentos musicales con la más alta calidad y precios accesibles, para satisfacer a nuestros clientes. Queremos que estén satisfechos con nuestros productos y servicios.
                                                        Brindaremos un mejor sonido y diseños innovadores para que tanto niños, jóvenes y adultos tengan acceso a productos que estén a la vanguardia.</label>
                                                </div>
                                            </div>
                                            <div className="home">
                                                <div className="tituloServicios">
                                                    <label>Visión</label>
                                                </div>

                                                <div className="textoNosotros">
                                                    <img src={taller1} alt="" className="banner" style={{ width: '400px' }} />
                                                    <div>&nbsp;</div>
                                                    <label>Nuestra visión es ser la empresa número uno en venta de instrumentos musicales, así como también lograr un mejor sonido y diseños vanguardistas para lograr una mejor imagen en nuestros instrumentos.</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :

                                    <div className="home">
                                        <div className='divtitulo'>
                                            <label>MUSICPRO</label>
                                        </div>

                                        <div className="texto">
                                            <label>Tienda de Instrumentos Musicales, Sintetizadores, Audio Profesional.</label><br></br>
                                            <label>Los mejores Precios.</label>
                                        </div>
                                    </div>

                }

                {this.dialogoErrorLogin()}
                {this.dialogoDatosLogin()}
                {this.dialogoReservado()}
                {this.dialogoReservando()}
                {this.dialogoNoReservado()}
                {this.dialogoFaltanCampos()}
                {this.dialogoCreandoUsuario()}
                {this.dialogoCreado()}
                {this.dialogoNoCreado()}
                {this.dialogoAgregar()}
                {this.carritoCompra()}

            </div>
        )

    }


}

export default HomeCliente;
