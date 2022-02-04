/*
	Optimum Alfred's Rule Handler implementation.

	Sends a specific rule.
*/

const Discord = require("discord.js");
const Rules = require("../../resources/json/rules.json");


/* Module: Rule. */
module.exports = {
	Names: ["Rule"],
	Usage: "[command]",
	Description: "Sends a specific rule.",
	Handler(Message) {
		const RuleID = Message.Value;

		if (RuleID.length < 1) Message.channel.send("Please provide a rule.");
		else {
			let Rule = undefined;

			let Objects = Object.keys(Rules);
			for (let Idx = 0; Idx < Objects.length; Idx++) {
				if (RuleID == Objects[Idx]) {
					Rule = new Discord.MessageEmbed()
						.setTitle("Rule " + Objects[Idx])
						.setDescription(Rules[Objects[Idx]]);
					break;
				}
			}
			
			if (Rule) Message.channel.send({ embeds: [ Rule ] });
			else Message.channel.send("Please provide a valid rule.");
		}
	}
}
