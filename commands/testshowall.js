
const { allTuples } = require("../handlers/dbFuncs");

var testshowall = async (message, args) => {
    const client = message.client; 
    const table = await allTuples(client.stands);
    if (!table) return message.channel.send("Table is empty");
    console.log(table);
    message.channel.send(table);
    return 
}

module.exports = {
    name: "testshowall",
    execute: testshowall,
}