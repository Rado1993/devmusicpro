import * as React from 'react';
import { connect } from 'react-redux';
import './HomeFormulario.css';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, Stack, Label, Checkbox,ComboBox, DayOfWeek, DatePicker, Panel, PanelType } from 'office-ui-fabric-react';
import { IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { FontWeights, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { fetchEngine } from '../../fetchData';
import { IIconProps} from 'office-ui-fabric-react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
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

const ver: IIconProps = { iconName: 'RedEye' };
const factura: IIconProps = { iconName: 'ActivateOrders'}
const generar: IIconProps = { iconName: 'TextDocument'}

const controlClass = mergeStyleSets({
  control: {
      margin: '0 0 15px 0',
      maxWidth: '300px'
  }
});

export class HomeFormularioProps { }

export class HomeFormularioState {
    tipoUser?: string;
    currentPage: number = 1;
    panelOP!: any;
    items!: any[];
    facturaOboleta?: boolean;
    idEscogido?: number;
}

export class HomeFormulario extends React.Component<HomeFormularioProps, HomeFormularioState>{
  constructor(props: any) {
    super(props);
    let pathName = window.location.pathname;
    let params = pathName.split('/');
    let hasID = params.length > 2;

    this.state = {
        tipoUser: "",
        currentPage: 1,
        panelOP: false,
        items: [],
        facturaOboleta: true,
        idEscogido: 0
    }
   
    this.obtenerReserva();

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
      case "gabriel":
        //this.setState({gabriel: value});
      break;

    }
  };

  public crearOrden(){
      window.location.href = '/crear_orden'
  }

  private async obtenerReserva() {
    console.log("Select");
    fetchEngine.getAPI("/api/GetTReservas", {
      "Content-Type": "application/json"
      })
      .then((result: any) => {
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

  public esFactura(){

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
            <PrimaryButton text="Boleta" onClick={() => { window.location.href = `/gestionpago/`+ this.state.idEscogido; }}> </PrimaryButton>
            <PrimaryButton text="Factura" onClick={() => { window.location.href = `/factura/`+ this.state.idEscogido; }}> </PrimaryButton>
            <DefaultButton text="Cerrar" onClick={() => { this.setState({facturaOboleta: true}) }}> </DefaultButton>
          </DialogFooter>
      </Dialog>
    );
  }

  public divMantenedor() {
    let itemsTable = this.state.items != null ? this.state.items.map(a => {
      return (
          <tr>
            <td>{a.DESCRIPCION}</td>
            <td>{a.DETALLE === null ? "Sin Descripción" : a.DETALLE}</td>
            <td>{a.NOMBRE}</td> 
            <td>{a.PATENTE}</td>
            <td>{this._onFormatDate(new Date(a.FECHA)) != "1/1/1" && this._onFormatDate(new Date(a.FECHA)) != "1/1/2001" ? this._onFormatDate(new Date(a.FECHA)) : ""}</td>
            <td>{a.HORA}</td>
            <td>{a.NOM_EMPLEADO + " " + a.APELL_EMPLEADO}</td>
            <td>{a.ESTADO === 0 ? "Hora Reservada" : a.ESTADO === 1 ? "En Proceso" : "Finalizada"}</td>
            <td>
              <IconButton iconProps={ver} onClick={() => { window.location.href = `/formulario/`+ a.ID; }} className={"iconoVer"} ariaLabel="Alto"/>
              {a.ESTADO === 2 ?
              //<IconButton iconProps={factura} onClick={() => { window.location.href = `/gestionpago/`+ a.ID; }} className={"iconoVer"} ariaLabel="Alto"/>
              <IconButton iconProps={generar} onClick={() => { this.setState({facturaOboleta: false, idEscogido: a.ID}) }} className={"iconoSin"} ariaLabel="Alto"/>
              :""}
              {a.ESTADO === 3 ?
              //<IconButton iconProps={factura} onClick={() => { window.location.href = `/gestionpago/`+ a.ID; }} className={"iconoVer"} ariaLabel="Alto"/>
              <IconButton iconProps={factura} onClick={() => { window.location.href = `/gestionpago/`+ a.ID}} className={"iconoBol"} ariaLabel="Alto"/>
              :""}
              {a.ESTADO === 4 ?
              //<IconButton iconProps={factura} onClick={() => { window.location.href = `/gestionpago/`+ a.ID; }} className={"iconoVer"} ariaLabel="Alto"/>
              <IconButton iconProps={factura} onClick={() => { window.location.href = `/factura/`+ a.ID}} className={"iconoFact"} ariaLabel="Alto"/>
              :""}
            </td>
          </tr>
      )
      }) : "";
      
    return(
          <div className="fondoOP">
            <div className="tituloHome">
            <label>GESTIÓN RESERVA DE HORAS</label>
            </div>

            <div>
              {/* <h4 className="titGrilla" >ORDEN DE PEDIDO</h4> */}
              {/* <div  className={"buttonDerecha"}>
                <PrimaryButton text="Agregar" onClick={() => { this.crearOrden()}}></PrimaryButton>
              </div> */}
            </div>
            
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
              <br></br>
              <br></br>
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"> 
                <table className="grilla table table-hover table-striped table-responsive-sm table-responsive-md table-responsive-lg">
                 <thead>
                    <th>SERVICIO</th>
                    <th>DESCRIPCIÓN</th>
                    <th>CLIENTE</th>
                    <th>VEHICULO</th>
                    <th>FECHA RESERVA</th>
                    <th>HORA RESERVA</th>
                    <th>EMPLEADO</th>
                    <th>ESTADO</th>
                    <th>ACCIONES</th>

                 </thead>

                 <tbody>
                     {itemsTable}
                 </tbody>

                </table>
                <br></br>
              </div>

              </div>
            </div>

          </div>
    )

  }

  render() {
      return (
        <div className="fondoMantenedores">
        <React.Fragment>
        <div >
          <div>
            {this.divMantenedor()}
            {this.dialogoBoletaoFactura()}

          </div>
        </div>
      </React.Fragment>
      </div>
    );

  }
    
  


}

export default HomeFormulario;