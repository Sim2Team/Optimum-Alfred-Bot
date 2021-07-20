/*
	Alfred Optimum's Simple Commands Handler implementation.

	Handle simple message commands, that may not fit anywhere else or so.
*/

/* Module: Simple Commands. */
module.exports = {
	Handler: function(Message) {
		if (!Message.member.user.bot) { // Ensure it's not a bot.
			if (Message.channel.id == process.env.CHANNEL_PUBLIC || Message.channel.id == process.env.CHANNEL_TEST) {
	
				switch(Message.content) {
					default:
						return false;

					case "?Test":
						Message.channel.send("Hello! I'm Alfred Optimum, your friend and helper at Strangetown.");
						return true;
				};
			};
		};
	
		return false; // No command from here.
	}
};