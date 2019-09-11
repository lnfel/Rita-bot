/////////////////////////////////
// Rita bot version 1.0.0 alpha//
/////////////////////////////////

// require the discord.js module
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// listen for messages
client.on('message', message => {
	// log messages from the channel Rita has access to
	console.log(message.content);

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	if (command.args && !args.length) {
		let reply = `You didn't provide any command, ${message.author}!`;
		
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
 	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("Rita doesn't quite understood what you mean Captain.");
	}
});

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Rita on standby, awaiting your orders Captain!');
});

// login to Discord with your app's token
client.login(token);