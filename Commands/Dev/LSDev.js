/*
	Optimum Alfred's Level System (Developer) Handler implementation.

	Manage the Level System.
*/


/*
	Add a specific amount of points to a specific category.
	
	User: The Username from the Level System.
	Category: The Category to add the amount to.
	Amount: The amount to add.
*/
function AddCategory(Alfred, Message, User, Category, Amount) {
	let UserObjKeys = Object.keys(Alfred.LevelSystem.users);
	let UserObj = undefined;

	/* Search if the name is found. */
	for (let Idx = 0; Idx < UserObjKeys.length; Idx++) {
		if (Alfred.LevelSystem.users[UserObjKeys[Idx]].name.toLowerCase().includes(User)) {
			UserObj = Alfred.LevelSystem.users[UserObjKeys[Idx]];
			break;
		}
	}

	if (!UserObj) Message.channel.send(User + " is not found in the Level System.");
	else {
		/* Now check the category. */
		switch(Category) {
			case "points":
				if (UserObj.points + Amount <= Alfred.LevelSystem.pointlimit) {
					UserObj.points += Amount;
					Message.channel.send("Added " + Amount.toString() + " Point(s) to " + User + ".");
				}
				break;

			case "emotes":
				if (UserObj.emotes + Amount <= Alfred.LevelSystem.pointlimit) {
					UserObj.emotes += Amount;
					Message.channel.send("Added " + Amount.toString() + " Emote(s) to " + User + ".");
				}
				break;

			case "contributions":
				if (UserObj.contributions + Amount <= Alfred.LevelSystem.pointlimit) {
					UserObj.contributions += Amount;
					Message.channel.send("Added " + Amount.toString() + " Contribution(s) to " + User + ".");
				}
				break;
		}
	}
}


/*
	Set a specific amount of points to a specific category.
	
	User: The Username from the Level System.
	Category: The Category to set the amount to.
	Amount: The amount to set.
*/
function SetCategory(Alfred, Message, User, Category, Amount) {
	let UserObjKeys = Object.keys(Alfred.LevelSystem.users);
	let UserObj = undefined;

	/* Search if the name is found. */
	for (let Idx = 0; Idx < UserObjKeys.length; Idx++) {
		if (Alfred.LevelSystem.users[UserObjKeys[Idx]].name.toLowerCase().includes(User)) {
			UserObj = Alfred.LevelSystem.users[UserObjKeys[Idx]];
			break;
		}
	}

	if (!UserObj) Message.channel.send(User + " is not found in the Level System.");
	else {
		/* Now check the category. */
		switch(Category) {
			case "points":
				if (Amount <= Alfred.LevelSystem.pointlimit) {
					UserObj.points = Amount;
					Message.channel.send("Set " + Amount.toString() + " Point(s) to " + User + ".");
				}
				break;

			case "emotes":
				if (Amount <= Alfred.LevelSystem.pointlimit) {
					UserObj.emotes = Amount;
					Message.channel.send("Set " + Amount.toString() + " Emote(s) to " + User + ".");
				}
				break;

			case "contributions":
				if (Amount <= Alfred.LevelSystem.pointlimit) {
					UserObj.contributions = Amount;
					Message.channel.send("Set " + Amount.toString() + " Contribution(s) to " + User + ".");
				}
				break;
		}
	}
}


