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
		const Command = Message.Value.toLowerCase();

		if (Command.length < 1) Message.channel.send("No \"sub\" command for Sim2Editor provided! Type \"-h\" or \"-help\" to the command for a list of Sim2Editor commands.");
		else {
			/* -h or -help --> send a list of commands related to Sim2Editor. */
			if (Command == "-h" || Command == "-help") {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Sim2Editor - List of \"sub\" commands")
					.setThumbnail("https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sim2Team.png")
					.setURL("https://sim2team.github.io/sim2editor/")
					.setColor("#447273")
					.addField("-site", "Sends a link to the Sim2Editor site.", true)
					.addField("-features", "Sends a link to the Sim2Editor features page.", true)
					.addField("-supported", "Send which games and regions are supported.", true);
				Message.channel.send({ embeds: [ Embed ]});

			/* -site --> Send a link to the Sim2Editor site. */
			} else if (Command == "-site") {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Sim2Editor - Site")
					.setThumbnail("https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sim2Team.png")
					.setURL("https://sim2team.github.io/sim2editor/")
					.setColor("#447273")
					.setDescription("Find Sim2Editor's site [here](https://sim2team.github.io/sim2editor/).");
				Message.channel.send({ embeds: [ Embed ]});

			/* -features --> Send a link to the Sim2Editor features page. */
			} else if (Command == "-features") {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Sim2Editor - Features")
					.setThumbnail("https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sim2Team.png")
					.setURL("https://sim2team.github.io/sim2editor/features")
					.setColor("#447273")
					.setDescription("Find Sim2Editor's features page [here](https://sim2team.github.io/sim2editor/features).");
				Message.channel.send({ embeds: [ Embed ]});
			
			/* -supported --> Send which games and regions are supported. */
			} else if (Command == "-supported") {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Sim2Editor - Supported Games")
					.setThumbnail("https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sim2Team.png")
					.setURL("https://sim2team.github.io/sim2editor/")
					.setColor("#447273")
					.setDescription("You can see which games are supported including the regions below.")
					.addField("The Sims 2 (GBA)", "- EUR\n- USA")
					.addField("The Sims 2 (NDS)", "- EUR\n- USA\n- JPN");
				Message.channel.send({ embeds: [ Embed ]});
			}
		}
	}
}
