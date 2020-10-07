// Imports
const { PORT, EMPTY_STATE } = require('./utils');
const { setActivity } = require('./rpc');
const express = require('express');

// Constants
const server = express();

// Set up routes
server.get('/setrpc/:topline/:bottomline/:image*?', (req, res) => {
	let details = Buffer.from(req.params.topline, 'base64').toString();
	let state = Buffer.from(req.params.bottomline, 'base64').toString();
	let image = req.params.image ? Buffer.from(req.params.image, 'base64').toString() : undefined;

	setActivity({
		details: details === '~~USE_EMPTY~~' ? EMPTY_STATE : details,
		state: state === '~~USE_EMPTY~~' ? EMPTY_STATE : state,
		startTimestamp: Date.now(),
		largeImageKey: 'tycrek',
		smallImageKey: image
	})
		.then(() => console.info(':: Discord RPC updated'))
		.then(() => res.send({ success: true, message: 'Discord RPC updated' }))
		.catch((err) => (console.warn(err), res.send({ success: false, message: 'Error!' })));
});

// Exports
module.exports = {
	host: () => new Promise((resolve) => server.listen(PORT, resolve))
};
