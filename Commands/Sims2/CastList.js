/*
	Optimum Alfred's Cast List Handler implementation.

	Shows various informations about a specified Cast.
*/

const Discord = require("discord.js");
const CastMembers = require("../../resources/json/castlist.json");


/* Module: S2CastList. */
module.exports = {
	Names: ["S2CastList", "S2CastMember"],
	Usage: "[command]",
	Description: "Displays information about the cast members from The Sims 2 Game Boy Advance and Nintendo DS. You can search by the English, German, French, Spanish, Italian and Dutch names, but also from their ID's in hexadecimal and decimal. If no cast member provided, it displays a list of all cast members. You can also use \"-r\" as the command to choose a random cast member.",
	Handler(Message) {
		const Name = Message.Value.toLowerCase();
		
		/* Send an embed with all english cast names listed, if no name provided. */
		if (Name.length < 1) {
			const Embed = new Discord.MessageEmbed()
				.setTitle("Sims 2 Cast List - You haven't provided a name!")
				.setColor("#343840")
				.setDescription("You haven't provided a name. Here is a list of all available cast members you can search.")
				.addField("Cast Member List", CastMembers.map(r => r.en).join("\n"));
			Message.channel.send({ embeds: [ Embed ] });

		} else {
			let CastMember;

			/* Select a cast randomly. */
			if (Name == "-r" || Name == "-random") CastMember = CastMembers[Math.floor(Math.random() * 26)];
			/* Here with the cast search. */
			else {
				let ID = parseInt(Name);

				/* The provided thing is not an ID, so search by all language names. */
				if (isNaN(ID)) {
					CastMember = CastMembers.filter(r => r.en.toLowerCase().includes(Name)
							|| r.de.toLowerCase().includes(Name)
							|| r.fr.toLowerCase().includes(Name)
							|| r.es.toLowerCase().includes(Name)
							|| r.it.toLowerCase().includes(Name)
							|| r.nl.toLowerCase().includes(Name)
							|| r.emoji.toLowerCase().includes(Name))?.[0];

				} else {
					CastMember = CastMembers.filter(r => r.id == ID)?.[0];
				}
			}
			
			if (CastMember) {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Cast Member: " + CastMember.en)
					.setColor("#343840")
					.setThumbnail(CastMember.image)
					.setDescription("Cast Member Information for " + CastMember.en + " " + CastMember.emoji)
					.addField("ID", CastMember.id.toString())
					.addField("English", CastMember.en, true)
					.addField("Dutch", CastMember.nl, true)
					.addField("French", CastMember.fr, true)
					.addField("German", CastMember.de, true)
					.addField("Italian", CastMember.it, true)
					.addField("Spanish", CastMember.es, true)
					.addField("Biography (GBA)", CastMember.gbabio, true)
					.addField("Biography (NDS)", CastMember.ndsbio, true)
					.addField("Secret (GBA)", CastMember.gbasecret, true);
				Message.channel.send({ embeds: [ Embed ] });
				
			} else {
				Message.channel.send("The cast member you provided doesn't exist!\nType \".S2CastList\" or \".S2CastMember\" without a command to get a list of all cast members.");
			}
		}
	}
}
