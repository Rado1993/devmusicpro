import {
    httpGetAll,
    httpGet,
    httpGetID,
    httpPost,
    httpPut
} from '../components/utils';

export const StockService = {
    findAll,
    findParam,
    findID,
    postStock,
    putStock
};

const host = 'Stock';

async function findAll() {
    return httpGet(host, { mode: 1, opc: 1 });
}

async function findParam(data: any) {
    return httpGet(host, { mode: 1, opc: 2, data });
}

async function findID(id: number) {
    return httpGetID(host, id);
}

async function postStock(data: any) {
    return httpPost(host, data);
  }

  async function putStock(id: number, data: any) {
    return httpPut(host, id, data);
  }

