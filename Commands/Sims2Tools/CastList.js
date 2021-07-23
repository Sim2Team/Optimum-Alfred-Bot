/*
	Optimum Alfred's Cast List Handler implementation.

	Shows various informations about a specified Cast.
*/

const Discord = require("discord.js");

const CastMembers = [
	{
		en: "Emperor Xizzle",
		de: "Imperator Xizzle",
		fr: "Empereur Xizzle",
		es: "Emperador Xizzle",
		it: "Imperatore Xizzle",
		nl: "Keizer Xizzle",
		id: 0x0,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/0.png"
	},
	{
		en: "Burple",
		de: "Burpel",
		fr: "Gargl",
		es: "Alienígena",
		it: "Alieno",
		nl: "Buitenaards wezen",
		id: 0x1,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/1.png"
	},
	{
		en: "Ara Fusilli",
		de: "Ara Fusilli",
		fr: "Ara Fusilli",
		es: "Ara Fusilli",
		it: "Agnese Fusilli",
		nl: "Natalia Fusilli",
		id: 0x2,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/2.png"
	},

	{
		en: "Auda Sherif",
		de: "Kulio Raubein",
		fr: "Clint Shérif",
		es: "Auda Sherif",
		it: "Omar Sherif",
		nl: "Omar Amoer",
		id: 0x3,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/3.png"
	},
	{
		en: "Ava Cadavra",
		de: "Avra Kadavra",
		fr: "Ava Cadavra",
		es: "Ava Cadavra",
		it: "Ava Cadavra",
		nl: "Selina Kadaveri",
		id: 0x4,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/4.png"
	},
	{
		en: "Bigfoot",
		de: "Bigfoot",
		fr: "Bigfoot",
		es: "Piegrande",
		it: "Piedone",
		nl: "Grootpoot",
		id: 0x5,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/5.png"
	},

	{
		en: "Frankie Fusilli",
		de: "Frankie Fusilli",
		fr: "Frankie Fusilli",
		es: "Frankie Fusilli",
		it: "Frankie Fusilli",
		nl: "Don Fusilli",
		id: 0x6,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/6.png"
	},
	{
		en: "Dusty Hogg",
		de: "Eber-Eddie",
		fr: "Rocky O'Roar",
		es: "Jonny Melavo",
		it: "Guido Lamoto",
		nl: "Boris Spijker",
		id: 0x7,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/7.png"
	},
	{
		en: "Giuseppi Mezzoalto",
		de: "Bruno Mezzoalto",
		fr: "Manuel Travos",
		es: "Giuseppi Ruedi",
		it: "Giuseppe Mezzo",
		nl: "Henk Schimmig",
		id: 0x8,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/8.png"
	},

	{
		en: "Honest Jackson",
		de: "Heinz Ehrlicher",
		fr: "Paulo Norable",
		es: "Manu el Honesto",
		it: "Michele Leale",
		nl: "Ernst Eerlijk",
		id: 0x9,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/9.png"
	},
	{
		en: "Jebediah Jerky",
		de: "Siegfried Gülle",
		fr: "Marius Bouseux",
		es: "Jebediah Cecina",
		it: "Giobbe Rosse",
		nl: "Harm Boersma",
		id: 0xA,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/10.png"
	},
	{
		en: "Jimmy the Neck",
		de: "Stiernacken-Jimmy",
		fr: "Jimmy 'les gros bras'",
		es: "Jaimito el Cuellos",
		it: "Pino 'In' Gamba",
		nl: "Sjimmie Speknek",
		id: 0xB,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/11.png"
	},

	{
		en: "Kayleigh Wintercrest",
		de: "Katie Wintergipfel",
		fr: "Katia Sionnel",
		es: "Quelin Bernal",
		it: "Deborah Fascino",
		nl: "Kim Winterhart",
		id: 0xC,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/12.png"
	},
	{
		en: "Luthor G. Bigbucks",
		de: "Lutz L. Roßeklappe",
		fr: "Léo Péhas",
		es: "Lútor Millonetis",
		it: "Luthor Soldoni",
		nl: "Daan D. Duit",
		id: 0xD,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/13.png"
	},
	{
		en: "Mamma Hogg",
		de: "Mama Eber",
		fr: "Mama O'Roar",
		es: "Mamá Melavo",
		it: "Mamma Lamoto",
		nl: "Ma Spijker",
		id: 0xE,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/14.png"
	},

	{
		en: "Misty Waters",
		de: "Wilma Welle",
		fr: "Barbara Scooley",
		es: "Nieves Pesas",
		it: "Marina Mari",
		nl: "Nina Natter",
		id: 0xF,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/15.png"
	},
	{
		en: "Lord Mole",
		de: "Maulwurfkönig",
		fr: "Roi des taupes",
		es: "Rey de los topos",
		it: "Mole King",
		nl: "Mollenheer",
		id: 0x10,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/16.png"
	},
	{
		en: "Mummy",
		de: "Mumie",
		fr: "Momie",
		es: "Mummy",
		it: "Mummy",
		nl: "Horus",
		id: 0x11,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/17.png"
	},

	{
		en: "Optimum Alfred",
		de: "Alfred Optimus",
		fr: "Super Alfred",
		es: "Alfred Óptimo",
		it: "Alfredo Factotum",
		nl: "Fred Optimum",
		id: 0x12,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/18.png"
	},
	{
		en: "Penelope Redd",
		de: "Penelope Rot",
		fr: "Steph Biaye",
		es: "Penélope Rojj",
		it: "Dana Holmes",
		nl: "Pien Speuring",
		id: 0x13,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/19.png"
	},
	{
		en: "Pepper Pete",
		de: "Pfeffer-Paule",
		fr: "Felipe Spadon",
		es: "Pepe Pimienta",
		it: "Salty Peter",
		nl: "Pittige Peter",
		id: 0x14,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/20.png"
	},

	{
		en: "Kent Hackett",
		de: "Heini Stiesel",
		fr: "Rock Louzer",
		es: "Rock Ola",
		it: "Pietro Nuti",
		nl: "Ben Baksteen",
		id: 0x15,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/21.png"
	},
	{
		en: "Sancho Paco Panza",
		de: "Simon Paco Pancho",
		fr: "Sancho Panda",
		es: "Sancho Paco Panza",
		it: "Sancho Paco Panza",
		nl: "Sancho Kwispello",
		id: 0x16,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/22.png"
	},
	{
		en: "Tank Grunt",
		de: "Eugen Panza",
		fr: "Tank Troufion",
		es: "Tanque Reclutas",
		it: "Bruno Grugni",
		nl: "Tank Grom",
		id: 0x17,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/23.png"
	},

	{
		en: "Tristan Legend",
		de: "Tristan Legende",
		fr: "Tristan Mithik",
		es: "Tristán Cuentochino",
		it: "Vito il Mito",
		nl: "Tristan Legende",
		id: 0x18,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/24.png"
	},
	{
		en: "Yeti",
		de: "Yeti",
		fr: "Yéti",
		es: "Yeti",
		it: "Yeti",
		nl: "Jettie",
		id: 0x19,
		image: "https://wiki.universal-team.net/assets/images/s2-research/cast/25.png"
	}
];


