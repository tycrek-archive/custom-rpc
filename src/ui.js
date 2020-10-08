// Imports
const { RPC_DATA } = require('./utils');
const { app, BrowserWindow } = require('electron');
const Pug = require('pug');
const fs = require('fs-extra');
const path = require('path');
const RPC = require('./rpc');

// Constants
const htmlFile = path.join(__dirname, 'frontend/index.html');
const pugFile = path.join(__dirname, 'frontend/index.pug');
const windowData = {
	width: 420,
	height: 364,
	alwaysOnTop: true,
	fullscreenable: false,
	opacity: 0.8,
	resizable: true,
	icon: __dirname + '/frontend/logo.ico',
	autoHideMenuBar: true,
	darkTheme: true,
	fullscreenable: false,
	webPreferences: {
		defaultFontFamily: 'sansSerif'
	}
};

// Exports
module.exports = {
	open: () =>
		new Promise((resolve, reject) =>
			RPC.getAssetList(RPC_DATA.clientId)
				.then((assetList) => assetList.map((asset) => ({ name: asset.name, id: asset.id, url: RPC.getAssetImage(RPC_DATA.clientId, asset.id) })))
				.then((assets) => Pug.renderFile(pugFile, { assets }))
				.then((pug) => fs.writeFile(htmlFile, pug))
				.then(() => app.whenReady())
				.then(() => new BrowserWindow(windowData))
				.then((win) => win.loadFile(htmlFile))
				.then(resolve)
				.catch(reject))
};
