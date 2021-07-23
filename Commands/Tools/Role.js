/*
	Optimum Alfred's role command.

	Toggles roles, sends a list if no roles given.
*/

module.exports = {
	Names: ["Role"],
	Usage: "<role names, comma separated>",
	Description: "Toggles roles, sends a list if no roles given.",
	async Handler(Message, Alfred) {
		/* Send lists if no roles requested */
		if(!Message.Value) {
			let PossibleAdd = Alfred.Config.Roles.filter(r => !Message.member.roles.cache.has(r));
			let PossibleRemove = Alfred.Config.Roles.filter(r => Message.member.roles.cache.has(r));

			let Out = "";
			if(PossibleAdd.length) {
				Out += "\n\n__**The following roles can be added:**__";
				for (let Id of PossibleAdd) {
					Out += `\n${await Message.guild.roles.fetch(Id)}`;
				}
			}
			if(PossibleRemove.length) {
				Out += "\n\n__**The following roles can be removed:**__";
				for (let Id of PossibleRemove) {
					Out += `\n${await Message.guild.roles.fetch(Id)}`;
				}
			}
			return Message.channel.send(Out != "" ? Out : "No roles can be toggled in this server.");
		}

		let AddRoles = [];
		let RemoveRoles = [];
		let NotRoles = [];

		await Message.Value.split(",").forEach(async r => {
			let Role;
			for (let Id of Alfred.Config.Roles) {
				let GuildRole = await Message.guild.roles.fetch(Id);
				if (GuildRole.name.toLowerCase().includes(r.trim().toLowerCase())) {
					Role = GuildRole.id;
					break;
				}
			}

			if(Role) {
				(Message.member.roles.cache.has(Role) ? RemoveRoles : AddRoles).push(Role);
			} else {
				NotRoles.push(r);
			}
		});

		if(AddRoles.length)
			await Message.member.roles.add(AddRoles);

		if(RemoveRoles.length)
			await Message.member.roles.remove(RemoveRoles);

		let Out = "";
		if(AddRoles.length) {
			Out += "\n\n__**The following roles have been added:**__";
			for (let Id of AddRoles) {
				Out += `\n${await Message.guild.roles.fetch(Id)}`;
			}
		}
		if(RemoveRoles.length) {
			Out += "\n\n__**The following roles have been removed:**__";
			for (let Id of RemoveRoles) {
				Out += `\n${await Message.guild.roles.fetch(Id)}`;
			}
		}
		if(NotRoles.length) {
			Out += "\n\n__**The following roles can't be added/removed:**__\n";
			Out += NotRoles.join("\n");
		}
		Message.channel.send(Out);
	}
}
