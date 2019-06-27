module.exports.run = async (client, message, args) => { // Run the command when a command is called

    var discord = require('discord.js');
    var db = require('quick.db')
    var send = require('quick.hook')
    
    let cmdList = [
        "cmd1",
        "cmd2",
        "cmd3"
    ]

    if(!`${args[0]}` == String) return send(message.channel, `When sending a support ticket. Please Use This Type Of Example.\n**Usage**: \`--support <issue>\``, {
        name: `Support Error`,
        icon: `https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/server-512.png`
    })
    if(!message.member.hasPermission("SEND_MESSAGES")) return;
    
    let fault = args.slice(0, 1000, args[0]).join(' ');
    if (!fault == String) return send(message.channel, `The Fault You Provided Is Invalid. Please Use This Type Of Example.\n**Usage**: \`--support <issue>\``, {
        name: `Support Error`,
        icon: `https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/server-512.png`
    })

    const casenumbers = new db.table('CASE_NUMBER')
    const casenumber = await casenumbers.fetch(`SupportCases`)
    const a = casenumber
    const b = a + 1
    casenumbers.set(`SupportCases`, b)
    let supportEmbed = new discord.RichEmbed()
    .setTitle(`Support System || Ticket Created`)
    .setColor("ORANGE")
    .setDescription(`**Your Case Number**: ${casenumber}`)
    .addField(`**Your Case Problem**:`, `${fault}`)
    .setFooter(`Divine Realms Support`)
    .setTimestamp()
    send(message.channel, supportEmbed, {
        name: `Divine Realms Support`,
        icon: `https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/search-512.png`
    })

    const errorReport = client.channels.get("463463665379704832"); 
    let supportDevEmbed = new discord.RichEmbed()
    .setTitle(`Support System || Ticket Created`)
    .setColor("ORANGE")
    .setDescription(`**Case Number**: ${casenumber}`)
    .addField(`**Case Problem**:`, `${fault}`)
    .addField(`**Case Created By**:`, `${message.member}`)
    .setFooter(`Divine Realms Support`)
    .setTimestamp()
    send(errorReport, supportDevEmbed, {
        name: `Divine Realms Support`,
        icon: `https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/search-512.png`
    })


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
  };
  
  exports.help = {
    name: 'support',
    description: 'Support command',
    usage: `what is life`
  };
