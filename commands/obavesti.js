const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
const moment = require('moment');
const scanf = require('scanf');

exports.run = async (client, message, args) => {
var obavestenje = prompt("test")
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

  exports.help = {
    name: 'obavesti',
    description: 'Obavestava neki kurac',
    usage: 'obavesti [text]'
  };
