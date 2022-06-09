import * as React from 'react';
import { connect } from 'react-redux';
import './HomeVentas.css';
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

export class HomeVentasProps { }

export class HomeVentasState {
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

export class HomeVentas extends React.Component<HomeVentasProps, HomeVentasState>{
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

        this.obtenerReserva();
        this.obtenerVentas();

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

    public crearOrden() {
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

    public esFactura() {

    }

    public obtenerVentas() {
        let fechaActual = moment().format('YYYY-MM-DDTHH:mm');
        let total = 0;
        //CompraService.findParam({ detalle: "", cantidad: 1, fecha_venta: fechaActual, valor_unitario: 0, valor_total: 0, valor_neto: 0, id_usuario: 3, id_prod: 1, id_suc: 1, id_stock: 1 })
        CompraService.findParam({ detalle: "", cantidad: 1, fecha_venta: fechaActual, valor_unitario: 0, valor_total: 0, valor_neto: 0, id_usuario: 0, id_prod: 1, id_suc: 1, id_stock: 1 })
            .then((res: any) => {
                this.setState({ dataVentas: res })
                console.log(res);
            })

    }

    public dialogoBoletaoFactura() {
        return (
            <Dialog
                hidden={this.state.facturaOboleta}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Cambio de estado',
                    subText: `Cambio de estado realizado con exito`
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}>
                <DialogFooter>
                    <DefaultButton text="Cerrar" onClick={() => { this.setState({ facturaOboleta: true }) }}> </DefaultButton>
                </DialogFooter>
            </Dialog>
        );
    }

    public obtenerOrden(data: any) {
        let total = 0;
        console.log(data);
        CompraService.findParam({ detalle: "", cantidad: 1, fecha_venta: data.fecha_venta, valor_unitario: 0, valor_total: 0, valor_neto: 0, id_usuario: data.id_usuario, id_prod: 1, id_suc: 1, id_stock: 1 })
            .then((res: any) => {
                this.setState({ venta: res, pedido: true, venta_estado: res[0].id_estado, venta_nombre: res[0].id_usuario == 3 ? "Pedro Angel" : "Cliente no registrado", estadoPedido: res[0].id_estado })
                console.log(res);
                res.map((a: any) => {
                    total = total + a.valor_total;
                })

                this.setState({ totalVenta: total })
            })
    }

    public divMantenedor() {
        return (
            <div className="fondoOP">
                <div className="tituloHome">
                    <label>GESTIÓN DE VENTAS</label>
                </div>
                <MaterialTable
                    columns={[
                        { title: 'Cliente', field: 'id_usuario', headerStyle: table.headerStyle, lookup: { 3: 'Pedro Angel', 4: 'Sin Registrar' }, defaultGroupOrder: 0 },
                        { title: 'Fecha', field: 'fecha_venta', type: 'date', headerStyle: table.headerStyle, defaultGroupOrder: 0 },
                        { title: 'Hora', field: 'fecha_venta', type: 'time', headerStyle: table.headerStyle, defaultGroupOrder: 0 },
                        { title: 'Detalle', field: 'detalle', headerStyle: table.headerStyle },
                        { title: 'Cantidad', field: 'cantidad', headerStyle: table.headerStyle },
                        {
                            title: 'Precio', field: 'valor_unitario', headerStyle: table.headerStyle, render: rowData =>
                                <div>${rowData.valor_unitario}</div>
                        },
                        {
                            title: 'Total', field: 'valor_total', headerStyle: table.headerStyle, render: rowData =>
                                <div>${rowData.valor_total}</div>
                        },
                        { title: 'Estado', field: 'id_estado', headerStyle: table.headerStyle, lookup: { 1: 'Nuevo', 2: 'Aprobado', 3: 'Rechazado', 4: 'Enviado a Bodeguero', 5: 'Orden de Despacho Generada', 6: 'Finalizado' } },
                        {
                            title: 'Ver', width: '10%', field: 'id_estado', headerStyle: table.headerStyle, render: rowData =>
                                <IconButton iconProps={ver} onClick={() => { this.obtenerOrden(rowData) }} className={"iconoVer"} ariaLabel="Alto" />
                        },
                    ]}
                    data={this.state.dataVentas != undefined ? this.state.dataVentas : []}
                    title=" "
                    components={table.components}
                    localization={table.localization}
                />

            </div>
        )

    }

