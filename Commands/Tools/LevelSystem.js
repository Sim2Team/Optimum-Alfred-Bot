/*
	Optimum Alfred's Level System Handler implementation.

	Handling the Level System.
*/


/*
	Shows the Top 5 Users from the Level System.
*/
function LeaderBoard(Alfred, Message) {
	if (!Object.keys(Alfred.LevelSystem.users).length) Message.channel.send("There are no users in the Level System yet.");
	else {
		let Msg = "**The top 5 Users of the Level System:**\n\n";
		let Users = [ ];

		for (let Idx = 0; Idx < Object.keys(Alfred.LevelSystem.users).length; Idx++) {
			const User = Object.keys(Alfred.LevelSystem.users)[Idx];
			Users.push(Alfred.LevelSystem.users[User]);
		}

		Users.sort((A, B) => { A.points > B.points } );

		for (let Idx = 0; Idx < Users.length && Idx < 5; Idx++) {
			if (Idx == Users.length - 1) Msg += (Idx + 1).toString() + ": " + Users[Idx].name + " - " + Users[Idx].points.toString();
			else Msg += (Idx + 1).toString() + ": " + Users[Idx].name  + " - " + Users[Idx].points.toString() + "\n";
		}

		Message.channel.send(Msg);
	}
};


/*
	Shows each Level and their required Points.
*/
function ShowLevels(Alfred, Message) {
	let Msg = "You can see the required points for each level below.\n";

	for (let Idx = 0; Idx < Object.keys(Alfred.LevelSystem.levels).length; Idx++) {
		if (Idx == Object.keys(Alfred.LevelSystem.levels).length - 1) Msg += "Level " + Idx.toString() + " => " + Alfred.LevelSystem.levels[Idx].points.toString();
		else Msg += "Level " + Idx.toString() + " => " + Alfred.LevelSystem.levels[Idx].points.toString() + "\n";
	}

	Message.channel.send(Msg);
};


/*
	Sends the Points and the Level of the user that used that function.
*/
function PointsAndLevel(Alfred, Message) {
	let ID = Message.member.user.id;
	let Username = Message.member.user.username;
	let Res = Alfred.LevelSystem.users[ID];

	if (Res != undefined) {
		const Points = Alfred.LevelSystem.users[ID].points;
		let PointsUntilNextLevel = 0;
		let Level = 0;

		/* Only do the Points until next level if your current points don't pass the max. */
		if (Points < Alfred.LevelSystem.levels[Object.keys(Alfred.LevelSystem.levels).length - 1].points) {
			/* Loop through all levels and their points. */
			for (let Idx = 0; Idx < Object.keys(Alfred.LevelSystem.levels).length; Idx++) {
				if (Alfred.LevelSystem.levels[Idx].points > Points) {
					/* Set the Sanity Level. */
					if (Idx == 0) Level = -1;
					else Level = Idx - 1;

					PointsUntilNextLevel = Alfred.LevelSystem.levels[Idx].points - Points;
					break;
				}
			}

		} else {
			Level = Object.keys(Alfred.LevelSystem.levels).length - 1;
		}

		if (Level != -1) Message.channel.send(Username + ", you currently have " + Points + " Points and have currently Level " + Level + ".\nPoints until the next Level: " + PointsUntilNextLevel + ".");
		else Message.channel.send(Username + ", you currently have " + Points + " Points.\nPoints until the next Level: " + PointsUntilNextLevel + ".");

	} else {
		Message.channel.send("You are not in the Level System yet. Write at least a message without using a command.");
	}
};


/* Module: LevelSystem. */
module.exports = {
	Names: ["LevelSystem", "LS"],
	Description: "A command related to the Sanity Level System. You can use an optional argument called \"lb\" for a Leaderboard or \"levels\" for the Levels.",
	Handler(Message, Alfred) {
		const Msg = Message.Value.toLowerCase();

		if (Msg.length == 0) PointsAndLevel(Alfred, Message);
		else {
			if (Msg == "lb" || Msg == "leaderboard") LeaderBoard(Alfred, Message);
			else if (Msg == "levels") ShowLevels(Alfred, Message);
		}
	}
};
