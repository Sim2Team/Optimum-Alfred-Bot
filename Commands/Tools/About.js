/*
	Optimum Alfred's About Handler implementation.

	Shows some information about the bot.
*/

const Discord = require("discord.js");

/* Module: About. */
module.exports = {
	Names: ["About"],
	Description: "Shows some information about the bot.",
	Handler(Message) {
		const Embed = new Discord.MessageEmbed()
			.setTitle("About")
			.setColor("#343840")
			.setThumbnail("https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/18.png")
			.setDescription("About Optimum-Alfred-Bot")
			.addField("Source Code", "[Optimum Alfred Source Code](https://github.com/Sim2Team/Optimum-Alfred-Bot)", true)
			.addField("Website", "[Sim2Team Website](https://sim2team.github.io/)", true)
			.addField("Developers", "<@644449298087411732>\n<@327757456673472523>", true)
			.addField("Language", "Optimum Alfred Bot is written in Node.js / Discord.js.", true);

		Message.channel.send({ embeds: [ Embed ] });
	}
};