/*
	Optimum Alfred's Simple Commands Handler implementation.

	Handle simple message commands, that may not fit anywhere else or so.
*/

/* Module: Simple Commands. */
module.exports = {
	Names: ["Test"],
	Description: "Simple test command.",
	Handler(Message) {
		Message.channel.send("Hello! I'm Alfred Optimum, your friend and helper at Strangetown.");
	}
};
