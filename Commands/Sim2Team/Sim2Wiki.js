/*
	Optimum Alfred's Sim2Team Wiki command handler.

	Links to some things from the Sim2Team wiki site. For the best results, search by the actual site path starting at https://sim2team.github.io/wiki/ instead of keywords.
*/

const Discord = require("discord.js");
const DefaultURL = "https://sim2team.github.io/wiki/";

const Content = [
	/* Guides related. */
	{
		"Desc": "The index page of the guides",
		"Title": "Guides Index",
		"URL": "guides"
	},
	{
		"Desc": "How to export the Game Boy Advance Soundtracks to the best quality as a WAV, MP3 whatever you like",
		"Title": "Unkrawerter GBA",
		"URL": "guides/unkrawertergba"
	},
	{
		"Desc": "How to dump and restore the Savefile",
		"Title": "Save Dump",
		"URL": "guides/savedump"
	},

	/* Research general related. */
	{
		"Desc": "The index page of the research",
		"Title": "Research Index",
		"URL": "research"
	},

	/* Bustin' Out related. */
	{
		"Desc": "General Information for The Sims Bustin' Out (GBA).",
		"Title": "Bustin' Out Generalinfo",
		"URL": "research/bustinout"
	},
	{
		"Desc": "Save Information for The Sims Bustin' Out (GBA).",
		"Title": "Bustin' Out Saveinfo",
		"URL": "research/bustinout/savefile"
	},

	/* The Urbz (GBA) related. */
	{
		"Desc": "General Information for The Urbz - Sims in the City (GBA).",
		"Title": "The Urbz (GBA) Generalinfo",
		"URL": "research/urbzgba"
	},
	{
		"Desc": "Save Information for The Urbz - Sims in the City (GBA).",
		"Title": "The Urbz (GBA) Saveinfo",
		"URL": "research/urbzgba/savefile"
	},

	/* The Urbz (NDS) related. */
	{
		"Desc": "General Information for The Urbz - Sims in the City (NDS).",
		"Title": "The Urbz (NDS) Generalinfo",
		"URL": "research/urbznds"
	},
	{
		"Desc": "Save Information for The Urbz - Sims in the City (NDS).",
		"Title": "The Urbz (NDS) Saveinfo",
		"URL": "research/urbznds/savefile"
	},

	/* The Sims 2 (GBA) related. */
	{
		"Desc": "General Information for The Sims 2 (GBA).",
		"Title": "The Sims 2 (GBA) Generalinfo",
		"URL": "research/sims2gba"
	},
	{
		"Desc": "Save Information for The Sims 2 (GBA).",
		"Title": "The Sims 2 (GBA) Saveinfo",
		"URL": "research/sims2gba/savefile"
	},
	{
		"Desc": "The Sims 2 Game Boy Advance | Cast Member Research",
		"Title": "The Sims 2 (GBA) Cast Member",
		"URL": "research/sims2gba/savefile/castmember"
	},
	{
		"Desc": "The Sims 2 Game Boy Advance | Episode Research",
		"Title": "The Sims 2 (GBA) Episode",
		"URL": "research/sims2gba/savefile/episode"
	},
	{ // Re-ranged it there, so searching for "Item" actually shows this instead of House Item.
		"Desc": "The Sims 2 Game Boy Advance | Item Research",
		"Title": "The Sims 2 (GBA) Item",
		"URL": "research/sims2gba/item"
	},
	{
		"Desc": "The Sims 2 Game Boy Advance | House Item Research",
		"Title": "The Sims 2 (GBA) House Item",
		"URL": "research/sims2gba/savefile/houseitem"
	},
	{
		"Desc": "The Sims 2 Game Boy Advance | Item Package Research",
		"Title": "The Sims 2 (GBA) Item Package",
		"URL": "research/sims2gba/savefile/itempackage"
	},
	{
		"Desc": "The Sims 2 Game Boy Advance | Meta Research",
		"Title": "The Sims 2 (GBA) Meta",
		"URL": "research/sims2gba/savefile/meta"
	},
	{
		"Desc": "The Sims 2 Game Boy Advance | Meta Header Research",
		"Title": "The Sims 2 (GBA) Meta Header",
		"URL": "research/sims2gba/savefile/metaheader"
	},
	{
		"Desc": "The Sims 2 Game Boy Advance | Social Move Research",
		"Title": "The Sims 2 (GBA) Social Move",
		"URL": "research/sims2gba/savefile/socialmove"
	},

	/* The Sims 2 (NDS) related. */
	{
		"Desc": "General Information for The Sims 2 (NDS).",
		"Title": "The Sims 2 (NDS) Generalinfo",
		"URL": "research/sims2nds"
	},
	{
		"Desc": "Save Information for The Sims 2 (NDS).",
		"Title": "The Sims 2 (NDS) Saveinfo",
		"URL": "research/sims2nds/savefile"
	},
	{
		"Desc": "The Sims 2 Nintendo DS | Painting Research",
		"Title": "The Sims 2 (NDS) Painting",
		"URL": "research/sims2nds/savefile/painting"
	}
];

/* Module: Sim2Wiki. */
module.exports = {
	Names: ["Sim2Wiki", "S2Wiki"],
	Usage: "[command]",
	Description: "Links to some things from the Sim2Team wiki site. For the best results, search by the actual site path starting at https://sim2team.github.io/wiki/ instead of keywords.",
	Handler(Message) {
		const _Content = Message.Value.toLowerCase(); // Save the argument to a variable for more efficiency.
		
		if (_Content.length < 1) {
			const Embed = new Discord.MessageEmbed()
				.setTitle("Sim2Wiki - You haven't provided a content!")
				.setColor("#343840")
				.setURL(DefaultURL)
				.setDescription("You haven't provided a content. Here is a list of all available contents you can search.")
				.addField("Content List", Content.map(r => r.Title).join("\n"));

			Message.channel.send({ embeds: [ Embed ] });

		} else {
			let Cnt = Content.filter(r => r.URL.includes(_Content)
				|| r.Title.toLowerCase().includes(_Content))?.[0]; // url path has prio than title to not mess that up.

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
