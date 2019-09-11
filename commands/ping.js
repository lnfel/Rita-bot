module.exports = {
	name: 'rita',
	description: 'Call for Rita',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};