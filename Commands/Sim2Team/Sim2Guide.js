/*
	Optimum Alfred's Sim2Team Wiki's Guides Section command handler.

	Links to some things from the Sim2Team wiki site Guides Section.
*/

const Discord = require("discord.js");
const DefaultURL = "https://sim2team.github.io/wiki/guides";
const Pages = require("../../resources/json/sim2guide.json");


/* Module: Sim2Guide. */
module.exports = {
	Names: ["Sim2Guide", "S2Guide"],
	Usage: "[Guide]",
	Description: "Links to some things from the Sim2Team wiki site Guides Section.",
	Handler(Message) {
		const Content = Message.Value.toLowerCase();
		
		if (Content.length < 1) {
			const Embed = new Discord.MessageEmbed()
				.setTitle("Sim2Guide")
				.setColor("#343840")
				.setURL(DefaultURL)
				.setDescription("You did not provide a guide!");
			Message.channel.send({ embeds: [ Embed ] });

		} else {
			let Guide = Pages.filter(r => r.url.includes(Content)
				|| r.title.toLowerCase().includes(Content))?.[0];

			if (Guide) {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Sim2Guide - " + Guide.title)
					.setColor("#447273")
					.setURL(DefaultURL + "/" + Guide.url)
					.setDescription(Guide.desc);
				Message.channel.send({ embeds: [ Embed ] });
				
			} else {
				Message.channel.send("This Guide does not exist.");
			}
		}
	}
}
