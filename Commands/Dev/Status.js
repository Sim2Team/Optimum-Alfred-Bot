/*
	Optimum Alfred's Status handler implementation.

	Does some Status stuff, such as setting it randomly, or to a specific string.
*/


/* If some cool status are known, put them here. */
const StatusList = [
	"Town of Strange is under well control very good.",
	"The Sims 2 GBA",
	"The Sims 2 DS"
];


/* Module: Status. */
module.exports = {
	Names: ["Status"],
	Description: "Does some Status stuff, such as setting it randomly, or to a specific string.",
	Dev: true,
	Handler(Message, Alfred) {
		const Msg = Message.Value.toLowerCase();

		if (Msg.length > 0) {
			Alfred.Client.user.setActivity(Msg);
			Message.channel.send("Set the status to: " + Msg + ".");

		} else {
			const StatusMsg = StatusList[Math.floor(Math.random() * StatusList.length)];

			if (StatusMsg.length > 0) {
				Alfred.Client.user.setActivity(StatusMsg);
				Message.channel.send("Set the status to: " + StatusMsg + ".");
			}
		}
	}
}
