// needed for playing music
const ytdl = require('ytdl-core');
const config = require('../config.json');
const streamOptions = { seek: 0, volume: 1 };
// youtube-search
const search = require('youtube-search');
const opts = {
	maxResults: 5,
	key: config.youtube_api,
	type: 'video',
	videoDuration: 'short'
};
var musicUrls = [];

module.exports = {
	name: 'play1',
	cooldown: 5,
	description: 'Play or Queue a music to the playlist.',
	usage: '[name of music]',
	execute(message, args) {
		// check if there are arguments

	},
};