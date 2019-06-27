exports.run = (client, message, args) => {
  if (message.author.bot) return;
  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.send(`I can't find a command: ${args[0]}`);
  } else {
    message.channel.send(`Reloading: ${command}`)
      .then(m => {
        client.reload(command)
          .then(() => {
            m.edit(`I have reloaded: ${command}`);
          })
          .catch(e => {
            m.edit(`I couldn't reload: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rl'],
  permLevel: 4
};

exports.help = {
  name: 'reload',
  description: "Reloads a command if it has been modified/changed.",
  usage: 'reload <command>'
};
