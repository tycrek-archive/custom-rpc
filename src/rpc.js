// Imports
const { RPC_DATA } = require('./utils');
const Discord = require('discord-rpc');
const fetch = require('node-fetch');

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
				.catch(reject)),
	getAssetList: (applicationId) =>
		new Promise((resolve, reject) =>
			fetch(`https://discordapp.com/api/v8/oauth2/applications/${applicationId}/assets`)
				.then((res) => res.json())
				.then(resolve)
				.catch(reject)),
	getAssetImage: (applicationId, assetId) =>
		new Promise((resolve) =>
			resolve(`https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png`))
};
