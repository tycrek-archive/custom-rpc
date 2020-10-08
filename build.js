const packager = require('electron-packager');

const options = {
	all: true,
	out: './out/',
	overwrite: true,
	dir: '.',
	icon: __dirname + '/src/frontend/logo.ico'
};

function _main() {
	packager(options)
		.then(console.log)
		.catch(console.error);
}

_main();
