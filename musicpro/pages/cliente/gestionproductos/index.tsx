import Layout from './../../../components/Layouts/index';
import { Card, CardBody } from '@paljs/ui/Card';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import table from '../../../components/utils/table';
import 'material-icons/iconfont/material-icons.css';
import { ProductoService } from '../../../services/producto.service';
import { EvaIcon } from '@paljs/ui';

export default function GestionProducto() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cargaInicial, setCarga] = useState(false);

    useEffect(()=>{
        ProductoService.findAll()
            .then((res:any)=>{
                console.log(res);
                setData(res);
            });
        /*ProductoService.findParam({id: 1})
            .then((res:any)=>{
                console.log(res);
                setData(res);
            });*/
    }, [cargaInicial]);

    return (
        <Layout title="Gestión Producto" >
            <Card>
                <header style={{ fontWeight: 'bold', color: '#0095ff', fontSize: 'x-large' }}>GESTIÓN DE PRODUCTOS</header>
                <CardBody>
                    <div style={{ maxWidth: '100%' }}>
                        <MaterialTable
                            columns={[
                                { title: 'Categoria', field: 'categoria.descripcion', headerStyle: table.headerStyle, defaultGroupOrder: 0 },
                                { title: 'Nombre', field: 'detalle', headerStyle: table.headerStyle },
                                { title: 'Precio', field: 'precio', type: 'currency', headerStyle: table.headerStyle , render: rowData =>
                                <div>
                                    {rowData.precio > 0 ? '$' + rowData.precio : ""}
                                </div>
                                },
                                { title: 'Oferta', field: 'oferta', headerStyle: table.headerStyle, render: rowData =>
                                <div>
                                    <EvaIcon status={rowData.oferta ? 'Success' : 'Danger'} name={rowData.oferta ? "checkmark-square-2-outline" : "close-square-outline"} />
                                </div>
                                },
                                { title: 'Precio Oferta', field: 'precio_oferta', headerStyle: table.headerStyle , render: rowData =>
                                <div>
                                    {rowData.precio_oferta > 0 ? rowData.precio_oferta : ""}
                                </div>
                                },
                            ]}
                            data={data}
                            title=''
                            components={table.components}
                            localization={table.localization}
                        />
                    </div>

                </CardBody>
            </Card>
        </Layout>
    );

}