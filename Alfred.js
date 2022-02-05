#!/usr/bin/env node
/*
	Main Entry Point from Optimum Alfred.

	To use this bot, you need to create a '.env' file with the following things:
		- BOT_TOKEN=<Token of your Discord Bot.>

	Also to use this bot, you need to edit the `Config.json` with the following things:
		- Channels: The Channel IDs where the bot is allowed to be used.
		- Developers: The User IDs of the developers, that can use the commands that have `Dev: true` enabled.
		- Prefix: The prefix the bot should use the commands with.
*/
const { Client, Intents } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const Alfred = {
	Commands: { },
	Config: require("./Config.json"),
	Client: new Client({
		intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], // Base Intents.
		allowedMentions: { parse: [], repliedUser: false } // Don't ping.
	}), // Create a new discord client / bot in our case.
	LevelSystem: { } // LevelSystem data.
};

/* Initialize the Level System data. */
if (fs.existsSync("resources/data/levelsystem.json")) {
	Alfred.LevelSystem = require("./resources/data/levelsystem.json");

} else {
	Alfred.LevelSystem = {
		/* The Sanity Levels, including points for the required points AND role for the role ID you will get on reaching that many points. */
		"levels": [
			{
				"points": 8,
				"role": "928693785108570152",
				"name": "Sanity-0"
			},
			{
				"points": 500,
				"role": "928693608536743996",
				"name": "Sanity-1"
			},
			{
				"points": 1000,
				"role": "928693387903766589",
				"name": "Sanity-2"
			},
			{
				"points": 2000,
				"role": "928693926347567185",
				"name": "Sanity-3"
			},
			{
				"points": 4000,
				"role": "928695492752343100",
				"name": "Sanity-4"
			},

			/* Special roles here (Sanity 5+). */
			{
				"points": 7000,
				"role": "939092558024433694",
				"name": "Zimmer"
			},

			{
				"points": 10000,
				"role": "939092711208783873",
				"name": "Keeble"
			},
			{
				"points": 50000,
				"role": "939092813839208519",
				"name": "Dripple"
			},
			{
				"points": 100000,
				"role": "939092883749863434",
				"name": "Burple"
			},
			{
				"points": 500000,
				"role": "939092971251441664",
				"name": "Ava"
			},
			{
				"points": 1000000,
				"role": "939093014305968128",
				"name": "Emperor"
			}

		],
		"pointlimit": 5000000, // The Limit of the Points on the Level System.
		"msgpoints": 2, // Amount of points you'll get on a message.
		"streammodepoints": 4, // Amount of points you'll get if on stream mode.
		"streammodeon": false, // If Stream mode is active, or not.
		"streammodeid": "", // The thread ID of the stream channel.
		"interval": 30000, // The amount of milliseconds that need to pass until you get points again. 1000 is 1 second in Milliseconds, do 30 seconds interval.
		"users": { } // All the users are listed on there with an object of the user ID and with points, emotes, contributions, timestamp and the user name.
	}

	fs.writeFileSync("./resources/data/levelsystem.json", JSON.stringify(Alfred.LevelSystem, null, "\t"));
}

console.log("Initializing the Bot...");

/* Run. */
Alfred.Client.login(process.env.BOT_TOKEN);

/* Handle the events. */
fs.readdir("./events/", (Error, Files) => {
	if (Error) return console.error(Error);

	Files.forEach(File => {
		const Event = require(`./events/${File}`);
		let EventName = File.split(".")[0];
		Alfred.Client.on(EventName, Event.bind(null, Alfred));
	});
});