// Imports
const { PORT, RPC_DATA } = require('./utils');
const SERVER = require('./server');
const RPC = require('./rpc');
const UI = require('./ui');

// Main
function _main() {
	console.info(':: Starting...');

	SERVER.host()
		.then(() => console.info(`:: Started Express.js backend on port [${PORT}]`))

		.then(() => RPC.connect())
		.then(() => console.info(`:: Discord RPC connected with client ID [${RPC_DATA.clientId}]`))

		.then(() => RPC.setActivity(RPC_DATA.defaultData))
		.then(() => console.info(`:: Discord RPC set`))

		.then(() => UI.open())
		.then(() => console.info(`:: Window opened`))

		.then(() => console.log(':: All startup tasks completed successfully'))
		.catch(console.warn);
}

_main();
