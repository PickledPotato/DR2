const Discord = require("discord.js");
const settings = require('../settings.json');
let prefix = settings.prefix;

  exports.run = async (bot, message, args, color, prefix) => {
    if (message.channel.id !== '512275034891485185') return message.channel.send("Use the channel for commands.");
    var choice = args[0];
    if (message.author.bot) return;
    if (choice == "paper" || choice == "p") {
      var numb = Math.floor(Math.random() * 100);
      if (numb <= 50) {
        var choice2 = "paper";
      } else if (numb > 50) {
        var choice2 = "rock";
      } else {
        var choice2 = "scissors";
      }
      if (choice2 == "scissors") {
        var response = "I'm choosing **Scissors**! :v: I win!"
      } else if (choice2 == "paper") {
        var response = "I'm choosing **Paper**! :hand_splayed: It's a tie!"
      } else {
        var response = "I'm choosing **Rock**! :punch: You win!"
      }
      message.channel.send(response);
    } else if (choice == "rock" || choice == "r") {
      var numb = Math.floor(Math.random() * 100);
      if (numb <= 50) {
        var choice2 = "paper";
      } else if (numb > 50) {
        var choice2 = "rock";
      } else {
        var choice2 = "scissors";
      }
      if (choice2 == "paper") {
        var response = "I'm choosing **Paper**! :hand_splayed: I win!"
      } else if (choice2 == "rock") {
        var response = "I'm choosing **Rock**! :punch: It's a tie!"
      } else {
        var response = "I'm choosing **Scissors**! :v: You win!"
      }
      message.channel.send(response);
    } else if (choice == "scissors" || choice == "s") {
      var numb = Math.floor(Math.random() * 100);
      if (numb <= 50) {
        var choice2 = "paper";
      } else if (numb > 50) {
        var choice2 = "rock";
      } else {
        var choice2 = "scissors";
      }
      if (choice2 == "rock") {
        var response = "I'm choosing **Paper**! :hand_splayed: You win!"
      } else if (choice2 == "scissors") {
        var response = "I'm choosing **Scissors**! :v: It's a tie!"
      } else {
        var response = "I'm choosing **Rock**! :punch: I win!"
      }
      message.channel.send(response);
    } else {
      message.channel.send(`You need to use \`${settings.prefix}rps\` <rock|paper|scissors>`);
    }
  }
exports.help = {
	name: "rps",
    description: 'Play Rock Paper Scissors with bot',
    usage: "rps <rock|paper|scissors>"
}
exports.conf = {
    permLevel: 0,
    guildOnly: false,
    enabled: true,
    aliases: []
}
