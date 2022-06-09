import * as React from 'react';
import { connect } from 'react-redux';
import './Factura.css';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, Stack, Label, Checkbox,ComboBox, DayOfWeek, DatePicker, Panel, PanelType } from 'office-ui-fabric-react';
import { IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { FontWeights, mergeStyleSets, ThemeSettingName } from 'office-ui-fabric-react/lib/Styling';
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

  const controlClass = mergeStyleSets({
    control: {
        margin: '0 0 15px 0',
        maxWidth: '300px'
    }
  });

  export class FacturaProps { }

  export class FacturaState {
    res_info!: Reserva;
    idBoleta: string = "";
    contador_servicios: number = 0;
    fechaEmision: string = "";
    valor1: number = 0;
    valor2: number = 0;
    valor3: number = 0;
    valor4: number = 0;
    valor5: number = 0;
    item1: string = "";
    item2: string = "";
    item3: string = "";
    item4: string = "";
    item5: string = "";
    opciones_producto: any = [];
    dialogoConfirmacion: boolean = true;
    dialogo_no_guardado: boolean = true;
    dialogo_guardado: boolean = true;
    dialogoConfirmacionAnular: boolean = true;
  }

  export class Factura extends React.Component<FacturaProps, FacturaState>{

    constructor(props: any) {
        super(props);
        let pathName = window.location.pathname;
        let params = pathName.split('/');
        let tieneID = params.length > 2;
        let id = tieneID ? params[2].toString() : "0";
        console.log(params);

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
            idBoleta: id,
            contador_servicios: 0,
            fechaEmision: "",
            valor1: 0,
            valor2: 0,
            valor3: 0,
            valor4: 0,
            valor5: 0,
            item1: "",
            item2: "",
            item3: "",
            item4: "",
            item5: "",
            opciones_producto: [],
            dialogoConfirmacion: true,
            dialogo_no_guardado: true,
            dialogo_guardado: true,
            dialogoConfirmacionAnular: true
        }

        this.obtenerServicios();

        this.obtenerReserva(parseInt(id));

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
            this.setState({fechaEmision: this._onFormatDate(res.FECHA).toString()})
    
            this.setState({res_info: res, idBoleta: reserva.ID});
            
            if(this.state.res_info.ID_PRODUCTO_SERVICIO > 0){
                this.setState({contador_servicios:2})
                this.state.opciones_producto.map((a: any) => {
                  if(this.state.res_info.ID_PRODUCTO_SERVICIO === a.key){
                      this.setState({item1: a.text, valor1: a.valor})
                  }
                })
            }
            if(this.state.res_info.ID_PRODUCTO_SERVICIO2 > 0){
              this.setState({contador_servicios:2})
              this.state.opciones_producto.map((a: any) => {
                if(this.state.res_info.ID_PRODUCTO_SERVICIO2 === a.key){
                    this.setState({item2: a.text, valor2: a.valor})
                }
              })
            }
            if(this.state.res_info.ID_PRODUCTO_SERVICIO3 > 0){
              this.setState({contador_servicios:3})
              this.state.opciones_producto.map((a: any) => {
                if(this.state.res_info.ID_PRODUCTO_SERVICIO3 === a.key){
                    this.setState({item3: a.text, valor3: a.valor})
                }
              })
            }
            if(this.state.res_info.ID_PRODUCTO_SERVICIO4 > 0){
              this.setState({contador_servicios:4})
              this.state.opciones_producto.map((a: any) => {
                if(this.state.res_info.ID_PRODUCTO_SERVICIO4 === a.key){
                    this.setState({item4: a.text, valor4: a.valor})
                }
              })
            }
            if(this.state.res_info.ID_PRODUCTO_SERVICIO5 > 0){
              this.setState({contador_servicios:5})
              this.state.opciones_producto.map((a: any) => {
                if(this.state.res_info.ID_PRODUCTO_SERVICIO5 === a.key){
                    this.setState({item5: a.text, valor5: a.valor})
                }
              })
            }

            this.obtenerServicios();

    
    
    
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
                text: u.DESCRIPCION,
                valor: u.VALOR
            });
            })
    
            this.setState({opciones_producto: pr});
    
          } else {
            console.log(result);
          }
        });
    }

    public dialogoGuardado() {
        return (
          <Dialog
            hidden={this.state.dialogo_guardado}
            dialogContentProps={{
              type: DialogType.largeHeader,
              title: 'Factura generada',
              subText: `La factura se a generado correctamente`
            }}
            modalProps={{
              isBlocking: true,
              styles: { main: { maxWidth: 450 } }
            }}>
         <DialogFooter>
                <DefaultButton text="Cerrar" onClick={() => { this.guardarSv(); this.setState({ dialogo_guardado: true}) }}> </DefaultButton>
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
              title: 'Error',
              subText: `A ocurrido un error al generar la factura`
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

    public generarBoleta(){

        let id = this.state.res_info.ID;
        let id_cliente = this.state.res_info.ID_CLIENTE;
        let patente = this.state.res_info.PATENTE;
        let id_empleado = this.state.res_info.ID_EMPLEADO;
        let fecha = this.state.res_info.FECHA;
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
        let neto = (((this.state.valor1 * (parseInt(this.state.res_info.CANTIDAD1))) + 35000 + (this.state.valor2 * (parseInt(this.state.res_info.CANTIDAD2))) + (this.state.valor3 * (parseInt(this.state.res_info.CANTIDAD3))) + (this.state.valor4 * (parseInt(this.state.res_info.CANTIDAD4))) + (this.state.valor5 * (parseInt(this.state.res_info.CANTIDAD5))))/1.19).toFixed(2);
        let iva = ((((this.state.valor1 * (parseInt(this.state.res_info.CANTIDAD1))) + 35000 +(this.state.valor2 * (parseInt(this.state.res_info.CANTIDAD2))) + (this.state.valor3 * (parseInt(this.state.res_info.CANTIDAD3))) + (this.state.valor4 * (parseInt(this.state.res_info.CANTIDAD4))) + (this.state.valor5 * (parseInt(this.state.res_info.CANTIDAD5))))/1.19)*0.19).toFixed(2);
        let total = ((this.state.valor1 * (parseInt(this.state.res_info.CANTIDAD1))) + 35000 + (this.state.valor2 * (parseInt(this.state.res_info.CANTIDAD2))) + (this.state.valor3 * (parseInt(this.state.res_info.CANTIDAD3))) + (this.state.valor4 * (parseInt(this.state.res_info.CANTIDAD4))) + (this.state.valor5 * (parseInt(this.state.res_info.CANTIDAD5))));
        console.log(total);
        console.log(neto);
        console.log(iva);



        fetchEngine.postAPI(`/api/GenerarDocumento/${id}/${neto}/${iva}/${total}/${id_cliente}/${patente}/${id_empleado}/${fecha}/${id_tipo_servicio}/${producto_servicio1}/${producto_servicio2}/${producto_servicio3}/${producto_servicio4}/${producto_servicio5}/${cantidad1}/${cantidad2}/${cantidad3}/${cantidad4}/${cantidad5}/1`, {
        //fetchEngine.postAPI("/api/GuardarServicio/" + ren, {
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

    public guardarSv(){
        let ren = this.state.res_info;
        console.log(ren);
        let id = this.state.res_info.ID;
        let estado = 4;
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
            //this.setState({dialogo_guardado : false});
            window.location.reload();
          } else {
            //this.setState({dialogo_no_guardado : false});
          }
        });
    
      }

    public anularBoleta(){

    }
    

    public dialogoConfirmacion() {
        return (
          <Dialog
            hidden={this.state.dialogoConfirmacion}
            dialogContentProps={{
              type: DialogType.largeHeader,
              title: 'Generar Factura',
              subText: `¿Está seguro que desea generar la factura?`
            }}
            modalProps={{
              isBlocking: true,
              styles: { main: { maxWidth: 450 } }
            }}>
              <DialogFooter>
                <PrimaryButton text="Aceptar" onClick={() => { this.generarBoleta(); this.setState({ dialogoConfirmacion: true }) }}></PrimaryButton>
                <DefaultButton text="Cancelar" onClick={() => { this.setState({ dialogoConfirmacion: true }) }}> </DefaultButton>
              </DialogFooter>
          </Dialog>
        );
    }

    public dialogoConfirmacionAnular() {
        return (
          <Dialog
            hidden={this.state.dialogoConfirmacionAnular}
            dialogContentProps={{
              type: DialogType.largeHeader,
              title: 'Anular Factura',
              subText: `¿Está seguro que desea anular la factura?`
            }}
            modalProps={{
              isBlocking: true,
              styles: { main: { maxWidth: 450 } }
            }}>
              <DialogFooter>
                <PrimaryButton text="Aceptar" onClick={() => { this.anularBoleta(); this.setState({ dialogoConfirmacionAnular: true }) }}></PrimaryButton>
                <DefaultButton text="Cancelar" onClick={() => { this.setState({ dialogoConfirmacionAnular: true }) }}> </DefaultButton>
              </DialogFooter>
          </Dialog>
        );
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
          case "abraham":
          break;
          case "roberto":
          break;
        }
      };


      render(){
        return(
            <div  className="fondoOP">
            {/* <div className="TituloBoleta">
                <h3>R.U.T.: 76.111.083-9</h3>
                <h1>FACTURA</h1>
                <h3>N°{this.state.idBoleta}</h3>
            </div> */}

            {/* <h3 className="centrado">S.I.I. - SANTIAGO CENTRO</h3> */}
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10">
                        <h2>SERVIEXPRESS SA</h2>
                        <h4>Mecánica automotriz</h4>
                        <h4>Puente Alto. Dirección: Av. Concha y Toro 1340 c/San Carlos</h4>
                        <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2">
                        <h1 className={"textoFactura"}>FACTURA</h1>
                    </div>
                    <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2">
                        <div className={"fondoazul"}>
                            <h4>N° DE FACTURA</h4>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2">
                        <div className={"fondoazul"}>
                            <h4>FECHA</h4>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2">
                        <div className="textoazul">
                            <h4>{this.state.idBoleta}</h4>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2">
                        <div className="textoazul">
                            <h4>{this.state.fechaEmision}</h4>
                        </div>
                    </div>






                    <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                        <div className={"fondoazul"}>
                            <h4>FACTURAR A</h4>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm9 ms-md9 ms-lg9">
                    <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    </div>
                    <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                        <div>
                            <h4>{this.state.res_info.NOMBRE}</h4>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm9 ms-md9 ms-lg9">
                    <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    </div>
                    <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                        <div>
                            <h4>{this.state.res_info.RUT}</h4>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm9 ms-md9 ms-lg9">
                    <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    </div>
                    <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                        <div>
                            <h4>{this.state.res_info.EMAIL}</h4>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm9 ms-md9 ms-lg9">
                    <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    </div>
                </div>
            </div>

            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <div className={"fondoazul2"}>
                            <h4>DESCRIPCIÓN</h4>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <div className={"fondoazul2"}>
                            <h4>PRECIO UNITARIO</h4>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <div className={"fondoazul2"}>
                            <h4>CANTIDAD</h4>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <div className={"fondoazul2"}>
                            <h4>TOTAL</h4>
                        </div>
                    </div>
                </div>
                <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                    <div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>{this.state.item1}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>${this.state.valor1}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>{this.state.res_info.CANTIDAD1}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>${(this.state.valor1)*(parseInt(this.state.res_info.CANTIDAD1))}</h4>
                        </div>
                    </div>
                {this.state.contador_servicios > 1 ?
                    <div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>{this.state.item2}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>${this.state.valor2}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>{this.state.res_info.CANTIDAD2}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <h4>${(this.state.valor2)*(parseInt(this.state.res_info.CANTIDAD2))}</h4>
                        </div>
                    </div>
                :""}
                {this.state.contador_servicios > 2 ?
                    <div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>{this.state.item3}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>${this.state.valor3}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>{this.state.res_info.CANTIDAD3}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <h4>${(this.state.valor3)*(parseInt(this.state.res_info.CANTIDAD3))}</h4>
                        </div>
                    </div>
                :""}
                {this.state.contador_servicios > 3 ?
                    <div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>{this.state.item4}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>${this.state.valor4}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>{this.state.res_info.CANTIDAD4}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <h4>${(this.state.valor4)*(parseInt(this.state.res_info.CANTIDAD4))}</h4>
                        </div>
                    </div>
                :""}
                {this.state.contador_servicios > 4 ?
                    <div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>{this.state.item5}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>${this.state.valor5}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>{this.state.res_info.CANTIDAD5}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <h4>${(this.state.valor5)*(parseInt(this.state.res_info.CANTIDAD5))}</h4>
                        </div>
                    </div>
                :""}
                    <div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>Servicio prestado</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>$35000</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <h4>1</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <h4>$35000</h4>
                        </div>
                    </div>
                <div className="bordeAbajo">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg7">
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                            <h4>NETO: </h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                            <h4>${(((this.state.valor1 * (parseInt(this.state.res_info.CANTIDAD1))) + 35000 + (this.state.valor2 * (parseInt(this.state.res_info.CANTIDAD2))) + (this.state.valor3 * (parseInt(this.state.res_info.CANTIDAD3))) + (this.state.valor4 * (parseInt(this.state.res_info.CANTIDAD4))) + (this.state.valor5 * (parseInt(this.state.res_info.CANTIDAD5))))/1.19).toFixed(2)}</h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg7">
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                            <h4>IVA: </h4>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                            <h4>${((((this.state.valor1 * (parseInt(this.state.res_info.CANTIDAD1))) + 35000 +(this.state.valor2 * (parseInt(this.state.res_info.CANTIDAD2))) + (this.state.valor3 * (parseInt(this.state.res_info.CANTIDAD3))) + (this.state.valor4 * (parseInt(this.state.res_info.CANTIDAD4))) + (this.state.valor5 * (parseInt(this.state.res_info.CANTIDAD5))))/1.19)*0.19).toFixed(2)}</h4>
                        </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg7">
                        
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                        <h4>TOTAL: </h4>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                        <h4>${(((((this.state.valor1 * (parseInt(this.state.res_info.CANTIDAD1))) + (this.state.valor2 * (parseInt(this.state.res_info.CANTIDAD2))) + 35000 + (this.state.valor3 * (parseInt(this.state.res_info.CANTIDAD3))) + (this.state.valor4 * (parseInt(this.state.res_info.CANTIDAD4))) + (this.state.valor5 * (parseInt(this.state.res_info.CANTIDAD5))))/1.19))+(((((this.state.valor1 * (parseInt(this.state.res_info.CANTIDAD1))) + (this.state.valor2 * (parseInt(this.state.res_info.CANTIDAD2))) + (this.state.valor3 * (parseInt(this.state.res_info.CANTIDAD3))) + (this.state.valor4 * (parseInt(this.state.res_info.CANTIDAD4))) + 35000 +(this.state.valor5 * (parseInt(this.state.res_info.CANTIDAD5))))/1.19)*0.19))).toFixed(2)}</h4>
                        {/* <h4>${((this.state.valor1 * (parseInt(this.state.res_info.CANTIDAD1))) + (this.state.valor2 * (parseInt(this.state.res_info.CANTIDAD2))) + (this.state.valor3 * (parseInt(this.state.res_info.CANTIDAD3))) + (this.state.valor4 * (parseInt(this.state.res_info.CANTIDAD4))) + (this.state.valor5 * (parseInt(this.state.res_info.CANTIDAD5))))}</h4> */}
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {console.log(this.state.res_info.ESTADO)}
                    <div className="ms-Grid-col ms-sm12 ms-md1 ms-lg12">
                        {this.state.res_info.ESTADO == 4 ? ""
                        :
                            <div className={"botonera"}>
                                <PrimaryButton text="Generar Factura" onClick={() => { this.setState({ dialogoConfirmacion: false }) }}></PrimaryButton>
                            </div>
                        }
                        <div className={"botonera"}>
                            <DefaultButton text="Volver" onClick={() => { window.location.href = `/home_ventas`; }}></DefaultButton>
                        </div>
                    </div>

                
                </div>
               </div>
                {this.dialogoConfirmacion()}
                {this.dialogoGuardado()}
                {this.dialogoNoGuardado()}
                {this.dialogoConfirmacionAnular()}
            </div>
        );
      }
  }

  export default Factura;