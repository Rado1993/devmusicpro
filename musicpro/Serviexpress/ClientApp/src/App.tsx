import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import HomeCliente from './components/HomeCliente/HomeCliente';
import HomeSistema from './components/HomeSistema/HomeSistema';
import HomeOrdenPedido from './components/OrdenPedido/HomeOrdenPedido';
import OrdenPedido from './components/OrdenPedido/OrdenPedido';
import Formulario from './components/Formulario/Formulario';
import Mantenedor from './components/Mantenedor/Mantenedor';
import FetchData from './components/FetchData';
import HomeVentas from './components/Ventas/HomeVentas';
import './custom.css'
import GestionPago from './components/GestionPago/GestionPago';
import Factura from './components/Factura/Factura';
import DocumentoPago from './components/DocumentoPago/DocumentoPago';
import OrdenPedidoHecha from './components/OrdenPedido/OrdenPedidoHecha';
import NotaCredito from './components/NotaCredito/NotaCredito';
import Inventario from './components/Stock/Inventario';

export default () => (
    <Layout>
        <Route exact path='/' component={HomeCliente} />
        <Route path='/sistema_gestion' component={HomeSistema} />
        <Route path='/orden_pedido' component={HomeOrdenPedido} />
        <Route path='/ordenpedido' component={OrdenPedidoHecha} />
        <Route path='/home_ventas' component={HomeVentas} />
        <Route path='/crear_orden' component={OrdenPedido} />
        <Route path='/mantenedores' component={Mantenedor} />
        <Route path='/formulario' component={Formulario} />
        <Route path='/gestionpago' component={GestionPago} />
        <Route path='/documento_pago' component={DocumentoPago} />
        <Route path='/nota_credito' component={NotaCredito} />
        <Route path='/factura' component={Factura} />
        <Route path='/inventario' component={Inventario} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData}/>
    </Layout>
);
