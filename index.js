const Discord = require("discord.js")
require("dotenv").config()

const generatedImage = require("./generateImage")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "test"){
        message.reply("test1")
    }
})

client.on("messageCreate", async(message) => {
    if (message.content == "donut"){
        const img = await generatedImage(message.member)
        message.channel.send({
            content: `<@${message.member.id}> yummy`,
            files: [img]
        })
    }
})

client.login(process.env.token)