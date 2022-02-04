/*
	Optimum Alfred's Sim2Team Wiki Research command handler.

	Links to some things from the Sim2Team wiki site Research Section. The URL Path needs to start by "https://sim2team.github.io/wiki/research/game/".
*/

const Discord = require("discord.js");
const DefaultURL = "https://sim2team.github.io/wiki/research";
const Pages = require("../../resources/json/sim2research.json");


function GenerateEmbed(Message) {
	const Arr = Message.split(" ");
	let GameIdx = -1, PageIdx = -1;

	/* Go through all the games. */
	for (let Idx = 0; Idx < Pages.length; Idx++) {
		if (Arr[0] == Pages[Idx].game) {
			GameIdx = Idx;
			break;
		}
	}

	/* If game found, go through the pages, in case the Message array has 2 or more things. */
	if (GameIdx != -1) {
		if (Arr.length >= 2) {
			for (let Idx = 0; Idx < Pages[GameIdx].content.length; Idx++) {
				if (Arr[1] == Pages[GameIdx].content[Idx].url) {
					PageIdx = Idx;
					break;
				}
			}
		}
	}

	let Embed = undefined;

	if (PageIdx != -1) {
		let Page = Pages[GameIdx].content[PageIdx];

		/* An actual page and not an Information page. */
		if ("contributors" in Page) {
			Embed = new Discord.MessageEmbed()
				.setTitle("Sim2Research - " + Page.title)
				.setColor("#343840")
				.setURL(DefaultURL + "/" + Pages[GameIdx].game + "/" + Page.url)
				.setDescription(Page.desc)
				.addField("Contributors", Page.contributors)
				.addField("Version", Page.version);
		
		/* This is just an Information page and has no contributors and versions. */
		} else {
			Embed = new Discord.MessageEmbed()
				.setTitle("Sim2Research - " + Page.title)
				.setColor("#343840")
				.setURL(DefaultURL + Pages[GameIdx].game + "/" + Page.url)
				.setDescription(Page.desc);
		}

	/* If no proper page has been found, we'll just send the research index page. */
	} else if (GameIdx != -1 && Arr.length < 2) {
		Embed = new Discord.MessageEmbed()
			.setTitle("Sim2Research - Research Info")
			.setColor("#343840")
			.setURL(DefaultURL + "/" + Pages[GameIdx].game)
			.setDescription("Research Information for " + Pages[GameIdx].game + ".");

	/* Game is valid, however the Page index is not... soo say invalid URL Path. */
	} else if (GameIdx != -1 && Arr.length >= 2) {
		Embed = new Discord.MessageEmbed()
			.setTitle("Sim2Research - Invalid URL Path")
			.setColor("#343840")
			.setURL(DefaultURL + "/" + Pages[GameIdx].game)
			.setDescription("The provided URL Path does not exist.");
	}

	return Embed;
}


/* Module: Sim2Research. */
module.exports = {
	Names: ["Sim2Research", "S2Research"],
	Usage: "[game] [urlpath]",
	Description: "Links to some things from the Sim2Team wiki site Research Section. The URL Path needs to start by \"https://sim2team.github.io/wiki/research/game/\".",
	Handler(Message) {
		const Content = Message.Value.toLowerCase();

		if (Content.length < 1) {
			const Embed = new Discord.MessageEmbed()
				.setTitle("Sim2Research")
				.setColor("#343840")
				.setURL(DefaultURL)
				.setDescription("Please provide a game and a page.")
				.addField("Game Names", "bustinout, urbzgba, urbznds, sims2gba, sims2nds");
			Message.channel.send({ embeds: [ Embed ] });

		} else {
			const Embed = GenerateEmbed(Content);

			if (Embed != undefined) Message.channel.send({ embeds: [ Embed ] });
			else {
				const InvalidEmbed = new Discord.MessageEmbed()
					.setTitle("Sim2Research - Invalid game")
					.setColor("#343840")
					.setURL(DefaultURL)
					.setDescription("Please provide a valid game.")
					.addField("Valid Game Names", "bustinout, urbzgba, urbznds, sims2gba, sims2nds");
				Message.channel.send({ embeds: [ InvalidEmbed ] });
			}
		}
	}
}
