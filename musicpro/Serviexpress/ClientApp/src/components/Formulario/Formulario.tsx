import * as React from 'react';
import { connect } from 'react-redux';
import './Formulario.css';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, Stack, Label, Checkbox,ComboBox, DayOfWeek, DatePicker, Panel, PanelType } from 'office-ui-fabric-react';
import { IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { FontWeights, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Reserva } from '../../controles/entidades/Reserva';
import { Link } from 'react-router-dom';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { IIconProps} from 'office-ui-fabric-react';
import { fetchEngine } from '../../fetchData';
import { IconButton } from '@fluentui/react/lib/Button';

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

const factura: IIconProps = { iconName: 'Add'}


const controlClass = mergeStyleSets({
  control: {
      margin: '0 0 15px 0',
      maxWidth: '300px'
  }
});

export class FormularioProps { }

export class FormularioState {
    res_info!: Reserva;
    fecha_emision!: Date;
    opciones_proveedores: any = [];
    opciones_producto: any = [];
    opciones_estados: any = [];
    opciones_servicios: any = [];
    idRes: number = 0;


    dialogo_guardado: boolean = true;
    dialogo_no_guardado: boolean = true;



    moneda: string = "";
    detalle: string = "";
    proveedor: number = 0;
    producto: number = 0;
    producto_2: number = 0;
    producto_3: number = 0;
    producto_4: number = 0;
    producto_5: number = 0;
    stock_producto: string = "";
    rut_proveedor: string = "";
    tel_proveedor: string = "";
    rut_empleado: string = "";
    nombre_empleado: string = "";
    apellido_empleado: string = "";
    valor1: number = 500;
    valor2:number = 0;
    valor3:number = 0;
    valor4:number = 0;
    valor5:number = 0;
    cantidad_producto: string = "0";
    cantidad_producto2: string = "0";
    cantidad_producto3: string = "0";
    cantidad_producto4: string = "0";
    cantidad_producto5: string = "0";
    numero_orden: string = "";
    dialogoTermino: boolean = true;
    contador_servicios: number = 1;
    facturaOboleta: boolean = true;
}

export class Formulario extends React.Component<FormularioProps, FormularioState>{
  constructor(props: any) {
    super(props);
    let pathName = window.location.pathname;
    let params = pathName.split('/');
    let hasID = params.length > 2;

    this.state = {
        res_info:{
          ID: 0,
          DETALLE: "",
          ESTADO: 0,
          FECHA: new Date(Date.now()),
          HORA: "",
          APELLIDO: "",
          NOMBRE: "",
          APELL_EMPLEADO: "",
          NOM_EMPLEADO: "",
          RUT_EMPLEADO: "",
          RUT: "",
          EMAIL: "",
          ID_TIPO_SERVICIO: 0,
          PATENTE: "",
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
        fecha_emision: new Date(),
        idRes: hasID ? parseInt(params[2]) : 0,
        opciones_estados:[
          {
              key: 0,
              text: "Hora Reservada"
          },
          {
              key: 1,
              text: "En Proceso"
          },
          {
              key: 2,
              text: "Finalizado"
          }

        ],
        opciones_proveedores:[
            {
                key: 1,
                text: "Proveedor 1"
            },
            {
                key: 2,
                text: "Proveedor 2"
            },
            {
                key: 3,
                text: "Proveedor 3"
            },
            {
                key: 4,
                text: "Proveedor 4"
            }
        ],
        opciones_producto:[
            {
                key: 1,
                text: "Producto 1",
                valor: 500
            },
            {
                key: 2,
                text: "Producto 2",
                valor: 200
            },
            {
                key: 3,
                text: "Producto 3",
                valor: 300
            },
            {
                key: 4,
                text: "Producto 4",
                valor: 800
            }
        ],
        opciones_servicios: [],
        moneda: "",
        proveedor: 0,
        producto: 0,
        detalle: "",
        producto_2: 0,
        producto_3: 0,
        producto_4: 0,
        producto_5: 0,
        valor1: 0,
        valor2: 0,
        valor3: 0,
        valor4: 0,
        valor5: 0,
        stock_producto: "100",
        rut_proveedor: "",
        tel_proveedor: "",
        rut_empleado: "",
        nombre_empleado: "",
        apellido_empleado: "",
        cantidad_producto: "0",
        cantidad_producto2: "0",
        cantidad_producto3: "0",
        cantidad_producto4: "0",
        cantidad_producto5: "0",
        numero_orden: "",
        dialogoTermino: true,
        contador_servicios: 1,
        dialogo_guardado: true,
        dialogo_no_guardado: true,
        facturaOboleta: true
    }
   
    console.log(params)
    if(this.state.idRes > 0){
      this.obtenerReserva(this.state.idRes);
    }

    this.guardarSv = this.guardarSv.bind(this);

    this.obtenerTipoServicios();
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
    let sv = this.state.res_info;

    switch (key) {
      case "moneda":
        this.setState({moneda: value});
      break;
      case "detalle":
        sv.DETALLE = value;
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
        sv.CANTIDAD1 = value;
      break;
      case "cantidad_producto2":
        sv.CANTIDAD2 = value;
      break;
      case "cantidad_producto3":
        sv.CANTIDAD3 = value;
      break;
      case "cantidad_producto4":
        sv.CANTIDAD4 = value;
      break;
      case "cantidad_producto5":
        sv.CANTIDAD5 = value;
      break;

    }

    this.setState({res_info: sv});
  };

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
          if(this.state.res_info.ID_TIPO_SERVICIO === u.ID_SERVICIO){
            pr.push({
              key: u.ID,
              text: u.DESCRIPCION + " $" + u.VALOR,
              valor: u.VALOR
            });
          }
        })

        this.setState({opciones_producto: pr});

      } else {
        console.log(result);
      }
    });
  }

  public terminarServicio(){

    let ren = this.state.res_info;
    console.log(ren);
    let id = this.state.res_info.ID;
    let estado = 2;
    let detalle = this.state.res_info.DETALLE;
    let id_cliente = this.state.res_info.ID_CLIENTE;
    let patente = this.state.res_info.PATENTE;
    let id_empleado = this.state.res_info.ID_EMPLEADO;
    let fecha = this.state.res_info.FECHA;
    let hora = this.state.res_info.HORA;
    let id_tipo_servicio = this.state.res_info.ID_TIPO_SERVICIO;
    let producto_servicio1 =  this.state.res_info.ID_PRODUCTO_SERVICIO != null ? this.state.res_info.ID_PRODUCTO_SERVICIO : 0;
    let producto_servicio2 =  this.state.res_info.ID_PRODUCTO_SERVICIO2 != null ? this.state.res_info.ID_PRODUCTO_SERVICIO2 : 0;
    let producto_servicio3 =  this.state.res_info.ID_PRODUCTO_SERVICIO3 != null ? this.state.res_info.ID_PRODUCTO_SERVICIO3 : 0;
    let producto_servicio4 =  this.state.res_info.ID_PRODUCTO_SERVICIO4 != null ? this.state.res_info.ID_PRODUCTO_SERVICIO4 : 0;
    let producto_servicio5 =  this.state.res_info.ID_PRODUCTO_SERVICIO5 != null ? this.state.res_info.ID_PRODUCTO_SERVICIO5 : 0;
    let cantidad1 = this.state.res_info.CANTIDAD1 != null ? this.state.res_info.CANTIDAD1 : "0";
    let cantidad2 = this.state.res_info.CANTIDAD2 != null ? this.state.res_info.CANTIDAD2 : "0";
    let cantidad3 = this.state.res_info.CANTIDAD3 != null ? this.state.res_info.CANTIDAD3 : "0";
    let cantidad4 = this.state.res_info.CANTIDAD4 != null ? this.state.res_info.CANTIDAD4 : "0";
    let cantidad5 = this.state.res_info.CANTIDAD5 != null ? this.state.res_info.CANTIDAD5 : "0";



    fetchEngine.postAPI(`/api/GuardarServicio/${id}/${estado}/${detalle}/${id_cliente}/${patente}/${id_empleado}/${fecha}/${hora}/${id_tipo_servicio}/${producto_servicio1}/${producto_servicio2}/${producto_servicio3}/${producto_servicio4}/${producto_servicio5}/${cantidad1}/${cantidad2}/${cantidad3}/${cantidad4}/${cantidad5}`, {
    //fetchEngine.postAPI("/api/GuardarServicio/" + ren, {
    "Content-Type": "application/json"
    }).then((result: any) => {
    console.log(result);
      if (result==="OK") {
        console.log(result);
        this.setState({dialogo_guardado : false});

        window.location.reload();
      } else {
        this.setState({dialogo_no_guardado : false});
      }
    });

  }

  public dialogoTermino() {
    return (
      <Dialog
        hidden={this.state.dialogoTermino}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Confirmación termino',
          subText: `¿Está seguro que desea terminar el servicio?`
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}>
          <DialogFooter>
            <PrimaryButton text="Terminar" disabled={false} onClick={() => { this.terminarServicio(); this.setState({ dialogoTermino: true }) }}></PrimaryButton>
            <DefaultButton text="Cerrar" onClick={() => { this.setState({ dialogoTermino: true }) }}> </DefaultButton>
          </DialogFooter>
      </Dialog>
    );
}

  private _onChangeServicio = (event: any, item: any): void => {
    let res = this.state.res_info;
    res.ID_TIPO_SERVICIO = item.key;
    this.setState({ res_info: res });
    this.obtenerServicios();
  };

  private _onChangeProducto = (event: any, item: any): void => {

    let sv = this.state.res_info;
    sv.ID_PRODUCTO_SERVICIO = item.key;

    this.setState({res_info: sv, valor1: item.valor});

  };

  private _onChangeProducto2 = (event: any, item: any): void => {

    let sv = this.state.res_info;
    sv.ID_PRODUCTO_SERVICIO2 = item.key;

    this.setState({res_info: sv, valor2: item.valor});

  };

  private _onChangeProducto3 = (event: any, item: any): void => {

    let sv = this.state.res_info;
    sv.ID_PRODUCTO_SERVICIO3 = item.key;

    this.setState({res_info: sv, valor3: item.valor});

  };

  private _onChangeProducto4 = (event: any, item: any): void => {

    let sv = this.state.res_info;
    sv.ID_PRODUCTO_SERVICIO4 = item.key;

    this.setState({res_info: sv, valor4: item.valor});

  };

  private _onChangeProducto5 = (event: any, item: any): void => {

    let sv = this.state.res_info;
    sv.ID_PRODUCTO_SERVICIO5 = item.key;

    this.setState({res_info: sv, valor5: item.valor});

  };

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

  private async obtenerReserva(res_id : number) {
    console.log("Select");

    let res = this.state.res_info;

    fetchEngine.getAPI("/api/GetReservaPorID/"+ res_id, {
        "Content-Type": "application/json"
    }).then((result: any) => {
      if (result.length > 0) {
        console.log(result[0]);
        let reserva = result[0];

        res = reserva;

        res.FECHA = reserva.FECHA != null ? new Date(reserva.FECHA) : new Date();

        this.setState({res_info: res, idRes: reserva.ID});

        if(this.state.res_info.ID_PRODUCTO_SERVICIO2 > 0){
          this.setState({contador_servicios:2})
        }
        if(this.state.res_info.ID_PRODUCTO_SERVICIO3 > 0){
          this.setState({contador_servicios:3})
        }
        if(this.state.res_info.ID_PRODUCTO_SERVICIO4 > 0){
          this.setState({contador_servicios:4})
        }
        if(this.state.res_info.ID_PRODUCTO_SERVICIO5 > 0){
          this.setState({contador_servicios:5})
        }

        this.obtenerServicios();



      } else {
        console.log(result);
      }
    });
  }

  private async obtenerTipoServicios() {
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

  public dialogoBoletaoFactura() {
    return (
      <Dialog
        hidden={this.state.facturaOboleta}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Gestión de pago',
          subText: `¿Que comprobante de pago desea utilizar?`
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}>
     <DialogFooter>
            <PrimaryButton text="Boleta" onClick={() => { window.location.href = `/gestionpago/`+ this.state.res_info.ID; }}> </PrimaryButton>
            <PrimaryButton text="Factura" onClick={() => { window.location.href = `/factura/`+ this.state.res_info.ID; }}> </PrimaryButton>
            <DefaultButton text="Cerrar" onClick={() => { this.setState({facturaOboleta: true}) }}> </DefaultButton>
          </DialogFooter>
      </Dialog>
    );
  }

  public guardarSv(){
    let ren = this.state.res_info;
    console.log(ren);
    let id = this.state.res_info.ID;
    let estado = 1;
    let detalle = this.state.res_info.DETALLE;
    let id_cliente = this.state.res_info.ID_CLIENTE;
    let patente = this.state.res_info.PATENTE;
    let id_empleado = this.state.res_info.ID_EMPLEADO;
    let fecha = this.state.res_info.FECHA;
    let hora = this.state.res_info.HORA;
    let id_tipo_servicio = this.state.res_info.ID_TIPO_SERVICIO;
    let producto_servicio1 =  this.state.res_info.ID_PRODUCTO_SERVICIO != null ? this.state.res_info.ID_PRODUCTO_SERVICIO : 0;
    let producto_servicio2 =  this.state.res_info.ID_PRODUCTO_SERVICIO2 != null ? this.state.res_info.ID_PRODUCTO_SERVICIO2 : 0;
    let producto_servicio3 =  this.state.res_info.ID_PRODUCTO_SERVICIO3 != null ? this.state.res_info.ID_PRODUCTO_SERVICIO3 : 0;
    let producto_servicio4 =  this.state.res_info.ID_PRODUCTO_SERVICIO4 != null ? this.state.res_info.ID_PRODUCTO_SERVICIO4 : 0;
    let producto_servicio5 =  this.state.res_info.ID_PRODUCTO_SERVICIO5 != null ? this.state.res_info.ID_PRODUCTO_SERVICIO5 : 0;
    let cantidad1 = this.state.res_info.CANTIDAD1 != null ? this.state.res_info.CANTIDAD1 : "0";
    let cantidad2 = this.state.res_info.CANTIDAD2 != null ? this.state.res_info.CANTIDAD2 : "0";
    let cantidad3 = this.state.res_info.CANTIDAD3 != null ? this.state.res_info.CANTIDAD3 : "0";
    let cantidad4 = this.state.res_info.CANTIDAD4 != null ? this.state.res_info.CANTIDAD4 : "0";
    let cantidad5 = this.state.res_info.CANTIDAD5 != null ? this.state.res_info.CANTIDAD5 : "0";

    console.log("Prueba Guardar");



    fetchEngine.postAPI(`/api/GuardarServicio/${id}/${estado}/${detalle}/${id_cliente}/${patente}/${id_empleado}/${fecha}/${hora}/${id_tipo_servicio}/${producto_servicio1}/${producto_servicio2}/${producto_servicio3}/${producto_servicio4}/${producto_servicio5}/${cantidad1}/${cantidad2}/${cantidad3}/${cantidad4}/${cantidad5}`, {
    //fetchEngine.postAPI("/api/GuardarServicio/" + ren, {
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
                        Servicio
                    </div>
                }
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
            </div>
              <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
              <TextField label="N° servicio" 
                placeholder={"N° servicio"}
                value={this.state.res_info.ID.toString()}
                id={"numero_servicio"} 
                disabled={true}
                //onChange={(e) => { this.textFieldOnChange(e) }}                  
                ></TextField>
             </div>
             <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
              <ComboBox
                    label={"Estado"}
                    placeholder={"En proceso"}
                    options={this.state.opciones_estados}
                    selectedKey={this.state.res_info.ESTADO}
                    //onChange={this._onChangeProveedor}
                    disabled={true}
                />
              </div> 
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-12">
                <h6 className="tituloDatosOrden">Datos Cliente</h6>
              </div>
              <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
              <TextField label="Rut cliente" 
                placeholder={"Rut cliente"}
                value={this.state.res_info.RUT}
                id={"rut_cliente"} 
                disabled={true}
                //onChange={(e) => { this.textFieldOnChange(e) }}                  
                ></TextField>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
              <TextField label="Nombre cliente" 
                placeholder={"Nombre cliente"}
                value={this.state.res_info.NOMBRE}
                id={"rut_proveedor"} 
                disabled={true}
                //onChange={(e) => { this.textFieldOnChange(e) }}                  
                ></TextField>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
              <TextField label="Patente vehículo" 
                placeholder={"Patente vehículo"}
                value={this.state.res_info.PATENTE}
                id={"rut_proveedor"} 
                disabled={true}
                //onChange={(e) => { this.textFieldOnChange(e) }}                  
                ></TextField>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg3">
                <ComboBox
                    label={"Tipo servicio"}
                    placeholder={"Seleccionar..."}
                    options={this.state.opciones_servicios}
                    selectedKey={this.state.res_info.ID_TIPO_SERVICIO}
                    onChange={this._onChangeServicio}
                    disabled={this.state.res_info.ESTADO === 2}
                />
            </div>
            <br></br>
            <br></br>
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-12">
                <h6 className="tituloDatosOrden">Datos Servicio</h6>
              </div>
              <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
              <TextField label="Rut empleado" 
                placeholder={"Rut empleado"}
                value={this.state.res_info.RUT_EMPLEADO}
                id={"rut_empleado"} 
                disabled={true}
                onChange={(e) => { this.textFieldOnChange(e) }}                  
                ></TextField>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
              <TextField label="Nombre empleado" 
                placeholder={"Nombre empleado"}
                value={this.state.res_info.NOM_EMPLEADO + " " + this.state.res_info.APELL_EMPLEADO}
                id={"nombre_empleado"} 
                disabled={true}
                onChange={(e) => { this.textFieldOnChange(e) }}                  
                ></TextField>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg3">
                    <DatePicker
                        id="fechaservicio"
                        className={controlClass.control}
                        firstDayOfWeek={DayOfWeek.Monday}
                        strings={DayPickerStrings}
                        placeholder={"Seleccionar..."}
                        label="Fecha servicio"
                        formatDate={this._onFormatDate}
                        disabled={true}
                        value={this.state.res_info.FECHA}
                        //onSelectDate={this._onSelectDateFechaRendicion}
                    />
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
              <TextField label="Detalle del servicio" 
                placeholder={"Ingrese detalle del servicio"}
                value={this.state.res_info.DETALLE}
                id={"detalle"} 
                disabled={this.state.res_info.ESTADO === 2}
                multiline={true} autoAdjustHeight
                onChange={(e) => { this.textFieldOnChange(e) }}
                ></TextField>
            </div>
            <br></br>
            <br></br>
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-12">
                <h6 className="tituloDatosOrden">Productos utilizados</h6>
              </div>


              <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
                <ComboBox
                        label={"Producto"}
                        placeholder={"Seleccionar..."}
                        options={this.state.opciones_producto}
                        selectedKey={this.state.res_info.ID_PRODUCTO_SERVICIO}
                        onChange={this._onChangeProducto}
                        disabled={this.state.res_info.ESTADO === 2 || this.state.res_info.ID_TIPO_SERVICIO === 0 ? true : false}
                    />
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                <TextField label="Cantidad" 
                    placeholder={"Ingrese cantidad"}
                    value={this.state.res_info.CANTIDAD1 === "0" ? "" : this.state.res_info.CANTIDAD1}
                    type={"number"}
                    id={"cantidad_producto"} 
                    disabled={this.state.res_info.ESTADO === 2 || this.state.res_info.ID_TIPO_SERVICIO === 0 ? true : false}
                    onChange={(e) => { this.textFieldOnChange(e) }}                  
                    ></TextField>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                  {this.state.res_info.ESTADO === 2 ? "" :
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
                            selectedKey={this.state.res_info.ID_PRODUCTO_SERVICIO2}
                            onChange={this._onChangeProducto2}
                            disabled={this.state.res_info.ESTADO === 2}
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                    <TextField label="Cantidad" 
                        placeholder={"Ingrese cantidad"}
                        value={this.state.res_info.CANTIDAD2 === "0" ? "" : this.state.res_info.CANTIDAD2}
                        type={"number"}
                        id={"cantidad_producto2"} 
                        disabled={this.state.res_info.ESTADO === 2}
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
                            selectedKey={this.state.res_info.ID_PRODUCTO_SERVICIO3}
                            onChange={this._onChangeProducto3}
                            disabled={this.state.res_info.ESTADO === 2}
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                    <TextField label="Cantidad" 
                        placeholder={"Ingrese cantidad"}
                        value={this.state.res_info.CANTIDAD3 === "0" ? "" : this.state.res_info.CANTIDAD3}
                        type={"number"}
                        id={"cantidad_producto3"} 
                        disabled={this.state.res_info.ESTADO === 2}
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
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
                            selectedKey={this.state.res_info.ID_PRODUCTO_SERVICIO4}
                            onChange={this._onChangeProducto4}
                            disabled={this.state.res_info.ESTADO === 2}
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                    <TextField label="Cantidad" 
                        placeholder={"Ingrese cantidad"}
                        value={this.state.res_info.CANTIDAD4 === "0" ? "" : this.state.res_info.CANTIDAD4}
                        type={"number"}
                        id={"cantidad_producto4"} 
                        disabled={this.state.res_info.ESTADO === 2}
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
                            selectedKey={this.state.res_info.ID_PRODUCTO_SERVICIO5}
                            onChange={this._onChangeProducto5}
                            disabled={this.state.res_info.ESTADO === 2}
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                    <TextField label="Cantidad" 
                        placeholder={"Ingrese cantidad"}
                        value={this.state.res_info.CANTIDAD5 === "0" ? "" : this.state.res_info.CANTIDAD5}
                        type={"number"}
                        id={"cantidad_producto5"} 
                        disabled={this.state.res_info.ESTADO === 2}
                        onChange={(e) => { this.textFieldOnChange(e) }}                  
                        ></TextField>
                    </div>
                  </div> 
              
                :""}
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">

                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg1">
                      {/* <h4>Valor Total:</h4> */}
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                      {/* <h5>${(this.state.valor1 * parseInt(this.state.res_info.CANTIDAD1))+(this.state.valor2 * parseInt(this.state.res_info.CANTIDAD2))+(this.state.valor3 * parseInt(this.state.res_info.CANTIDAD3))+(this.state.valor4 * parseInt(this.state.res_info.CANTIDAD4))+(this.state.valor5 * parseInt(this.state.res_info.CANTIDAD5))}</h5> */}
                    </div>
                </div>





              {this.state.res_info.ESTADO === 2 ? "":
                <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg8">  
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">  
                    <div className="botoneraOP">
                    <PrimaryButton className="botones" text="Guardar" disabled={false} onClick={() => { this.guardarSv() }}></PrimaryButton>
                    </div>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">  
                    <div className="botoneraOP">
                    <PrimaryButton className="botones" text="Terminar servicio" disabled={false} onClick={() => { this.setState({ dialogoTermino: false }) }}></PrimaryButton>
                    </div>
                </div>
                </div>
              }

              {this.state.res_info.ESTADO === 2 ?
                <div>
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg10">  
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">  
                    <PrimaryButton text="Factura/Boleta" onClick={() => { this.setState({facturaOboleta: false}) }}></PrimaryButton>
                  </div>
                </div>
              :""}

            </div>

            {this.dialogoTermino()}
            {this.dialogoNoGuardado()}
            {this.dialogoGuardado()}
            {this.dialogoBoletaoFactura()}
          </div>
    )

  }


}

export default Formulario;