/* Module: Cast List. */
module.exports = {
	Names: ["CastList"],
	Usage: "[command]",
	Description: "Displays information about the Casts from The Sims 2 Game Boy Advance and Nintendo DS. You can search by the English, German, French, Spanish, Italian and Dutch names, but also from their ID's in hexadecimal and decimal. If no cast provided, it displays a list of all casts.",
	Handler(Message) {
		const Name = Message.Value;
		
		/* Send cast list, if no name provided. */
		if (Name.length < 1) Message.channel.send("You can find a list of all casts here: <InsertLinkWhenDone>.");
		else {
			let Id = parseInt(Name);
			let CastMember;

			if (isNaN(Id)) {
				let nameLower = Name.toLowerCase();
				CastMember = CastMembers.filter(r => r.en.toLowerCase().includes(nameLower)
						|| r.de.toLowerCase().includes(nameLower)
						|| r.fr.toLowerCase().includes(nameLower)
						|| r.es.toLowerCase().includes(nameLower)
						|| r.it.toLowerCase().includes(nameLower)
						|| r.nl.toLowerCase().includes(nameLower))?.[0];
			} else {
				CastMember = CastMembers.filter(r => r.id == Id)?.[0];
			}
			
			if (CastMember) {
				const Embed = new Discord.MessageEmbed()
					.setTitle("Cast: " + CastMember.en)
					.setColor("#343840")
					.setThumbnail(CastMember.image)
					.setDescription("Cast Information for " + CastMember.en)
					.addField("ID", CastMember.id)
					.addField("English", CastMember.en, true)
					.addField("German", CastMember.de, true)
					.addField("French", CastMember.fr, true)
					.addField("Spanish", CastMember.es, true)
					.addField("Italian", CastMember.it, true)
					.addField("Dutch", CastMember.nl, true);
			
				Message.channel.send(Embed);
			} else {
				Message.channel.send("The cast name you provided doesn't exist!");
			}
		}
	}
};