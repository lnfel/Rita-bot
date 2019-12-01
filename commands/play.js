//const serverQueue = queue.get(message.guild.id);
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
	name: 'play',
	cooldown: 5,
	description: 'Play or Queue a music to the playlist.',
	usage: '[name of music]',
	execute(message) {
		async function youtubeSearch() {
			// require discord.js since this is a separate function
			const Discord = require('discord.js');

			let voiceChannel = message.guild.channels.find(channel => channel.id === '650375024473276437');

			// format instructions using richembed
			let embed = new Discord.RichEmbed()
				.setColor("#73ffdc")
				.setDescription(`Welcome to Rita-Café ${message.author.username}, you may request music by entering a seach query. Please remember to narrow down your search Kanchou.`)
				.setTitle("Rita-Café");
			// send embed message
			let embedMsg = await message.channel.send(embed);
			let filter = m => m.author.id === message.author.id;
			let query = await message.channel.awaitMessages(filter, { max: 1 });
			let results = await search(query.first().content, opts).catch(err => console.log(err));
			if (results){
				let youtubeResults = results.results;
				let i = 0;
				let titles = youtubeResults.map(result => {
					i++;
					return i + ") " + result.title;
				})
				console.log(titles);
				message.channel.send({
					embed: {
						color: 0x73ffdc,
						title: 'Select a song by entering the number.',
						description: titles.join("\n")
					}
				}).catch(err => console.log(err));

				filter = m => (m.author.id === message.author.id) && m.content >= 1 && m.content <= youtubeResults.length;
				let collected = await message.channel.awaitMessages(filter, { maxMatches: 1 });
				let selected = youtubeResults[collected.first().content - 1];

				if (ytdl.validateURL(selected.link)){
					console.log("Valid URL!");
					var flag = musicUrls.some(element => element === selected.link);
					if (!flag){
						musicUrls.push(selected.link);
						if (voiceChannel != null){

							if (voiceChannel.connection) {
								console.log("Rita is already serving at the café.");
								const embed = new Discord.RichEmbed();
								embed.setColor("#73ffdc");
								embed.setAuthor(message.author.username, message.author.displayAvatarURL);
								embed.setDescription("**" + selected.title + "** has been added to request list.");
								message.channel.send(embed);
							} else {
								try {
									const voiceConnection = await voiceChannel.join();
									await playSong(message.channel, voiceConnection, voiceChannel);
								} catch(ex) {
									console.log(ex);
								}
							}
						} 
					}
				}

				embed = new Discord.RichEmbed()
					.setColor("#73ffdc")
					.setTitle(`${selected.title}`)
					.setURL(`${selected.link}`)
					.setDescription(`${selected.description}`)
					.setThumbnail(`${selected.thumbnails.default.url}`);

				message.channel.send(embed);
			}

			//console.log(results);
			//console.log(query.first().content);
		};

		async function playSong(messageChannel, voiceConnection, voiceChannel) {
			const stream = ytdl(musicUrls[0], { filter : 'audioonly' });
			const dispatcher = voiceConnection.playStream(stream, streamOptions);
			dispatcher.on('end', () => {
				musicUrls.shift();

				if(musicUrls.length == 0){
					voiceChannel.leave();
				} else {
					setTimeout(() => {
						playSong(messageChannel, voiceConnection, voiceChannel);
					}, 5000);
				}
			});
		}
		// run youtubeSearch function
		youtubeSearch();
	},
};