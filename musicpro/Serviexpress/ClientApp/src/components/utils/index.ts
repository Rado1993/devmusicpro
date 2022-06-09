const numeros = '7865904312';
const minuscula = 'qwertyuiopasdfghjklzxcvbnm';
const mayuscula = 'ZXCVBNMASDFGHJKLQWERTYUIOP';
//const urlSAP = 'https://e250380-iflmap.hcisbt.us3.hana.ondemand.com/http/';
//const apiURL = 'https://qasigoback.azurewebsites.net/api/'
const apiURL = 'https://localhost:44345/api/'

export const FcEncrypted = (data: any) => {
	const valor = JSON.stringify(data);
	const arreglo: string[] = [];
	//let arreglo = [...btoa(valor)].map((x) => {
	const text = window.btoa(unescape(encodeURIComponent(valor)));
	for (let i = 0; i < text.length; i++) {
		const x = text.charAt(i);
		const ch = x.charCodeAt(0);
		if (ch >= 48 && ch <= 57) {
			arreglo.push(numeros[ch - 48]);
		} else if (ch >= 65 && ch <= 90) {
			arreglo.push(mayuscula[ch - 65]);
		} else if (ch >= 97 && ch <= 122) {
			arreglo.push(minuscula[ch - 97]);
		} else if (ch === 61) {
			arreglo.push('@');
		} else {
			arreglo.push(x);
		}
	}//);
	return arreglo.join('') + '=';
};

export const FcDecrypted = (text: string) => {
	try {
		const valor = text.replace('=', '');
		const arreglo: string[] = [];
		//let arreglo = [...valor].map((x) => {
		for (let i = 0; i < valor.length; i++) {
			const x = text.charAt(i);
			const ch = x.charCodeAt(0);
			if (ch >= 48 && ch <= 57) {
				arreglo.push(String.fromCharCode(numeros.indexOf(x) + 48));
			} else if (ch >= 65 && ch <= 90) {
				arreglo.push(String.fromCharCode(mayuscula.indexOf(x) + 65));
			} else if (ch >= 97 && ch <= 122) {
				arreglo.push(String.fromCharCode(minuscula.indexOf(x) + 97));
			} else if (ch === 64) {
				arreglo.push('=');
			} else {
				arreglo.push(x);
			}
		} //);
		return JSON.parse(decodeURIComponent(escape(window.atob(arreglo.join('')))));
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const httpGet = async (url: string, param: any, field = "filter") => {

	try {
		const filter = FcEncrypted(param);

		const query = await fetch(`${apiURL}${url}?${field}=${filter}`);
		const json = await query.json();
		if (json.statusCode == 200) {
			return FcDecrypted(json.data);
		} else {
			console.log('ERROR FETCH', json, field, param);
			return null;
		}
	}
	catch (e) {
		console.log('fetch error', e, url);
		return null;
	}
}

export const httpGetID = async (url: string, param: number) => {
	try {
		//var filter = FcEncrypted(param);
		const query = await fetch(`${apiURL}${url}/${param}`);
		const json = await query.json();
		if (json.statusCode == 200) {
			return FcDecrypted(json.data);
		} else {
			console.log('ERROR FETCH');
			return null;
		}
	}
	catch (e) {
		console.log('fetch error', e, url);
		return null;
	}
}

export const httpGetAll = async (url: string) => {
	try {
		const query = await fetch(`${apiURL}${url}`);
		//console.log(query);
		const json = await query.json();
		if (json.statusCode == 200) {
			return FcDecrypted(json.data);
		} else {
			console.log('ERROR FETCH');
			return null;
		}
	}
	catch (e) {
		console.log('fetch error', e, url);
		return null;
	}
}

export const httpPost = async (url: string, param: any, mode = 1, type?: any) => {
	try {
		console.log()
		const filter = FcEncrypted(param);
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mode: mode, opc: type, data: filter })
		};
		const query = await fetch(`${apiURL}${url}`, requestOptions);
		const json = await query.json();
		//console.log('POST', json);
		if (json.statusCode == 200) {
			if (json.data != '') {
				return FcDecrypted(json.data);
			} else {
				return true;
			}
		} else {
			console.log('ERROR FETCH', json, param);
			return null;
		}
	}
	catch (e) {
		console.log('fetch error', e, url);
		return null;
	}
}

