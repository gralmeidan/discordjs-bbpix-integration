import { Client, Intents } from 'discord.js';
import { DISC_TOKEN } from './src/config/index.js';
import { createPix, fetchPix, pixQrCode, simulatePayPix } from './src/services/api.js';

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Quando o usuário utilizar algum comando
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		const { textoImagemQRcode, txid } = await createPix('10.21');

		const qr = await (pixQrCode(textoImagemQRcode))
			.then(({ attach }) => attach);

		await interaction.reply({
			content: `${textoImagemQRcode}\n\n${txid}`,
			ephemeral: true,
			files: [qr],
		});

		let i = 0;
		const timer = setInterval(async () => {
			const { status } = await fetchPix(txid);
			console.log(status);
			if (status === 'CONCLUIDA') {
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
	}
	else if (commandName === 'server') {
		await interaction.reply('Server info.');
	}
	else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
	else if (commandName === 'pay') {
		const [{ value: qrCode }] = interaction.options['_hoistedOptions'];
		await interaction.deferReply();
		await simulatePayPix(qrCode);
		await interaction.editReply({
			content: 'Simulação de pagamento concluída',
			ephemeral: true,
		});
	}
	else if (commandName === 'fetch') {
		const [{ value: txid }] = interaction.options['_hoistedOptions'];
		const info = await fetchPix(txid);
		console.log(info);
		await interaction.reply({
			content: info.status,
			ephemeral: true,
		});
	}
});


// Login to Discord with your client's DISC_token
client.login(DISC_TOKEN);
