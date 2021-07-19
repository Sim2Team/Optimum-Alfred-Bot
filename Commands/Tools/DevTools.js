/*
	Alfred Optimum's Dev Tools Handler implementation.

	Handle tools for bot developers to test some things.
*/

/* Module: Dev Tools. */
module.exports = {
	Handler: function(Message) {
		if (!Message.member.user.bot) { // Ensure it's not a bot.
			if (Message.channel.id == process.env.CHANNEL_TEST) {
	
				switch(Message.content) {
					default:
						return false;
				};
			};
		};

		return false; // No command from here.
	}
};