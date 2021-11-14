/*
	Optimum Alfred's help command.

	Shows a list of categories, commands, or info about a command.
*/

/* Module: Simple Commands. */
module.exports = {
	Names: ["Help"],
	Description: "Shows a list of categories, commands, or info about a command.",
	Usage: "[category] [command]",
	Handler(Message, Alfred) {
		const Description = `Category List: ${Alfred.Config.Prefix}help\nCommand List: ${Alfred.Config.Prefix}help <category>\nCommand Info: ${Alfred.Config.Prefix}help <command>`;

		if (Message.Value) {
			for (let Category in Alfred.Commands) {
				const Commands = Alfred.Commands[Category].Commands;
	
				/* Command List. */
				if (Category.toLowerCase().includes(Message.Value.toLowerCase())) {
					let Fields = [ ];

					for (let Command in Commands) {
						Fields.push({
							name: Commands[Command].Names[0],
							value: Commands[Command].Description + (Commands[Command].Names.length > 1 ? ("\nOther names: " + Commands[Command].Names.slice(1).join(", ")) : "")
						});
					}

					Message.channel.send({embeds: [{
						title: `Command list for ${Category} category`,
						description: Description,
						fields: Fields
					}]});

					return;
				}
	
				for (let Command in Commands) {
					for (let Name of Commands[Command].Names) {
						/* Command Info. */
						if (Name.toLowerCase() == Message.Value.toLowerCase()) {
							let Fields = [
								{
									name: "Description",
									value: Commands[Command].Description
								},
								{
									name: "Usage",
									value: Alfred.Config.Prefix + Commands[Command].Names[0] + (Commands[Command].Usage ? ` ${Commands[Command].Usage}` : "")
								}
							];

							if (Commands[Command].Names.length > 1) {
								Fields.push({
									name: "Other names",
									value: Commands[Command].Names.slice(1).join("\n")
								});
							}

							Message.channel.send({embeds: [{
								title: `${Commands[Command].Names[0]} command info`,
								description: Description,
								fields: Fields
							}]});

							return;
						}
					}
				}
			}
		}

		/* Category List. */
		let Fields = [ ];

		for (let Category in Alfred.Commands) {
			Fields.push({
				"name": Category,
				"value": Alfred.Commands[Category].Description
			});
		}

		Message.channel.send({embeds: [{
			title: "Category list",
			description: Description,
			fields: Fields
		}]});
	}
};
