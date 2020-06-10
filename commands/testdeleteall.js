const { deleteAll } = require("../handlers/dbFuncs");

var testdeleteall = (message, args) => {
    const client = message.client; 
    deleteAll(client);
    return 
}

module.exports = {
    name: "testdeleteall",
    execute: testdeleteall,
}