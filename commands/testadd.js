
const { addTuple } = require("../handlers/dbFuncs");

var testadd = (message, args) => {
    const client = message.client; 
    console.log(args);
    if (args.length != 2) { return message.channel.send("testAdd takes in 2 arguments") };
    const username = args[0];
    const standname = args[1];
    console.log(`${username} ` + `${standname}`);
    addTuple(client.stands, username, standname);
    return 
}

module.exports = {
    name: "testadd",
    execute: testadd,
}