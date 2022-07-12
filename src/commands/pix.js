import { createPix, fetchPix, pixQrCode } from '../services/api.js';

export const slashPix = async (interaction) => {
	const [{ value }] = interaction.options['_hoistedOptions'];
	const { textoImagemQRcode, txid } = await createPix(value);
	const { attach } = await (pixQrCode(textoImagemQRcode));

	await interaction.reply({
		content: `Código: ${textoImagemQRcode} \n TXID: ${txid}`,
		ephemeral: true,
		files: [attach],
	});

	// Starts a interval that checks every 5 seconds if the transaction has been completed
	let i = 0;
	const timer = setInterval(async () => {
		const { status } = await fetchPix(txid);
		if (status === 'CONCLUIDA') {
			// When the transaction is completeded gives the 'SUCESSO' role to the user.
			const role = interaction.guild.roles.cache.find(({ name }) => name === 'SUCESSO');
			const user = interaction.user.id;
			const member = interaction.guild.members.cache.find(({ id }) => id === user);
			await member.roles.add(role);
			clearInterval(timer);
		}
		else {
			if (i > 20) {
				clearInterval(timer);
			}
			i++;
		}
	}, 5000);
};