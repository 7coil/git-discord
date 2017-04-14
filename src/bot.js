//Get the required shit together
const config = require("./config.json");
const API = require("./api.json");
const Discord = require("discord.js");
const client = new Discord.Client();

const command = [
	"config",
	"init",
	"clone",
	"add",
	"rm",
	"commit",
	"status",
	"branch",
	"checkout",
	"stash",
	"tag",
	"fetch",
	"pull",
	"push",
	"remote",
	"log",
	"show",
	"ls-tree",
	"cat-file",
	"grep",
	"diff"
]

//Login to Discord
client.login(API.discord);

client.on("ready", function() {
	console.log("Successfully connected to Discord!");
	client.user.setGame(config.MSS.prefix + " gud | " + config.MSS.version);
});

client.on("message", function(message) {

	//Replace newlines with a space
	message.content = message.content.replace("\n", " ");

	//Remove beautiful Discord code marks if it's there
	if(message.content.toLowerCase().startsWith("`")) {
		message.content = message.content.substring(2).slice(0, -1);
	} else if (message.content.startsWith("```")) {
		message.content = message.content.substring(4).slice(0, -3);
	}

	//Remove sudo or su if it's there
	if(message.content.toLowerCase().startsWith("sudo")) {
		message.content = message.content.substring(5);
	} else if (message.content.startsWith("su")) {
		message.content = message.content.substring(3);
	}

	let input = message.content.split(" ");

	//Stop if it's not a git command
	if (!(input === "git")) return false;

	//Check if it's not a valid git command
	if (!(command[input[1]])) {
		message.channel.sendMessage("`git: '" + input[2] + "' is not a git command. See 'git --help'.`");
	}

});

process.on("unhandledRejection", function(err) {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
