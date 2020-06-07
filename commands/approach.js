var dioQuotes = [
    'MUDA MUDA MUDA MUDA MUDA!',
    'WRRRRRRRRRRRRRRYYYYYYYYYY',
    'KONO DIO DA!',
    'ROAD ROLLLAAA'
    ];

var approach = (message, args) => {
    const idx = Math.floor(Math.random() * dioQuotes.length);
    message.channel.send(dioQuotes[idx]);
}

module.exports = {
    name: 'approach',
    aliases: ['muda'],
    description: 'DIO ATTACKS!',
    cooldown: 5,
    execute: approach,
};
