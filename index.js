// adding modules
const Discord = require('discord.js');
const config = require('./config.json');
const Keyv = require('keyv');
const keyv = new Keyv('mysql://root:password@localhost::3306/strikebot');
const client = new Discord.Client();
keyv.on('error', err => console.error('Keyv connection error:', err));

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