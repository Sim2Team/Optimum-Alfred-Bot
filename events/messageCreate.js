/*
	The event that happens when a message gets created, such as:

	- Handling message commands.
	- Handle the Level System.
*/

/*
	Handle the giving of the Sanity Level roles.

	User is Message.member btw.
*/
async function HandleSanityRoleGiving(Alfred, User) {
	const UserObj = Alfred.LevelSystem.users[User.user.id];
	if (UserObj == undefined) return; // Not included.

	let Roles = [ ];

	/* Loop through all roles. */
	const LevelKeys = Object.keys(Alfred.LevelSystem.levels).length;
	for (let Idx = 0; Idx < LevelKeys; Idx++) {
		if (UserObj.points < Alfred.LevelSystem.levels[Idx].points) break; // No role you can get as not enough points.

		Roles.push(Alfred.LevelSystem.levels[Idx].role);
	}

	let AddRoles = [ ];

	if (Roles.length) {
		AddRoles = Roles.filter(RoleID => !User.roles.cache.has(RoleID));

		if (AddRoles.length) await User.roles.add(AddRoles);
	}
}


/*
	Handle Points for an existing user. */
function HandlePoints(Alfred, ChannelID, User) {
	if (Alfred.LevelSystem.streammodeon) {
		if (ChannelID == Alfred.LevelSystem.streammodeid) {
			/* Give 4 instead of 2 Points in that channel. */
			if (User.points + Alfred.LevelSystem.streammodepoints <= Alfred.LevelSystem.pointlimit) User.points += Alfred.LevelSystem.streammodepoints;
			else User.points = Alfred.LevelSystem.pointlimit;
			return;
		}
	}

	/* Give 2 Points. */
	if (User.points + Alfred.LevelSystem.msgpoints <= Alfred.LevelSystem.pointlimit) User.points += Alfred.LevelSystem.msgpoints;
	else User.points = Alfred.LevelSystem.pointlimit;
}


/* Create a new Entry for a User on the Level System. */
function CreateLSEntry(Alfred, UserID, Name, ChannelID, Time) {
	let UserData = {
		"timestamp": Time,
		"points": Alfred.LevelSystem.msgpoints,
		"name": Name,
		"emotes": 0,
		"contributions": 0
	};

	if (Alfred.LevelSystem.streammodeon) {
		if (ChannelID == Alfred.LevelSystem.streammodeid) UserData["points"] = Alfred.LevelSystem.streammodepoints;
	}

	Alfred.LevelSystem.users[UserID] = UserData;
}


/* Handle the Event. */
module.exports = async function(Alfred, Message) {
	if (Message.member?.user.bot) return; // Ensure it's not a bot.
	if (!Message.member?.user) return;

	let ExecuteCommand = false;
	if (Message.content.startsWith(Alfred.Config.Prefix)) { // Ensure it has the defined bot prefix.
		/* if (Alfred.Config.Channels.includes(Message.channel.id)) */ ExecuteCommand = true; // Ensure it's in one of the defined bot channels to execute commands.
	}

	/* Handle Sanity Level System. */
	if (!ExecuteCommand) {
		let ID = Message.member.user.id;
		let Time = Date.now();
	
		/* Is there any better way to handle this? */
		let User = Alfred.LevelSystem.users[ID];
		if (User != undefined) {
			/* Ensure enough time has been passed on the new message. */
			if (User.timestamp + Alfred.LevelSystem.interval < Time) {
				User.timestamp = Time;
				HandlePoints(Alfred, Message.channel.id, User);

				if (User.name != Message.member.displayName) User.name = Message.member.displayName; // Update Nickname.
				HandleSanityRoleGiving(Alfred, Message.member);
			}
	
		/* The user does not exist in the Level System, so create it and give the initial points. */
		} else {
			CreateLSEntry(Alfred, ID, Message.member.displayName, Message.channel.id, Time);
		}

	/* We can execute a command, so let's go! */
	} else {
		let Match = Message.content.match(RegExp(Alfred.Config.Prefix.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*([^\\s]+)\\s*(.*)", "si"));
		if (Match.length < 2) return;
		Message.Command = Match[1];
		Message.Value = Match[2].trim();
	
		for (let Category in Alfred.Commands) {
			const Commands = Alfred.Commands[Category].Commands;

			for (let Command in Commands) {
				for (let Name of Commands[Command].Names) {
					if (Name.toLowerCase() == Message.Command.toLowerCase()) {
						console.log(`[${(new Date).toLocaleTimeString()}] ${Message.member.user.tag} just executed the command '${Message.Command}'.`);
	
						if (!Commands[Command].Dev || Alfred.Config.Developers.includes(Message.member.id)) {
							try {
								Commands[Command].Handler(Message, Alfred);
	
							} catch(e) {
								Message.channel.send("An error occurred while executing that command:\n```js\n" + e + "```");
							}
	
						} else {
							Message.channel.send("Bot developer permissions is required to run this command!");
						}
	
						return;
					}
				}
			}
		}
	}
}
