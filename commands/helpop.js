const settings = require('../settings.json');
const Discord = require('discord.js');
exports.run = (client, message, params) => {
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);   
  const command = args.shift().toLowerCase();   
  const sayMessage = args.join(" ");
  const user = message.mentions.users.first();

    if(message.author.bot) return;
    if(!sayMessage)
      return message.channel.send("Ask a question, you can't send an empty message!");
    
    const embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username} needs help:`, `${message.author.avatarURL}`)
    .setColor(0x00AE86)
    .setFooter(`HelpOP`)
    .setTimestamp()
    .setDescription(sayMessage)
    message.delete();
    client.channels.get('449586037996519424').send({embed}) 
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['hop', 'hp'],
  permLevel: 0
};

exports.help = {
  name: 'helpop',
  description: 'Online staff helping a user over a bot',
  usage: 'helpop [arguments]'
};
