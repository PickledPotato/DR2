const figlet = require('figlet');

exports.run = async (client, message, args) => {
  //if (message.channel.id !== '361527847111753728') return message.channel.send("Use the channel for commands.");
  if(args.join(' ').length > 14) return message.channel.send('Only 14 characters are admitted!') 
  if (!args.join(' ')) return message.channel.send('Please, provide text to format in ASCII! Usage: ascii <text>').then(message => message.delete(10000)); 
    figlet(args.join(' '), (err, data) => {
      message.channel.send('```' + data + '```')
    })
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ascii',
    description: 'Makes the text into ASCII Code',
    usage: 'ascii [text]'
  };