/*
	Removes a specific amount of points of a specific category.
	
	User: The Username from the Level System.
	Category: The Category to remove the amount from.
	Amount: The amount to remove.
*/
function RemoveCategory(Alfred, Message, User, Category, Amount) {
	let UserObjKeys = Object.keys(Alfred.LevelSystem.users);
	let UserObj = undefined;

	/* Search if the name is found. */
	for (let Idx = 0; Idx < UserObjKeys.length; Idx++) {
		if (Alfred.LevelSystem.users[UserObjKeys[Idx]].name.toLowerCase().includes(User)) {
			UserObj = Alfred.LevelSystem.users[UserObjKeys[Idx]];
			break;
		}
	}

	if (!UserObj) Message.channel.send(User + " is not found in the Level System.");
	else {
		/* Now check the category. */
		switch(Category) {
			case "points":
				if (UserObj.points - Amount >= 0) {
					UserObj.points -= Amount;
					Message.channel.send("Removed " + Amount.toString() + " Point(s) from " + User + ".");
				}
				break;

			case "emotes":
				if (UserObj.emotes - Amount >= 0) {
					UserObj.emotes -= Amount;
					Message.channel.send("Removed " + Amount.toString() + " Emote(s) from " + User + ".");
				}
				break;

			case "contributions":
				if (UserObj.contributions - Amount >= 0) {
					UserObj.contributions -= Amount;
					Message.channel.send("Removed " + Amount.toString() + " Contribution(s) from " + User + ".");
				}
				break;
		}
	}
}


/* Toggle the Stream Mode state. */
function ToggleStreammode(Alfred, Message) {
	if (Alfred.LevelSystem.streammodeon == false) Alfred.LevelSystem.streammodeon = true;
	else Alfred.LevelSystem.streammodeon = false;

	Message.channel.send("Set the Stream Mode to: " + (Alfred.LevelSystem.streammodeon ? "On" : "Off") + ".");
}


/* Fetching the arguments provided. */
function FetchArgs(Args) {
	let Obj = { "Type": "", "User": "", "Category": "", "Amount": "" };
	let FetchType = "";

	for (let Idx = 0; Idx < Args.length; Idx++) {
		switch(Args[Idx]) {
			case "-t": FetchType = "Type"; break;
			case "-u": FetchType = "User"; break;
			case "-c": FetchType = "Category"; break;
			case "-a": FetchType = "Amount"; break;
			default: {
				if (FetchType == "") break;

				/* User => Also fetch names with a space. */
				if (FetchType == "User") {
					if (Obj["User"] != "") Obj["User"] += " " + Args[Idx];
					else Obj["User"] += Args[Idx];

				} else {
					Obj[FetchType] += Args[Idx];
				}

				break;
			}
		}
	}

	return Obj;
}


/* Module: LevelSystem for Devs. */
module.exports = {
	Names: ["LevelSystemDev", "LSDev"],
	Usage: "-t <Type [add, set, remove, vc]> -u <Username / Nickname> -c <Category [points, emotes, contributions]> -a <Amount>`",
	Description: "Manage the Level System. Additionally to Add, Set and Remove, you can also use `-t streammode` to switch to stream mode or back to normal. For the VC Type, '-a' are the minutes.",
	Dev: true,
	Handler(Message, Alfred) {
		const Args = Message.Value.toLowerCase().split(" ");
		
		if (Args.length > 0) {
			let Obj = FetchArgs(Args);

			if (Obj["Type"] == "add" || Obj["Type"] == "set" || Obj["Type"] == "remove" || Obj["Type"] == "vc") {
				let Amount = parseInt(Obj["Amount"]);

				if (!isNaN(Amount)) {
					switch(Obj["Type"]) {
						case "add": AddCategory(Alfred, Message, Obj["User"], Obj["Category"], Amount); break;
						case "set": SetCategory(Alfred, Message, Obj["User"], Obj["Category"], Amount); break;
						case "remove": RemoveCategory(Alfred, Message, Obj["User"], Obj["Category"], Amount); break;
						/* Special case for this, -a are the minutes on there. */
						case "vc": {
							/* Get the points in the specific stream mode state. */
							const Points = (Amount * ((Alfred.LevelSystem.streammodeon ? Alfred.LevelSystem.streammodepoints : Alfred.LevelSystem.msgpoints) * 2));
							AddCategory(Alfred, Message, Obj["User"], "points", Points);
							break;
						}
					}

				} else {
					Message.channel.send("Not a valid amount.");
				}

			} else if (Obj["Type"] == "streammode") {
				ToggleStreammode(Alfred, Message);

			} else {
				Message.channel.send("Not a valid type specified.");
			}
		}
	}
}