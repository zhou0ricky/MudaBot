
const { allTuples } = require("../handlers/dbFuncs");
const { stands } = require("../handlers/dbSetup");

var testshowall = async (message, args) => {
    const table = await allTuples(stands, ["guildId", "userId", "stand"]);
    if (!table) return message.channel.send("Table is empty");
    console.log(table);
    message.channel.send(table);
    return 
}

module.exports = {
    name: "testshowall",
    commandType: "testing",
    execute: testshowall,
}