const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
const moment = require('moment');
exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  const user = message.mentions.users.first();
  if (message.author.bot) return;
  if (message.mentions.users.size < 1) return message.reply('you have to tag someone to see his/her stats.').catch(console.error);
  const embed = new RichEmbed()
  .setAuthor(`${user.tag}`, `${user.avatarURL}`)
  .setColor(0x00AE86)
  .setTimestamp()
  .setThumbnail(`${user.avatarURL}`)
  .setDescription(`**Nickname:** ${message.mentions.members.first().displayName}\n**ID:** ${user.id}\n**Highest role:** ${message.mentions.members.first().highestRole}\n**Account created:** ${moment(`${user.createdAt}`).format('DD/MM/YYYY @ HH:mm')}`)
  .setFooter(`${user.tag}`);
  return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'stats',
  description: 'Shows the information about the user you tagged',
  usage: 'stats [user]'
};
