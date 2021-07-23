/*
	Optimum Alfred's Cast List Handler implementation.

	Shows various informations about a specified Cast.
*/

const Discord = require("discord.js");

const CastMembers = [
	{
		en: "Emperor Xizzle",
		de: "Imperator Xizzle",
		id: 0x0
	},
	{
		en: "Burple",
		de: "Burpel",
		id: 0x1
	},
	{
		en: "Ara Fusilli",
		de: "Ara Fusilli",
		id: 0x2
	},

	{
		en: "Auda Sherif",
		de: "Kulio Raubein",
		id: 0x3
	},
	{
		en: "Ava Cadavra",
		de: "Avra Kadavra",
		id: 0x4
	},
	{
		en: "Bigfoot",
		de: "Bigfoot",
		id: 0x5
	},

	{
		en: "Frankie Fusilli",
		de: "Frankie Fusilli",
		id: 0x6
	},
	{
		en: "Dusty Hogg",
		de: "Eber-Eddie",
		id: 0x7
	},
	{
		en: "Giuseppi Mezzoalto",
		de: "Bruno Mezzoalto",
		id: 0x8
	},

	{
		en: "Honest Jackson",
		de: "Heinz Ehrlicher",
		id: 0x9
	},
	{
		en: "Jebediah Jerky",
		de: "Siegfried Gülle",
		id: 0xA
	},
	{
		en: "Jimmy the Neck",
		de: "Stiernacken-Jimmy",
		id: 0xB
	},

	{
		en: "Kayleigh Wintercrest",
		de: "Katie Wintergipfel",
		id: 0xC
	},
	{
		en: "Luthor G. Bigbucks",
		de: "Lutz L. Roßeklappe",
		id: 0xD
	},
	{
		en: "Mamma Hogg",
		de: "Mama Eber",
		id: 0xE
	},

	{
		en: "Misty Waters",
		de: "Wilma Welle",
		id: 0xF
	},
	{
		en: "Lord Mole",
		de: "Maulwurfkönig",
		id: 0x10
	},
	{
		en: "Mummy",
		de: "Mumie",
		id: 0x11
	},

	{
		en: "Optimum Alfred",
		de: "Alfred Optimus",
		id: 0x12
	},
	{
		en: "Penelope Redd",
		de: "Penelope Rot",
		id: 0x13
	},
	{
		en: "Pepper Pete",
		de: "Pfeffer-Paule",
		id: 0x14
	},

	{
		en: "Kent Hackett",
		de: "Heini Stiesel",
		id: 0x15
	},
	{
		en: "Sancho Paco Panza",
		de: "Simon Paco Pancho",
		id: 0x16
	},
	{
		en: "Tank Grunt",
		de: "Eugen Panza",
		id: 0x17
	},

	{
		en: "Tristan Legend",
		de: "Tristan Legende",
		id: 0x18
	},
	{
		"en": "Yeti",
		"de": "Yeti",
		id: 0x19
	}
];


/* Module: Cast List. */
module.exports = {
	Names: ["CastList"],
	Usage: "[command]",
	Description: "Displays information about the Casts from The Sims 2 Game Boy Advance and Nintendo DS.",
	Handler(Message) {
		const Name = Message.Value;
		
		/* Send cast list, if no name provided. */
		if (Name.length < 1) Message.channel.send("You can find a list of all casts here: <InsertLinkWhenDone>.");
		else {
			let Id = parseInt(Name);
			let CastMember;

			if (isNaN(Id)) {
				let nameLower = Name.toLowerCase();
				CastMember = CastMembers.filter(r => r.en.toLowerCase().includes(nameLower) || r.de.toLowerCase().includes(nameLower))?.[0];
			} else {
				CastMember = CastMembers.filter(r => r.id == Id)?.[0];
			}
			
			if (CastMember) {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Cast: " + CastMember.en)
					.setColor("#343840")
					.setDescription("Cast Information for " + CastMember.en)
					.addField("ID", CastMember.id)
					.addField("English", CastMember.en, true)
					.addField("German", CastMember.de, true);
			
				Message.channel.send(Embed);
			} else {
				Message.channel.send("The cast name you provided doesn't exist!");
			}
		}
	}
};