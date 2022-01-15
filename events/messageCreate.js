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
	for (let Idx = 0; Idx < Object.keys(Alfred.LevelSystem.levels).length; Idx++) {
		if (UserObj.points < Alfred.LevelSystem.levels[Idx].points) break; // No role you can get as not enough points.

		Roles.push(Alfred.LevelSystem.levels[Idx].role);
	}

	let AddRoles = [ ];

	if (Roles.length) {
		AddRoles = Roles.filter(RoleID => !User.roles.cache.has(RoleID));

		if (AddRoles.length) await User.roles.add(AddRoles);
	}
};


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
		let Res = Alfred.LevelSystem.users[ID];
		if (Res != undefined) {
			/* Ensure enough time has been passed on the new message. */
			if (Alfred.LevelSystem.users[ID].timestamp + Alfred.LevelSystem.interval < Time) {
				Alfred.LevelSystem.users[ID].timestamp = Time;
				Alfred.LevelSystem.users[ID].points += Alfred.LevelSystem.msgpoints;
				if (Alfred.LevelSystem.users[ID].name != Message.member.displayName) Alfred.LevelSystem.users[ID].name = Message.member.displayName; // Update Nickname.

				HandleSanityRoleGiving(Alfred, Message.member);
			}
	
		/* The user does not exist in the Level System, so create it and give the initial points. */
		} else {
			let Obj = {
				"timestamp": Time,
				"points": Alfred.LevelSystem.msgpoints,
				"name": Message.member.displayName
			};
	
			Alfred.LevelSystem.users[ID] = Obj;
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
};