require('dotenv').config();

const Discord = require('discord-rpc');
const client = new Discord.Client({ transport: 'ipc' });

const EMPTY_STATE = '‎‎'; //* This string actually has a length of two. The characters are from: https://emptycharacter.com/
const RPC_DATA = {
	clientId: process.env.CLIENT_ID,
	defaultData: {
		details: 'Deciding what to do',
		state: EMPTY_STATE,
		startTimestamp: Date.now(),
		largeImageKey: 'tycrek'
	}
};

function _main() {
	console.log(':: Connecting...');
	connect()
		.then(() => console.log(':: Connected'));

	client.on('ready', () =>
		setActivity(RPC_DATA.defaultData)
			.then(() => console.log(':: Activity set'))
			.catch(console.warn));
}

function connect() {
	return new Promise((resolve, reject) =>
		client.login(RPC_DATA)
			.then(resolve)
			.catch(reject));
}

function setActivity(data) {
	return new Promise((resolve, reject) =>
		client.setActivity(data)
			.then(resolve)
			.catch(reject));
}

_main();
