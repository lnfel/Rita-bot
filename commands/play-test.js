//const serverQueue = queue.get(message.guild.id);
// needed for playing music
const ytdl = require('ytdl-core');
const streamOptions = { seek: 85, volume: 1 };

module.exports = {
	name: 'play',
	cooldown: 5,
	description: 'Play or Queue a music to the playlist.',
	usage: '',
	execute(message) {
		const data = [];
		const { commands } = message.client;

		if (message.author.bot)
			return;

		let args = message.content.split(" ");
		let url = args[1];
		let VoiceChannel = message.guild.channels.find(channel => channel.id === '650375024473276437');

		if (VoiceChannel != null) {
			console.log(VoiceChannel.name + " was found and is a " + VoiceChannel.type + " channel.");
			VoiceChannel.join()
				.then(connection => {
					console.log("DJ Rita is now serving Rita-Café");
					const stream = ytdl('https://www.youtube.com/watch?v=lN7wHDBfxNU&t', { filter : 'audioonly' });
					//const stream = ytdl(url, { filter : 'audioonly' });
					const dispatcher = connection.playStream(stream, streamOptions);
					//const dispatcher = connection.playStream(stream);
					dispatcher.on("end", end => {
						console.log("Rita left the cafe.");
						VoiceChannel.leave();
					});
				})
				.catch(err => console.log(err));
		}
		//console.log("Played! 650375024473276437");
	},
};