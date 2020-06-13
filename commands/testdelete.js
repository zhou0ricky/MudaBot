const { deleteTuple } = require("../handlers/dbFuncs");

var testdelete = (message, args) => {
    const client = message.client; 
    console.log(args);
    if (args.length < 1) { return message.channel.send("testDelete takes in 1 arguments") };
    const username = args[0];
    console.log(`deleting ${username}`);
    deleteTuple(client.stands, 
        {
            where: {user: username}
        });
    return 
}

module.exports = {
    name: "testdelete",
    commandType: "testing",
    execute: testdelete,
}