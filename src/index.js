const Discord = require('discord.js');
const config = require('config');

const manager = new Discord.ShardingManager('./src/bot.js', {
	token: config.get('api').discord.token
});

// Spawn with a relevant number of shards automatically
manager.spawn();
