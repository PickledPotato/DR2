const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, args) => {
if (message.content.toLowerCase().startsWith(settings.prefix + "predlozi")) {
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const sayMessage = args.join(" ");
    if (message.author.bot) return;
    if (!sayMessage)
      return message.reply("please put in a suggestion, I can't send an empty message!");
  
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username} suggests:`, `${message.author.displayAvatarURL}`)
      .setColor(0x00AE86)
      .setDescription(sayMessage)
  
      message.delete();
      client.channels.get('541729586002526295').send({embed})
      .then(function (message) {
        message.react("👍").then(() => message.react('👎'))
      });
  
    };
};
    
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rp'],
  permLevel: 0
};

exports.help = {
  name: 'predlozi',
  description: 'opis a',
  usage: `${settings.prefix}predlozi <predlog>`
};
