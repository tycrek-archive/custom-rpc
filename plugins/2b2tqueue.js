const fs = require('fs-extra');
const fetch = require('node-fetch');

const pathToLogFile = 'C:\\Users\\Josh\\MultiMC\\instances\\2b2t\\.minecraft\\logs\\latest.log';
const queueText = 'Position in queue: ';
const connectingText = 'Connecting to the server...';
const notQueue = 'Not a queue line, skipping';

var INTERVAL;

function _main() {
	queueStatus();
	INTERVAL = setInterval(queueStatus, 20000);
}

function queueStatus() {
	fs.readFile(pathToLogFile)
		.then((bytes) => bytes.toString())
		.then((data) => data.split('\n').reverse())
		.then((lines) => lines.find((line) => line.includes(queueText) || line.includes(connectingText)))
		.then((line) => {
			if (line.includes(connectingText)) clearInterval(INTERVAL);
			if (!line.includes(queueText)) throw new Error(notQueue);
			else return line.split(queueText)[1];
		})
		.then((position) => fetch(`http://localhost:14374/setrpc/${toBase64('In 2b2t queue')}/${toBase64(`Position: ${position}`)}/${toBase64('game')}`))
		.then((res) => res.json())
		.then((json) => console.info(json.message))
		.catch((err) => console[err.message.includes(notQueue) ? 'debug' : 'warn'](err.message));
}

function toBase64(string) {
	return Buffer.from(string, 'utf-8').toString('base64');
}

_main();
