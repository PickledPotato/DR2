const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const fs = require('fs');
const chalk = require('chalk');
const settings = require('./settings.json');
const moment = require('moment');
const prefix = '?';
const economy = require('discord-eco');

require('./util/eventLoader')(client);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.on("ready", () => {
	client.user.setActivity('mc.divinerealms.us | ?help', { type: 'PLAYING' })
	.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
	.catch(console.error);
  console.log("Online sam");
  //client.user.setUsername("DRTB")
});
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Ucitavam totalno ${files.length} komandi`);
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    log(`Ucitavam komandu: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
//Money role
let moneyRole = '🛡'
//JSON
const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
//:D
client.on('message', message => {

    // Variables
    let prefix = '?';
    let msg = message.content.toUpperCase();

    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    // Commands
    // Buy Command
    if (msg.startsWith(`${prefix}BUY`)) {
//		if (message.channel.id !== '361527847111753728') return message.channel.send("Use the channel for commands.");

        // Variables
        let categories = [];


        if (!args.join(" ")) {


            for (var i in items) {


                if (!categories.includes(items[i].type)) {
                    categories.push(items[i].type)
                }

            }


            const embed = new Discord.RichEmbed()
                .setDescription(`Available Items`)
                .setColor(0xD4AF37)

            for (var i = 0; i < categories.length; i++) {

                var tempDesc = '';

                for (var c in items) {
                    if (categories[i] === items[c].type) {

                        tempDesc += `${items[c].name} - $${items[c].price} - ${items[c].desc}\n`;

                    }

                }


                embed.addField(categories[i], tempDesc);

            }


            return message.channel.send({
                embed
            });



        }



        // Item Info
        let itemName = '';
        let itemPrice = 0;
        let itemDesc = '';

        for (var i in items) {
            if (args.join(" ").trim().toUpperCase() === items[i].name.toUpperCase()) {
                itemName = items[i].name;
                itemPrice = items[i].price;
                itemDesc = items[i].desc;
            }
        }


        if (itemName === '') {
            return message.channel.send(`**Item ${args.join(" ").trim()} not found.**`)
        }


        economy.fetchBalance(message.author.id + message.guild.id).then((i) => {
            if (i.money < itemPrice) {

                return message.channel.send(`**You don't have enough money for this item.**`);
            }

            economy.updateBalance(message.author.id + message.guild.id, parseInt(`-${itemPrice}`)).then((i) => {

                message.channel.send('**You bought ' + itemName + '!**');


                if (itemName === 'Charcoal Role') {
                    message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "Charcoal"));
				}
				if (itemName === 'Coal Role') {
                    message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "Coal"));
				}
				if (itemName === 'Copper Role') {
                    message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "Copper"));
				}
				if (itemName === 'Bronze Role') {
                    message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "Bronze"));
				}
				if (itemName === 'Iron Role') {
                    message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "Iron"));
				}
				if (itemName === 'Silver Role') {
                    message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "Silver"));
				}
				if (itemName === 'Gold Role') {
                    message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "Gold"));
				}
				if (itemName === 'Diamond Role') {
                    message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "Diamond"));
                }

            })

        })

    }


    // Add / Remove Money
    if (msg.startsWith(`${prefix}SETMONEY`)) {

        if (!message.member.roles.find("name", moneyRole)) {
            message.channel.send('**You need the role `' + moneyRole + '` to use this command...**');
            return;
        }


        if (!args[0]) {
            message.channel.send(`**You need to define an amount. Usage: ${prefix}SETMONEY <amount> <user>**`);
            return;
        }


        if (isNaN(args[0])) {
            message.channel.send(`**The amount has to be a number. Usage: ${prefix}SETMONEY <amount> <user>**`);
            return;
        }


        let defineduser = '';
        if (!args[1]) {
            defineduser = message.author.id;
        } else {
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned.id;
        }


        economy.updateBalance(defineduser + message.guild.id, parseInt(args[0])).then((i) => {
            message.channel.send(`**User had ${args[0]} added/removed from their account.**`)
        });

    }

    // Balance & Money
    if (msg === `${prefix}BALANCE` || msg === `${prefix}MONEY` || msg === `${prefix}BAL`) {
//		if (message.channel.id !== '361527847111753728') return message.channel.send("Use the channel for commands.");


        economy.fetchBalance(message.author.id + message.guild.id).then((i) => {

            const embed = new Discord.RichEmbed()
                .setDescription(`**${message.guild.name} Bank**`)
                .setColor(0xD4AF37)
                .addField('Account Holder', message.author.username, true)
                .addField('Account Balance', i.money, true)


            message.channel.send({
                embed
            })

        })

    }

});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      const cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  let permlvl = 0;
  const mod_role = message.guild.roles.find('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  const admin_role = message.guild.roles.find('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  return permlvl;
};
const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config.js');
const YouTube = require('simple-youtube-api');

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();
client.on('message', async msg => {
	let DJRole = '👑 Tim Vlasnika'
	let OwnerRole = '🛡'
	if (msg.author.bot) return;
	if (!msg.content.startsWith(PREFIX)) return;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'play') {
		//// if (msg.channel.id !== '361527847111753728') return msg.channel.send("Use the channel for commands.");
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `You have to be in a voice channel to play music`,
			author: {
				name: "Music Queue"
			},
		}});
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `I cannot connect to your voice channel, make sure I have the proper permissions!`,
			author: {
				name: "Music Queue"
			},
		}}); //('I cannot connect to your voice channel, make sure I have the proper permissions!');
		if (!permissions.has('SPEAK')) return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `I cannot speak in this voice channel, make sure I have the proper permissions!`,
			author: {
				name: "Music Queue"
			},
		}}); //('I cannot speak in this voice channel, make sure I have the proper permissions!');

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id);
				await handleVideo(video2, msg, voiceChannel, true);
			}
			return msg.channel.send({embed: {
				color: 0x00AE86,
				description: `✅ Playlist: **${playlist.title}** has been added to the queue!`,
				author: {
					name: "Music Queue"
				},
			}}); //(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send({embed: {
						color: 0x00AE86,
						description: `${videos.map(video2 => `**[${++index}]** - ${video2.title}`).join('\n')}`,
						footer: {
							text: "💎 Please provide a value to select one of the search results ranging from  1-10."
						},
						author: {
							name: "Song selection"
						},
					}});
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 30000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send({embed: {
							color: 0x00AE86,
							description: `🆘 No or invalid value entered, cancelling video selection.`,
							author: {
								name: "Music Queue"
							},
						}});
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send({embed: {
						color: 0x00AE86,
						description: `🆘 I could not obtain any search results.`,
						author: {
							name: "Music Queue"
						},
					}});
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		// if (msg.channel.id !== '361527847111753728') return msg.channel.send("Use the channel for commands.");
		if (!msg.member.voiceChannel) return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `You are not in a voice channel!`,
			author: {
				name: "Music Queue"
			},
		}});
		if (!serverQueue) return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `There is nothing that I could skip!`,
			author: {
				name: "Music Queue"
			},
		}});
		serverQueue.connection.dispatcher.end('Song has been skipped!');
		client.user.setActivity(`${serverQueue.songs[0].title}`, { type: 'LISTENING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
		return;
	} else if (command === 'stop') {
		// if (msg.channel.id !== '361527847111753728') return msg.channel.send("Use the channel for commands.");
		if (!msg.member.roles.some(r => [DJRole, OwnerRole].includes(r.name))) return msg.channel.send("Insufficent permission.")
		if (!msg.member.voiceChannel) return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `You are not in a voice channel!`,
			author: {
				name: "Music Queue"
			},
		}});
		if (!serverQueue) return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `There is nothing that I could stop!`,
			author: {
				name: "Music Queue"
			},
		}});
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stopping...');
    msg.channel.send({embed: {
			color: 0xDC143C,
			description: `Stopping...`,
			author: {
				name: "Music Queue"
			},
		}});
		client.user.setActivity(`idiots playing with commands`, { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
		return;
	} else if (command === 'volume') {
		// if (msg.channel.id !== '361527847111753728') return msg.channel.send("Use the channel for commands.");
		if (!msg.member.roles.some(r => [DJRole, OwnerRole].includes(r.name))) return msg.channel.send("Insufficent permission.")
		if (!msg.member.voiceChannel) return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `You are not in a voice channel!`,
			author: {
				name: "Music Queue"
			},
		}});
		if (!serverQueue) return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `There is nothing being played!`,
			author: {
				name: "Music Queue"
			},
		}});
		if (!args[1]) return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `🎶 The current volume is: **${serverQueue.volume}**`,
			author: {
				name: "Music Queue"
			},
		}});
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `🎶 I set the volume to: **${args[1]}**`,
			author: {
				name: "Music Queue"
			},
		}});
	} else if (command === 'np') {
		// if (msg.channel.id !== '361527847111753728') return msg.channel.send("Use the channel for commands.");
		if (!serverQueue) return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `🙁 There is nothing playing.`,
			author: {
				name: "Music Queue"
			},
		}});
		return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `🎶 Now playing: [${serverQueue.songs[0].title}](${serverQueue.songs[0].URL})`,
			author: {
				name: "Music Queue"
			},
		}});
	} else if (command === 'queue') {
		// if (msg.channel.id !== '361527847111753728') return msg.channel.send("Use the channel for commands.");
		if (!serverQueue) return msg.channel.send({embed: {
			color: 0x00AE86,
			description: `Nothing is being played.`,
			author: {
				name: "Music Queue"
			},
		}});
		let embed = new Discord.RichEmbed()
		.setAuthor("Song queue")
		.setColor(0x00AE86)
		.setFooter(`You can do ${settings.prefix}skip to skip this song, or ${settings.prefix}stop to stop it.`)
		.setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}`)
client.user.setActivity(`${serverQueue.songs[0].title}`, { type: 'LISTENING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);//${serverQueue.songs[0].title}
		return msg.channel.send({embed});
	} else if (command === 'pause') {
		// if (msg.channel.id !== '361527847111753728') return msg.channel.send("Use the channel for commands.");
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			let embed = new Discord.RichEmbed()
			.setAuthor("Music Queue")
			.setColor(0x00AE86)
			.setFooter(`You can do ${settings.prefix}skip to skip this song, or ${settings.prefix}stop to stop it.`)
			.setDescription(`⏸ Paused the music for you!`)
			return msg.channel.send({embed});
		}
		let embed = new Discord.RichEmbed()
		.setAuthor("Music Queue")
		.setColor(0x00AE86)
		.setFooter(`You can do ${settings.prefix}skip to skip this song, or ${settings.prefix}stop to stop it.`)
		.setDescription(`There is nothing playing that I could pause!`)
		return msg.channel.send({embed});
	} else if (command === 'resume') {
		// if (msg.channel.id !== '361527847111753728') return msg.channel.send("Use the channel for commands.");
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			let embed = new Discord.RichEmbed()
			.setAuthor("Music Queue")
			.setColor(0x00AE86)
			.setFooter(`You can do ${settings.prefix}skip to skip this song, or ${settings.prefix}stop to stop it.`)
			.setDescription(`▶ Resumed the music for you!`)
			return msg.channel.send({embed});
		}
		let embed = new Discord.RichEmbed()
		.setAuthor("Music Queue")
		.setColor(0x00AE86)
		.setDescription(`There is nothing playing that I could resume!`)
		return msg.channel.send({embed});
	}

	return;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel because: ${error}`);
			queue.delete(msg.guild.id);
			let embed = new Discord.RichEmbed()
			.setAuthor("Music")
			.setColor(0x00AE86)
			.setDescription(`I could not join the voice channel because: ${error}`)
			return msg.channel.send({embed});
		}
	} else {
		serverQueue.songs.push(song);
		let embed = new Discord.RichEmbed()
		.setAuthor("Music Queue")
		.setColor(0x00AE86)
		.setFooter(`You can do ${settings.prefix}skip to skip this song, or ${settings.prefix}stop to stop it.`)
		.setDescription(`✅ **${song.title}** has been added to the queue!`)
		console.log(serverQueue.songs);
		if (playlist) return;
		else return msg.channel.send({embed});
	}
	return;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		client.user.setActivity(`idiots playing with commands`, { type: 'WATCHING' })
		.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
		.catch(console.error);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Pesma zavrsena.');
			else console.log(reason);
			serverQueue.songs.shift();
			 setTimeout(function() {
				  play(guild, serverQueue.songs[0]);
				    }, 500);
				 })
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	let embed = new Discord.RichEmbed()
	.setAuthor("Music Queue")
	.setFooter("You can do --skip to skip this song or --stop to stop it.")
	.setColor(0x00AE86)
	.setDescription(`🎶 **Started playing:** [${song.title}](${song.URL})`)
	client.user.setActivity(`${serverQueue.songs[0].title}`, { type: 'LISTENING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
	serverQueue.textChannel.send({embed});
}


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'koji je izbrisan')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'koji je izbrisan')));
});

