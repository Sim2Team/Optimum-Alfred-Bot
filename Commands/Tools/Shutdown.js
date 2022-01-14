/*
	Optimum Alfred's Shutdown Handler implementation.

	Save the Level System data back to a file and shut the bot down. Only usable for developers.
*/

const fs = require("fs");


/* Module: Shutdown. */
module.exports = {
	Names: ["Shutdown"],
	Description: "Save the Level System data back to a file and shut the bot down.",
	Dev: true,
	async Handler(Message, Alfred) {
		if (Alfred.LevelSystem) fs.writeFileSync("./resources/data/LevelSystem.json", JSON.stringify(Alfred.LevelSystem, null, "\t"));
		
		await Message.channel.send("Goodbye.");
		process.exit();
	}
};
