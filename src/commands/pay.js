import { simulatePayPix } from '../services/api.js';

export const slashPay = async (interaction) => {
	const [{ value: qrCode }] = interaction.options['_hoistedOptions'];
	await interaction.deferReply();
	await simulatePayPix(qrCode);
	await interaction.editReply({
		content: '.',
		ephemeral: true,
	});
};