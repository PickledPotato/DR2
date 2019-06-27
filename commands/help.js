const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    const embed = new Discord.RichEmbed()
      .setAuthor(`Guides`)
      .setColor(0xfd9e50)
      .setDescription(`Prefix for ${message.guild.name} is ${settings.prefix}`)
      .addField(`Moderation — 9`, "`ban` `kick` `lockdown` `mute` `purge` `reason` `unban` `warn` `dmall`") //\n${client.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} ➔  *${c.help.description}*`).join('\n')}
     // .addBlankField(true)
      .addField(`Fun — 14`, "`play` `pause` `resume` `skip` `stop` `volume` `queue` `np` `say` `stats` `balance` `buy` `ascii` `rps`")
      .addField(`Support — 3`, "`suggest` `support` `help`")
      message.channel.send({embed});
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nUsage::${command.help.usage}`, {code:'asciidoc'});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'pomoc'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Shows all available commands.',
  usage: 'help [command]'
};
