/*
	Optimum Alfred's Sim2Team Wiki command handler.

	Links to some things from the Sim2Team wiki site. For the best results, search by the actual site path starting at https://sim2team.github.io/wiki/ instead of keywords.
*/

const Discord = require("discord.js");
const DefaultURL = "https://sim2team.github.io/wiki/";

const Content = [
	/* Guides related. */
	{
		"Desc": "The index page of the guides.",
		"Title": "Guides Index",
		"URL": "guides"
	},
	{
		"Desc": "How to export the Game Boy Advance Soundtracks to the best quality as a WAV, MP3 whatever you like.",
		"Title": "Unkrawerter GBA",
		"URL": "guides/unkrawertergba"
	},
	{
		"Desc": "How to dump and restore the Savefile.",
		"Title": "Save Dump",
		"URL": "guides/savedump"
	},

	/* Research general related. */
	{
		"Desc": "The index page of the research.",
		"Title": "Research Index",
		"URL": "research"
	},

	/* Bustin' Out related. */
	{
		"Desc": "Save Information for The Sims Bustin' Out (GBA).",
		"Title": "Bustin' Out Saveinfo",
		"URL": "research/bustinout"
	},

	/* The Urbz (GBA) related. */
	{
		"Desc": "Save Information for The Urbz - Sims in the City (GBA).",
		"Title": "The Urbz (GBA) Saveinfo",
		"URL": "research/urbzgba"
	},

	/* The Urbz (NDS) related. */
	{
		"Desc": "Save Information for The Urbz - Sims in the City (NDS).",
		"Title": "The Urbz (NDS) Saveinfo",
		"URL": "research/urbznds"
	},

	/* The Sims 2 (GBA) related. */
	{
		"Desc": "Save Information for The Sims 2 (GBA).",
		"Title": "The Sims 2 (GBA) Saveinfo",
		"URL": "research/sims2gba"
	},

	/* The Sims 2 (NDS) related. */
	{
		"Desc": "Save Information for The Sims 2 (NDS).",
		"Title": "The Sims 2 (NDS) Saveinfo",
		"URL": "research/sims2nds"
	}
];

/* Module: Sim2Wiki. */
module.exports = {
	Names: ["Sim2Wiki", "S2Wiki"],
	Usage: "[command]",
	Description: "Links to some things from the Sim2Team wiki site. For the best results, search by the actual site path starting at https://sim2team.github.io/wiki/ instead of keywords.",
	Handler(Message) {
		const _Content = Message.Value; // Save the argument to a variable for more efficiency.
		
		if (_Content.length < 1) {
			const Embed = new Discord.MessageEmbed()
				.setTitle("Sim2Wiki - You haven't provided a content!")
				.setColor("#343840")
				.setURL(DefaultURL)
				.setDescription("You haven't provided a content. Here is a list of all available contents you can search.")
				.addField("Content List", Content.map(r => r.Title).join("\n"));

			Message.channel.send({ embeds: [ Embed ] });

		} else {
			let contentLower = _Content.toLowerCase();
			let Cnt = Content.filter(r => r.URL.toLowerCase().includes(contentLower)
				|| r.Title.toLowerCase().includes(contentLower))?.[0]; // url path has prio than title to not mess that up.

			if (Cnt) {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Sim2Wiki - " + Cnt.Title)
					.setColor("#447273")
					.setURL(DefaultURL + Cnt.URL)
					.setDescription(Cnt.Desc);
			
				Message.channel.send({ embeds: [ Embed ] });
				
			} else {
				Message.channel.send("This Content does not exist.");
			}
		}
	}
};