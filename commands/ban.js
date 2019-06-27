const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  const user = message.mentions.users.first();
  parseUser(message, user);
  if (user.id === '312587271419330570') return message.channel.send(`${message.author.username} banuj sebe konju.`);
  if (user.id === '154924680770355200') return message.channel.send(`Ok banujem ${message.author.username}`);
  if (!message.member.roles.some(r => ['💎 Administracija', '👑 Tim Vlasnika'].includes(r.name))) return message.channel.send("You can't ban this user.")
  const modlog = client.channels.find('name', '📅・a-logs');
  const caseNum = await caseNumber(client, modlog);
  const reason = args.splice(1, args.length).join(' ') || `Waiting for a moderator. Use ${settings.prefix}reason ${caseNum} <reason>.`;
  if (!modlog) return message.reply("I can't find a logs channel.");
  if (!reason) return message.reply("Please type in the reason for this action.");
  if (message.mentions.users.size < 1) return message.reply('You have to tag someone to ban him.').catch(console.error);
  message.guild.ban(user, 2)

  user.send({embed: {
    color: 14365765,
    description: `You have been **banned** from ${message.guild.name}\n**By: ${message.author.tag}**\n**Reason:** ${reason} `,
    footer: {
      //icon_url: ,
      text: `Ban`
    },
    timestamp: new Date()
    }
  });
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Ban\n**User:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
  .setFooter(`Ban`);
  return client.channels.get(modlog.id).send({embed})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bans a mentioned user',
  usage: 'ban [user] [reason]'
};
