exports.run = (client, message, args) => {
  if (message.author.bot) return;
  const messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
  message.channel.send(`Messages deleted.`)
  .then(function (message) {
    message.delete(10000)
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['p'],
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'Deletes messages',
  usage: 'purge <amount>'
};
