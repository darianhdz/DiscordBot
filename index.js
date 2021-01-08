// adding modules
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

// console output to check functionality
client.once('ready', () => {
	console.log('Ready!');
});

// token
client.login('Nzk3MTQxNDQ3NjQzNjI3NTQx.X_iJ0w.V6367FelSlT7nwyv2IYi0wnk0NU');