//Warnings
process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error}`));
client.on('message', message => {
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${prefix})\\s*`);
	if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = args.shift();

    if (command === 'prefix') {
        message.channel.send(`Prefix je \`${prefix}\``);
    }
    if (command === 'gej?') {
        message.channel.send(`ne`);
    }
    if(command === "dmall") {
		let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
		if(message.author.id !== '154924680770355200') return message.channel.send("eto ti kurac nema vise")
		if(!message.member.hasPermission("ADMINISTRATOR"))
			return message.reply({embed: {
			  color: 0xC64540,
			  description: "Nedovoljno dozvola."
			}});
		let DMALL = args.join(" ").slice(0);
	  if (!DMALL) return message.channel.send({embed: {
		color: 0xC64540,
		description: `${message.member} unesi poruku koju treba da obavestim celom serveru.`
	  }});

	  message.guild.members.forEach((player) => {
		  message.guild.member(player).send({embed: {
			color: 0xC64540,
			title: `Announcement from ${message.guild.name} by ${message.author.tag}`,
			description: `${DMALL}`
		  }});
	  });
	  message.channel.send({embed: {
		color: 0xC64540,
		description: "All players in this discord server have got your message."
	}});
  }
});

//Nema gde da se svrstaju nesto random
client.on('message', message => {
  let args = message.content.split(' ').slice(1);
  let argsresult = args.join(' ');
    if (message.author.bot) return;
	//if (message.author.id === '276044647321698315' && message.channel.id === '512274978754920463')  {
		//message.react("436907870303420417").then(() => message.react('🇬')).then(() => message.react('🇦')).then(() => message.react('🇾'));
	  //};
});
client.on('message', (message) => {
let blacklisted = ['http', 'kurac', 'bit.ly', 'picka', 'peder', 'jebi', 'jebo', 'jeba', 'jebem', 'jebao', 'jebati', 'jebacu', 'kita', 'kurcina', 'kitina', 'kurcic', 'picka', 'pickica', 'picketina', 'picko', 'picke', 'pickice', 'picketino', 'majmune', 'majmuncino', 'retard', 'retardu', 'retarde', 'retardi']
if(message.member.hasPermission("ADMINISTRATOR")) return;
if (message.author.bot) return;


let foundInText = false;
for(var i in blacklisted) {
	if (message.content.toLowerCase().includes(blacklisted[i].toLocaleLowerCase())) foundInText = true;

}

if (foundInText) {
	message.delete();
	message.channel.send(`Sorry ${message.author.username}, but you are not allowed to say that.`).then(function (message) {
        message.delete(10000)
      });
};

});
client.login("MzEyNTg3MjcxNDE5MzMwNTcw.XRJXcA.2HmbZxF9_iWZ_Tq4g1bQAr0bgX4");
//MzEyNTg3MjcxNDE5MzMwNTcw.DwQh9A.uC2uZJhvf3EW-H_ncTsBVSE8C38
//MzkzNDk0NTI3MjE5OTkwNTQw.DwQiDA.1zAY3ENWWY-deu0WRyHZsdLL_FQ
//NTA0Mjk0MTM3NDkxNjE5ODQw.DwQiXw.hpHAAZJ3A0FCvjO46UuccicoA8I
