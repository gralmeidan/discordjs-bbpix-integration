import { Client, Intents } from 'discord.js';
import { slashFetch } from './src/commands/fetch.js';
import { slashPay } from './src/commands/pay.js';
import { slashPix } from './src/commands/pix.js';
import { DISC_TOKEN } from './src/config/index.js';

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

	if (commandName === 'pix') {
		await slashPix(interaction);
	}
	else if (commandName === 'pay') {
		await slashPay(interaction);
	}
	else if (commandName === 'fetch') {
		await slashFetch(interaction);
	}
});


// Login to Discord with your client's DISC_token
client.login(DISC_TOKEN);
