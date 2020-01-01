const Discord = require("discord.js")
const client = new Discord.Client()
const settings = require("../settings")
const index = require("../index.js")

function start() {
    client.on("ready", () =>{
        console.log("Connected (discord)")
    })

    client.on("message", async (message) => {
        if (message.author.id == client.user.id) return;
        if (settings.mute.includes(message.guild.id)) return;
        if (message.channel.type == "DM") return index.notif("Risisinge-Notifier", `${message.author.username} sent you a DM`)
        if (message.isMentioned(client.user)) {
            index.notif("Risisinge-Notifer", `${message.member.nickname || message.author.username} mentionned you in #${message.channel.name} (${message.guild.name})`)
        }
    })

    client.login(settings["token"])
}


function stop() {
    console.log("Disconnected (discord)")
    client.destroy()
}

module.exports.start = start
module.exports.stop = stop