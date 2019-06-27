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
  const muteRole = client.guilds.get(message.guild.id).roles.find('name', '🚫 Ućutkan');
  if (!modlog) return message.reply("I can't find a 🗒〉logs channel").catch(console.error);
  if (!muteRole) return message.reply(`I can't find a 'Muted' role`).catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('you have to tag someone to mute him.').catch(console.error);
  const reason = args.splice(1, args.length).join(' ') || `Waiting for a moderator. Use ${settings.prefix}reason ${caseNum} <reason>.`;

  const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Un/mute\n**User:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setFooter(`Un/mute`);
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply("I don't have sufficent permission.").catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    user.send({embed: {
      color: 14365765,
      description: `You have been **unmuted** on ${message.guild.name}\n**By: ${message.author.tag}**\n**Reason:** ${reason} `,
      footer: {
        //icon_url: ,
        text: `Unmute`
      },
      timestamp: new Date()
      }
    });
    message.guild.member(user).removeRole(muteRole).then(() => {
      //message.channel.send(`Unmute sam **${user.tag}**`)
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  } else {
    user.send({embed: {
      color: 14365765,
      description: `You have been **muted** on ${message.guild.name}\n**By: ${message.author.tag}**\n**Reason:** ${reason} `,
      footer: {
        //icon_url: ,
        text: `Mute`
      },
      timestamp: new Date()
      }
    });
    message.guild.member(user).addRole(muteRole).then(() => {
      //message.channel.send(`Mute sam **${user.tag}**`)
      client.channels.get(modlog.id).send({embed}).catch(console.error);
      
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute'],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Un/mutes a tagged user',
  usage: 'un/mute [user] [reason]'
};
