import axios from "axios";

interface Props {
    log?: boolean;
}

const apiURL: string = "";

class Engine {
    constructor() {
        
    }


    public acquireTokenAPI = async (authProvider: any) => {

        // LOCALHOST
        return authProvider.acquireTokenSilent({ scopes: [process.env.REACT_APP_ClientId + '/Server.Read'] });

        // AMBIENTE QA IMAGEN
        /* return authProvider.acquireTokenSilent({ scopes: ['1d93019f-c342-47ea-8d75-39277d5c78ac' + '/Server.Read'] }); */

        // AMBIENTE QA VANTAZ
        /* return authProvider.acquireTokenSilent({ scopes: ['3777bf5e-b7a5-4ad3-a07c-5b4dfbb7b6bc' + '/Server.Read'] }); */
    }

    public acquireTokenAPIGraph = async (authProvider: any) => {
        return authProvider.acquireTokenSilent({ scopes: ['User.Read.All'] });
    }

    public acquireTokenAPISharePoint = async (authProvider: any) => {

        // LOCALHOST
        return authProvider.acquireTokenSilent({ scopes: [process.env.REACT_APP_SharePointEndPoint + '/AllSites.FullControl'] });

        // AMBIENTE QA IMAGEN
        /* return authProvider.acquireTokenSilent({ scopes: ['https://imagen.sharepoint.com' + '/AllSites.FullControl'] }); */

        // AMBIENTE QA VANTAZ
        /* return authProvider.acquireTokenSilent({ scopes: ['https://vantaz.sharepoint.com' + '/AllSites.FullControl'] }); */
    }

    public acquireTokenAPIGraphSites = async (authProvider: any) => {
        return authProvider.acquireTokenSilent({ scopes: ['Sites.ReadWrite.All'] });
    }

    public acquireTokenAPIGraphDocuments = async (authProvider: any) => {
        return authProvider.acquireTokenSilent({ scopes: ['Sites.ReadWrite.All', 'Files.ReadWrite.All'] });
    }

    public postAPI = async (apiEndPoint: string, data?: any, headers?: any) => {
        let result = await axios.post(`${apiURL}${apiEndPoint}`, data, { headers: headers });
        let resultado = this.procesarResultado(result);

        return resultado;
    }

    public patchAPI = async (apiEndPoint: string, data?: any, headers?: any) => {
        let result = await axios.patch(`${apiURL}${apiEndPoint}`, data, { headers: headers });
        let resultado = this.procesarResultado(result);

        return resultado;
    }

    public putAPI = async (apiEndPoint: string, data?: any, headers?: any) => {
        let result = await axios.put(`${apiURL}${apiEndPoint}`, data, { headers: headers });
        let resultado = this.procesarResultado(result);

        return resultado;
    }

    public getAPI = async (apiEndPoint: string, headers?: any) => {
        //console.log(`GET: ${apiEndPoint}`);

        let result = await axios.get(`${apiURL}${apiEndPoint}`, { headers: headers });
        let resultado = this.procesarResultado(result);

        return resultado;
    }
    public getAPIExportar = async (apiEndPoint: string, headers?: any) => {
        //console.log(`GET: ${apiEndPoint}`);
 
        let result = await fetch(`${apiURL}${apiEndPoint}`, { headers: headers });
        let resultado = result;
 
        return resultado;
    }

    private procesarResultado = (result: any) => {
        console.log(result);
        let statusCode = result.status;
        let resultado = result.data;

        var procesado = {};

        if (statusCode === 200) {
            if (resultado.ok) {

                procesado = resultado;

            } else {
                //Error controlado
                procesado = resultado;
            }
        } else if (statusCode === 400) {
            //Bad Request
        } else if (statusCode === 401) {
            //Authorization
        } else if (statusCode === 500) {
            //Internal Server Error
        } else {
            //Otro
        }

        return procesado;
    }
}

export const fetchEngine = new Engine()
//export const fetchDataProvider = new fetchData("" as any);