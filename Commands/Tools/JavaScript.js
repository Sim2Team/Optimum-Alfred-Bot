/*
	Optimum Alfred's Simple Commands Handler implementation.

	Handle simple message commands, that may not fit anywhere else or so.
*/

const {MessageAttachment, Formatters} = require("discord.js");

/* Module: Simple Commands. */
module.exports = {
	Names: ["JavaScript", "JS"],
	Usage: "<JavaScript code>",
	Description: "Runs JavaScript code.",
	Dev: true,
	async Handler(Message, Alfred) {
		try {
			let Output = await eval(Message.Value);

			if (typeof output !== "function")
				Output = require("util").inspect(Output);
			if (typeof(Output) !== "string")
				Output = Output.toString();

			if (Output.length >= 1024) {
				Message.channel.send("The output is too long, sending as attachment:", new MessageAttachment(Buffer.from(Output), "Output.txt"));
			} else {
				Message.channel.send(Formatters.codeBlock("js", Output));
			}
		} catch(e) {
			Message.channel.send(Formatters.codeBlock(e.toString()));
		}
	}
};
