const settings = require('../settings.json');
const config = require("../settings.json");
exports.run = (client, message) => {
if (message.content.startsWith(settings.prefix + "say")) {
    if (message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
  };
  
  exports.help = {
    name: 'say',
    description: 'Bot says whatever you put in as the arguments',
    usage: `${settings.prefix}say <arguments>`
  };
