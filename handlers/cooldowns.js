const Discord = require('discord.js');

// Returns whether the cooldown for a command is active for a user
module.exports = (message, client, command) => {
    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    // Check for existing cooldown
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        // Cooldown is still active
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            message.reply(`please wait ${timeLeft.toFixed(1)} more second(s)` +
                `before reusing the \`${command.name}\` command.`);
            return false
        }
    }

    timestamps.set(message.author.id, now);
    // Automatically reset cooldown after set time
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    return true
}