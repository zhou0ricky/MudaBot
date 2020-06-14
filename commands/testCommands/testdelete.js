const { deleteTuple } = require("../../handlers/dbFuncs");
const { stands } = require("../../handlers/dbSetup"); 

function getId(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];
	return id;
}

const testdelete = (message, args) => { 
    if (args.length < 1) { return message.channel.send("testDelete takes in 1 arguments") };
    const guildId = message.guild.id;
    const userId = getId(args[0])
    if (!userId) return message.reply("the argument wasn't a mention.")
    deleteTuple(stands,
        {
            where: { guildId: guildId, userId: userId}
        });
    return 
}

module.exports = {
    name: "testdelete",
    commandType: "testing",
    execute: testdelete,
}