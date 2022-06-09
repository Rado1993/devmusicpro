import {
    httpGetAll,
    httpGet,
    httpGetID
} from '../components/utils';

export const ProductoService = {
    findAll,
    findParam,
    findID
};

const host = 'Producto';

async function findAll() {
    return httpGet(host, { mode: 1, opc: 1 });
}

async function findParam(data: any) {
    return httpGet(host, { mode: 1, data });
}

async function findID(id: number) {
    return httpGetID(host, id);
}

