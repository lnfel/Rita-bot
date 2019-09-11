module.exports = {
	name: 'role',
	description: 'Manage user role.',
	args: true,
	usage: '<user> <role>',
	execute(message, args) {
		// grab the "first" mentioned user from the message
		// this will return a `User` object, just like `message.author`
		const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
};