/*
	Optimum Alfred's The Sims 2 Game Boy Advance / Nintendo DS Research links Handler implementation.

	Links to some research related things of the Sim2Research Repository.
*/

const Discord = require("discord.js");

const DefaultURL = "https://github.com/SuperSaiyajinStackZ/Sim2Research/blob/main/Research/";

const Categories = [
	{
		"Category": "GBA Cast",
		"URL": "GBA/Cast.md",
		"Description": "Click on the Title above to be redirected to some more details about The Sims 2 Game Boy Advance - Cast Members.",
		"Image": "https://raw.githubusercontent.com/SuperSaiyajinStackZ/Optimum-Alfred-Bot/main/resources/Sims2/Research/GBACast.png"
	},
	{
		"Category": "GBA Episode",
		"URL": "GBA/Episode.md",
		"Description": "Click on the Title above to be redirected to some more details about The Sims 2 Game Boy Advance - Episodes.",
		"Image": "https://raw.githubusercontent.com/SuperSaiyajinStackZ/Optimum-Alfred-Bot/main/resources/Sims2/Research/GBAEpisode.png"
	},
	{
		"Category": "GBA Item",
		"URL": "GBA/Item.md",
		"Description": "Click on the Title above to be redirected to an Item ID list, Item flags and the use counts for The Sims 2 Game Boy Advance.",
		"Image": "https://raw.githubusercontent.com/SuperSaiyajinStackZ/Optimum-Alfred-Bot/main/resources/Sims2/Research/GBAItem.png"
	},
	{
		"Category": "GBA HouseItem",
		"URL": "GBA/HouseItem.md",
		"Description": "Click on the Title above to be redirected to some more details about The Sims 2 Game Boy Advance - House Items.",
		"Image": "https://raw.githubusercontent.com/SuperSaiyajinStackZ/Optimum-Alfred-Bot/main/resources/Sims2/Research/GBAHouseItem.png"
	},
	{
		"Category": "GBA Item Package",
		"URL": "GBA/ItemPackage.md",
		"Description": "Click on the Title above to be redirected to some more details about The Sims 2 Game Boy Advance - Item Packages.",
		"Image": "https://raw.githubusercontent.com/SuperSaiyajinStackZ/Optimum-Alfred-Bot/main/resources/Sims2/Research/GBAItem.png"
	},
	{
		"Category": "GBA Social Move",
		"URL": "GBA/SocialMove.md",
		"Description": "Click on the Title above to be redirected to some more details about The Sims 2 Game Boy Advance - Social Moves.",
		"Image": "https://raw.githubusercontent.com/SuperSaiyajinStackZ/Optimum-Alfred-Bot/main/resources/Sims2/Research/GBASocialMove.png"
	},
	{
		"Category": "NDS Painting",
		"URL": "NDS/Painting.md",
		"Description": "Click on the Title above to be redirected to some more details about The Sims 2 Nintendo DS - Paintings.",
		"Image": "https://raw.githubusercontent.com/SuperSaiyajinStackZ/Optimum-Alfred-Bot/main/resources/Sims2/Research/NDSPainting.png"
	}
];


/* Module: Research. */
module.exports = {
	Names: ["Research"],
	Usage: "[command]",
	Description: "Links to some research related things of the Sim2Research Repository.",
	Handler(Message) {
		const _Category = Message.Value; // Save the argument to a variable for more efficiency.
		
		if (_Category.length < 1) {
			const Embed = new Discord.MessageEmbed()
				.setTitle("Research - You haven't provided a category!")
				.setColor("#343840")
				.setDescription("You haven't provided a category. Here is a list of all available categories you can search.")
				.addField("Category List", Categories.map(r => r.Category).join("\n"));

			Message.channel.send({ embeds: [ Embed ] });

		} else {
			let nameLower = _Category.toLowerCase();
			let ResearchCategory = Categories.filter(r => r.Category.toLowerCase().includes(nameLower))?.[0];

			if (ResearchCategory) {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Research - " + ResearchCategory.Category)
					.setColor("#447273")
					.setThumbnail(ResearchCategory.Image)
					.setURL(DefaultURL + ResearchCategory.URL)
					.setDescription(ResearchCategory.Description);
			
				Message.channel.send({ embeds: [ Embed ] });
				
			} else {
				Message.channel.send("That Category does not exist.");
			}
		}
	}
};