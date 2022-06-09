import * as React from 'react';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import './DocumentoPago.css';
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
const anular: IIconProps = {iconName: 'RemoveFilter'}
const excel: IIconProps = {iconName: 'ExcelDocument'}
const notacredito: IIconProps = { iconName: 'IssueSolid' };

const controlClass = mergeStyleSets({
  control: {
      margin: '0 0 15px 0',
      maxWidth: '300px'
  }
});

export class DocumentoPagoProps { }

export class DocumentoPagoState {
    tipoUser?: string;
    currentPage: number = 1;
    panelOP!: any;
    items!: any[];
    facturaOboleta?: boolean;
    idEscogido?: number;
    dialogo_anular: boolean = true;
    dialogo_anulada: boolean = true;
    dialogo_no_anulada: boolean = true;
}

export class DocumentoPago extends React.Component<DocumentoPagoProps, DocumentoPagoState>{
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
        idEscogido: 0,
        dialogo_anular: true,
        dialogo_anulada: true,
        dialogo_no_anulada: true,
    }
   
    this.obtenerReserva();

  }
  public obtenerReader = async(r:any) =>{
    const reader = await r.getReader();
    let by: any = [];
    while (true) {
      const { done, value } = await reader.read();

      if (value != undefined) {
        console.log(`Received ${value.length} bytes`);
        by.push(value);
      }

      if (done) {
        break;
      }
    }
    return by;

  }
  public async exportarExcel() {

    fetchEngine.getAPIExportar('/api/GetExportar',
   )
      .then((r:any) => {
        console.log(r);

          this.obtenerReader(r.body).then(reader => {
            console.log("Resultado");
            console.log(reader);
            var file = new Blob(reader, { type: 'application/octet-stream' });
            var fileURL = URL.createObjectURL(file);
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.download = "Reporte_Busqueda.xlsx";
            fileLink.click();
            //this.setState({dialogoExportandoExcel:true})
          });
          // r.body.getReader().read().then(reader => { 
          //   //console.log(reader);
          //   var file = new Blob([reader.value], { type: 'application/octet-stream' });
          //   var fileURL = URL.createObjectURL(file);
          //   var fileLink = document.createElement('a');
          //   fileLink.href = fileURL;
          //   fileLink.download = "Reporte_Busqueda.xlsx";
          //   fileLink.click();
          //   this.setState({ dialogo_exportar: true});
          // })

      }).catch(err => {
        console.log(err);
      });
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

  private configDataTable = { rowsPerPageText: 'Resultados por Página:', rangeSeparatorText: 'de', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'Todos' };

  private async obtenerReserva() {
    console.log("Select");
    fetchEngine.getAPI("/api/GetTDocumentos", {
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

  public anularDocumento(id: number){
    this.setState({dialogo_anular: true});
    console.log(id);
    fetchEngine.postAPI(`/api/AnularDocumento/${id}`, {
      "Content-Type": "application/json"
      })
      .then((result: any) => {
        console.log(result);
        if (result==="OK") {
          console.log(result);
          this.obtenerReserva();
          this.setState({dialogo_anulada : false});
        } else {
          this.setState({dialogo_no_anulada : false});
        }
    });
  }

  public dialogoAnular() {
    return (
      <Dialog
        hidden={this.state.dialogo_anular}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Anular documento',
          subText: `¿Está seguro que desea anular este documento?`
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}>
     <DialogFooter>
            <PrimaryButton text="Aceptar" onClick={() => { this.anularDocumento(this.state.idEscogido!)}}> </PrimaryButton>
            <DefaultButton text="Cerrar" onClick={() => { this.setState({dialogo_anular: true}) }}> </DefaultButton>
          </DialogFooter>
      </Dialog>
    );
  }

  public dialogoAnulada() {
    return (
      <Dialog
        hidden={this.state.dialogo_anulada}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Documento anulado',
          subText: `El documento se a anulado correctamente`
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}>
     <DialogFooter>
            <PrimaryButton text="Aceptar" onClick={() => { this.setState({dialogo_anulada: true}) }}> </PrimaryButton>
          </DialogFooter>
      </Dialog>
    );
  }

  public dialogoNoAnulada() {
    return (
      <Dialog
        hidden={this.state.dialogo_no_anulada}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Error al anular',
          subText: `A ocurrido un error al anular este documento`
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}>
     <DialogFooter>
            <PrimaryButton text="Aceptar" onClick={() => { this.setState({dialogo_no_anulada: true}) }}> </PrimaryButton>
          </DialogFooter>
      </Dialog>
    );
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
    let data = this.state.items;
    let columns = [
        {name:'TIPO',
        sortable: true,
        cell: (row: any) =>
        row.ID_MEDIO_PAGO === 2 ? "Boleta" : "Factura"
        },
        {name:'MECÁNICO', sortable: true,
        cell: (row: any) =>
        row.NOM_EMPLEADO + " " + row.APELL_EMPLEADO},
        {name:'CLIENTE', sortable: true, selector: 'NOMBRE' },
        {name:'PATENTE', selector: 'PATENTE', sortable: true},
        {name:'SERVICIO', selector: 'DESCRIPCION', sortable: true},
        {name:'TOTAL', selector: 'TOTAL', sortable: true,
        cell: (row: any) =>
        <div>${row.TOTAL}</div>
        },
        {name:'ESTADO',
        sortable: true,
        cell: (row: any) =>
        row.ANULADO === 1 ? "Anulada" : ""
        },
        {name:'ACCIONES',
        cell: (row: any) =>
        <div>
        {row.ID_MEDIO_PAGO === 2 ?
          <IconButton iconProps={factura} onClick={() => { window.location.href = `/gestionpago/`+ row.ID_DC}} className={"iconoBol"} ariaLabel="Alto"/>
        :
        <IconButton iconProps={factura} onClick={() => { window.location.href = `/factura/`+ row.ID_DC}} className={"iconoFact"} ariaLabel="Alto"/>
        }
        {row.ANULADO === 1 ? "" :
        <IconButton iconProps={anular} onClick={() => {this.setState({idEscogido: row.ID_DC, dialogo_anular: false})}} className={"iconoAnular"} ariaLabel="Alto"/>
        }
        {row.ANULADO === 1 ?
        <IconButton iconProps={notacredito} onClick={() => {window.location.href = `/nota_credito/`+ row.ID_DC}} className={"iconoAnular"} ariaLabel="Alto"/>
        :""
        }
        </div>
        },
    ]
      return (
          <div>
          <h1 className={"tituloHome"}>FACTURA / BOLETA</h1>
        <DataTable
        title=""
        columns={[]}
        data={data}
        highlightOnHover={true}
        pagination={true}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[ 10, 25, 50, 75,100]}
        noDataComponent={"No se han encontrado registros asociados a la búsqueda"}
        paginationComponentOptions={this.configDataTable}
        />
        </div>
          /*<tr>
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
              <IconButton iconProps={factura} onClick={() => { this.setState({facturaOboleta: false, idEscogido: a.ID}) }} className={"iconoSin"} ariaLabel="Alto"/>
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
      
    return(
          <div className="fondoOP">
            <div className="tituloOP">
            <label>Gestión Reservas de Hora</label>
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

          </div>*/
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
            {this.dialogoAnular()}
          </div>
          <div className={"botonExportar"}>
          <PrimaryButton className={"colorBlanco"} text="Exportar" onClick={()=>{this.exportarExcel()}}><IconButton iconProps={excel} className={"colorVerde"} ariaLabel="Alto"/></PrimaryButton>
          </div>
        </div>
      </React.Fragment>
      </div>
    );

  }
    
  


}

export default DocumentoPago;