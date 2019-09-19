module.exports = {
	name: 'ping',
	cooldown: 5,
	description: 'Test command',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};