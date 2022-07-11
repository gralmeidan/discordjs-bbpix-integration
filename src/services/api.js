import fetch from 'node-fetch';
import { BB_BASIC } from '../config/index.js';

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

	const { access_token } = await fetch(URL, requestOptions)
		.then(data => data.json())
		.catch(error => console.log('error', error));

	return access_token;
};
