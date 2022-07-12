import { fetchPix } from '../services/api.js';

export const slashFetch = async (interaction) => {
	const [{ value: txid }] = interaction.options['_hoistedOptions'];
	const info = await fetchPix(txid);
	await interaction.reply({
		content: info.status,
		ephemeral: true,
	});

};