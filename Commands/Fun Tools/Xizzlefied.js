/*
	Optimum Alfred's Xizzlefied / Xizzified handler implementation.

	Sorta like Owoify and modifying words, but instead with Xizzle and shuffling the word order.
*/


/*
	Some Xizzify's.

	Basically shuffles an Array of words into a random order, then return a message string which it would send, So it sounds like the best Emperor => Xizzle. ;P
*/
function Xizzlefy(Args) {
	let NewMsg = "So it is!";

	Args.sort(() => Math.random() - 0.5);
	for (let Idx = 0; Idx < Args.length; Idx++) {
		if (Idx == 0) NewMsg = Args[Idx];
		else NewMsg += " " + Args[Idx];
	}

	return NewMsg;
}


/* Module: Xizzlefied. */
module.exports = {
	Names: ["Xizzlefied", "Xizzified"],
	Usage: "<Message to Xizzlefy>",
	Description: "Shuffles some of the words, to sound like Emperor Xizzle.",
	Handler(Message) {
		if (Message.Value.length == 0) Message.channel.send("Nothing specified, So it is!");
		else {
			let Args = Message.Value.split(" "); // Split the Message into an array.
			if (Args.length > 0) { // Only do this, if the array has a larger size than 0.
				let Msg = Xizzlefy(Args);
				Message.channel.send(Msg);
			}
		}
	}
}
