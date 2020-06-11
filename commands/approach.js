// Array of Dio Quotes 
const dioQuotes = [
    'MUDA MUDA MUDA MUDA MUDA!',
    'WRRRRRRRRRRRRRRYYYYYYYYYY',
    'KONO DIO DA!',
    'ROAD ROLLLAAA',
    'ZA WARUDO!',
    'TOKI WO TOMARE!'
];

/**
 * Randomly selects quote from DIO quotes and sends it to channel
 * @param {Object} message 
 * @param {Array} args 
 */
const approach = (message, args) => {
    const idx = Math.floor(Math.random() * dioQuotes.length);
    message.channel.send(dioQuotes[idx]);
}

module.exports = {
    name: 'approach',
    aliases: ['muda'],
    description: "Oh? You're Approaching Me?",
    cooldown: 5,
    execute: approach,
};
