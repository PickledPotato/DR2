const ms = require('ms');
exports.run = (client, message, args) => {
  if (message.author.bot) return;
  if (!client.lockit) client.lockit = [];
  const time = args.join(' ');
  const validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply('you need to provide a lockdown time');

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.send('Lockdown up');
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.send(`Lockdown of a channel for ${ms(ms(time), { long:true })}`).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send('Lockdown up')).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ld'],
  permLevel: 3
};

exports.help = {
  name: 'lockdown',
  description: 'Locks a channel for a specific time',
  usage: 'lockdown <time>'
};
