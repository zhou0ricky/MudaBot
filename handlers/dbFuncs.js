// Variables needed: database table (stands)
// username, stand
var addTuple = async (client, username, standname) => {
    try { 
        const stand = await client.stands.create({
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

var getTuple = async (client, username) => {
    const standTup = await client.stands.findOne( {where: {user: username} });
    if (standTup) {
        return standTup.get('stand');
    }
    return null;
}

var allTuples = async (client) => {
    const standList = await client.stands.findAll();
    return standList;
}

var deleteTuple = async (client, username) => {
    await client.stands.destroy({ where: { user: username } });
}

module.exports =  {
    addTuple: addTuple,
    getTuple: getTuple,
    allTuples: allTuples,
    deleteTuple: deleteTuple,
}