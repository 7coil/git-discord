//Get the required shit together
const config = require("./config.json");
const API = require("./api.json");
const Discord = require("discord.js");
const exec = require('child_process').exec;
const client = new Discord.Client();

const command = [
	"add--interactive",
	"am",
	"annotate",
	"apply",
	"archive",
	"bisect",
	"bisect--helper",
	"blame",
	"branch",
	"bundle",
	"cat-file",
	"check-attr",
	"check-ignore",
	"check-mailmap",
	"check-ref-format",
	"checkout",
	"checkout-index",
	"cherry",
	"cherry-pick",
	"clean",
	"clone",
	"column",
	"commit",
	"commit-tree",
	"config",
	"count-objects",
	"credential",
	"credential-cache",
	"credential-cache--daemon",
	"credential-store",
	"daemon",
	"describe",
	"diff",
	"diff-files",
	"diff-index",
	"diff-tree",
	"difftool",
	"difftool--helper",
	"fast-export",
	"fast-import",
	"fetch",
	"fetch-pack",
	"filter-branch",
	"fmt-merge-msg",
	"for-each-ref",
	"format-patch",
	"fsck",
	"fsck-objects",
	"gc",
	"get-tar-commit-id",
	"grep",
	"hash-object",
	"help",
	"http-backend",
	"http-fetch",
	"http-push",
	"imap-send",
	"index-pack",
	"init",
	"init-db",
	"instaweb",
	"interpret-trailers",
	"log",
	"ls-files",
	"ls-remote",
	"ls-tree",
	"mailinfo",
	"mailsplit",
	"merge",
	"merge-base",
	"merge-file",
	"merge-index",
	"merge-octopus",
	"merge-one-file",
	"merge-ours",
	"merge-recursive",
	"merge-resolve",
	"merge-subtree",
	"merge-tree",
	"mergetool",
	"mktag",
	"mktree",
	"mv",
	"name-rev",
	"notes",
	"pack-objects",
	"pack-redundant",
	"pack-refs",
	"patch-id",
	"prune",
	"prune-packed",
	"pull",
	"push",
	"quiltimport",
	"read-tree",
	"rebase",
	"receive-pack",
	"reflog",
	"relink",
	"remote",
	"remote-ext",
	"remote-fd",
	"remote-ftp",
	"remote-ftps",
	"remote-http",
	"remote-https",
	"remote-testsvn",
	"repack",
	"replace",
	"request-pull",
	"rerere",
	"reset",
	"rev-list",
	"rev-parse",
	"revert",
	"rm",
	"send-pack",
	"sh-i18n--envsubst",
	"shell",
	"shortlog",
	"show",
	"show-branch",
	"show-index",
	"show-ref",
	"stage",
	"stash",
	"status",
	"stripspace",
	"submodule",
	"submodule--helper",
	"subtree",
	"symbolic-ref",
	"tag",
	"unpack-file",
	"unpack-objects",
	"update-index",
	"update-ref",
	"update-server-info",
	"upload-archive",
	"upload-pack",
	"var",
	"verify-commit",
	"verify-pack",
	"verify-tag",
	"web--browse",
	"whatchanged",
	"worktree",
	"write-tree"
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

	let input = message.content.toLowerCase().split(" ");

	//Stop if it's not a git command
	if (!(input[0] === "git")) return false;

	if(input[1] === "pull" && message.author.id === config.MSS.sysadmin) {
		exec("git pull", function(error, stdout, stderr) {
			 message.channel.sendMessage("```\n" + stdout + "\n```");
		});
	} else if(input[1] === "restart" && message.author.id === config.MSS.sysadmin) {
		message.channel.sendMessage("`git: '" + input[1] + "' is not a git command... but it will work anyway. Restarting!`")
			.then( function() {
				process.exit(0);
			});

	} else if(input[1] === "help" || input[1] === "--help") {
		return message.channel.sendMessage("`git-gud bot by 7coil, http://moustacheminer.com`");
	}

	//Check if it's an invalid git command
	if (command.indexOf(input[1]) == -1) {
		message.channel.sendMessage("`git: '" + input[1] + "' is not a git command. See 'git --help'.`");
	}

});

process.on("unhandledRejection", function(err) {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
