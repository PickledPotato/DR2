module.exports = (guild, user) => {
  const Discord = require('discord.js');
  const client = new Discord.Client();
  client.on("message", message => {
  guild.defaultChannel.send(`[**BETA**] - ${user.username} got an unban!`);
})};
