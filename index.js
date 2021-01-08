// adding modules
const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const client = new Discord.Client();

// console output to check functionality
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if(message.content == 'pineapple') {
        message.channel.send('fuck you');
    }
});

// token
client.login('Nzk3MTQxNDQ3NjQzNjI3NTQx.X_iJ0w.J5VbSqvTriuufASOPgikOGZI1Uc');