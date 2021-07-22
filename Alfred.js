/*
	Main Entry Point from Alfred Optimum.

	To use this bot, you need to create a '.env' file with the following things:
		- BOT_TOKEN=<Token of your Discord Bot.>
		- CHANNEL_PUBLIC=<Channel ID for the public bot channel.>
		- CHANNEL_TEST=<Channel ID for testing purposes.>
*/

const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const Alfred = {
	Commands: {},
	Config: require("./Config.json"),
	Client: new Discord.Client() // Create a new discord client / bot in our case.
};

for (let Category of fs.readdirSync("Commands")) {
	Alfred.Commands[Category] = {
		Commands: {},
		Description: fs.existsSync(`Commands/${Category}/Description.txt`) ? fs.readFileSync(`Commands/${Category}/Description.txt`).toString().trim() : ""
	};

	for (let File of fs.readdirSync(`Commands/${Category}`).filter(Cmd => Cmd.endsWith(".js"))) {
		Alfred.Commands[Category].Commands[`${Category}/${File}`] = require(`./Commands/${Category}/${File}`);
	}
}

console.log("Initializing the Bot...");

/* Tell us, as what we logged in. */
Alfred.Client.on("ready", () => {
	console.log("Logged in as: " + Alfred.Client.user.tag + ".");
});

/* Handle message commands. */
Alfred.Client.on("message", Message => {
	if (Message.member?.user.bot) return; // Ensure it's not a bot.
	if (!Message.content.startsWith(Alfred.Config.Prefix)) return; // Ensure it has the bot prefix.
	if (!Alfred.Config.Channels.includes(Message.channel.id)) return; // Ensure it's in a bot channel.

	let Match = Message.content.match(RegExp(Alfred.Config.Prefix.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*([^\\s]+)\\s*(.*)", "si"));
	if (Match.length < 2) return;
	Message.Command = Match[1];
	Message.Value = Match[2].trim();

	for (let Category in Alfred.Commands) {
		const Commands = Alfred.Commands[Category].Commands;
		for (let Command in Commands) {
			for (let Name of Commands[Command].Names) {
				if (Name.toLowerCase() == Message.Command.toLowerCase()) {
					console.log(`${Message.member.user.tag} just executed the command '${Message.Command}'.`);
					if (!Commands[Command].Dev || Alfred.Config.Developers.includes(Message.member.id)) {
						try {
							Commands[Command].Handler(Message, Alfred);
						} catch(e) {
							Message.channel.send("An error occurred while executing that command:\n```js\n" + e + "```");
						}
					} else {
						Message.channel.send("Bot developer permissions is required to run this command!");
					}

					return;
				}
			}
		}
	}
});

/* Run. */
Alfred.Client.login(process.env.BOT_TOKEN);
console.log("Initialized!");
