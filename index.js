const electron  = require("electron")
const app       = electron.app
const notifier  = require('node-notifier');
const discord   = require("./discord")

app.on("ready", () => {
    createWindow()
    discord.start()
})

function notif(title, message) {
    notifier.notify({
        title: title,
        message: message,
        icon: "./src/singe.png"
    })
}

function createWindow() {
    let win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        icon: "./src/singe.png",
        webPreferences: {
            nodeIntegration: true
        }
    })

    //win.setMenu(null)
    win.loadFile("./views/index.html")
}

module.exports.notif = notif