    private _onChangeEstado = (event: any, item: any): void => {
        this.setState({ venta_estado: item.key });
    };

    public aprobar(accion: number) {
        //1 NUEVO
        //2 APROBADO
        //3 RECHAZADO
        //4 ENVIADO A BODEGUERO S/N ORDEN DE DESPACHO
        //5 ORDEN DE DESPACHO GENERADA S/N ENVIADO A BODEGUERO
        //6 ENVIADO A BODEGUERO + ORDEN DE DESPACHO
        this.setState({ estadoPedido: accion });
        if (this.state.venta != undefined) {
            this.state.venta.map((a: any) => {
                CompraService.putCompra(a.id, { detalle: "", cantidad: 1, fecha_venta: a.fecha_venta, valor_unitario: 0, valor_total: 0, valor_neto: 0, id_usuario: a.id_usuario, id_prod: 1, id_suc: 1, id_stock: 1, id_estado: accion })
                    .then((res: any) => {
                        console.log(res);
                    })
            })

            this.setState({ facturaOboleta: false });
        }
    }

    public ordenDePedido() {
        return (
            <div className="fondoOP">
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg5">
                            {
                                <div className="tituloOrdenOP">
                                    Pedido
                                </div>
                            }
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                            <TextField label="N° Venta"
                                placeholder={"N° Venta"}
                                value={'5'}
                                id={"numero_venta"}
                                disabled={true}
                            //onChange={(e) => { this.textFieldOnChange(e) }}                  
                            ></TextField>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                            <ComboBox
                                label={"Estado"}
                                placeholder={"En proceso"}
                                options={this.state.estados}
                                selectedKey={this.state.venta_estado}
                                onChange={this._onChangeEstado}
                                disabled={true}
                            />
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-12">
                            <h6 className="tituloDatosOrden">Datos Cliente</h6>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <TextField label="Nombre cliente"
                                placeholder={"Nombre cliente"}
                                value={this.state.venta_nombre}
                                id={"nom_cliente"}
                                disabled={false}
                            //onChange={(e) => { this.textFieldOnChange(e) }}                  
                            ></TextField>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <TextField label="Medio de Pago"
                                placeholder={"Medio de Pago"}
                                value={"WEBPAY"}
                                id={"nom_cliente"}
                                disabled={false}
                            //onChange={(e) => { this.textFieldOnChange(e) }}                  
                            ></TextField>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg3">
                            <TextField label="Sucursal"
                                placeholder={"Sucursal"}
                                value={"SANTIAGO"}
                                id={"nom_cliente"}
                                disabled={false}
                            //onChange={(e) => { this.textFieldOnChange(e) }}                  
                            ></TextField>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 mt-12">
                            <h6 className="tituloDatosOrden">Datos Productos</h6>
                        </div>


                        {this.state.venta != undefined ? this.state.venta.map((a: any) => {
                            //this.setState({totalVenta: this.state.totalVenta + a.valor_total})
                            return (
                                <div style={{ marginLeft: '0rem' }} className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
                                        <TextField label="Producto"
                                            placeholder={"Nombre producto"}
                                            value={a.detalle}
                                            type={"text"}
                                            id={"nom_producto"}
                                            disabled={false}
                                            onChange={(e) => { }}
                                        ></TextField>
                                    </div>
                                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                        <TextField label="Cantidad"
                                            placeholder={"Ingrese cantidad"}
                                            value={a.cantidad}
                                            type={"text"}
                                            id={"cantidad_producto"}
                                            disabled={false}
                                            onChange={(e) => { }}
                                        ></TextField>
                                    </div>
                                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                        <TextField label="Precio Unitario"
                                            placeholder={"Ingrese precio"}
                                            value={a.valor_unitario}
                                            type={"text"}
                                            id={"cantidad_producto"}
                                            disabled={false}
                                            onChange={(e) => { }}
                                        ></TextField>
                                    </div>
                                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                        <TextField label="Total"
                                            placeholder={"Ingrese precio"}
                                            value={(a.valor_unitario * a.cantidad).toString()}
                                            type={"text"}
                                            id={"cantidad_producto"}
                                            disabled={false}
                                            onChange={(e) => { }}
                                        ></TextField>
                                    </div>

                                </div>
                            );
                        })
                            : ""}
                        <div style={{ marginTop: '2rem' }} className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg8">
                            </div>

                            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                <TextField label="TOTAL"
                                    placeholder={"Ingrese precio"}
                                    value={this.state.totalVenta != undefined ? this.state.totalVenta.toString() : "0"}
                                    type={"text"}
                                    id={"cantidad_producto"}
                                    disabled={false}
                                    onChange={(e) => { }}
                                ></TextField>
                            </div>
                        </div>

                        {this.state.estadoPedido == 1 ?
                            <div style={{ marginTop: '15rem' }} className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                    <div className="botoneraOP">
                                        <PrimaryButton className="botones" text="Volver" disabled={false} onClick={() => { this.setState({pedido: false}) }}></PrimaryButton>
                                    </div>
                                </div>
                                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6">
                                </div>
                                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                    <div className="botoneraOP">
                                        <PrimaryButton className="botones" text="Aprobar Pedido" disabled={false} onClick={() => { this.aprobar(2) }}></PrimaryButton>
                                    </div>
                                </div>
                                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                    <div className="botoneraOP">
                                        <PrimaryButton className="botones" text="Rechazar Pedido" disabled={false} onClick={() => { this.aprobar(3) }}></PrimaryButton>
                                    </div>
                                </div>
                            </div>
                            :
                            this.state.estadoPedido == 2 ?
                                <div style={{ marginTop: '15rem' }} className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                        <div className="botoneraOP">
                                            <PrimaryButton className="botones" text="Volver" disabled={false} onClick={() => { this.setState({pedido: false}) }}></PrimaryButton>
                                        </div>
                                    </div>
                                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6">
                                    </div>
                                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                        <div className="botoneraOP">
                                            <PrimaryButton className="botones" text="Enviar a Bodeguero" disabled={false} onClick={() => { this.aprobar(4) }}></PrimaryButton>
                                        </div>
                                    </div>
                                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                        <div className="botoneraOP">
                                            <PrimaryButton className="botones" text="Generar Orden de Despacho" disabled={false} onClick={() => { this.aprobar(5) }}></PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                                :
                                this.state.estadoPedido == 3 ?
                                    <div style={{ marginTop: '15rem' }} className="ms-Grid-row">
                                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                            <div className="botoneraOP">
                                                <PrimaryButton className="botones" text="Volver" disabled={false} onClick={() => { this.setState({pedido: false}) }}></PrimaryButton>
                                            </div>
                                        </div>
                                        <a className="rechazada">Este pedido a sido Rechazado</a>
                                    </div>
                                    :
                                    this.state.estadoPedido == 4 ?
                                        <div style={{ marginTop: '15rem' }} className="ms-Grid-row">
                                            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                                <div className="botoneraOP">
                                                    <PrimaryButton className="botones" text="Volver" disabled={false} onClick={() => { this.setState({pedido: false}) }}></PrimaryButton>
                                                </div>
                                            </div>
                                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6">
                                            </div>
                                            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                                <div className="botoneraOP">
                                                    <PrimaryButton className="botones" text="Generar Orden de Despacho" disabled={false} onClick={() => { this.aprobar(6) }}></PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        this.state.estadoPedido == 5 ?
                                            <div style={{ marginTop: '15rem' }} className="ms-Grid-row">
                                                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                                    <div className="botoneraOP">
                                                        <PrimaryButton className="botones" text="Volver" disabled={false} onClick={() => { this.setState({pedido: false}) }}></PrimaryButton>
                                                    </div>
                                                </div>
                                                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6">
                                                </div>
                                                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg2">
                                                    <div className="botoneraOP">
                                                        <PrimaryButton className="botones" text="Enviar a Bodeguero" disabled={false} onClick={() => { this.aprobar(6) }}></PrimaryButton>
                                                    </div>
                                                </div>
                                            </div>
                                            : ""
                        }
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="fondoMantenedores">
                <React.Fragment>
                    <div >
                        {this.state.pedido ?
                            <div>
                                {this.ordenDePedido()}
                                {this.dialogoBoletaoFactura()}
                            </div>
                            :
                            <div>
                                {this.divMantenedor()}
                                {this.dialogoBoletaoFactura()}
                            </div>
                        }
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

export default HomeVentas;