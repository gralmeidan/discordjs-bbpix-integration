import fetch from 'node-fetch';
import { BB_BASIC, BB_KEY } from '../config/index.js';
import qrcode from 'qrcode';
import { MessageAttachment } from 'discord.js';

const generateTxid = () => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 35; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

export const fetchToken = async () => {
	const URL = 'https://oauth.hm.bb.com.br/oauth/token';

	const myHeaders = {
		'Authorization': BB_BASIC,
		'Content-Type': 'application/x-www-form-urlencoded',
	};

	const urlencoded = new URLSearchParams();
	urlencoded.append('grant_type', 'client_credentials');
	urlencoded.append('scope', 'cob.read cob.write pix.read pix.write');

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow',
	};

	const access_token = await fetch(URL, requestOptions)
		.then(data => data.json())
		.then(data => data.access_token)
		.catch(error => console.log('error', error));

	return access_token;
};

export const createPix = async (valor) => {

	const token = await fetchToken();

	const myHeaders = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`,
	};

	const raw = JSON.stringify({
		'calendario': {
			'expiracao': 36000,
		},
		'devedor': {
			'cpf': '12345678909',
			'nome': 'Francisco da Silva',
		},
		'valor': {
			'original': valor,
		},
		'chave': '28779295827',
		'solicitacaoPagador': 'Cobrança dos serviços prestados.',
	});

	const requestOptions = {
		method: 'PUT',
		headers: myHeaders,
		body: raw,
		redirect: 'follow',
	};

	const URL = `https://api.hm.bb.com.br/pix/v1/cobqrcode/${generateTxid()}?gw-dev-app-key=${BB_KEY}`;

	const response = await fetch(URL, requestOptions)
		.then(data => data.json())
		.catch(error => console.log('error', error));

	return response;
};

export const pixQrCode = async (pix) => {
	const base64 = 	await qrcode.toDataURL(pix);
	const buff = new Buffer.from(base64.split(',')[1], 'base64');
	const attach = new MessageAttachment(buff, `${pix}.png`);

	return {
		base64,
		attach,
	};
};
