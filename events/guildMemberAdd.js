module.exports = member => {
  const Discord = require('discord.js');
  const client = new Discord.Client();
  client.on("message", message => {
  let guild = member.guild;
  guild.defaultChannel.send(`[**BETA**] - Welcome **${member.user.username}** to **${guild.name}**! :wave:`);
})};
