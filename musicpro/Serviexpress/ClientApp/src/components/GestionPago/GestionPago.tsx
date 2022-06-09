import * as React from 'react';
import { connect } from 'react-redux';
import './GestionPago.css';
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

  export class GestionPagoProps { }

  export class GestionPagoState {
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
  }

  export class GestionPago extends React.Component<GestionPagoProps, GestionPagoState>{

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
            dialogo_guardado: true
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

    public dialogoGuardado() {
        return (
          <Dialog
            hidden={this.state.dialogo_guardado}
            dialogContentProps={{
              type: DialogType.largeHeader,
              title: 'Boleta generada',
              subText: `La boleta se a generado correctamente`
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
              subText: `A ocurrido un error al generar la boleta`
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
        let total = ((this.state.valor1 * (parseInt(this.state.res_info.CANTIDAD1))) + 35000 + (this.state.valor2 * (parseInt(this.state.res_info.CANTIDAD2))) + (this.state.valor3 * (parseInt(this.state.res_info.CANTIDAD3))) + (this.state.valor4 * (parseInt(this.state.res_info.CANTIDAD4))) + (this.state.valor5 * (parseInt(this.state.res_info.CANTIDAD5))));
        console.log(total);



        fetchEngine.postAPI(`/api/GenerarDocumento/${id}/0/0/${total}/${id_cliente}/${patente}/${id_empleado}/${fecha}/${id_tipo_servicio}/${producto_servicio1}/${producto_servicio2}/${producto_servicio3}/${producto_servicio4}/${producto_servicio5}/${cantidad1}/${cantidad2}/${cantidad3}/${cantidad4}/${cantidad5}/2`, {
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
        let estado = 3;
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
    

    public dialogoConfirmacion() {
        return (
          <Dialog
            hidden={this.state.dialogoConfirmacion}
            dialogContentProps={{
              type: DialogType.largeHeader,
              title: 'Generar Boleta',
              subText: `¿Está seguro que desea generar la boleta?`
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

    //Simbolo ! antes, es lo contrario
    //Simbolo ! despues, es que no puede ser indefinido
    //Simbolo ? despues, puede ser indefinido
    // || = o
    // && = Y
    // 

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
            <div className="TituloBoleta">
                <h3>R.U.T.: 76.111.083-9</h3>
                <h2>BOLETA ELECTRONICA</h2>
                <h3>N°{this.state.idBoleta}</h3>
            </div>
            <h3 className="centrado">S.I.I. - SANTIAGO CENTRO</h3>
            <h4>SERVIEXPRESS SA</h4>
            <h4>Mecánica automotriz</h4>
            <h4>Puente Alto. Dirección: Av. Concha y Toro 1340 c/San Carlos</h4>
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
            <h4>Emisión: {this.state.fechaEmision}</h4>


            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <h4>Item</h4>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <h4>Precio Unitario</h4>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <h4>Cantidad</h4>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        <h4>Total Item</h4>
                    </div>
                </div>
                <div className="bordeArribaAbajo">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                        <h4>TOTAL: </h4>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                        <h4>${((this.state.valor1 * (parseInt(this.state.res_info.CANTIDAD1))) + 35000 + (this.state.valor2 * (parseInt(this.state.res_info.CANTIDAD2))) + (this.state.valor3 * (parseInt(this.state.res_info.CANTIDAD3))) + (this.state.valor4 * (parseInt(this.state.res_info.CANTIDAD4))) + (this.state.valor5 * (parseInt(this.state.res_info.CANTIDAD5))))}</h4>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="ms-Grid-col ms-sm12 ms-md1 ms-lg12">
                        {this.state.res_info.ESTADO == 3 ? "":
                            <div className={"botonera"}>
                                <PrimaryButton text="Generar Boleta" onClick={() => { this.setState({ dialogoConfirmacion: false }) }}></PrimaryButton>
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
            </div>
        );
      }
  }

  export default GestionPago;