/*export const httpPostSAP = async (url: string, param: any) => {
	const cors = require('cors');
	const app = express();
	app.use(cors());
	try {
		const filter = FcEncrypted(param);
		console.log(param);
		const requestOptions = {
			cors: 'disabled',
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': 'bee815206daba9b79247379c81f7d1c1' },
			body: param
		};
		console.log(requestOptions);
		const query = await fetch(`${urlSAP}${url}`, requestOptions);
		const json = await query.json();
		console.log('POST', json);
		console.log(json);
		if (json.statusCode == 200) {
			if (json.data != '') {
				return FcDecrypted(json.data);
			} else {
				return true;
			}
		} else {
			console.log('ERROR FETCH', json, param);
			return null;
		}
	}
	catch (e) {
		console.log('fetch error', e, url);
		return null;
	}
}*/

export const httpPostSAP2 = async (url: string, param: any, mode:number = 1) => {
	try {
		const filter = FcEncrypted(param);
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mode: 1, data: filter })
		};
		console.log(requestOptions);
		const query = await fetch(`${apiURL}${url}`, requestOptions);
		const json = await query.json();
		//console.log('POST', json);
		console.log(json);
		if (json.statusCode == 200) {
			if (json.data != '') {
				return FcDecrypted(json.data);
			} else {
				return true;
			}
		} else {
			console.log('ERROR FETCH', json, param);
			return null;
		}
	}
	catch (e) {
		console.log('fetch error', e, url);
		return null;
	}
}

export const httpPut = async (url: string, id: number, param: any, mode = 1, opc?: number) => {
	try {
		const filter = FcEncrypted(param);
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mode: mode, opc: opc, data: filter })
		};
		const query = await fetch(`${apiURL}${url}/${id}`, requestOptions);
		const json = await query.json();
		if (json.statusCode == 200) {
			if (json.data === null || json.data === '')
				return true;
			else
				return FcDecrypted(json.data);
		} else {
			console.log('ERROR FETCH', json, param);
			return null;
		}
	}
	catch (e) {
		console.log('fetch error', e, url);
		return null;
	}
}

export const httpDelete = async (url: string, id: number, param: any, mode = 1) => {
	try {
		const filter = FcEncrypted(param);
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mode: mode, data: filter })
		};
		const query = await fetch(`${apiURL}${url}/${id}`, requestOptions);
		const json = await query.json();
		if (json.statusCode == 200) {
			if (json.data === null || json.data === '')
				return true;
			else
				return FcDecrypted(json.data);
		} else {
			console.log('ERROR FETCH', json, param);
			return null;
		}
	}
	catch (e) {
		console.log('fetch error', e, url);
		return null;
	}
}

export const httpDelete2 = async (url: string, id: number, id_rol: number, param: any, mode = 1) => {
	try {
		const filter = FcEncrypted(param);
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mode: mode, data: filter })
		};
		const query = await fetch(`${apiURL}${url}/${id},${id_rol}`, requestOptions);
		const json = await query.json();
		if (json.statusCode == 200) {
			if (json.data === null || json.data === '')
				return true;
			else
				return FcDecrypted(json.data);
		} else {
			console.log('ERROR FETCH', json, param);
			return null;
		}
	}
	catch (e) {
		console.log('fetch error', e, url);
		return null;
	}
}

export const pdfCompra = async (url: string, id: number) => {
	fetch(`${apiURL}${url}/getDescargarComprobante/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/pdf',
		}
	}).then((response) => response.blob())
		.then((blob) => {
			const url2 = window.URL.createObjectURL(new Blob([blob]),);
			const link = document.createElement('a');
			link.href = url2;
			link.setAttribute(
				'download',
				`Comprobante_Venta.pdf`
			);

			document.body.appendChild(link);

			link.click()
		})
}

export const httpGeneric = async (url: string, body: any, method: string) => {
	try {
		const requestOptions = {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		};
		const query = await fetch(`${apiURL}${url}`, requestOptions);
		const json = await query.json();
		if (json.statusCode == 200) {
			if (json.data === null || json.data === '')
				return true;
			else
				return FcDecrypted(json.data);
		} else {
			console.log('ERROR FETCH', json, body);
			return null;
		}
	}
	catch (e) {
		console.log('fetch error', e, url);
		return null;
	}
}