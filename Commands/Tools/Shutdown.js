/*
	Optimum Alfred's Shutdown Handler implementation.

	Save the Level System data back to a file and shut the bot down (TODO). Only usable for developers.
*/

const fs = require("fs");


/* Module: Shutdown. */
module.exports = {
	Names: ["Shutdown"],
	Description: "Save the Level System data back to a file and shut the bot down (TODO).",
	Dev: true,
	Handler(Message, Alfred) {
		if (Alfred.LevelSystem) {
			fs.writeFileSync("./resources/data/LevelSystem.json", JSON.stringify(Alfred.LevelSystem, null, "\t"));
		}

		console.log("Done!");
		/* TODO: Handle actual shutdown too. */
	}
};
