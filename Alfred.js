/*
	Main Entry Point from Alfred Optimum.

	To use this bot, you need to create a '.env' file with the following things:
		- BOT_TOKEN=<Token of your Discord Bot.>
		- CHANNEL_PUBLIC=<Channel ID for the public bot channel.>
		- CHANNEL_TEST=<Channel ID for testing purposes.>
*/

const Discord = require('discord.js');
require("dotenv").config();
const Client = new Discord.Client(); // Create a new discord client / bot in our case.

let SimpleCommands = require("./Commands/Tools/SimpleCommands.js"); // The simple Commands handler.
let DevTools = require("./Commands/Tools/DevTools.js"); // The Dev Tools handler.

console.log("Initializing the Bot...");

/* Tell us, as what we logged in. */
Client.on('ready', () => {
	console.log("Logged in as: " + Client.user.tag + ".");
});

/* Handle message commands. */
Client.on('message', Message => {
	if (!Message.member.user.bot) { // Ensure it's in a guild and NOT a bot.
		let Handled = false;

		Handled = SimpleCommands.Handler(Message);
		if (!Handled) Handled = DevTools.Handler(Message);

		/* Log, if handled. */
		if (Handled) console.log(Message.member.user.tag + " just executed the command '" + Message.content + "'.");
	};
});


/* Run. */
Client.login(process.env.BOT_TOKEN);
console.log("Initialized!");