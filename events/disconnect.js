module.exports = client => {
	const Discord = require('discord.js');
	// const client = new Discord.Client();
	client.on("message", message => {
	console.log(`You have been disconnected at ${new Date()}`);
})};
