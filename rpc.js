// General imports
const path = require('path');
const fs = require('fs-extra');
const express = require('express');
const { app, BrowserWindow } = require('electron');
const Pug = require('pug');
const Discord = require('discord-rpc');

// Constants
const server = express();
const client = new Discord.Client({ transport: 'ipc' });

const EMPTY_STATE = '‎‎'; //* This string actually has a length of two. The characters are from: https://emptycharacter.com/
const RPC_DATA = {
	clientId: '763074590149836821',
	defaultData: {
		details: 'Deciding what to do',
		state: EMPTY_STATE,
		startTimestamp: Date.now(),
		largeImageKey: 'tycrek'
	}
};

//! Express
server.get('/setrpc/:topline/:bottomline', (req, res) => {
	let details = Buffer.from(req.params.topline, 'base64').toString();
	let state = Buffer.from(req.params.bottomline, 'base64').toString();
	setActivity({
		details,
		state: state === '~~USE_EMPTY~~' ? EMPTY_STATE : state,
		startTimestamp: Date.now(),
		largeImageKey: 'tycrek'
	})
		.then(() => console.log(':: [DISCORD] :: Presence updated'))
		.then(() => res.send('Success'))
		.catch((err) => (console.warn(err), res.send('Error')))
});
server.listen(14374, () => console.log(':: [EXPRESS] :: Started backend'))

//! Electron

app.whenReady().then(() => {
	console.log(':: [ELECTRON] :: Launching window...')
	const win = new BrowserWindow({
		width: 340,
		height: 220,
		alwaysOnTop: true,
		fullscreenable: false,
		kiosk: true,
		opacity: 0.8,
		resizable: false
	});

	fs.writeFile(path.join(__dirname, 'frontend/index.html'), Pug.renderFile(path.join(__dirname, 'frontend/index.pug')))
		.then(() => win.loadFile(path.join(__dirname, 'frontend/index.html')))
		.catch(console.warn);
});

//! Discord


function _main() {
	console.log(':: [DISCORD] :: Connecting...');
	connect()
		.then(() => console.log(':: [DISCORD] :: Connected'));

	client.on('ready', () =>
		setActivity(RPC_DATA.defaultData)
			.then(() => console.log(':: [DISCORD] :: Activity set'))
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
