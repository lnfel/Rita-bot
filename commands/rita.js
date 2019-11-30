module.exports = {
	name: 'rita',
  cooldown: 5,
	description: 'Call for Rita.',
	execute(message) {
		// set random number
		var randomNumber = Math.floor(Math.random()*4+1);
		// send reply to the channel the message was sent in
		if (randomNumber == 1) {
  		message.channel.send(`I've tidy up the bed for you ${message.author.username}. Sleep well tonight~`);
  	}
  	if (randomNumber == 2) {
  		message.channel.send(`Ara ara, ${message.author.username} you want to play something?`);
  	}
  	if (randomNumber == 3) {
  		message.channel.send(`How do you like your tea ${message.author.username}?`);
  	}
  	if (randomNumber == 4) {
  		message.channel.send(`Kanchou how would you like your tea?`);
  	}
	},
};