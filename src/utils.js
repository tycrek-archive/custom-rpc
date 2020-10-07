// Constants
const PORT = 14374;
const EMPTY_STATE = '‎‎'; //* This string actually has a length of two. The characters are from: https://emptycharacter.com/
const clientId = '763074590149836821';

// Exports
module.exports = {
	PORT,
	EMPTY_STATE,
	RPC_DATA: {
		clientId,
		defaultData: {
			details: 'Deciding what to do',
			state: EMPTY_STATE,
			startTimestamp: Date.now(),
			largeImageKey: 'tycrek'
		}
	}
};
