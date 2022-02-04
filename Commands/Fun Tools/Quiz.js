/*
	Optimum Alfred's Quiz Handler implementation.

	Some Quiz fun stuff. Provide the game name as the first argument, then optional the Quiz ID to get the correct answer for that question.
*/

const Discord = require("discord.js");

/* All Quiz JSON files. */
const BustinOutQuiz = require("../../resources/json/quiz/bustinout.json");
const UrbzGBAQuiz   = require("../../resources/json/quiz/urbzgba.json");
const UrbzNDSQuiz   = require("../../resources/json/quiz/urbznds.json");
const Sims2GBAQuiz  = require("../../resources/json/quiz/sims2gba.json");
const Sims2NDSQuiz  = require("../../resources/json/quiz/sims2nds.json");


function GenerateQuiz(Message) {
	const GameNames = [ "bustinout", "urbzgba", "urbznds", "sims2gba", "sims2nds" ];
	const Arr = Message.split(" ");
	let GameIdx = -1;
	let Quiz = undefined;

	/* Go through all the games. */
	for (let Idx = 0; Idx < GameNames.length; Idx++) {
		if (Arr[0] == GameNames[Idx]) {
			GameIdx = Idx;
			break;
		}
	}

	let Embed = undefined;

	if (GameIdx != -1) {
		switch(GameIdx) {
			case 0: Quiz = BustinOutQuiz; break;
			case 1: Quiz = UrbzGBAQuiz;   break;
			case 2: Quiz = UrbzNDSQuiz;   break;
			case 3: Quiz = Sims2GBAQuiz;  break;
			case 4: Quiz = Sims2NDSQuiz;  break;
		}

		/* Get the answer. */
		if (Arr.length >= 2 && Quiz.length > 0) {
			let ID = parseInt(Arr[1]);

			if (!isNaN(ID)) {
				/* Within range. */
				if (ID < Quiz.length) {
					Embed = new Discord.MessageEmbed()
						.setTitle("QuizResult - " + Quiz[ID].id)
						.setColor("#343840")
						.setDescription("The correct answer for \"" + Quiz[ID].question + "\" is: " + Quiz[ID].correct + ".");

				/* Out of range. */
				} else {
					Embed = new Discord.MessageEmbed()
						.setTitle("QuizResult - ID is out of range")
						.setColor("#343840")
						.setDescription("The provided ID is out of range for the Quiz. Valid IDs: 0 - " + (Quiz.length - 1).toString());
				}

			/* Not a valid number. */
			} else {
				Embed = new Discord.MessageEmbed()
					.setTitle("QuizResult - Not a valid ID number")
					.setColor("#343840")
					.setDescription("You did not provide a valid ID number for the Quiz you want to get the correct answer from.");
			}

		/* Generate a random Quiz Question. */
		} else if (Arr.length == 1 && Quiz.length > 0) {
			let ActiveQuiz = Quiz[Math.floor(Math.random() * Quiz.length)];
			ActiveQuiz.answers.sort(() => Math.random() - 0.5); // Shuffle answer order.

			Embed = new Discord.MessageEmbed()
				.setTitle("Quiz - " + ActiveQuiz.id)
				.setColor("#343840")
				.setDescription("Question: " + ActiveQuiz.question)
				.addField("A)", ActiveQuiz.answers[0])
				.addField("B)", ActiveQuiz.answers[1])
				.addField("C)", ActiveQuiz.answers[2])
				.addField("D)", ActiveQuiz.answers[3]);

		} else if (Quiz.length == 0) {
			Embed = new Discord.MessageEmbed()
				.setTitle("Quiz")
				.setColor("#343840")
				.setDescription("There are no questions available for this game.");
		}
	}

	return Embed;
}


/* Module: Quiz. */
module.exports = {
	Names: ["Quiz"],
	Description: "Some Quiz fun stuff. Provide the game name as the first argument, then optional the Quiz ID to get the correct answer for that question.",
	Usage: "[Game] [ID]",
	Handler(Message) {
		const Msg = Message.Value.toLowerCase();
		let Embed = undefined;

		if (Msg.length >= 1) {
			Embed = GenerateQuiz(Msg);
			if (Embed) Message.channel.send({ embeds: [ Embed ] });
		}

		if (!Embed) {
			Embed = new Discord.MessageEmbed()
				.setTitle("Quiz")
				.setColor("#343840")
				.setDescription("Provide one of the listed games below as the first argument, then optional an ID if you want to get the correct answer from the specific question.")
				.addField("Games", "bustinout, urbzgba, urbznds, sims2gba, sims2nds");
			Message.channel.send({ embeds: [ Embed ] });
		}
	}
}
