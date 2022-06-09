import * as React from 'react';
import { connect } from 'react-redux';
import './HomeSistema.css';
import LogoHome from '../img/LogoHome.png';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, Stack, Label, Checkbox,ComboBox, DayOfWeek, DatePicker } from 'office-ui-fabric-react';
import { IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { FontWeights, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IconButton } from '@fluentui/react/lib/Button';

import circleIconOp from '../img/circleIconOp.png';
import circleIconPr from '../img/circleIconPr.png';
import circleIconNe from '../img/circleIconNe.png';
import { IIconProps} from 'office-ui-fabric-react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
initializeIcons();

const alto: IIconProps = { iconName: 'TriangleSolidUp12' };
const medio: IIconProps = { iconName: 'TriangleSolidRight12' };
const bajo: IIconProps = { iconName: 'TriangleSolidDown12' };
const fecha: IIconProps = { iconName: 'EventDateMissed12' };
const warning: IIconProps = { iconName: 'ProductList' };
export class HomeSistemaProps { }

export class HomeSistemaState {
  gabriel: string = "";
  fecha_emision?: Date;

}

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

export class HomeSistema extends React.Component<HomeSistemaProps, HomeSistemaState>{
  constructor(props: any) {
    super(props);
    let pathName = window.location.pathname;
    let params = pathName.split('/');
    let hasID = params.length > 2;

    this.state = {
      gabriel: "",
      fecha_emision: new Date()



    }
   
    console.log(this.state.fecha_emision);

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
        this.setState({gabriel: value});
      break;

    }
  };




  render(){
    /*return(
      <React.Fragment>
       <div className="fondoMantenedores">
      <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg8 mt-4">
                  <h5 className="text-primary titSistema">Bienvenido: al nuevo sistema de gestión del taller mecánico SERVIEXPRESS, descubre una nueva experiencia</h5>
              </div>
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg4 mt-4">
              </div>
          </div>

          <div className="ms-Grid-row mt-3">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg4">
                  <span className="titTablaIndicador fondoAzulTit">Proximas reservas</span>
                  <div className="card fondoIndicadores shadow">
                          <div className="table-responsive">
                              <table className="table tablaIndicador">
                                  <tbody>
                                      <tr>
                                      <td className="">
                                          <img src={circleIconNe} alt="" className="circleIcon"/>
                                      </td>
                                      <td className="font-weight-light text-left textIndicador">
                                          <div>Gabriel Bello</div>
                                          <div>Cristina Anabalón</div>
                                          <div>Loreto Araya</div>
                                      </td>
                                      <td className="textIndicador">
                                          <div>26/04/2021 <IconButton className="text-success" iconProps={fecha} ariaLabel="Alto"/></div>
                                          <div>28/04/2021 <IconButton className="text-success" iconProps={fecha} ariaLabel="Medio"/></div>
                                          <div>02/05/2021 <IconButton className="text-success" iconProps={fecha} ariaLabel="Bajo"/></div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>

                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg4">
                      <span className="titTablaIndicador fondoVerdeTit">Servicios</span>
                      <div className="card fondoIndicadores shadow">
                          <div className="table-responsive">
                              <table className="table tablaIndicador">
                                  <tbody>
                                      <tr>
                                      <td className="">
                                          <img src={circleIconOp} alt="" className="circleIcon"/>
                                      </td>
                                      <td className="font-weight-light text-left textIndicador">
                                          <div>Mantención por kms</div>
                                          <div>Scanner</div>
                                          <div>Cambio de aceite</div>
                                      </td>
                                      <td className="textIndicador">
                                          <div>32% <IconButton className="text-success" iconProps={alto} ariaLabel="Alto"/></div>
                                          <div>8% <IconButton className="text-danger" iconProps={medio} ariaLabel="Medio"/></div>
                                          <div>21% <IconButton className="text-warning" iconProps={bajo} ariaLabel="Bajo"/></div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>

              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg4">
                  <span className="titTablaIndicador fondoAmarilloTit">Stock Productos</span>
                  <div className="card fondoIndicadores shadow">
                          <div className="table-responsive">
                              <table className="table tablaIndicador">
                                  <tbody>
                                      <tr>
                                      <td className="">
                                          <img src={circleIconPr} alt="" className="circleIcon"/>
                                      </td>
                                      <td className="font-weight-light text-left textIndicador">
                                          <div>Aceite</div>
                                          <div>Desengrasante</div>
                                          <div>Bujias</div>
                                      </td>
                                      <td className="textIndicador">
                                          <div>98 <IconButton className="text-success" iconProps={warning} ariaLabel="Alto"/></div>
                                          <div>35 <IconButton className="text-danger" iconProps={warning} ariaLabel="Medio"/></div>
                                          <div>58 <IconButton className="text-warning" iconProps={warning} ariaLabel="Bajo"/></div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>

      </div>
      </div>


      </React.Fragment>




    );*/

    return (
        <React.Fragment>
            <div className="fondoMantenedores">
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row mt-5">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg2 mt-4"></div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg10 mt-4">
                        <h5 className="titSistemaVTZ">Bienvenido(a) a tu nueva tienda virtual</h5>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-1 text-center">
                    </div><img src={LogoHome} alt="" className={"logoHome"} />
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg10 mt-4 d-flex justify-content-end">
                        <h5 className="titSistemaVTZ">descubre una nueva experiencia.</h5>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg2 mt-4"></div>
                    </div>

                    <div className="ms-Grid-row mt-3">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-4">
                            <h1 className="divtitulo2">MUSICPRO</h1>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>  
        );

  }


}

export default HomeSistema;