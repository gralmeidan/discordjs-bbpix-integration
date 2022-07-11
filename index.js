import { Client, Intents } from 'discord.js';
import { DISC_TOKEN } from './src/config/index.js';
import { fetchToken } from './src/services/api.js';

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
		await interaction.reply(fetchToken());
	}
	else if (commandName === 'server') {
		await interaction.reply('Server info.');
	}
	else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});


// Login to Discord with your client's DISC_token
client.login(DISC_TOKEN);
