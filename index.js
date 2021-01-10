// adding modules
const Discord = require('discord.js');
const { createConnection } = require('mysql');
const client = new Discord.Client();
const prefix = '/';
const database = createConnection({
	host : 'localhost',
	user: 'root',
	password: 'password',
	database: 'strikebot',
});

database.connect(function(err) {
	if(err) throw err;
	console.log('Connected');
});

// console output to check functionality
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
	const ps1 = message.content.split(' ');
	if (message.content.startsWith(prefix)) {
		if(message.content.includes('/add')) {
			const ps2 = ps1[1];
			database.query('INSERT INTO banned_words VALUES ("' + ps2 + '")', [ps2], function(error, results, fields) {
				if(error) {
					console.log(error);
				}
				return message.reply('' + ps2 + ' added to banned words successfully.');
			});
		}
	}
	else {
		const cont = message.content;
		if(message.author.bot) {
			if(cont.includes('ATTENTION YOU ARE NOW KICKED. GOODBYE.')) {
				const member = message.mentions.members.first();
				member.kick().catch(err => {
					console.error(err);
					message.channel.send('could not kick uWu');
				});
				database.query('DELETE FROM USERS WHERE username = ?', [member.user.username], function(error, results, fields) {
					if(error) console.log(error);
				});
			}
			return;
		}
		const authorMsg = message.author.username;
		ps1.forEach(function(element) {
			database.query('SELECT * FROM banned_words WHERE word = ?', [element], function(error, results, fields) {
				if(error) console.log(error);
				if(results.length > 0) {
					database.query('SELECT strike_count FROM users WHERE username = ?', [message.author.username], function(error, results, fields) {
						if(error) {
							console.log(error);
						}
						if(results.length > 0) {
							const upstrikeCount = results[0].strike_count;
							if(upstrikeCount >= 2) {
								return message.reply('ATTENTION YOU ARE NOW KICKED. GOODBYE.');
							}
							else {
								database.query('UPDATE users SET strike_count = ? WHERE username = ?', [2, authorMsg], function(error, results, fields) {
									if(error) {
										console.log(error);
									}
									return message.reply('ATTENTION YOU ARE NOW AT 2 STRIKES. TREAD CAREFULLY.');
								});
							}
						}
						else {
							database.query('INSERT INTO users(username, strike_count) VALUES ("' + message.author.username + '", 1)', [message.author.username], function(error, results) {
								if(error) {
									console.log(error);
								}
								return message.reply('ATTENTION YOU ARE NOW AT 1 STRIKE. TREAD CAREFULLY.');
							});
						}
					});
				}
			});
		});
	}
});


// token
client.login('Nzk3MTQxNDQ3NjQzNjI3NTQx.X_iJ0w.J5VbSqvTriuufASOPgikOGZI1Uc');