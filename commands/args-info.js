var args_info = (message, args) => {
    if (!args.length) {
        return message.channel.send(`Provide more arguments, ${message.author}!`)
    }

    message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`)
}

module.exports = {
    name: "args-info",
    description: "example command that returns arguments",
    execute: args_info,
}
