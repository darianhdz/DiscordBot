/* eslint-disable no-inline-comments */
// adding modules
const Discord = require('discord.js');
const mongoose = require("mongoose");
require("dotenv").config();
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"]});

const prefix = '/';

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command_handler", "event_handler"].forEach((handler) => {
	require('./handlers/${handler}')(client, Discord);
});

mongoose.connect(process.env.MONGODB_SRV, {
	useNewUrlParser : true,
	useUnifiedTopology : true,
	useFindAndModify : false
}).then(()=>{
	console.log("Connected to db successfully");
})
.catch((err) => {
	console.log(err);
});

// console output to check functionality
client.once('ready', () => {
	console.log('Ready!');
});



// // function to monitor messages
// client.on('message', async message => {
// 	const ps1 = message.content.split(' '); // ps1 consists of an array filled with pieces of a message
// 	if (message.content.startsWith(prefix)) { // if a message starts with the / prefix
// 		if(message.content.includes('/add')) { // if a message starts with add
// 			const ps2 = ps1[1]; // assign the word desired to be banned to ps2
// 			database.query('INSERT INTO banned_words VALUES ("' + ps2 + '")', [ps2], function(error, results, fields) { // sql to insert into database
// 				if(error) { // checks for error
// 					console.log(error);
// 				}
// 				return message.reply('' + ps2 + ' added to banned words successfully.'); // replies to user with confirmation
// 			});
// 		}
// 	}
// 	else {
// 		const cont = message.content;
// 		if(message.author.bot) { // if the author of a message is the bot
// 			if(cont.includes('ATTENTION YOU ARE NOW KICKED. GOODBYE.')) { // only continues if the message contains the banning message
// 				const member = message.mentions.members.first();
// 				member.kick().catch(err => {
// 					console.error(err);
// 					message.channel.send('Unable to kick, permissions too high.'); // if user was unable to be kicked.
// 				});
// 				database.query('DELETE FROM USERS WHERE username = ?', [member.user.username], function(error, results, fields) { // deletes user's record from database
// 					if(error) console.log(error);
// 				});
// 			}
// 			return;
// 		}
// 		const authorMsg = message.author.username;
// 		ps1.forEach(function(element) { // loops through words in the split array to search for banned ones
// 			database.query('SELECT * FROM banned_words WHERE word = ?', [element], function(error, results, fields) { // searches banned_words database for the word in array
// 				if(error) console.log(error);
// 				if(results.length > 0) { // if result is returned, continue
// 					database.query('SELECT strike_count FROM users WHERE username = ?', [message.author.username], function(error, results, fields) { // checks strike count of user
// 						if(error) {
// 							console.log(error);
// 						}
// 						if(results.length > 0) {
// 							const upstrikeCount = results[0].strike_count;
// 							if(upstrikeCount >= 2) { // if strike count is at 2, kicks user
// 								return message.reply('ATTENTION YOU ARE NOW KICKED. GOODBYE.');
// 							}
// 							else { // if strike count is below 2, set it to 2, as user could only be present in database if they have a strike on record
// 								database.query('UPDATE users SET strike_count = ? WHERE username = ?', [2, authorMsg], function(error, results, fields) {
// 									if(error) {
// 										console.log(error);
// 									}
// 									return message.reply('ATTENTION YOU ARE NOW AT 2 STRIKES. TREAD CAREFULLY.');
// 								});
// 							}
// 						}
// 						else { // if the user was not found in database, set strike count to 1
// 							database.query('INSERT INTO users(username, strike_count) VALUES ("' + message.author.username + '", 1)', [message.author.username], function(error, results) {
// 								if(error) {
// 									console.log(error);
// 								}
// 								return message.reply('ATTENTION YOU ARE NOW AT 1 STRIKE. TREAD CAREFULLY.');
// 							});
// 						}
// 					});
// 				}
// 			});
// 		});
// 	}
// });


// token
client.login(process.env.DISCORD_TOKEN);