// Imports
const { app, BrowserWindow } = require('electron');
const Pug = require('pug');
const fs = require('fs-extra');
const path = require('path');

// Constants
const htmlFile = path.join(__dirname, 'frontend/index.html');
const pugFile = Pug.renderFile(path.join(__dirname, 'frontend/index.pug'));
const windowData = {
	width: 340,
	height: 220,
	alwaysOnTop: true,
	fullscreenable: false,
	opacity: 0.8,
	resizable: false
};

// Exports
module.exports = {
	open: () =>
		new Promise((resolve, reject) =>
			fs.writeFile(htmlFile, pugFile)
				.then(() => app.whenReady())
				.then(() => new BrowserWindow(windowData))
				.then((win) => win.loadFile(htmlFile))
				.then(resolve)
				.catch(reject))
};
