
/**
 * Generic function that creates a record with given attributes to
 * a specified table
 * @param {Model} table
 * @param {Object} attrObj
 */
const addTuple = async (table, attrObj) => {
    try { 
        const stand = await table.findOrCreate({
            where: attrObj,
            defaults: attrObj
        });
        return console.log("added to database");
    }
    catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            console.log("record attribute already exists.")
        }
        console.log("database error");
    }
}

/**
 * Gets a the attribute corresponding to the tuple that satisfies 
 * all the filter conditions in the inputed table
 * @param {Model} table 
 * @param {Object} filters 
 * @param {String} attr 
 */
const getAttr = async (table, filters, attr) => {
    const record = await table.findOne(filters);
    return record ? record.get(attr) : false;
}

/**
 * Returns all tuples with specified attributes in string format
 * @param {Model} table 
 * @param {String Array} attrs
 */
const allTuples = async (table, attrs) => {
    const standList = await table.findAll({attributes: attrs});
    console.log(standList);
    const standString = standList.map(record => attrs.map
        (attr => record.get(attr)).join(" ")).join('\n')
    return standString;
}

/**
 * deletes tuples that satisfy filter conditions
 * @param {model} table 
 * @param {object} filters 
 */
var deleteTuple = async (table, filters) => {
    await table.destroy(filters);
}

/**
 * deletes all tuples from table
 * @param {model} table 
 */
var deleteAll = async (table) => {
    await table.destroy({ where: {}, truncate: true});
}

module.exports =  {
    addTuple: addTuple,
    getAttr: getAttr,
    allTuples: allTuples,
    deleteTuple: deleteTuple,
    deleteAll: deleteAll,
}