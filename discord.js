const Discord = require("discord.js")
const client = new Discord.Client()
const settings = require("./settings")
const index = require("./index.js")
function start() {
    client.on("ready", () =>{
        console.log("Connected to discord")
    })
    client.on("message", async (message) => {
        if (message.author.id == client.user.id) return;
        if (message.channel.type == "DM") return index.notif("Risisinge-Notifier", `${message.author.username} sent you a DM`)
        if (message.isMentioned(client.user)) {
            index.notif("Risisinge-Notifer", `${message.member.nickname || message.author.username} mentionned you in #${message.channel.name} (${message.guild.name})`)
        }
    })

    client.login(settings["discord-token"])
}

module.exports.start = start