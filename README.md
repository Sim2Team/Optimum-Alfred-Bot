# Optimum-Alfred-Bot

Optimum-Alfred-Bot is a discord bot written in Node.js / Discord.js for the [Sim2Server](https://sim2team.github.io/wiki/server).


## Features
Optimum-Alfred-Bot has the following features as of the latest commit:


### Dev Commands

**Commands for Optimum Alfred Developers only.**

- [x] `JavaScript <JavaScript Code>` / `JS <JavaScript Code>` - Runs JavaScript code.
- [x] `LSDev` - Manage the Level System.\nUsage example: `-t <Type [add, set, remove]> -u <Username / Nickname> -c <Category [points, emotes, contributions]> -a <Amount>`. Additionally to Add, Set and Remove, you can also use `-t streammode` to switch to stream mode or back to normal.
- [x] `Reload <Command>` - Reloads a command.
- [x] `Shutdown` - Save the Level System data back to a file and shut the bot down.
- [x] `Status [Message To Set]` - Does some Status stuff, such as setting it randomly, or to a specific string.


### Fun Commands

**Some fun commands for the bot, such as generating a random value.**

- [x] `Quiz [Game] [ID]` - Some Quiz fun stuff. Provide the game name as the first argument, then optional the Quiz ID to get the correct answer for that question.
- [x] `Random [Min Value] [Max Value]` - Just generates a random value between a Min and Max value.
- [x] `Xizzlefied [Message]` / `Xizzified [Message]` - Sorta like Owoify and modifying words, but instead with Xizzle and shuffling the word order. You can also use '-l' as the first argument to use the last message instead.


### General Commands

**Some general things, such as showing info about the bot or the Help.**

- [x] `About` - Shows some information about the bot.
- [x] `Help [category] [command]` - Shows a list of categories, commands, or info about a command.


### Server Commands

**Commands related to Sim2Server, such as the Level System, or the Rules.**

- [x] `LevelSystem [argument]` / `LS [argument]` - A command related to the Sanity Level System. You can use an optional argument called "lb" for a Leaderboard or "levels" for the Levels or a user's nickname to show the User Info of the Level System.
- [x] `Rule [command]` - Sends a specific rule.


### Sim2Team Commands

**Commands related to Sim2Team, such as Sim2Research and Sim2Editor.**

- [x] `Sim2Editor [command]` / `S2Editor [command]` - Some commands related to [Sim2Editor](https://sim2team.github.io/sim2editor/).
- [x] `Sim2Guide [Guide]` / `S2Guide [Guide]` - Links to some things from the Sim2Team wiki site Guides Section.
- [x] `Sim2Research [game] [urlpath]` / `S2Research [game] [urlpath]` - Links to some things from the Sim2Team wiki site Research Section. The URL Path needs to start by `https://sim2team.github.io/wiki/research/game/`.


### The Sims 2 Commands

**Commands related to The Sims 2, such as the Cast Member List.**

- [x] `S2CastList [command]` / `S2CastMember [command]` - Displays information about the cast members from The Sims 2 Game Boy Advance and Nintendo DS.


## Credits
### Main Developers
- [Pk11](https://github.com/Epicpkmn11)
- [SuperSaiyajinStackZ](https://github.com/SuperSaiyajinStackZ)