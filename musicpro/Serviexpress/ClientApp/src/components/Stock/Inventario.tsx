import * as React from 'react';
import { connect } from 'react-redux';
import './Inventario.css';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, Stack, Label, Checkbox, ComboBox, DayOfWeek, DatePicker, Panel, PanelType } from 'office-ui-fabric-react';
import { IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { FontWeights, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { fetchEngine } from '../../fetchData';
import { IIconProps } from 'office-ui-fabric-react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { IconButton } from '@fluentui/react/lib/Button';
import { useEffect, useState } from 'react';
import { CompraService } from '../../services/compra.service';
import moment from 'moment';
import MaterialTable from 'material-table'
import 'material-icons/iconfont/material-icons.css';
import table from '../../components/utils/table'
import { StockService } from '../../services/stock.service';

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
const factura: IIconProps = { iconName: 'ActivateOrders' }
const generar: IIconProps = { iconName: 'TextDocument' }

const controlClass = mergeStyleSets({
    control: {
        margin: '0 0 15px 0',
        maxWidth: '300px'
    }
});

export class InventarioProps { }

export class InventarioState {
    tipoUser?: string;
    currentPage: number = 1;
    panelOP!: any;
    items!: any[];
    facturaOboleta?: boolean;
    idEscogido?: number;
    dataVentas?: any[];
    venta?: any[];
    pedido?: boolean;
    estados?: any[];

    venta_estado?: number = 1;
    venta_nombre?: string;
    totalVenta?: number = 0;

    estadoPedido?: number = 0;

}

export class Inventario extends React.Component<InventarioProps, InventarioState>{
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
            dataVentas: [],
            venta: [],
            pedido: false,
            estados: [
                {
                    key: 1,
                    text: "Nuevo"
                },
                {
                    key: 2,
                    text: "Aprobado"
                },
                {
                    key: 3,
                    text: "Rechazado"
                },
                {
                    key: 4,
                    text: "Enviado a Bodeguero"
                },
                {
                    key: 5,
                    text: "Orden de Despacho Generada"
                },
                {
                    key: 6,
                    text: "Finalizado"
                }

            ],


            venta_estado: 1,
            venta_nombre: "",
            totalVenta: 0,
            estadoPedido: 0
        }

        this.obtenerVentas();

    }

    public obtenerVentas() {
        let fechaActual = moment().format('YYYY-MM-DDTHH:mm');
        let total = 0;
        //CompraService.findParam({ detalle: "", cantidad: 1, fecha_venta: fechaActual, valor_unitario: 0, valor_total: 0, valor_neto: 0, id_usuario: 3, id_prod: 1, id_suc: 1, id_stock: 1 })
        StockService.findAll()
        .then((res: any) => {
            console.log(res);
            this.setState({dataVentas: res})
        })

    }

    public divMantenedor() {
        return (
            <div className="fondoOP">
                <div className="tituloHome">
                    <label>GESTIÓN DE INVENTARIO</label>
                </div>
                <MaterialTable
                    columns={[
                        { title: 'Sucursal', field: 'nom_suc', headerStyle: table.headerStyle },
                        { title: 'Producto', field: 'nom_prod', headerStyle: table.headerStyle },
                        { title: 'Cantidad', field: 'cantidad', headerStyle: table.headerStyle },
                        { title: 'Fecha Actualización', field: 'fecha', type: 'date', headerStyle: table.headerStyle }
                    ]}
                    data={this.state.dataVentas != undefined ? this.state.dataVentas : []}
                    title=" "
                    components={table.components}
                    localization={table.localization}
                />

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
                            </div>
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

export default Inventario;