import React, { useState } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { Stack, Label } from 'office-ui-fabric-react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import './Mantenedor.css';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { IIconProps } from 'office-ui-fabric-react';
import { ComboBox, KTP_FULL_PREFIX } from 'office-ui-fabric-react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Panel, PanelType, } from 'office-ui-fabric-react/lib/Panel';
import { validate, format } from 'rut.js'
import { IDatePickerStrings, DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker';
import '../../custom.css';
import { fetchEngine } from '../../fetchData';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
//import { initializeIcons } from '@fluentui/react/lib/Icons';
//initializeIcons();
//import 'bootstrap/dist/css/bootstrap.min.css';
// import 'office-ui-fabric-react/dist/css/fabric.css';
//import styles from './Oportunidad.scss';
const editarMantenedor: IIconProps = { iconName: 'SaveAs' };
const deleteMantenedor: IIconProps = { iconName: 'Delete' };
const MantenedorIcon: IIconProps = { iconName: 'AdminMLogoInverse32' };
const RolIcon: IIconProps = { iconName: 'CRMServices' };
const ParamIcon: IIconProps = { iconName: 'PageList' };


export class MantenedorProps {
    titulo?: string;
  }

export class MantenedorState {
    panelMantendores!:any;
    panelMantendores2: boolean = false;
    panelMantendores3: boolean = false;
    panelProveedores: boolean = false;
    estadodelformulario?: boolean;
    tipoMantenedor?: string;
    titulo!: string;
    tipo_empleado?: any;
    tipoEmpleado!: number;
    validarCorreo!: boolean;
    email!: string;
    rut!: string;
    apellido!: string;
    items!: any[];
    dialogo_creandoUsuario: boolean = true;
    dialogo_creado: boolean = true;
    dialogo_no_creado: boolean = true;
    rutValido: boolean = true;
    valorservicio: string = "0";
    nombreservicio: string = "";
    idservicio: number = 0;
    opciones_servicios!: any[];
    nombreproducto: string = "";
    valorproducto: string = "";
    nombreproveedor: string = "";
    rubroproveedor: string = "";
    telefonoproveedor: string = "";
    email_proveedor: string = "";
    opciones_monedas: any = [];
  }

export class Mantenedor extends React.Component<MantenedorProps, MantenedorState>{
    constructor(props: any) {
        super(props);
    
        let pathName = window.location.pathname;
    
        let params = pathName.split('/');
        console.log(params);
    
        let hasID = params.length > 2;
    
        this.state = {
            panelMantendores:false,
            panelMantendores2: false,
            panelMantendores3: false,
            panelProveedores: false,
            estadodelformulario: false,
            tipoMantenedor: "Empleados",
            titulo: "",
            tipo_empleado:[
              {
                key: 1,
                text: "Mecánico"
              },
              {
                key: 2,
                text: "Gestión"
              }
            ],
            tipoEmpleado: 0,
            validarCorreo: true,
            email: "",
            rut: "",
            apellido: "",
            items: [],
            dialogo_creandoUsuario: true,
            dialogo_creado: true,
            dialogo_no_creado: true,
            rutValido: true,
            valorservicio: "0",
            nombreservicio: "",
            idservicio: 0,
            opciones_servicios: [],
            nombreproducto: "",
            valorproducto: "",
            nombreproveedor: "",
            rubroproveedor: "",
            telefonoproveedor: "",
            email_proveedor: "",
            opciones_monedas: [
              {
                key: 1,
                text: "CLP"
              },
              {
                key: 2,
                text: "USD"
              },
              {
                key: 3,
                text: "UF"
              },
              {
                key: 4,
                text: "AUD"
              }
            ]
        }
        this.obtenerMantenedor();
        this.obtenerTipoServiciosCbx();
}

public async crearEmpleado(rut: string, nombre: string, direccion: string, telefono: string, email: string, nombre_usuario: string, clave: string){
  this.setState({dialogo_creandoUsuario : false});

  fetchEngine.postAPI(`/api/CrearCliente/${rut}/${nombre}/${direccion}/${telefono}/${email}/${nombre_usuario}/${clave}/2`, {
      "Content-Type": "application/json"
  }).then((result: any) => {
  console.log(result);
    if (result==="OK") {
      console.log(result);
      this.setState({dialogo_creandoUsuario: true, dialogo_creado : false});
    } else {
      this.setState({dialogo_creandoUsuario: true, dialogo_no_creado : false});
    }
  });

}

public textFieldOnChange(ev: any) {
    let key = ev.target.id;
    let value = ev.target.value;

    switch (key) {
      case "titulo":
        this.setState({titulo: value});
        if(this.state.titulo != "" && this.state.titulo != undefined && this.state.apellido != undefined && this.state.apellido != ""){
          let correo = this.state.titulo.replace(/ /g, "") + this.state.apellido.replace(/ /g, "")+"@serviexpress.cl";
          this.setState({email: correo});
        }
      break;
      case "rut":
                let rut_verificado = format(value);
                let validarRut = validate(rut_verificado);
                this.setState({rut: rut_verificado, rutValido: validarRut});
      break;
      case "apellido":
        this.setState({apellido: value});
        if(this.state.titulo != "" && this.state.titulo != undefined && this.state.apellido != undefined && this.state.apellido != ""){
          let correo = this.state.titulo.replace(/ /g, "") + this.state.apellido.replace(/ /g, "")+"@serviexpress.cl";
          this.setState({email: correo});
        }
      break;
      case "valorservicio":
        this.setState({valorservicio: value});
      break;
      case "nombreservicio":
        this.setState({nombreservicio: value});
      break;
      case "valorproducto":
        this.setState({valorproducto: value});
      break;
      case "nombreproducto":
        this.setState({nombreproducto: value});
      break;
      case "nombreproveedor":
        this.setState({nombreproveedor: value});
      break;
      case "rubroproveedor":
        this.setState({rubroproveedor: value});
      break;
      case "telefonoproveedor":
        this.setState({telefonoproveedor: value});
      break;
      case "email_proveedor":
        let regexMail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        console.log(regexMail.test(value))
        this.setState({email_proveedor: value});
        if (regexMail.test(value) === false) {
            this.setState({ validarCorreo: false });
        } else {
            this.setState({ validarCorreo: true });
        }
        if (value === "") {
            this.setState({ validarCorreo: true });
        }
    break;

    }
  };

  private _onChangeServicio = (event: any, item: any): void => {
    this.setState({ idservicio: item.key });

  };

  private _onChangeTipoEmpleado = (event: any, item: any): void => {

    this.setState({ tipoEmpleado: item.key });

  };

 private async obtenerMantenedor() {
    console.log("Select");

    fetchEngine.getAPI("/api/GetEmpleados", {
        "Content-Type": "application/json"
    }).then((result: any) => {
      if (result.length > 0) {
        console.log(result);
        let listado_obtenido = result;

        this.setState({
          items: listado_obtenido
        });

      } else {
        console.log(result);
      }
    });
  }

  private async obtenerClientes() {
    console.log("Select");

    fetchEngine.getAPI("/api/GetClientes", {
        "Content-Type": "application/json"
    }).then((result: any) => {
      if (result.length > 0) {
        console.log(result);
        let listado_obtenido = result;

        this.setState({
          items: listado_obtenido
        });

      } else {
        console.log(result);
      }
    });
  }

  private async obtenerProductos() {
    console.log("Select");

    fetchEngine.getAPI("/api/GetServicios", {
      "Content-Type": "application/json"
    }).then((result: any) => {
    if (result.length > 0) {
      console.log(result);

      let listado_obtenido = result;

      this.setState({
        items: listado_obtenido
      });

    } else {
      console.log(result);
    }
  });
  }

  private async obtenerProveedores() {
    console.log("Select");

    fetchEngine.getAPI("/api/GetProveedores", {
      "Content-Type": "application/json"
    }).then((result: any) => {
    if (result.length > 0) {
      console.log(result);

      let listado_obtenido = result;

      this.setState({
        items: listado_obtenido
      });

    } else {
      console.log(result);
    }
  });
  }

private async obtenerTipoServiciosCbx() {
  console.log("Select");

  fetchEngine.getAPI("/api/GetTiposervicios", {
      "Content-Type": "application/json"
  }).then((result: any) => {
    if (result.length > 0) {
      console.log(result);

      let servicios =  result;
      const sv: any[] = [];

      servicios.map((u: any) => {
        sv.push({
          key: u.ID,
          text: u.DESCRIPCION,
          precio: u.PRECIO
      });
      })

      this.setState({opciones_servicios: sv});

    } else {
      console.log(result);
    }
  });
}

  private async obtenerServicios() {
    console.log("Select");

    fetchEngine.getAPI("/api/GetTiposervicios", {
        "Content-Type": "application/json"
    }).then((result: any) => {
      if (result.length > 0) {
        console.log(result);

        let servicios =  result;
        const sv: any[] = [];

        servicios.map((u: any) => {
          sv.push({
            key: u.ID,
            text: u.DESCRIPCION,
            precio: u.PRECIO
        });
        })

        this.setState({
          items: result
        });

      } else {
        console.log(result);
      }
    });
  }

  public insertEmpleado(rut: string, nombre: string, apellido: string, email: string, nombre_usuario: string, clave: string, tipo_empleado: number){
    let correo = this.state.titulo!.replace(/ /g, "") + this.state.apellido!.replace(/ /g, "") + "@serviexpress.cl";
    let pass = this.state.rut;
    fetchEngine.postAPI(`/api/CrearEmpleado/${rut}/${nombre}/${apellido}/${correo}/${correo}/${pass}/${tipo_empleado}/2`, {
        "Content-Type": "application/json"
    }).then((result: any) => {
    console.log(result);
      if (result==="OK") {
        console.log(result);
        this.obtenerMantenedor();
        //this.setState({dialogo_creandoUsuario: true, dialogo_creado : false});
      } else {
        //this.setState({dialogo_creandoUsuario: true, dialogo_no_creado : false});
      }
    });

  }

  public agregarServicio(nombre: string, valor: string){
    let precio = parseInt(valor);
    fetchEngine.postAPI(`/api/AgregarServicio/${nombre}/${precio}`, {
      "Content-Type": "application/json"
    }).then((result: any) => {
    console.log(result);
    if (result==="OK") {
      console.log(result);
      this.obtenerServicios();
      //this.setState({dialogo_creandoUsuario: true, dialogo_creado : false});
    } else {
      //this.setState({dialogo_creandoUsuario: true, dialogo_no_creado : false});
    }
  });
  }

  public agregarProducto(servicio: number, nombre: string, valor: string){
    let precio = parseInt(valor);
    fetchEngine.postAPI(`/api/AgregarProducto/${servicio}/${nombre}/${precio}`, {
      "Content-Type": "application/json"
    }).then((result: any) => {
    console.log(result);
    if (result==="OK") {
      console.log(result);
      this.obtenerProductos();
      //this.setState({dialogo_creandoUsuario: true, dialogo_creado : false});
    } else {
      //this.setState({dialogo_creandoUsuario: true, dialogo_no_creado : false});
    }
  });
  }

  public agregarProveedor(moneda: number, nombre: string, rubro: string,telefono: string, email: string){
    fetchEngine.postAPI(`/api/AgregarProveedor/${moneda}/${nombre}/${rubro}/${telefono}/${email}`, {
      "Content-Type": "application/json"
    }).then((result: any) => {
    console.log(result);
    if (result==="OK") {
      console.log(result);
      this.obtenerProveedores();
      //this.setState({dialogo_creandoUsuario: true, dialogo_creado : false});
    } else {
      //this.setState({dialogo_creandoUsuario: true, dialogo_no_creado : false});
    }
    });
  }

public divMantenedor() {

  let itemsTable = this.state.items != null ? this.state.items.map(a => {
    let contador = 0;
    let espar = (contador % 2) ? true : false;
    contador++;
    return (
        <tr>
          {/* {this.state.tipoMantenedor === "Empleados"?<td>{a.ID_USUARIO}</td>:""} */}
          {this.state.tipoMantenedor === "Empleados"?<td>{a.NOM_EMPLEADO + " " + a.APELL_EMPLEADO}</td>:""}
          {this.state.tipoMantenedor === "Empleados"?<td>{a.RUT_EMPLEADO}</td>:""}
          {this.state.tipoMantenedor === "Productos"?<td>{a.SERVICIO}</td>:""}
          {this.state.tipoMantenedor === "Servicios" || this.state.tipoMantenedor === "Productos" ?<td>{a.DESCRIPCION}</td>:""}
          {this.state.tipoMantenedor === "Servicios"?<td>${a.PRECIO}</td>:""}
          {this.state.tipoMantenedor === "Productos"?<td>${a.VALOR}</td>:""}
          {this.state.tipoMantenedor === "Empleados"?<td>{a.ID_CARGO === 1 ?  "Mecánico" : "Gestión"}</td>:""}

          {/* {this.state.tipoMantenedor === "Clientes"?<td>{a.ID}</td>:""} */}
          {this.state.tipoMantenedor === "Clientes" || this.state.tipoMantenedor === "Proveedores"?<td>{a.NOMBRE}</td>:""}
          {this.state.tipoMantenedor === "Proveedores"?<td>{a.RUBRO}</td>:""}
          {this.state.tipoMantenedor === "Clientes"?<td>{a.RUT}</td>:""}
          {this.state.tipoMantenedor === "Clientes" || this.state.tipoMantenedor === "Proveedores"?<td>{a.EMAIL}</td>:""}
          {this.state.tipoMantenedor === "Clientes" || this.state.tipoMantenedor === "Proveedores"?<td>{a.TELEFONO}</td>:""}
          {this.state.tipoMantenedor === "Proveedores"?<td>{a.MONEDA === 1 ? "CLP" : a.MONEDA === 2 ? "USD" : a.MONEDA === 3 ? "UF" : "AUD"}</td>:""}
          {this.state.tipoMantenedor === "Clientes"?<td>{a.DIRECCION}</td>:""}
        </tr>
    )
    }) : "";

    return (
        <div>
        <div className="ms-Grid-row text-center" style={{ display: "flex", justifyContent: "center" }}>
        <Pivot aria-label="Vistas de datos" onLinkClick={this.pivotClickedMantenedor} className="btnTipoTab">
            <PivotItem headerText="Empleados">
                <div>
               
                </div>
            </PivotItem>
            <PivotItem headerText="Proveedores">
                <div>
               
                </div>
            </PivotItem>
            
            <PivotItem headerText="Servicios">
                <div>
               
                </div>
            </PivotItem>

            <PivotItem headerText="Productos">
                <div>
               
                </div>
            </PivotItem>

            <PivotItem headerText="Clientes">
                <div>
               
                </div>
            </PivotItem>

        </Pivot>

        </div>

        <div>
            <div>
              <h4 className="titGrilla">{this.state.tipoMantenedor}</h4>
              {this.state.tipoMantenedor === "Empleados" ? 
              <div  className={"buttonDerecha"}>
                <PrimaryButton text="Agregar" onClick={() => { this.setState({panelMantendores:true})}}></PrimaryButton>
              </div>
              :this.state.tipoMantenedor === "Servicios" ? 
              <div  className={"buttonDerecha"}>
                <PrimaryButton text="Agregar" onClick={() => { this.setState({panelMantendores2:true})}}></PrimaryButton>
              </div>
              :this.state.tipoMantenedor === "Productos" ? 
              <div  className={"buttonDerecha"}>
                <PrimaryButton text="Agregar" onClick={() => { this.setState({panelMantendores3:true})}}></PrimaryButton>
              </div>
              :this.state.tipoMantenedor === "Proveedores" ? 
              <div  className={"buttonDerecha"}>
                <PrimaryButton text="Agregar" onClick={() => { this.setState({panelProveedores:true})}}></PrimaryButton>
              </div>
              :""}
            </div>

            <div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 card mb-3">
                  <div>
                    <table className="grilla table table-hover table-striped table-responsive-sm table-responsive-md table-responsive-lg">
                        <thead>
                        {/* <th>ID</th> */}
                        {this.state.tipoMantenedor === "Empleados" || this.state.tipoMantenedor === "Clientes" || this.state.tipoMantenedor === "Proveedores" ? <th>NOMBRE</th> : ""}
                        {this.state.tipoMantenedor === "Empleados" || this.state.tipoMantenedor === "Clientes"? <th>RUT</th> : ""}
                        {this.state.tipoMantenedor === "Proveedores" ? <th>RUBRO</th> : ""}
                        {this.state.tipoMantenedor === "Productos" ? <th>SERVICIO</th> : ""}
                        {this.state.tipoMantenedor === "Servicios" || this.state.tipoMantenedor === "Productos" ? <th>NOMBRE</th> : ""}
                        {this.state.tipoMantenedor === "Servicios" || this.state.tipoMantenedor === "Productos"  ? <th>VALOR</th> : ""}
                        {this.state.tipoMantenedor === "Empleados" ? <th>TIPO EMPLEADO</th> : ""}
                        {this.state.tipoMantenedor === "Clientes" || this.state.tipoMantenedor === "Proveedores"? <th>EMAIL</th> : ""}
                        {this.state.tipoMantenedor === "Clientes" || this.state.tipoMantenedor === "Proveedores"? <th>TELÉFONO</th> : ""}
                        {this.state.tipoMantenedor === "Clientes"? <th>DIRECCIÓN</th> : ""}
                        {this.state.tipoMantenedor === "Proveedores"? <th>MONEDA</th> : ""}
                        
                        </thead>
                        <tbody>
                             {itemsTable} 
                        </tbody>
                    </table>
                    <ul id="page-numbers" className={"pagination"}>
                    {/* {this.state.items.length > 0 ? this.paginacion() : ""} */}
                    </ul>
                 </div>
                 </div>

            </div>
            {this.PanelRoles()}
            {this.PanelServicios()}
            {this.PanelProductos()}
            {this.PanelProveedores()}
        </div>
            
        </div>
    );

}

private cambiarestadoformulario() {

    this.setState({ estadodelformulario: true });
}

public PanelServicios(){
    return(
      <Panel
        isOpen={this.state.panelMantendores2}
        type={PanelType.medium}
        hasCloseButton={false}
        >
           <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 panelmargen">
                 
            </div>
                  <div>
                    &nbsp;
                  <h4 className="titulosOpciones">Agregar nuevo servicio</h4>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Nombre servicio" 
                        placeholder={"Nombre servicio"}
                        value={this.state.nombreservicio}
                        id={"nombreservicio"} 
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Valor Servicio" 
                        placeholder={"Valor Servicio"}
                        value={this.state.valorservicio === "0" ? "" : this.state.valorservicio}
                        id={"valorservicio"} 
                        type="number"
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>
                  </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-4">
                <DefaultButton text="Cerrar" onClick={()=>{this.setState({panelMantendores2:false})}}></DefaultButton>
                  <PrimaryButton onClick={() => { this.agregarServicio(this.state.nombreservicio, this.state.valorservicio); this.setState({panelMantendores2:false})}} text={"Agregar"}></PrimaryButton>

                </div>

              </div>
      </Panel>
    )

  }

  public PanelProductos(){
    return(
      <Panel
        isOpen={this.state.panelMantendores3}
        type={PanelType.medium}
        hasCloseButton={false}
        >
           <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 panelmargen">
                 
            </div>
                  <div>
                    &nbsp;
                  <h4 className="titulosOpciones">Agregar nuevo producto</h4>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <ComboBox
                      label={"Servicio"}
                      placeholder={"Seleccione servicio"}
                      options={this.state.opciones_servicios}
                      selectedKey={this.state.idservicio}
                      onChange={this._onChangeServicio}
                  />
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Nombre Producto" 
                        placeholder={"Nombre Producto"}
                        value={this.state.nombreproducto}
                        id={"nombreproducto"} 
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Valor Producto" 
                        placeholder={"Valor Producto"}
                        value={this.state.valorproducto === "0" ? "" : this.state.valorproducto}
                        id={"valorproducto"} 
                        type="number"
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>
                  </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-4">
                <DefaultButton text="Cerrar" onClick={()=>{this.setState({panelMantendores3:false})}}></DefaultButton>
                  <PrimaryButton onClick={() => { this.agregarProducto(this.state.idservicio, this.state.nombreproducto, this.state.valorproducto); this.setState({panelMantendores3:false})}} text={"Agregar"}></PrimaryButton>

                </div>

              </div>
      </Panel>
    )

  }

  public PanelProveedores(){
    return(
      <Panel
        isOpen={this.state.panelProveedores}
        type={PanelType.medium}
        hasCloseButton={false}
        >
           <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 panelmargen">
                 
            </div>
                  <div>
                    &nbsp;
                  <h4 className="titulosOpciones">Agregar nuevo proveedor</h4>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Nombre" 
                        placeholder={"Nombre Proveedor"}
                        value={this.state.nombreproveedor}
                        id={"nombreproveedor"} 
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Rubro" 
                        placeholder={"Rubro Proveedor"}
                        value={this.state.rubroproveedor}
                        id={"rubroproveedor"} 
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <ComboBox
                      label={"Moneda"}
                      placeholder={"Seleccione moneda"}
                      options={this.state.opciones_monedas}
                      selectedKey={this.state.idservicio}
                      onChange={this._onChangeServicio}
                  />
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Teléfono" 
                        placeholder={"Teléfono Proveedor"}
                        value={this.state.telefonoproveedor}
                        id={"telefonoproveedor"} 
                        type="number"
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Email" 
                        placeholder={"Email Proveedor"}
                        value={this.state.email_proveedor}
                        id={"email_proveedor"}
                        errorMessage={this.state.validarCorreo === false ? "Formato de correo incorrecto" : ""} 
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>
                  </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-4">
                <DefaultButton text="Cerrar" onClick={()=>{this.setState({panelProveedores:false})}}></DefaultButton>
                  <PrimaryButton onClick={() => { this.agregarProveedor(this.state.idservicio, this.state.nombreproveedor, this.state.rubroproveedor,this.state.telefonoproveedor, this.state.email_proveedor); this.setState({panelProveedores:false})}} text={"Agregar"}></PrimaryButton>

                </div>

              </div>
      </Panel>
    )

  }

  public PanelRoles(){
    return(
      <Panel
        isOpen={this.state.panelMantendores}
        type={PanelType.medium}
        hasCloseButton={false}
        >
           <div className="ms-Grid-row">
           <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 panelmargen">
                 {this.state.tipoMantenedor === "Empleados" ? <h5>Agregar nuevo/a empleado/a</h5> : this.state.tipoMantenedor === "Proveedores" ? <h5>Agregar nuevo proveedor</h5> : this.state.tipoMantenedor === "Servicios" ? <h5>Agregar nuevo servicio</h5> : ""}
                  </div>
                  {this.state.tipoMantenedor === "Empleados" ? 
                  <div>
                    &nbsp;
                  <h4 className="titulosOpciones">Datos Personales</h4>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Nombre empleado" 
                        placeholder={"Nombre empleado"}
                        value={this.state.titulo}
                        id={"titulo"} 
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Apellido empleado" 
                        placeholder={"Apellido empleado"}
                        value={this.state.apellido}
                        id={"apellido"} 
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Rut" 
                        placeholder={"Rut empleado"}
                        value={this.state.rut}
                        id={"rut"} 
                        errorMessage={this.state.rutValido === false ? "Formato de rut incorrecto" : ""}
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <ComboBox
                      label="Tipo empleado"
                      placeholder="Seleccionar..."
                      disabled={false}
                      autoComplete="on"
                      //selectedKey={this.state.tipoEmpleado}
                      //defaultValue={this.state.jefefaena}
                      onChange={this._onChangeTipoEmpleado}
                      options={this.state.tipo_empleado}
                    ></ComboBox>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="E-mail" 
                        placeholder={"E-mail empleado"}
                        value={this.state.titulo!.replace(/ /g, "") + this.state.apellido!.replace(/ /g, "") + "@serviexpress.cl"}
                        disabled={true}
                        id={"email"} 
                        onChange={(e) => { this.textFieldOnChange(e) }}
                    ></TextField>
                  </div>

                  &nbsp;
                  <h4 className="titulosOpciones">Datos Cuenta</h4>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Nombre cuenta" 
                        placeholder={"Nombre cuenta"}
                        value={this.state.titulo!.replace(/ /g, "") + this.state.apellido!.replace(/ /g, "") + "@serviexpress.cl"}
                        disabled={true}
                        id={"email"} 
                        //onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-3">
                    <TextField label="Contraseña provisional" 
                        placeholder={"Contraseña provisional"}
                        value={this.state.rut}
                        disabled={true}
                        id={"titulo"} 
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                  </div>


                  </div>
                  : ""}
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-4">
                <DefaultButton text="Cerrar" onClick={()=>{this.setState({panelMantendores:false})}}></DefaultButton>
                  <PrimaryButton onClick={() => {this.insertEmpleado(this.state.rut, this.state.titulo , this.state.apellido, "", "", "", this.state.tipoEmpleado);this.setState({panelMantendores:false})}} text={"Agregar"}></PrimaryButton>

                </div>

              </div>
      </Panel>
    )

  }



public pivotClickedMantenedor = (item:any)=>{
    this.cambiarestadoformulario(); 
    console.log(item.key);
  
     if (item.key === ".0") {
        this.obtenerMantenedor();
        this.setState({ tipoMantenedor: "Empleados"})
    }else if (item.key === ".1"){
        this.setState({ tipoMantenedor: "Proveedores"})
        this.obtenerProveedores();
    }else if (item.key === ".2"){
        //this.obtenerMantenedor("Servicios"); 
        this.obtenerServicios();
        this.setState({ tipoMantenedor: "Servicios"})
    }else if (item.key === ".3"){
      this.obtenerProductos();
      this.setState({ tipoMantenedor: "Productos"})
    }else if (item.key === ".4"){
      this.obtenerClientes();
      this.setState({ tipoMantenedor: "Clientes"})
  }
}


  render() {
    let urlSitio = window.location.protocol + '//' + window.location.host;
      return (
        <div className="fondoMantenedores">
        <React.Fragment>
        <div >
          <div>
            {this.divMantenedor()}

          </div>
        </div>
      </React.Fragment>
        {this.dialogoCreandoUsuario()}
        {this.dialogoCreado()}
        {this.dialogoNoCreado()}
      </div>
    );

  }

  
  public dialogoCreado() {
    return (
      <Dialog
        hidden={this.state.dialogo_creado}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Creado',
          subText: `Se a creado el usuario con exito`
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}>
     <DialogFooter>
            <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_creado: true}) }}> </DefaultButton>
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
          title: 'Error al crear el usuario',
          subText: `A ocurrido un problema al crear el usuario`
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}>
     <DialogFooter>
            <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_no_creado: true}) }}> </DefaultButton>
          </DialogFooter>
      </Dialog>
    );
  }

  public dialogoCreandoUsuario(){
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
    
  



}

export default Mantenedor;