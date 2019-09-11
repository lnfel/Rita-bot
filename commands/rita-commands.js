module.exports = {
	name: 'rita-commands',
	description: 'Available commands for Rita.',
	args: true,
	execute(message, args) {
		message.channel.send(`You requested for my assistance dear Captain, Rita will now ${args}`);
	},
};