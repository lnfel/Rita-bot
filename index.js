/////////////////////////////////
// Rita bot version 1.0.1 alpha//
/////////////////////////////////

// require the discord.js module
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// dynamically retrieve all your created command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

// listen for messages
client.on('message', async message => {
	// log messages from the channel Rita has access to
	console.log(message.content);

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	// needed for playing music
	//const serverQueue = queue.get(message.guild.id);

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any command, ${message.author}!`;
		
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
 	}

 	// check if the cooldowns Collection has the command set in it yet. If not, then add it in.
 	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	// A variable with the current timestamp.
	const now = Date.now();
	// A variable that .get()s the Collection for the triggered command.
	const timestamps = cooldowns.get(command.name);
	// A variable that gets the necessary cooldown amount. If you don't supply it in your command file, it'll default to 3. Afterwards, convert it to the proper amount of milliseconds.
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before doing \`${command.name}\` again. Mei might see you.`);
		}
	}

	// the timestamps Collection doesn't have the message author's ID (or if the author ID did not get deleted as planned),
	// .set() the author ID with the current timestamp and create a setTimeout() to automatically delete it after the cooldown period has passed
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

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