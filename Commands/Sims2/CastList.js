/*
	Optimum Alfred's Cast List Handler implementation.

	Shows various informations about a specified Cast.
*/

const Discord = require("discord.js");

const CastMembers = [
	/* Cast Page 1 / 9. */
	{
		en: "Emperor Xizzle",
		de: "Imperator Xizzle",
		fr: "Empereur Xizzle",
		es: "Emperador Xizzle",
		it: "Imperatore Xizzle",
		nl: "Keizer Xizzle",
		id: 0x0,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/0.png",
		gbabio: "BEHOLD! Alien Emperor Xizzle the Feared! The Reviled! The Loathed! The Canny! The Misunderstood! The UNINTELLIGIBLE.",
		ndsbio: "BEHOLD! Alien Emperor Xizzle the Feared! The Reviled! The UNINTELLIGABLE.",
		gbasecret: "Believes that laughter is the sound humans make when frightened.",
		emoji: "<:emperorxizzle:870964980491644958>"
	},
	{
		en: "Burple",
		de: "Burpel",
		fr: "Gargl",
		es: "Alienígena",
		it: "Alieno",
		nl: "Buitenaards wezen",
		id: 0x1,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/1.png",
		gbabio: "A bitter little off-worlder. Burple is one hot-tempered extra-terrestrial. Fortunately, he's very easy to understand.",
		ndsbio: "Biography doesn't exist.", // Doesn't exist as a cast in the NDS version.
		gbasecret: "Has excellent grammar due to a rare alien speech impediment.",
		emoji: "<:burple:870965024716369921>"
	},
	{
		en: "Ara Fusilli",
		de: "Ara Fusilli",
		fr: "Ara Fusilli",
		es: "Ara Fusilli",
		it: "Agnese Fusilli",
		nl: "Natalia Fusilli",
		id: 0x2,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/2.png",
		gbabio: "Ara is the extraordinarily smart, undeniably sassy, and terminally bored daughter of local gangster Frankie Fusilli.",
		ndsbio: "Ara is the smart, sassy, and terminally bored daughter of Frankie Fusilli.",
		gbasecret: "Always knows which way is North.",
		emoji: "<:arafusilli:870965059285831682>"
	},

	/* Cast Page 2 / 9. */
	{
		en: "Auda Sherif",
		de: "Kulio Raubein",
		fr: "Clint Shérif",
		es: "Auda Sherif",
		it: "Omar Sherif",
		nl: "Omar Amoer",
		id: 0x3,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/3.png",
		gbabio: "The world of big-budget, action-packed, spectacle films can be divided into two phases: Pre-Auda and Post-Auda. He put the \"Oo!\" in boom!",
		ndsbio: "This big-budget action film star put the 'Oo!' in boom!",
		gbasecret: "Has degrees in Astrophysics and Gravimetrics; doesn't remember a thing.",
		emoji: "<:audasherif:870965094035640351>"
	},
	{
		en: "Ava Cadavra",
		de: "Avra Kadavra",
		fr: "Ava Cadavra",
		es: "Ava Cadavra",
		it: "Ava Cadavra",
		nl: "Selina Kadaveri",
		id: 0x4,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/4.png",
		gbabio: "Ex-drummer for the cult band The Germinators. Ava Cadavra has shifted gears and spends most of her time tending and talking to plants in her greenhouse.",
		ndsbio: "Ex-drummer for the band The Germinators, Ava now spends most of her time brooding.",
		gbasecret: "Used to be a ballerina.",
		emoji: "<:avacadavra:870965230656704522>"
	},
	{
		en: "Bigfoot",
		de: "Bigfoot",
		fr: "Bigfoot",
		es: "Piegrande",
		it: "Piedone",
		nl: "Grootpoot",
		id: 0x5,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/5.png",
		gbabio: "For decades, people assumed Bigfoot was a mere creature of rumor and imagination. Now that they know he's real, they don't pay much attention to him.",
		ndsbio: "For decades people assumed Bigfoot was a mere creature of rumor and imagination.",
		gbasecret: "Would prefer to go by the name Stu, but no one seems to care.",
		emoji: "<:bigfoot:870965273094684742>"
	},

	/* Cast Page 3 / 9. */
	{
		en: "Frankie Fusilli",
		de: "Frankie Fusilli",
		fr: "Frankie Fusilli",
		es: "Frankie Fusilli",
		it: "Frankie Fusilli",
		nl: "Don Fusilli",
		id: 0x6,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/6.png",
		gbabio: "Frankie Fusilli runs this town, understand? Don't cross him or you'll be rubbed out. Eventually. It may take fifty or sixty years, but it'll happen. Get it?",
		ndsbio: "Frankie Fusilli runs this town, understand? Don't cross him or you'll be rubbed out.",
		gbasecret: "Prefers Thai food to Italian.",
		emoji: "<:frankiefusilli:870965306103840798>"
	},
	{
		en: "Dusty Hogg",
		de: "Eber-Eddie",
		fr: "Rocky O'Roar",
		es: "Jonny Melavo",
		it: "Guido Lamoto",
		nl: "Boris Spijker",
		id: 0x7,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/7.png",
		gbabio: "Dusty has a mean streak much longer than his patience, but if you can prove you're tough, he just might like you.",
		ndsbio: "Dusty has a mean streak much longer than his patience.",
		gbasecret: "Believes the fewer wheels on the vehicle, the bigger the man; wants to unicycle.",
		emoji: "<:dustyhogg:870965336713854996>"
	},
	{
		en: "Giuseppi Mezzoalto",
		de: "Bruno Mezzoalto",
		fr: "Manuel Travos",
		es: "Giuseppi Ruedi",
		it: "Giuseppe Mezzo",
		nl: "Henk Schimmig",
		id: 0x8,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/8.png",
		gbabio: "Since moving here from SimValley, Giuseppi has ditched his black-market dealings. Now he's just a shady guy.",
		ndsbio: "Since moving here from SimValley, Giuseppi has gone from criminal to \"shady guy\".",
		gbasecret: "Was replaced by a robot in the last game.",
		emoji: "<:giuseppimezzoalto:870965367542022174>"
	},

	/* Cast Page 4 / 9. */
	{
		en: "Honest Jackson",
		de: "Heinz Ehrlicher",
		fr: "Paulo Norable",
		es: "Manu el Honesto",
		it: "Michele Leale",
		nl: "Ernst Eerlijk",
		id: 0x9,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/9.png",
		gbabio: "Honest Jackson rose to political prominence after beating Andy Scandal in the race for mayor. Now he's working hard to shape the city.",
		ndsbio: "Mayor Jackson rose to prominence after beating Andy Scandal in the race for mayor.",
		gbasecret: "Has an idea for a 16 volume romance novel set in ancient Egypt (and has written 7 pages).",
		emoji: "<:honestjackson:870965427319230485>"
	},
	{
		en: "Jebediah Jerky",
		de: "Siegfried Gülle",
		fr: "Marius Bouseux",
		es: "Jebediah Cecina",
		it: "Giobbe Rosse",
		nl: "Harm Boersma",
		id: 0xA,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/10.png",
		gbabio: "Jebediah has lived in Strangetown longer than the place has had a name. He's trying to keep his farm alive, but to tell the truth, he can't remember what he used to grow.",
		ndsbio: "Jeb wants to revive his old farm, but he can't remember what he used to grow.",
		gbasecret: "Is a real-estate tycoon with several homes in other countries.",
		emoji: "<:jebediahjerky:870965477319532575>"
	},
	{
		en: "Jimmy the Neck",
		de: "Stiernacken-Jimmy",
		fr: "Jimmy \"les gros bras\"",
		es: "Jaimito el Cuellos",
		it: "Pino \"In\" Gamba",
		nl: "Sjimmie Speknek",
		id: 0xB,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/11.png",
		gbabio: "Jimmy, \"The\" Neck is a lunk with a heart of lead. He's nice and dumb and gets along well with children. But if you cross him, he'll probably consider fighting back.",
		ndsbio: "Biography doesn't exist.", // Doesn't exist as a cast in the NDS version.
		gbasecret: "Teaches jazz and ragtime piano to children in his spare time.",
		emoji: "<:jimmytheneck:870965548320718878>"
	},

	/* Cast Page 5 / 9. */
	{
		en: "Kayleigh Wintercrest",
		de: "Katie Wintergipfel",
		fr: "Katia Sionnel",
		es: "Quelin Bernal",
		it: "Deborah Fascino",
		nl: "Kim Winterhart",
		id: 0xC,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/12.png",
		gbabio: "Intelligent, enigmatic, egotistical, irresistible... many have tried to woo this brilliant nuclear scientist. All have failed.",
		ndsbio: "Intelligent and enigmatic... many have tried to woo this brilliant scientist. All have failed.",
		gbasecret: "Only has four toes on her right foot as a result of a karate accident.",
		emoji: "<:kayleighwintercrest:870965583351545866>"
	},
	{
		en: "Luthor L. Bigbucks",
		de: "Lutz G. Roßeklappe",
		fr: "Léo Péhas",
		es: "Lútor Millonetis",
		it: "Luthor Soldoni",
		nl: "Daan D. Duit",
		id: 0xD,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/13.png",
		gbabio: "Luthor is the handsome, talented, and arrogant son of Daddy Bigbucks. Easy to hate, but impossible to ignore.",
		ndsbio: "Luthor is the handsome, arrogant son of Mr. Bigbucks. Easy to hate, but impossible to ignore.",
		gbasecret: "Was actually kicked out of his father's house for being frugal with his money.",
		emoji: "<:luthorlbigbucks:870965679447244800>"
	},
	{
		en: "Mamma Hogg",
		de: "Mama Eber",
		fr: "Mama O'Roar",
		es: "Mamá Melavo",
		it: "Mamma Lamoto",
		nl: "Ma Spijker",
		id: 0xE,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/14.png",
		gbabio: "The only woman tough enough to keep Dusty in line - his mother.",
		ndsbio: "The only woman tough enough to keep Dusty in line - his mother.",
		gbasecret: "Has her hot-curlers plugged into a mini-fusion reactor at home.",
		emoji: "<:mammahogg:870965770346180608>"
	},

	/* Cast Page 6 / 9. */
	{
		en: "Misty Waters",
		de: "Wilma Welle",
		fr: "Barbara Scooley",
		es: "Nieves Pesas",
		it: "Marina Mari",
		nl: "Nina Natter",
		id: 0xF,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/15.png",
		gbabio: "One-time lifeguard turned fitness guru, Misty is in Strangetown to live large and scout location for her new business",
		ndsbio: "Lifeguard turned successful fitness guru, Misty is in Strangetown to live large.",
		gbasecret: "Has an evil - or let's say devious - twin named Murky.",
		emoji: "<:mistywaters:870965813086142505>"
	},
	{
		en: "Lord Mole",
		de: "Maulwurfkönig",
		fr: "Roi des taupes",
		es: "Rey de los topos",
		it: "Mole King",
		nl: "Mollenheer",
		id: 0x10,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/16.png",
		gbabio: "Self-proclaimed ruler of subterranean race of mole people. Lord Mole is a feisty man with utopian dreams.",
		ndsbio: "Ruler of a subterranean race of mole people, he is a feisty lad with utopian dreams.",
		gbasecret: "Is afraid of the dark.",
		emoji: "<:lordmole:870965846346960916>"
	},
	{
		en: "Mummy",
		de: "Mumie",
		fr: "Momie",
		es: "Mummy",
		it: "Mummy",
		nl: "Horus",
		id: 0x11,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/17.png",
		gbabio: "Horus Menhoset the ninth, son of Horus Hipsomet the fourth, grandson of Horus Kliptosap the eighteenth, great-grandson of Horus Palimpsest the Plinth.",
		ndsbio: "He is the son of Horus Hipsomet the 4th, grandson of Horus Palimpsest the Plinth.",
		gbasecret: "Has established a profitable online gift-wrapping service.",
		emoji: "<:mummy:870965902500323349>"
	},

	/* Cast Page 7 / 9. */
	{
		en: "Optimum Alfred",
		de: "Alfred Optimus",
		fr: "Super Alfred",
		es: "Alfred Óptimo",
		it: "Alfredo Factotum",
		nl: "Fred Optimum",
		id: 0x12,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/18.png",
		gbabio: "A robot mechanic whose A.I. proved so sophisticated he was able to secure a loon from a bank and open his own business.",
		ndsbio: "A robot whose A.I. proved so sophisticated he was nearly elected governor.",
		gbasecret: "Actually loathes working on machines. He wants to be a biologist.",
		emoji: "<:optimumalfred:870965927062163457>"
	},
	{
		en: "Penelope Redd",
		de: "Penelope Rot",
		fr: "Steph Biaye",
		es: "Penélope Rojj",
		it: "Dana Holmes",
		nl: "Pien Speuring",
		id: 0x13,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/19.png",
		gbabio: "Penelope is a cool and calculating woman on a mission. She was sent here by the FBI to investigate a matter of urgent importance.",
		ndsbio: "Penelope was sent here by the FBI to investigate a matter of urgent import.",
		gbasecret: "Her boss at the FBI hasn't actually told her why she is in Strangetown.",
		emoji: "<:peneloperedd:870965967126134794>"
	},
	{
		en: "Pepper Pete",
		de: "Pfeffer-Paule",
		fr: "Felipe Spadon",
		es: "Pepe Pimienta",
		it: "Salty Peter",
		nl: "Pittige Peter",
		id: 0x14,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/20.png",
		gbabio: "Pepper Pete, swashbuckling brother of Salty Sam, is temporarily land-locked in Strangetown and in search of a few good oarsmen.",
		ndsbio: "Pete is in Strangetown searching for a few good oarsmen to join him on a fool's errand.",
		gbasecret: "Hates the taste of pepper; prefers garlic.",
		emoji: "<:pepperpete:870966016321138759>"
	},

	/* Cast Page 8 / 9. */
	{
		en: "Kent Hackett",
		de: "Heini Stiesel",
		fr: "Rock Louzer",
		es: "Rock Ola",
		it: "Pietro Nuti",
		nl: "Ben Baksteen",
		id: 0x15,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/21.png",
		gbabio: "Once the star of a cult science fiction television program. Kent now works in a warehouse, dreaming of the movie deal that may never come.",
		ndsbio: "Once the star of a sci-fi TV program, Kent now basks in his cult status as an old dork.",
		gbasecret: "Has regularly watched re-runs of \"Chaz Dastard's Intergalactic Star Safari\" for 12 years.",
		emoji: "<:kenthackett:870966047056986122>"
	},
	{
		en: "Sancho Paco Panza",
		de: "Simon Paco Pancho",
		fr: "Sancho Panda",
		es: "Sancho Paco Panza",
		it: "Sancho Paco Panza",
		nl: "Sancho Kwispello",
		id: 0x16,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/22.png",
		gbabio: "Sancho earned his Masters in Zoology from Miniopolis University. He has spent the last 5 years collecting specimens for the Strangetown Zoo.",
		ndsbio: "Sancho earned his Masters in Zoology two years ago. Now he just hangs out.",
		gbasecret: "Is dangerously allergic to horses.",
		emoji: "<:sanchopacopanza:870966126014783498>"
	},
	{
		en: "Tank Grunt",
		de: "Eugen Panza",
		fr: "Tank Troufion",
		es: "Tanque Reclutas",
		it: "Bruno Grugni",
		nl: "Tank Grom",
		id: 0x17,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/23.png",
		gbabio: "The son of an Army General. Tank was destined to follow in his father's footsteps until an injured funny bone left him permanently without a sense of irony.",
		ndsbio: "Tank injured his funny bone in combat. This left him permanently without a sense of irony.",
		gbasecret: "Camouflage pattern is actually tattooed on his face.",
		emoji: "<:tankgrunt:870966172173094983>"
	},

	/* Cast Page 9 / 9. */
	{
		en: "Tristan Legend",
		de: "Tristan Legende",
		fr: "Tristan Mithik",
		es: "Tristán Cuentochino",
		it: "Vito il Mito",
		nl: "Tristan Legende",
		id: 0x18,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/24.png",
		gbabio: "Not much is known about infamous Tristan Legend except that he is more handsome, more charismatic, and more talented than anyone on earth.",
		ndsbio: "More handsome, witty, and talented than anyone on Earth. And he cooks!",
		gbasecret: "Composed a symphony in his head at age six, while climbing mount Everest.",
		emoji: "<:tristanlegend:870966194897838111>"
	},
	{
		en: "Yeti",
		de: "Yeti",
		fr: "Yéti",
		es: "Yeti",
		it: "Yeti",
		nl: "Jettie",
		id: 0x19,
		image: "https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sims2/Cast/25.png",
		gbabio: "Bigfoot's high-altitude cousin, the Yeti has been seen fewer times than the Strangetown unicorn. (The WHAT?!?!)",
		ndsbio: "Biography doesn't exist.", // Doesn't exist as a cast in the NDS version.
		gbasecret: "If shaven he would actually disappear.",
		emoji: "<:yeti:870966222395699220>"
	}
];


