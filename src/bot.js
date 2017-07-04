// Get the required shit together
const Discord = require('discord.js');
const exec = require('child_process').exec;
const utils = require('./utils.js');
const config = require('config');

const client = new Discord.Client();
const command = [
	'add--interactive',
	'am',
	'annotate',
	'apply',
	'archive',
	'bisect',
	'bisect--helper',
	'blame',
	'branch',
	'bundle',
	'cat-file',
	'check-attr',
	'check-ignore',
	'check-mailmap',
	'check-ref-format',
	'checkout',
	'checkout-index',
	'cherry',
	'cherry-pick',
	'clean',
	'clone',
	'column',
	'commit',
	'commit-tree',
	'config',
	'count-objects',
	'credential',
	'credential-cache',
	'credential-cache--daemon',
	'credential-store',
	'daemon',
	'describe',
	'diff',
	'diff-files',
	'diff-index',
	'diff-tree',
	'difftool',
	'difftool--helper',
	'fast-export',
	'fast-import',
	'fetch',
	'fetch-pack',
	'filter-branch',
	'fmt-merge-msg',
	'for-each-ref',
	'format-patch',
	'fsck',
	'fsck-objects',
	'gc',
	'get-tar-commit-id',
	'grep',
	'hash-object',
	'help',
	'http-backend',
	'http-fetch',
	'http-push',
	'imap-send',
	'index-pack',
	'init',
	'init-db',
	'instaweb',
	'interpret-trailers',
	'log',
	'ls-files',
	'ls-remote',
	'ls-tree',
	'mailinfo',
	'mailsplit',
	'merge',
	'merge-base',
	'merge-file',
	'merge-index',
	'merge-octopus',
	'merge-one-file',
	'merge-ours',
	'merge-recursive',
	'merge-resolve',
	'merge-subtree',
	'merge-tree',
	'mergetool',
	'mktag',
	'mktree',
	'mv',
	'name-rev',
	'notes',
	'pack-objects',
	'pack-redundant',
	'pack-refs',
	'patch-id',
	'prune',
	'prune-packed',
	'pull',
	'push',
	'quiltimport',
	'read-tree',
	'rebase',
	'receive-pack',
	'reflog',
	'relink',
	'remote',
	'remote-ext',
	'remote-fd',
	'remote-ftp',
	'remote-ftps',
	'remote-http',
	'remote-https',
	'remote-testsvn',
	'repack',
	'replace',
	'request-pull',
	'rerere',
	'reset',
	'rev-list',
	'rev-parse',
	'revert',
	'rm',
	'send-pack',
	'sh-i18n--envsubst',
	'shell',
	'shortlog',
	'show',
	'show-branch',
	'show-index',
	'show-ref',
	'stage',
	'stash',
	'status',
	'stripspace',
	'submodule',
	'submodule--helper',
	'subtree',
	'symbolic-ref',
	'tag',
	'unpack-file',
	'unpack-objects',
	'update-index',
	'update-ref',
	'update-server-info',
	'upload-archive',
	'upload-pack',
	'var',
	'verify-commit',
	'verify-pack',
	'verify-tag',
	'web--browse',
	'whatchanged',
	'worktree',
	'write-tree'
];

// Login to Discord
client.login(config.get('api').discord.token);

client.on('ready', () => {
	console.log('Successfully connected to Discord!');
	client.user.setGame(`${config.get('prefix')} gud`);

	// Send DBOTS info if it was provided.
	if (config.get('api').botsdiscordpw) {
		utils.botsdiscordpw(client);
		setInterval(() => {
			utils.botsdiscordpw(client);
		}, 1800000);
	}

	// Send FAKEDBOTS info if it was provided.
	if (config.get('api').discordbotsorg) {
		utils.discordbotsorg(client);
		setInterval(() => {
			utils.discordbotsorg(client);
		}, 1800000);
	}
});

client.on('message', (message) => {
	// If it's not a bot...
	if (!message.author.bot) {
		// Replace newlines with a space
		message.content = message.content.replace('\n', ' ');

		// Remove beautiful Discord code marks if it's there
		if (message.content.toLowerCase().startsWith('`')) {
			message.content = message.content.substring(2).slice(0, -1);
		} else if (message.content.startsWith('```')) {
			message.content = message.content.substring(4).slice(0, -3);
		}

		// Remove sudo or su if it's there
		if (message.content.toLowerCase().startsWith('sudo')) {
			message.content = message.content.substring(5);
		}

		if (message.content.startsWith('su')) {
			message.content = message.content.substring(3);
		}

		const input = message.content.toLowerCase().split(' ');

		// Stop if it's not a git command
		if (input[0] === 'git' && input[1]) {
			if (input[1] === 'pull' && config.get('admins').includes(message.author.id)) {
				exec('git pull', (error, stdout) => {
					message.channel.send(`\`\`\`\n${stdout}\n\`\`\``);
				});
			} else if (input[1] === 'push' && config.get('admins').includes(message.author.id)) {
				utils.botsdiscordpw(client);
				utils.discordbotsorg(client);
				message.channel.send('```\nPushed Discord Bots Statistics\n(oh and also Discord Bot List statistics)\n```');
			} else if (input[1] === 'restart' && config.get('admins').includes(message.author.id)) {
				message.channel.send(`\`git: '${input[1]}' is not a git command... but it will work anyway. Restarting!\``)
					.then(() => {
						process.exit(0);
					});
			} else if (input[1] === 'help' || input[1] === '--help') {
				message.channel.send('`git-gud bot by 7coil, https://mss.ovh/`');
			} else if (!command.includes(input[1])) {
				message.channel.send(`\`git: '${input[1]}' is not a git command. See 'git --help'\``);
			}
		}
	}
});

process.on('unhandledRejection', (err) => {
	console.error(`Uncaught Promise Error: \n${err.stack}`);
});
