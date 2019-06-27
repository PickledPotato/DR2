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
  const reason = args.splice(1, args.length).join(' ') || `Waiting for a moderator. Use ${settings.prefix}reason ${caseNum} <reason>.`;
  if (!modlog) return message.reply("I can't find a 📅・a-logs channel");
  if (!reason) return; message.reply("Please put in a reason for this action");
  if (message.mentions.users.size < 1) return message.reply('You have to tag someone to kick him.').catch(console.error);

  message.guild.member(user).kick();

  user.send({embed: {
    color: 14365765,
    description: `You have been **kicked** from ${message.guild.name}\n**By: ${message.author.tag}**\n**Reason:** ${reason} `,
    footer: {
      //icon_url: ,
      text: `Kick`
    },
    timestamp: new Date()
    }
  })
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Kick\n**User:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
  .setFooter(`Kick`);
  //message.channel.send(`Kickovao sam sam **${user.tag}**`)
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'Kicks a tagged user',
  usage: 'kick [user] [reason]'
};
