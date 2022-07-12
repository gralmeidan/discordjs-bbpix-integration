const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { DISC_TOKEN, DISC_CLIENT_ID, DISC_GUILD_ID } = require('./src/config/disc.cjs');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('pay').setDescription('Simulates paying a pix!')
		.addStringOption(option =>
			option.setName('txid')
				.setDescription('O txid do pix a ser pago')
				.setRequired(true)),
	new SlashCommandBuilder().setName('fetch').setDescription('Simulates paying a pix!')
		.addStringOption(option =>
			option.setName('txid')
				.setDescription('O txid do pix a ser pago')
				.setRequired(true)),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(DISC_TOKEN);

rest.put(Routes.applicationGuildCommands(DISC_CLIENT_ID, DISC_GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
