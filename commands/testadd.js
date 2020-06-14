
const { addTuple } = require("../handlers/dbFuncs");
const { standStats } = require("../handlers/dbSetup"); 

var testadd = (message, args) => {
    console.log(args);

    if (args.length != 2) { return message.channel.send("testAdd takes in 1 arguments") };
    const standname = args[0];
    const stats = args[1];
    console.log(`${standname} ` + `${stats}`);
    addTuple(standStats,
        {
            stand: standname,
            stats: stats
        })
    return 
}

module.exports = {
    name: "testadd",
    commandType: "testing",
    execute: testadd,
}