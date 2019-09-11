module.exports = {
	name: 'rita',
	description: 'Call for Rita.',
	execute(message) {
		// set random number
		var randomNumber = Math.floor(Math.random()*4+1);
		// send reply to the channel the message was sent in
		if (randomNumber == 1) {
  		message.channel.send(`Please behave yourself ${message.author.username}, I'm cleaning the floor right now.`);
  	}
  	if (randomNumber == 2) {
  		message.channel.send(`${message.author.username} you want something to play? teehee`);
  	}
  	if (randomNumber == 3) {
  		message.channel.send(`How do you like your tea ${message.author.username}?`);
  	}
  	if (randomNumber == 4) {
  		message.channel.send(`${message.author.username} do you need something from me?`);
  	}
	},
};