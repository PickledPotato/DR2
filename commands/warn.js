const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find('name', '📅・a-logs');
  const caseNum = await caseNumber(client, modlog);
  if (!modlog) return message.reply("I can't find a logs channel");
  if (message.mentions.users.size < 1) return message.reply('you have to tag someone to warn him/her').catch(console.error);

  const reason = args.splice(1, args.length).join(' ') || `Waiting for a moderator. Use ${settings.prefix}reason ${caseNum} <reason>.`;
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Warn\n**User:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
  .setFooter(`Warn`);
  message.channel.send(`I have warned **${user.tag}**`)
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['w'],
  permLevel: 2
};

exports.help = {
  name: 'warn',
  description: 'Warns a tagged user.',
  usage: 'warn [user] [reason]'
};
