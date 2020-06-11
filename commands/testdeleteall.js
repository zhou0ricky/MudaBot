const { deleteAll } = require("../handlers/dbFuncs");

var testdeleteall = (message, args) => {
    const client = message.client; 
    deleteAll(client.stands);
    return 
}

module.exports = {
    name: "testdeleteall",
    execute: testdeleteall,
}