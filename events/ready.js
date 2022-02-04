/*
	The event that happens when you start up the bot.

	- Loading all necessary commands.
	- Set the status.
*/

const fs = require("fs");


/* Handle the Event. */
module.exports = async (Alfred) => {
	/* Tell us, as what we logged in and set status. */
	console.log("Logged in as: " + Alfred.Client.user.tag + ".");
	Alfred.Client.user.setActivity("Helping out in the Sim2Server | .help");

	/* Setup Commands. */
	for (let Category of fs.readdirSync("Commands/")) {
		Alfred.Commands[Category] = {
			Commands: { },
			Description: fs.existsSync(`Commands/${Category}/Description.txt`) ? fs.readFileSync(`Commands/${Category}/Description.txt`).toString().trim() : ""
		};
	
		for (let File of fs.readdirSync(`Commands/${Category}`).filter(Cmd => Cmd.endsWith(".js"))) {
			Alfred.Commands[Category].Commands[`${Category}/${File}`] = require(`../Commands/${Category}/${File}`);
		}
	}
}
