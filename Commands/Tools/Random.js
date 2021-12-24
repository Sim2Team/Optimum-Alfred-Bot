/*
	Optimum Alfred's Random Handler implementation.

	Just getting a random value from a min and max value.
	This implementation is based of how The Sims 2 Game Boy Advance does it (at least from how I understand it - SuperSaiyajinStackZ).
*/
function RandomNum(Seed, Min, Max) {
	if (Min < Max) {
		let RNGVal = Seed;
		
		RNGVal ^= RNGVal >> 0xB;
		RNGVal ^= (RNGVal & 0x13A58AD) << 0x7;
		RNGVal ^= (RNGVal & 0x1DF8C) << 0xF;
		RNGVal = RNGVal >> 0x12 ^ RNGVal;

		Min += ((RNGVal & 0x7FFF) * ((Max - Min) + 0x1)) >> 0xF;
	}

	return Min;
};

/* Module: Random. */
module.exports = {
	Names: ["Random"],
	Usage: "[Min Value] [Max Value]",
	Description: "Just getting a random value from a min and max value.",
	Handler(Message) {
		let Msg = Message.Value;

		if (Msg.length < 1) Message.channel.send("Please provide a min value and a max value.");
		else {
			Msg = Msg.split(" ");

			if (Msg.length >= 2) {
				let Min = parseInt(Msg[0]);
				let Max = parseInt(Msg[1]);

				if (!isNaN(Min) && !isNaN(Max)) {
					if (Min < Max) {
						Message.channel.send("The generated random number between " + Min.toString() + " and " + Max.toString() + " is: " + RandomNum(Date.now(), Min, Max).toString() + ".");

					} else {
						Message.channel.send("The Min value should be smaller than the Max value.");
					}

				} else {
					Message.channel.send("What do you do? One of the Min or Max value is not a valid number.");
				}

			} else {
				Message.channel.send("Please provide a min value and a max value.");
			}
		}
	}
};
