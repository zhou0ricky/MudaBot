const { deleteAll } = require("../handlers/dbFuncs");
const { stands, standStats } = require("../handlers/dbSetup");

var testdeleteall = (message, args) => {
    deleteAll(stands);
    deleteAll(standStats);
    return 
}

module.exports = {
    name: "testdeleteall",
    execute: testdeleteall,
}