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

const BoxartURLs = [
	"https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/images/Covers/bustinOutGBACover.png",
	"https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/images/Covers/urbzGBACover.png",
	"https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/images/Covers/urbzNDSCover.png",
	"https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/images/Covers/sims2GBACover.png",
	"https://raw.githubusercontent.com/Sim2Team/Optimum-Alfred-Bot/main/resources/images/Covers/sims2NDSCover.png"
];


/*
	Parse the Arguments that got provided.
	
	Returns a Object with Game ID and Quiz ID.
*/
function ParseArgs(Arr) {
	let Obj = {
		"Game": -1,
		"Quiz": -1
	};

	if (Arr.length >= 1) {
		switch(Arr[0]) { // Arg 0 => Game.
			case "bustinout": Obj.Game = 0; break;
			case "urbzgba":   Obj.Game = 1; break;
			case "urbznds":   Obj.Game = 2; break;
			case "sims2gba":  Obj.Game = 3; break;
			case "sims2nds":  Obj.Game = 4; break;
		}

		/* Handle Quiz ID. */
		if (Arr.length >= 2) { // Arg 1 => Quiz ID.
			let Idx = parseInt(Arr[1]);

			if (!isNaN(Idx)) Obj.Quiz = Idx;
		}
	}

	return Obj;
}


/*
	Generates an Embed with a Quiz Object.
*/
function GenerateEmbedByQuizObj(Quiz, Game) {
	let Embed = new Discord.MessageEmbed()
		.setTitle("Quiz - " + Quiz.id)
		.setColor("#343840")
		.setThumbnail(BoxartURLs[Game])
		.addField("Question", Quiz.question)
		.addField("Answers", "- " + Quiz.answers[0] + "\n- " + Quiz.answers[1] + "\n- " + Quiz.answers[2] + "\n- " + Quiz.answers[3])
		.addField("Correct Answer", "|| The correct answer is: " + Quiz.correct + ". ||");

	return Embed;
}


/*
	The main Quiz Generator.

	Returns an Object with Embed for an Embed and "Res" for the message it sends on an error.
*/
function GenerateQuiz(Message) {
	let Result = {
		"Embed": undefined,
		"Res": "Unknown Error."
	};

	const Arr = Message.split(" ");
	const Obj = ParseArgs(Arr);
	let QuizArr = undefined;

	if (Obj.Game != -1) {
		switch(Obj.Game) {
			case 0: QuizArr = BustinOutQuiz; break;
			case 1: QuizArr = UrbzGBAQuiz;   break;
			case 2: QuizArr = UrbzNDSQuiz;   break;
			case 3: QuizArr = Sims2GBAQuiz;  break;
			case 4: QuizArr = Sims2NDSQuiz;  break;
		}

		if (QuizArr != undefined) {
			/* Generate a Quiz of a specific ID. */
			if (Obj.Quiz >= 0) {
				if (QuizArr.length >= Obj.Quiz) {
					const Quiz = QuizArr[Obj.Quiz];
					Result.Embed = GenerateEmbedByQuizObj(Quiz, Obj.Game);

				} else {
					Result.Res = "Quiz Index goes out of scope.\nMax Quiz available for this game: " + QuizArr.length.toString() + ".";
				}

			/* Random Quiz. */
			} else {
				if (QuizArr.length >= 1) {
					const Quiz = QuizArr[Math.floor(Math.random() * QuizArr.length)];
					Result.Embed = GenerateEmbedByQuizObj(Quiz, Obj.Game);

				} else {
					Result.Res = "No Quiz exist for this game yet.";
				}
			}

		} else {
			Result.Res = "This is not a valid game.";
		}

	} else {
		Result.Res = "This is not a valid game.";
	}

	return Result;
}


/* Module: Quiz. */
module.exports = {
	Names: ["Quiz"],
	Description: "Some Quiz fun stuff. Provide the game name as the first argument, then optional the Quiz ID to get the Quiz of a specific ID.",
	Usage: "[Game] [ID]",
	Handler(Message) {
		const Msg = Message.Value.toLowerCase();
		let Res = undefined;

		if (Msg.length >= 1) {
			Res = GenerateQuiz(Msg);

			if (Res.Embed) Message.channel.send({ embeds: [ Res.Embed ] });
			else Message.channel.send(Res.Res);

		} else {
			let Embed = new Discord.MessageEmbed()
				.setTitle("Quiz")
				.setColor("#343840")
				.setDescription("Provide one of the listed games below as the first argument, then optional an ID if you want to get the Quiz of a specific ID.")
				.addField("Games", "bustinout, urbzgba, urbznds, sims2gba, sims2nds");
			Message.channel.send({ embeds: [ Embed ] });
		}
	}
}
