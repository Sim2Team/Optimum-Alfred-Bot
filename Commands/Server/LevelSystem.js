/*
	Optimum Alfred's Level System Handler implementation.

	Handling the Level System.
*/

const Discord = require("discord.js");

const LSClrs = [
	"#B9010B", "#60bC7B", "#B59C42", "#A7A7D7", "#A542A3", // Sanity Level 0 - 4.
	"#BAB748", "#2A7B39", "#5D8BB5", "#12CE61", "#3C1A77", "#000893" // Sanity Level 5 - 10 (Zimmer, Keeble, Dripple, Burple, Ava, Emperor).
];
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

		Data.sort((A, B) => (B["Points"] > A["Points"]) ? 1 : ((A["Points"] > B["Points"]) ? -1 : 0)); // Easy one line sort.
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
	for (let Idx = 0; Idx < Length; Idx++) Data.push( { "Points": Alfred.LevelSystem.levels[Idx].points.toString(), "Name": Alfred.LevelSystem.levels[Idx].name } );

	const Embed = new Discord.MessageEmbed()
		.setTitle("Level System - Levels")
		.setColor(LSNoRoleClr)
		.setDescription("Showing the Sanity Levels and their required Points you need to get for it.")
		.setThumbnail("https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sim2Team.png")
		.addField(Data[0]["Name"], Data[0]["Points"])
		.addField(Data[1]["Name"], Data[1]["Points"])
		.addField(Data[2]["Name"], Data[2]["Points"])
		.addField(Data[3]["Name"], Data[3]["Points"])
		.addField(Data[4]["Name"], Data[4]["Points"])
		/* Special Roles (Sanity 5+). */
		.addField(Data[5]["Name"], Data[5]["Points"])
		.addField(Data[6]["Name"], Data[6]["Points"])
		.addField(Data[7]["Name"], Data[7]["Points"])
		.addField(Data[8]["Name"], Data[8]["Points"])
		.addField(Data[9]["Name"], Data[9]["Points"])
		.addField(Data[10]["Name"], Data[10]["Points"]);

	Message.channel.send({ embeds: [ Embed ] });
}


/* Sends User Information with Points, Emotes, Contributions etc. */
function UserInfo(Alfred, Message, Name) {
	let UserObjKeys = Object.keys(Alfred.LevelSystem.users);
	let User = undefined;

	/* Search if the name is found. */
	for (let Idx = 0; Idx < UserObjKeys.length; Idx++) {
		if (Alfred.LevelSystem.users[UserObjKeys[Idx]].name.toLowerCase().includes(Name)) {
			User = Alfred.LevelSystem.users[UserObjKeys[Idx]];
			break;
		}
	}

	if (!User) Message.channel.send(Name + " is not found in the Level System.");
	/* The user is found, so we can continue on. */
	else {
		/* By default, everything is set to "Unknown" to not mess things up. */
		let Data = {
			"Level": "Unknown",
			"Username": "Unknown",
			"Points": "Unknown",
			"Emotes": "Unknown",
			"Contributions": "Unknown",
			"UntilNextLevel": "Unknown"
		};

		const Points = User.points;
		Data["Username"] = User.name;
		let PointsUntilNextLevel = 0;
		let Level = 0;
		const LevelLength = Object.keys(Alfred.LevelSystem.levels).length;

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
		
		/* Because we have more Points than the max, directly set the Level as max. */
		} else {
			Level = LevelLength - 1;
		}

		/* Push the Strings here. */
		if (Level != -1) Data["Level"] = Level.toString(); // If Level is not -1, then we have a valid Level.
		Data["Points"] = Points.toString();
		Data["Emotes"] = User.emotes.toString();
		Data["Contributions"] = User.contributions.toString();
		Data["UntilNextLevel"] = PointsUntilNextLevel.toString();
		const Clr = (Level == -1 ? LSNoRoleClr : LSClrs[Level]);

		/* Create the Embed. */
		const Embed = new Discord.MessageEmbed()
			.setTitle("Level System - User Info")
			.setColor(Clr)
			.setThumbnail("https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/Sim2Team.png")
			.setDescription("User Information for " + Data["Username"] + ".")
			.addField("Points", Data["Points"], true)
			.addField("Emotes", Data["Emotes"], true)
			.addField("Contributions", Data["Contributions"], true)
			.addField("Level", Data["Level"], true)
			.addField("Points until next Level", Data["UntilNextLevel"]);
		Message.channel.send({ embeds: [ Embed ] });
	}
}


/* Module: LevelSystem. */
module.exports = {
	Names: ["LevelSystem", "LS"],
	Description: "A command related to the Sanity Level System. You can use an optional argument called \"lb\" for a Leaderboard or \"levels\" for the Levels or a user's nickname to show the User Info of the Level System.",
	Handler(Message, Alfred) {
		const Msg = Message.Value.toLowerCase();

		if (Msg.length == 0) UserInfo(Alfred, Message, Message.member.displayName.toLowerCase()); // In this case, show your info.
		else {
			if (Msg == "lb" || Msg == "leaderboard") LeaderBoard(Alfred, Message); // The top 5 users of the Level System.
			else if (Msg == "levels") ShowLevels(Alfred, Message); // Show the Levels.
			else UserInfo(Alfred, Message, Msg); // User Info of a provided nickname.
		}
	}
}
