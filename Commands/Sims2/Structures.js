/*
	Optimum Alfred's The Sims 2 Game Boy Advance / Nintendo DS Structures links Handler implementation.

	Links to some structure related things of the Sims2Research Repository.
*/

const Discord = require("discord.js");

const DefaultURL = "https://github.com/SuperSaiyajinStackZ/Sims2Research/blob/main/Structures/";

const Categories = [
	{
		"Category": "GBA-Cast",
		"URL": "GBA/Cast.cpp",
		"Description": "Click on the Title above to be redirected to a C++ basic Game Boy Advance Cast Member Structure."
	},
	{
		"Category": "GBA-ItemPackage",
		"URL": "GBA/ItemPackage.cpp",
		"Description": "Click on the Title above to be redirected to a C++ basic Game Boy Advance Item Package Structure."
	},
	{
		"Category": "NDS-Painting",
		"URL": "NDS/Painting.cpp",
		"Description": "Click on the Title above to be redirected to a C++ basic Nintendo DS Painting Structure."
	}
];


/* Module: Structures. */
module.exports = {
	Names: ["Structures"],
	Usage: "[command]",
	Description: "Links to some structure related things of the Sims2Research Repository.",
	Handler(Message) {
		const _Category = Message.Value; // Save the argument to a variable for more efficiency.
		
		if (_Category.length < 1) {
			const Embed = new Discord.MessageEmbed()
				.setTitle("Structures - You haven't provided a category!")
				.setColor("#343840")
				.setDescription("You haven't provided a category. Here is a list of all available categories you can search.")
				.addField("Category List", Categories.map(r => r.Category).join("\n"));

			Message.channel.send({ embeds: [ Embed ] });

		} else {
			let nameLower = _Category.toLowerCase();
			let ResearchCategory = Categories.filter(r => r.Category.toLowerCase().includes(nameLower))?.[0];

			if (ResearchCategory) {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Structures - " + ResearchCategory.Category)
					.setURL(DefaultURL + ResearchCategory.URL)
					.setColor("#447273")
					.setDescription(ResearchCategory.Description);
			
				Message.channel.send({ embeds: [ Embed ] });

			} else {
				Message.channel.send("That Category does not exist.");
			}
		}
	}
};