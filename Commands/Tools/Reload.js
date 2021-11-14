/*
	Optimum Alfred's reload command.

	Reloads a command.
*/

module.exports = {
	Names: ["Reload"],
	Usage: "<command>",
	Description: "Reloads a command.",
	Dev: true,
	Handler(Message, Alfred) {
		if (!Message.Value) return Message.channel.send("Please provide a command to reload.");

		for (let Category in Alfred.Commands) {
			const Commands = Alfred.Commands[Category].Commands;

			for (let Command in Commands) {
				for (let Name of Commands[Command].Names) {
					if (Name.toLowerCase() == Message.Value.toLowerCase()) {
						delete require.cache[require.resolve(`../${Command}`)];
						Alfred.Commands[Category].Commands[Command] = require(`../${Command}`);

						Message.channel.send(`Reloaded the '${Alfred.Commands[Category].Commands[Command].Names[0]}' command!`);
						return;
					}
				}
			}
		}

		Message.channel.send("Command could not be found!");
	}
};
