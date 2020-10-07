// Imports
const { RPC_DATA } = require('./utils');
const Discord = require('discord-rpc');

// Constants
const client = new Discord.Client({ transport: 'ipc' });

// Exports
module.exports = {
	connect: () =>
		new Promise((resolve, reject) =>
			client.login(RPC_DATA)
				.then(resolve)
				.catch(reject)),
	setActivity: (data) =>
		new Promise((resolve, reject) =>
			client.setActivity(data)
				.then(resolve)
				.catch(reject))
};

function onReady(resolve) {
	client.on('ready', () =>
		setActivity(RPC_DATA.defaultData)
			.then(() => console.log(':: [DISCORD] :: Activity set'))
			.catch(console.warn));
}