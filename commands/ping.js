exports.run = (client, message) => {
  message.channel.send('Ping?')
    .then(msg => {
      msg.edit(`Ping: ${msg.createdTimestamp - message.createdTimestamp}ms`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping command',
  usage: 'ping'
};
