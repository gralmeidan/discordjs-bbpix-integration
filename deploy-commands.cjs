const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { DISC_TOKEN, DISC_CLIENT_ID, DISC_GUILD_ID } = require('./src/config/disc.cjs');

const commands = [
	new SlashCommandBuilder().setName('pix').setDescription('Responde com um pix gerado dinamicamente')
		.addStringOption(option =>
			option.setName('value')
				.setDescription('O valor do pix a ser gerado')
				.setRequired(true)),
	new SlashCommandBuilder().setName('pay').setDescription('Simula o pagamento de um pix')
		.addStringOption(option =>
			option.setName('code')
				.setDescription('O código do pix a ser pago')
				.setRequired(true)),
	new SlashCommandBuilder().setName('fetch').setDescription('Busca informações sobre uma transação')
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
