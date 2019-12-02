const ytdl = require('ytdl-core');
let play = require('./play.js');

module.exports = {
	name: 'skip',
	cooldown: 5,
	description: 'Skips the current playing song.',
	usage: '',
	execute(message) {
		//let voiceChannel = message.guild.channels.find(channel => channel.id === '650375024473276437');

		//console.log(play.playSong.voiceChannel);
		console.log(play.dispatcher);
		console.log(play.stream);
		//if(play.playSong.dispatcher)
		//	play.playSong.dispatcher.end();

		//console.log(play.playSong.stream);
	},
};