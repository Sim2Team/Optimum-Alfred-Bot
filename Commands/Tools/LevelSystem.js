/*
	Optimum Alfred's Level System Handler implementation.

	Handling the Level System.
*/

const Discord = require("discord.js");

const LSClrs = [ "#B9010B", "#60bC7B", "#B59C42", "#A7A7D7", "#A542A3" ]; // Sanity Level 0 - 4.
const LSNoRoleClr = "#99AAB5"; // TODO: Decide which color to show if no role exists for the user or for the Leaderboard | Levels.


/* Shows the Top 5 Users from the Level System. */
function LeaderBoard(Alfred, Message) {
	if (!Object.keys(Alfred.LevelSystem.users).length) Message.channel.send("There are no users in the Level System yet.");
	else {
		let Data = [ ];

		let Objects = Object.keys(Alfred.LevelSystem.users);
		for (let Idx = 0; Idx < Objects.length; Idx++) {
			Data.push( { "Name": Alfred.LevelSystem.users[Objects[Idx]].name, "Points": Alfred.LevelSystem.users[Objects[Idx]].points } );
		}

		Data.sort((A, B) => (B["Points"] > A["Points"]) ? 1 : ((A["Points"] > B["Points"]) ? -1 : 0)); // Easy one line thing.
		const Len = Data.length;

		const Embed = new Discord.MessageEmbed()
			.setTitle("Level System - Leaderboard")
			.setColor(LSNoRoleClr)
			.setDescription("Showing the Top 5 Active Users of this Server.")
			.setThumbnail("https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sim2Team.png")
			.addField("1. " + (Len >= 1 ? Data[0]["Name"] : "Unknown"), (Len >= 1 ? Data[0]["Points"].toString() : (0).toString()))
			.addField("2. " + (Len >= 2 ? Data[1]["Name"] : "Unknown"), (Len >= 2 ? Data[1]["Points"].toString() : (0).toString()))
			.addField("3. " + (Len >= 3 ? Data[2]["Name"] : "Unknown"), (Len >= 3 ? Data[2]["Points"].toString() : (0).toString()))
			.addField("4. " + (Len >= 4 ? Data[3]["Name"] : "Unknown"), (Len >= 4 ? Data[3]["Points"].toString() : (0).toString()))
			.addField("5. " + (Len >= 5 ? Data[4]["Name"] : "Unknown"), (Len >= 5 ? Data[4]["Points"].toString() : (0).toString()));
		Message.channel.send({ embeds: [ Embed ] });
	}
}


/* Shows each Level and their required Points. */
function ShowLevels(Alfred, Message) {
	let Data = [ ];
	const Length = Object.keys(Alfred.LevelSystem.levels).length;
	for (let Idx = 0; Idx < Length; Idx++) Data.push( Alfred.LevelSystem.levels[Idx].points.toString() );

	const Embed = new Discord.MessageEmbed()
		.setTitle("Level System - Levels")
		.setColor(LSNoRoleClr)
		.setDescription("Showing the Sanity Levels and their required Points you need to get for it.")
		.setThumbnail("https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sim2Team.png")
		.addField("Sanity 0", Data[0])
		.addField("Sanity 1", Data[1])
		.addField("Sanity 2", Data[2])
		.addField("Sanity 3", Data[3])
		.addField("Sanity 4", Data[4]);
	Message.channel.send({ embeds: [ Embed ] });
}


/* Sends User Information with Points, Emotes, Contributions etc. */
function UserInfo(Alfred, Message, Name) {
	let UsersObject = Object.keys(Alfred.LevelSystem.users);
	let User = undefined;

	/* Search if the name is found. */
	for (let Idx = 0; Idx < UsersObject.length; Idx++) {
		if (Alfred.LevelSystem.users[UsersObject[Idx]].name.toLowerCase().includes(Name)) {
			User = Alfred.LevelSystem.users[UsersObject[Idx]];
			break;
		}
	}

	if (!User) Message.channel.send(Name + " is not found in the Level System.");
	/* The user is found, so we can continue on. */
	else {
		let DataObject = {
			"Level": "Unknown",
			"Username": "Unknown",
			"Points": "Unknown",
			"Emotes": "Unknown",
			"Contributions": "Unknown",
			"UntilNextLevel": "Unknown"
		};

		const Points = User.points;
		DataObject["Username"] = User.name;
		let PointsUntilNextLevel = 0;
		let Level = 0;

		let LevelLength = Object.keys(Alfred.LevelSystem.levels).length;

		/* Only do the Points until next level if your current points don't pass the max. */
		if (Points < Alfred.LevelSystem.levels[LevelLength - 1].points) {
			/* Loop through all levels and their points. */
			for (let Idx = 0; Idx < LevelLength; Idx++) {
				if (Alfred.LevelSystem.levels[Idx].points > Points) {
					/* Set the Sanity Level. */
					if (Idx == 0) Level = -1;
					else Level = Idx - 1;

					PointsUntilNextLevel = Alfred.LevelSystem.levels[Idx].points - Points;
					break;
				}
			}

		} else {
			Level = LevelLength - 1;
		}

		/* Push the Strings here. */
		if (Level != -1) DataObject["Level"] = Level.toString();
		DataObject["Points"] = Points.toString();
		DataObject["Emotes"] = User.emotes.toString();
		DataObject["Contributions"] = User.contributions.toString();
		DataObject["UntilNextLevel"] = PointsUntilNextLevel.toString();
		const Clr = (Level == -1 ? LSNoRoleClr : LSClrs[Level]);

		/* Create the Embed. */
		const Embed = new Discord.MessageEmbed()
			.setTitle("Level System - User Info")
			.setColor(Clr)
			.setThumbnail("https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sim2Team.png")
			.setDescription("User Information for " + DataObject["Username"] + ".")
			.addField("Points", DataObject["Points"], true)
			.addField("Emotes", DataObject["Emotes"], true)
			.addField("Contributions", DataObject["Contributions"], true)
			.addField("Level", DataObject["Level"], true)
			.addField("Points until next Level", DataObject["UntilNextLevel"]);
		Message.channel.send({ embeds: [ Embed ] });
	}
}


/* Module: LevelSystem. */
module.exports = {
	Names: ["LevelSystem", "LS"],
	Description: "A command related to the Sanity Level System. You can use an optional argument called \"lb\" for a Leaderboard or \"levels\" for the Levels or a user's nickname to show the User Info of the Level System.",
	Handler(Message, Alfred) {
		const Msg = Message.Value.toLowerCase();

		if (Msg.length == 0) UserInfo(Alfred, Message, Message.member.user.username.toLowerCase()); // In this case, show your info.
		else {
			if (Msg == "lb" || Msg == "leaderboard") LeaderBoard(Alfred, Message); // The top 5 users of the Level System.
			else if (Msg == "levels") ShowLevels(Alfred, Message); // Show the Levels.
			else UserInfo(Alfred, Message, Msg); // User Info of a provided nickname.
		}
	}
}
