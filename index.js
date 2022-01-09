const Discord = require("discord.js")
const WOKCommands = require("wokcommands")
const path = require("path")
const mongoose = require("mongoose")
require("dotenv").config()

const generatedImage = require("./generateImage")
const messagecounter = require("./message-counter")
//const { default: WOKCommands } = require("wokcommands")

var userlist = []

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", async() => {
    console.log(`logged in as ${client.user.tag}`)
    
    /*new WOKCommands(client, {
        commandsDir: path.join(__dirname, "commands"),
        testServers: "766527846927564810",
    })*/
    messagecounter(client)
    const guildID = "766527846927564810"
    const guild = client.guilds.cache.get(guildID)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application.commands
    }

    commands.create({
        name: "add",
        description: "Add someone to the database. I don't know i'm a cat can you really rely on me?",
        options: [
            {
                name: "member",
                description: "A member.",
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.USER
            }
        ]
    })
})

client.on("interactionCreate", async(interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (interaction.commandName == "add") {
        const member = options.getMember("member")
        interaction.reply({
            content : `Added <@${member.id}>.`
        })
    }
})

client.on("messageCreate", (message) => {
    if (message.content == "test"){
        message.reply("test1")
    }
    if (message.content.indexOf("add") == 0){
        if (message.mentions.users.first()){
            message.reply("yes")
        }
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