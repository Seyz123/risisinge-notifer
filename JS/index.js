const electron  = require("electron"),
    app = electron.app,
    discord   = require("./discord"),
    { Notification } = require('electron');

app.on("ready", () => {
    createWindow();
    discord.start();
    new Notification({title: "Risisinge-Notifier", body: "Online!", icon: "../src/singe.png"}).show();
});

function notifier(title, message) {
    new Notification({title: title, body: message, icon: "./src/singe.png"}).show();
}

function createWindow() {
    let win = new electron.BrowserWindow({
        width: 900,
        height: 600,
        icon: "./src/singe.png",
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.setMenu(null);
    win.loadFile("./views/index.html");
}

module.exports.notif = notifier;