/* Module: Cast List. */
module.exports = {
	Names: ["S2CastList", "S2CastMember"],
	Usage: "[command]",
	Description: "Displays information about the cast members from The Sims 2 Game Boy Advance and Nintendo DS. You can search by the English, German, French, Spanish, Italian and Dutch names, but also from their ID's in hexadecimal and decimal. If no cast member provided, it displays a list of all cast members. You can also use \"-r\" as the command to choose a random cast member.",
	Handler(Message) {
		const Name = Message.Value.toLowerCase(); // Save the argument to a variable for more efficiency.
		
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
					.addField("German", CastMember.de, true)
					.addField("French", CastMember.fr, true)
					.addField("Spanish", CastMember.es, true)
					.addField("Italian", CastMember.it, true)
					.addField("Dutch", CastMember.nl, true)
					.addField("Biography (GBA)", CastMember.gbabio, true)
					.addField("Biography (NDS)", CastMember.ndsbio, true)
					.addField("Secret (GBA)", CastMember.gbasecret, true);
			
				Message.channel.send({ embeds: [ Embed ] });
				
			} else {
				Message.channel.send("The cast member you provided doesn't exist!\nType \".S2CastList\" or \".S2CastMember\" without a command to get a list of all cast members.");
			}
		}
	}
};
