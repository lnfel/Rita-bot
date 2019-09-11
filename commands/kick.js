module.exports = {
	name: 'kick',
	description: 'Rita will exile the mentioned Captian.',
	execute(message) {
		// grab the "first" mentioned user from the message
		// this will return a `User` object, just like `message.author`
		const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
};