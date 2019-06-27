exports.run = (client, message, args) => {
  if (message.author.bot) return;
  const reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  const user = args[0];
  const modlog = client.channels.find('name', '📅・a-logs');
  if (!modlog) return message.reply("I can't find a logs channel");
  if (reason.length < 1) return message.reply('insufficent arguments');
  if (!user) return message.reply('you have to provide an ID to unban the user').catch(console.error);
  message.guild.unban(user).then(user.send({embed: {
    color: 14365765,
    description: `You have been **unbanned** from ${message.guild.name}\n**By: ${message.author.tag}**\n**Reason:** ${reason} `,
    footer: {
      //icon_url: ,
      text: `Unban`
    },
    timestamp: new Date()
    }
  })
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Unbans a user',
  usage: 'unban [user] [reason]'
};
