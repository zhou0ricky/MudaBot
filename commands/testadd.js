
const { addTuple } = require("../handlers/dbFuncs");

var testadd = (message, args) => {
    const client = message.client; 
    console.log(args);
    if (args.length != 3) { return message.channel.send("testAdd takes in 3 arguments") };
    const username = args[0];
    const id = args[1];
    const standname = args[2];
    console.log(`${username} ` + `${standname}`);
    addTuple(client.stands, 
        {
            user: username,
            userId: id,
            stand: standname
        });
    return 
}

module.exports = {
    name: "testadd",
    execute: testadd,
}