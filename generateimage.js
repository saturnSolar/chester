const Canvas = require("canvas")
const Discord = require("discord.js")

const background = "https://i.imgur.com/9M8JtNp.png"

const dim = {
    width: 1920,
    height: 1080,
    margin: 50
}

const generatedImage = async (member) => {
    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const context = canvas.getContext("2d")

    const bg = await Canvas.loadImage(background)
    context.drawImage(bg, 0, 0)

    context.fillStyle = "white"
    context.textAlign = "center"

    context.font = "200px Roboto"
    context.fillText(`here you go ${member.user.username} :)`, dim.width/2, 200)
    context.strokeText(`here you go ${member.user.username} :)`, dim.width/2, 200)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generatedImage