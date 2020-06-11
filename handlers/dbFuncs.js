// Variables needed: database table (stands)
// username, stand
var addTuple = async (table, username, standname) => {
    try { 
        const stand = await table.create({
            user: username,
            stand: standname,
        });
        return console.log("stand added to database");
    }
    catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            console.log("Stand/User already exists.")
        }
        console.log("database error");
    }
}

var getTuple = async (table, username) => {
    const standTup = await table.findOne( {where: {user: username} });
    if (standTup) {
        return standTup.get('stand');
    }
    return false;
}

var allTuples = async (table) => {
    const standList = await table.findAll({attributes: ['user', 'stand']});
    console.log(standList);
    const standString = standList.map(t => t.user + ' ' + t.stand).join('\n')
    return standString;
}

var deleteTuple = async (table, username) => {
    await table.destroy({ where: { user: username } });
}

var deleteAll = async (table) => {
    await table.destroy({ where: {}, truncate: true});
}

module.exports =  {
    addTuple: addTuple,
    getTuple: getTuple,
    allTuples: allTuples,
    deleteTuple: deleteTuple,
    deleteAll: deleteAll,
}