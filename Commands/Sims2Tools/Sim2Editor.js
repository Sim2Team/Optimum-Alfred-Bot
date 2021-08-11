/*
	Optimum Alfred's Sim2Editor Commands implementation.

	Some commands related to Sim2Editor.
*/

const Discord = require("discord.js");

/* Module: Sim2Editor. */
module.exports = {
	Names: ["Sim2Editor", "S2Editor"],
	Usage: "[command]",
	Description: "Some commands related to Sim2Editor. Type \"-h\" or \"-help\" to the command for a list of Sim2Editor commands.",
	Handler(Message) {
		const CMD = Message.Value; // Save the argument to a variable for more efficiency.

		if (CMD.length < 1) {
			Message.channel.send("No \"sub\" command for Sim2Editor provided! Type \"-h\" or \"-help\" to the command for a list of Sim2Editor commands.");

		} else {
			/* -h or -help --> send a list of commands related to Sim2Editor. */
			if (CMD == "-h" || CMD == "-help") {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Sim2Editor - List of \"sub\" commands")
					.setThumbnail("https://raw.githubusercontent.com/SuperSaiyajinStackZ/Optimum-Alfred-Bot/main/resources/Sims2/Sim2Editor.png")
					.setColor("#447273")
					.setDescription("-site: Sends a link to the Sim2Editor site.\n-features: Sends a link to the Sim2Editor features page.");

				Message.channel.send({ embeds: [ Embed ]});

			/* -site --> Send a link to the Sim2Editor site. */
			} else if (CMD == "-site") {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Sim2Editor - Site")
					.setThumbnail("https://raw.githubusercontent.com/SuperSaiyajinStackZ/Optimum-Alfred-Bot/main/resources/Sims2/Sim2Editor.png")
					.setColor("#447273")
					.setDescription("Find Sim2Editor's site [here](https://supersaiyajinstackz.github.io/Sim2Editor/).");

				Message.channel.send({ embeds: [ Embed ]});

			/* -features --> Send a link to the Sim2Editor features page. */
			} else if (CMD == "-features") {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Sim2Editor - Features")
					.setThumbnail("https://raw.githubusercontent.com/SuperSaiyajinStackZ/Optimum-Alfred-Bot/main/resources/Sims2/Sim2Editor.png")
					.setColor("#447273")
					.setDescription("Find Sim2Editor's features page [here](https://supersaiyajinstackz.github.io/Sim2Editor/features).");

				Message.channel.send({ embeds: [ Embed ]});
			
			}
		}
	}
};