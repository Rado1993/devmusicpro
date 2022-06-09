import * as React from 'react';
import { connect } from 'react-redux';
import './HomeOrdenPedido.css';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, Stack, Label, Checkbox,ComboBox, DayOfWeek, DatePicker, Panel, PanelType } from 'office-ui-fabric-react';
import { IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { FontWeights, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Link } from 'react-router-dom';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { NavbarToggler, NavbarBrand,Nav, Navbar, NavItem } from 'reactstrap';
import { fetchEngine } from '../../fetchData';
import { IIconProps} from 'office-ui-fabric-react';
import { IconButton } from '@fluentui/react/lib/Button';

const factura: IIconProps = { iconName: 'Add'}

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

export class OrdenPedidoHechaProps { }

export class OrdenPedidoHechaState {
    fecha_emision!: Date;
    opciones_proveedores: any = [];
    opciones_producto: any = [];

    
    dialogo_guardado: boolean = true;
    dialogo_no_guardado: boolean = true;





    datos_proveedor: any = [];
    opciones_empleados: any = [];
    datos_empleado: any = [];
    moneda: string = "";
    proveedor: number = 0;
    empleado: number = 0;
    producto: number = 0;
    stock_producto: string = "";
    rut_proveedor: string = "";
    tel_proveedor: string = "";
    rut_empleado: string = "";
    nombre_empleado: string = "";
    apellido_empleado: string = "";
    cantidad_producto: string = "";
    numero_orden: string = "";

    idproducto1: number = 0;
    idproducto2: number = 0;
    idproducto3: number = 0;
    idproducto4: number = 0;
    idproducto5: number = 0;
    cantidad1: string = "";
    cantidad2: string = "";
    cantidad3: string = "";
    cantidad4: string = "";
    cantidad5: string = "";
    contador_servicios: number = 0;
    estado: number = 0;
    id_orden: number = 0;
    idOrden: number = 0;
    estadoformulario: boolean = false;
    dialogo_orden: boolean = true;
}

export class OrdenPedidoHecha extends React.Component<OrdenPedidoHechaProps, OrdenPedidoHechaState>{
  constructor(props: any) {
    super(props);
    let pathName = window.location.pathname;
    let params = pathName.split('/');
    let hasID = params.length > 2;

    console.log(params);

    this.state = {
        fecha_emision: new Date(),
        opciones_proveedores:[],
        opciones_producto:[],
        moneda: "",
        proveedor: 0,
        producto: 0,
        stock_producto: "100",
        rut_proveedor: "",
        tel_proveedor: "",
        rut_empleado: "",
        nombre_empleado: "",
        apellido_empleado: "",
        cantidad_producto: "",
        numero_orden: "",
        datos_proveedor: [],
        opciones_empleados: [],
        datos_empleado: [],
        empleado: 0,
        idproducto1 : 0,
        idproducto2 : 0,
        idproducto3 : 0,
        idproducto4 : 0,
        idproducto5 : 0,
        cantidad1 : "0",
        cantidad2 : "0",
        cantidad3 : "0",
        idOrden: hasID ? parseInt(params[2]) : 0,
        cantidad4 : "0",
        cantidad5 : "0",
        contador_servicios: 0,
        estado: 0,
        id_orden: 0,
        dialogo_guardado: true,
        dialogo_no_guardado: true,
        estadoformulario: false,
        dialogo_orden: true
    }

    //this.obtenerOrden = this.obtenerOrden.bind(this);
    this.guardarOrden = this.guardarOrden.bind(this);
    this._onChangeProducto1 = this._onChangeProducto1.bind(this);

    if(this.state.idOrden > 0){
      this.obtenerOrden(this.state.idOrden);
    }else{
      this.obtenerProveedores(0);
      this.obtenerMantenedor(0);
    }

    this.obtenerServicios();
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


  public textFieldOnChange(ev: any) {
    let key = ev.target.id;
    let value = ev.target.value;

    switch (key) {
      case "moneda":
        this.setState({moneda: value});
      break;
      case "rut_proveedor":
        this.setState({rut_proveedor: value});
      break;
      case "tel_proveedor":
        this.setState({tel_proveedor: value});
      break;
      case "rut_empleado":
        this.setState({rut_empleado: value});
      break;
      case "nombre_empleado":
        this.setState({nombre_empleado: value});
      break;
      case "apellido_empleado":
        this.setState({apellido_empleado: value});
      break;
      case "cantidad_producto":
        this.setState({cantidad1: value});
      break;
      case "cantidad_producto2":
        this.setState({cantidad2: value});
      break;
      case "cantidad_producto3":
        this.setState({cantidad3: value});
      break;
      case "cantidad_producto4":
        this.setState({cantidad4: value});
      break;
      case "cantidad_producto5":
        this.setState({cantidad5: value});
      break;

    }
  };

  private async obtenerMantenedor(id: number) {
    console.log("Select");

    fetchEngine.getAPI("/api/GetEmpleados", {
        "Content-Type": "application/json"
    }).then((result: any) => {
      if (result.length > 0) {
        console.log(result);
        let servicios =  result;
        const sv: any[] = [];

        servicios.map((u: any) => {
          if(u.ID_CARGO === 2){
            sv.push({
              key: u.ID,
              text: u.NOM_EMPLEADO + " " + u.APELL_EMPLEADO
            });
          }
        })

        this.setState({opciones_empleados: sv, datos_empleado: servicios});

        if(id > 0){
        this.state.datos_empleado.map((a: any) => {
          if(a.ID === id){
            this.setState({
              rut_empleado: a.RUT_EMPLEADO
            });
          }
        });
      }

      } else {
        console.log(result);
      }
    });
  }

  private async obtenerServicios() {
    console.log("Select");

    fetchEngine.getAPI("/api/GetServicios", {
        "Content-Type": "application/json"
    }).then((result: any) => {
      if (result.length > 0) {
        console.log(result);

        let mecanicos =  result;
        const pr: any[] = [];

        mecanicos.map((u: any) => {
            pr.push({
              key: u.ID,
              text: u.DESCRIPCION
            });
  
        })

        this.setState({opciones_producto: pr});

      } else {
        console.log(result);
      }
    });
  }

  private async obtenerProveedores(id: number) {
    console.log("Select");

    fetchEngine.getAPI("/api/GetProveedores", {
      "Content-Type": "application/json"
    }).then((result: any) => {
    if (result.length > 0) {
      console.log(result);

      let servicios =  result;
        const sv: any[] = [];

        servicios.map((u: any) => {
          sv.push({
            key: u.ID,
            text: u.NOMBRE
        });
        })

        console.log(id);

        this.setState({opciones_proveedores: sv, datos_proveedor: servicios});

        if(id > 0){
          servicios.map((a: any) => {
          if(a.ID === id.toString()){
            this.setState({
              rut_proveedor: a.RUBRO,
              tel_proveedor: a.TELEFONO,
              moneda: a.MONEDA === 1 ? "CLP" : a.MONEDA === 2 ? "USD" : a.MONEDA === 3 ? "UF" : a.MONEDA === 4 ? "AUD" : ""
            });
          }
        });
      }

    } else {
      console.log(result);
    }
  });
  }

  private async obtenerOrden(orden_id : number) {
    console.log("Select");

    fetchEngine.getAPI("/api/GetOrdenPorID/"+ orden_id, {
        "Content-Type": "application/json"
    }).then((result: any) => {
      if (result.length > 0) {
        console.log(result[0]);
        let orden = result[0];

        this.setState({
          id_orden: orden.ID,
          proveedor: orden.ID_PROVEEDOR,
          empleado: orden.ID_EMPLEADO,
          estado: orden.ESTADO,
          idproducto1: orden.PRODUCTO1,
          idproducto2: orden.PRODUCTO2,
          idproducto3: orden.PRODUCTO3,
          idproducto4: orden.PRODUCTO4,
          idproducto5: orden.PRODUCTO5,
          cantidad1: orden.CANTIDAD1,
          cantidad2: orden.CANTIDAD2,
          cantidad3: orden.CANTIDAD3,
          cantidad4: orden.CANTIDAD4,
          cantidad5: orden.CANTIDAD5,
          fecha_emision: new Date()
        });

        if(this.state.idproducto2 > 0){
          this.setState({contador_servicios:2})
        }
        if(this.state.idproducto3 > 0){
          this.setState({contador_servicios:3})
        }
        if(this.state.idproducto4 > 0){
          this.setState({contador_servicios:4})
        }
        if(this.state.idproducto5 > 0){
          this.setState({contador_servicios:5})
        }

        console.log(this.state.proveedor);

        this.obtenerProveedores(this.state.proveedor);
        this.obtenerMantenedor(this.state.empleado);

      } else {
        console.log(result);
      }
    });
  }

  public dialogoOrden() {
    return (
      <Dialog
        hidden={this.state.dialogo_orden}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Realizar pedido',
          subText: `¿Está seguro que desea realizar el pedido?`
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}>
     <DialogFooter>
            <PrimaryButton text="Aceptar" onClick={() => { this.RealizarOrden(); this.setState({ dialogo_orden: true}) }}> </PrimaryButton>
            <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_orden: true}) }}> </DefaultButton>
          </DialogFooter>
      </Dialog>
    );
  }

  public dialogoGuardado() {
    return (
      <Dialog
        hidden={this.state.dialogo_guardado}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Guardado',
          subText: `Se a guardado con exito`
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}>
     <DialogFooter>
            <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_guardado: true}) }}> </DefaultButton>
          </DialogFooter>
      </Dialog>
    );
  }

  public dialogoNoGuardado() {
    return (
      <Dialog
        hidden={this.state.dialogo_no_guardado}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'No Guardado',
          subText: `A ocurrido un error al guardar`
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}>
     <DialogFooter>
            <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogo_no_guardado: true}) }}> </DefaultButton>
          </DialogFooter>
      </Dialog>
    );
  }

  private _onChangeProveedor = (event: any, item: any): void => {
    console.log(this.state.datos_proveedor);

    this.state.datos_proveedor.map((a: any) => {
      if(a.ID === item.key){
        this.setState({
          rut_proveedor: a.RUBRO,
          tel_proveedor: a.TELEFONO,
          moneda: a.MONEDA === 1 ? "CLP" : a.MONEDA === 2 ? "USD" : a.MONEDA === 3 ? "UF" : a.MONEDA === 4 ? "AUD" : ""
        });
      }
    });

    this.setState({proveedor: item.key});
  };

  private _onChangeEmpleado = (event: any, item: any): void => {
    console.log(item.key);
    this.setState({empleado: item.key});

    this.state.datos_empleado.map((a: any) => {
      if(a.ID === item.key){
        this.setState({
          rut_empleado: a.RUT_EMPLEADO
        });
      }
    });

    console.log(this.state.empleado);
  };

  private _onChangeProducto1 = (event: any, item: any): void => {
    let id = item.key;

    console.log("Key: " + id);


    this.setState({estadoformulario: true, idproducto1: id},() => console.log(this.state));

  };

  private _onChangeProducto2 = (event: any, item: any): void => {

    this.setState({idproducto2: item.key});

    console.log(this.state.idproducto2);

  };

  private _onChangeProducto3 = (event: any, item: any): void => {

    this.setState({idproducto3: item.key});

  };

  private _onChangeProducto4 = (event: any, item: any): void => {

    this.setState({idproducto4: item.key});

  };

  private _onChangeProducto5 = (event: any, item: any): void => {

    this.setState({idproducto5: item.key});

  };

  public RealizarOrden(){
    let id = this.state.id_orden;
    console.log(this.state.idproducto1);
    console.log(this.state.cantidad5);
    let estado = 2;
    let id_empleado = this.state.empleado;
    let id_proveedor = this.state.proveedor;
    let fecha = this.state.fecha_emision;
    let producto_servicio1 =  this.state.idproducto1 != null ? this.state.idproducto1 : 0;
    let producto_servicio2 =  this.state.idproducto2 != null ? this.state.idproducto2 : 0;
    let producto_servicio3 =  this.state.idproducto3 != null ? this.state.idproducto3 : 0;
    let producto_servicio4 =  this.state.idproducto4 != null ? this.state.idproducto4 : 0;
    let producto_servicio5 =  this.state.idproducto5 != null ? this.state.idproducto5 : 0;
    let cantidad1 = this.state.cantidad1 != null ? this.state.cantidad1 : "0";
    let cantidad2 = this.state.cantidad2 != null ? this.state.cantidad2 : "0";
    let cantidad3 = this.state.cantidad3 != null ? this.state.cantidad3 : "0";
    let cantidad4 = this.state.cantidad4 != null ? this.state.cantidad4 : "0";
    let cantidad5 = this.state.cantidad5 != null ? this.state.cantidad5 : "0";

   fetchEngine.postAPI(`/api/GuardarOrden/${id}/${estado}/${id_proveedor}/${id_empleado}/${fecha}/${producto_servicio1}/${producto_servicio2}/${producto_servicio3}/${producto_servicio4}/${producto_servicio5}/${cantidad1}/${cantidad2}/${cantidad3}/${cantidad4}/${cantidad5}`, {
    "Content-Type": "application/json"
    }).then((result: any) => {
    console.log(result);
      if (result==="OK") {
        console.log(result);
        this.setState({dialogo_guardado : false});
        window.location.href = `/orden_pedido/`
      } else {
        this.setState({dialogo_no_guardado : false});
      }
    });
  }

  public guardarOrden(){
    let id = this.state.id_orden;
    console.log(this.state.idproducto1);
    console.log(this.state.cantidad5);
    let estado = 1;
    let id_empleado = this.state.empleado;
    let id_proveedor = this.state.proveedor;
    let fecha = this.state.fecha_emision;
    let producto_servicio1 =  this.state.idproducto1 != null ? this.state.idproducto1 : 0;
    let producto_servicio2 =  this.state.idproducto2 != null ? this.state.idproducto2 : 0;
    let producto_servicio3 =  this.state.idproducto3 != null ? this.state.idproducto3 : 0;
    let producto_servicio4 =  this.state.idproducto4 != null ? this.state.idproducto4 : 0;
    let producto_servicio5 =  this.state.idproducto5 != null ? this.state.idproducto5 : 0;
    let cantidad1 = this.state.cantidad1 != null ? this.state.cantidad1 : "0";
    let cantidad2 = this.state.cantidad2 != null ? this.state.cantidad2 : "0";
    let cantidad3 = this.state.cantidad3 != null ? this.state.cantidad3 : "0";
    let cantidad4 = this.state.cantidad4 != null ? this.state.cantidad4 : "0";
    let cantidad5 = this.state.cantidad5 != null ? this.state.cantidad5 : "0";

   fetchEngine.postAPI(`/api/GuardarOrden/${id}/${estado}/${id_proveedor}/${id_empleado}/${fecha}/${producto_servicio1}/${producto_servicio2}/${producto_servicio3}/${producto_servicio4}/${producto_servicio5}/${cantidad1}/${cantidad2}/${cantidad3}/${cantidad4}/${cantidad5}`, {
    "Content-Type": "application/json"
    }).then((result: any) => {
    console.log(result);
      if (result==="OK") {
        console.log(result);
        this.setState({dialogo_guardado : false});
      } else {
        this.setState({dialogo_no_guardado : false});
      }
    });
  }

  render(){
    return(
          <div className="fondoOP">
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg5">
                {
                    <div className="tituloOrdenOP">
                        Orden de pedido
                    </div>
                }
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg5">
            </div>
              <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
              <TextField label="N° Orden" 
                placeholder={"N° Orden"}
                value={this.state.id_orden.toString()}
                id={"numero_orden"} 
                disabled={true}
                onChange={(e) => { this.textFieldOnChange(e) }}                  
                ></TextField>
             </div>
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-12">
                <h6 className="tituloDatosOrden">Datos Proveedor</h6>
              </div>
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg3">
                <ComboBox
                    label={"Proveedor"}
                    placeholder={"Seleccionar..."}
                    options={this.state.opciones_proveedores}
                    selectedKey={this.state.proveedor.toString()}
                    defaultSelectedKey={this.state.proveedor.toString()}
                    onChange={this._onChangeProveedor}
                    disabled={this.state.estado === 1 ? false : true}
                />
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
              <TextField label="Rubro proveedor" 
                placeholder={"Rubro proveedor"}
                value={this.state.rut_proveedor}
                id={"rut_proveedor"} 
                disabled={true}
                onChange={(e) => { this.textFieldOnChange(e) }}                  
                ></TextField>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
              <TextField label="Teléfono proveedor" 
                placeholder={"Teléfono proveedor"}
                value={this.state.tel_proveedor}
                id={"tel_proveedor"} 
                disabled={true}
                onChange={(e) => { this.textFieldOnChange(e) }}                  
                ></TextField>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
              <TextField label="Tipo moneda" 
                placeholder={"Tipo moneda"}
                value={this.state.moneda}
                id={"moneda"} 
                disabled={true}
                onChange={(e) => { this.textFieldOnChange(e) }}                  
                ></TextField>
            </div>
            <br></br>
            <br></br>
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-12">
                <h6 className="tituloDatosOrden">Datos Empleado</h6>
              </div>
              <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
              <ComboBox
                      label={"Nombre"}
                      placeholder={"Seleccionar..."}
                      options={this.state.opciones_empleados}
                      selectedKey={this.state.empleado}
                      defaultSelectedKey={this.state.empleado}
                      onChange={this._onChangeEmpleado}
                      disabled={this.state.estado === 1 ? false : true}
                  />
              </div>
              <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
              <TextField label="Rut" 
                placeholder={"Rut empleado"}
                value={this.state.rut_empleado}
                id={"rut_empleado"} 
                disabled={true}
                onChange={(e) => { this.textFieldOnChange(e) }}                  
                ></TextField>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg3">
                    <DatePicker
                        id="fechaemision"
                        className={controlClass.control}
                        firstDayOfWeek={DayOfWeek.Monday}
                        strings={DayPickerStrings}
                        placeholder={"Seleccionar..."}
                        label="Fecha emisión"
                        formatDate={this._onFormatDate}
                        disabled={true}
                        value={this.state.fecha_emision}
                        //onSelectDate={this._onSelectDateFechaRendicion}
                    />
                </div>
            <br></br>
            <br></br>
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-12">
                <h6 className="tituloDatosOrden">Pedido</h6>
              </div>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
                <ComboBox
                        label={"Producto"}
                        placeholder={"Seleccionar..."}
                        options={this.state.opciones_producto}
                        selectedKey={this.state.idproducto1}
                        defaultSelectedKey={this.state.idproducto1}
                        onChange={this._onChangeProducto1}
                        disabled={this.state.estado === 1 ? false : true}
                        //disabled={this.state.res_info.ESTADO === 2 || this.state.res_info.ID_TIPO_SERVICIO === 0 ? true : false}
                    />
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                <TextField label="Cantidad" 
                    placeholder={"Ingrese cantidad"}
                    value={this.state.cantidad1 === "0" ? "" : this.state.cantidad1}
                    type={"number"}
                    id={"cantidad_producto"} 
                    disabled={this.state.estado === 1 ? false : true}
                    //disabled={this.state.res_info.ESTADO === 2 || this.state.res_info.ID_TIPO_SERVICIO === 0 ? true : false}
                    onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                  {this.state.estado > 1 ? "" :
                  <IconButton iconProps={factura} onClick={() => { this.setState({contador_servicios: this.state.contador_servicios + 1}) }} className={"icono"} ariaLabel="Alto"/>
                  }
                </div>
                </div>

                {this.state.contador_servicios > 1?
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
                    <ComboBox
                            label={"Producto"}
                            placeholder={"Seleccionar..."}
                            options={this.state.opciones_producto}
                            selectedKey={this.state.idproducto2}
                            onChange={this._onChangeProducto2}
                            disabled={this.state.estado === 1 ? false : true}
                            //disabled={this.state.res_info.ESTADO === 2}
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                    <TextField label="Cantidad" 
                        placeholder={"Ingrese cantidad"}
                        value={this.state.cantidad2 === "0" ? "" : this.state.cantidad2}
                        type={"number"}
                        id={"cantidad_producto2"} 
                        disabled={this.state.estado === 1 ? false : true}
                        //disabled={this.state.res_info.ESTADO === 2}
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                        ></TextField>
                    </div>
                  </div> 
              
                :""}

                {this.state.contador_servicios > 2?
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
                    <ComboBox
                            label={"Producto"}
                            placeholder={"Seleccionar..."}
                            options={this.state.opciones_producto}
                            selectedKey={this.state.idproducto3}
                            onChange={this._onChangeProducto3}
                            disabled={this.state.estado === 1 ? false : true}
                            //disabled={this.state.res_info.ESTADO === 2}
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                    <TextField label="Cantidad" 
                        placeholder={"Ingrese cantidad"}
                        value={this.state.cantidad3 === "0" ? "" : this.state.cantidad3}
                        type={"number"}
                        id={"cantidad_producto3"} 
                        //disabled={this.state.res_info.ESTADO === 2}
                        onChange={(e) => { this.textFieldOnChange(e) }}    
                        disabled={this.state.estado === 1 ? false : true}              
                        ></TextField>
                    </div>
                  </div> 
              
                :""}

                {this.state.contador_servicios > 3?
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
                    <ComboBox
                            label={"Producto"}
                            placeholder={"Seleccionar..."}
                            options={this.state.opciones_producto}
                            selectedKey={this.state.idproducto4}
                            onChange={this._onChangeProducto4}
                            disabled={this.state.estado === 1 ? false : true}
                            //disabled={this.state.res_info.ESTADO === 2}
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                    <TextField label="Cantidad" 
                        placeholder={"Ingrese cantidad"}
                        value={this.state.cantidad4 === "0" ? "" : this.state.cantidad4}
                        type={"number"}
                        id={"cantidad_producto4"} 
                        disabled={this.state.estado === 1 ? false : true}
                        //disabled={this.state.res_info.ESTADO === 2}
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                        ></TextField>
                    </div>
                  </div> 
              
                :""}

                {this.state.contador_servicios > 4?
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
                    <ComboBox
                            label={"Producto"}
                            placeholder={"Seleccionar..."}
                            options={this.state.opciones_producto}
                            selectedKey={this.state.idproducto5}
                            onChange={this._onChangeProducto5}
                            disabled={this.state.estado === 1 ? false : true}
                            //disabled={this.state.res_info.ESTADO === 2}
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                    <TextField label="Cantidad" 
                        placeholder={"Ingrese cantidad"}
                        value={this.state.cantidad5 === "0" ? "" : this.state.cantidad5}
                        type={"number"}
                        id={"cantidad_producto5"} 
                        //disabled={this.state.res_info.ESTADO === 2}
                        disabled={this.state.estado === 1 ? false : true}
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                        ></TextField>
                    </div>
                  </div> 
              
                :""}

                <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg8">  
                </div>
                {this.state.estado === 1 ?
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">  
                        <div className="botoneraOP">
                        <PrimaryButton className="botones" text="Guardar" disabled={false} onClick={() => { this.guardarOrden() }}></PrimaryButton>
                        </div>
                    </div>
                :""}
                {this.state.estado === 1 ?
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">  
                        <div className="botoneraOP">
                        <PrimaryButton className="botones" text="Realizar pedido" disabled={false} onClick={() => { this.setState({dialogo_orden: false}) }}></PrimaryButton>
                        </div>
                    </div>
                :""}
                </div>

              </div>
              {this.dialogoNoGuardado()}
              {this.dialogoGuardado()}
              {this.dialogoOrden()}
            </div>
    )

  }


}

export default OrdenPedidoHecha;