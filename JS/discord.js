const Discord = require("discord.js"),
    client = new Discord.Client(),
    settings = require("../settings.json"),
    index = require("./index"),
    path = require("path"),
    fs = require("fs"),
    appdata = process.env.APPDATA,
    discorddata = path.join(appdata, "discord", "Local Storage", "leveldb");

function start() {
    client.login(settings["auto-token"] ? getToken() : settings["discord-token"]);

    client.on("ready", () => {
        console.log("\nConnected to Discord as " + client.user.tag);
    });

    client.on("message", async (message) => {
        if (message.author.id === client.user.id) {
            return;
        }

        if (message.channel.type === "dm") {
            return index.notif("Risisinge-Notifier", `${message.author.username} sent you a DM`);
        }

        if (message.isMentioned(client.user)) {
            index.notif("Risisinge-Notifer", `${message.member ? message.member.nickname : message.author.username} mentionned you in #${message.channel.name} (${message.guild.name})`);
        }
    });
}

function getToken() {
    if(!isValidLevelDb(path.join(appdata, "discord"))) {
        console.log("LevelDB are invalids.");
        return settings["token"];
    }

    let token = retrieveToken();

    if(!token) {
        console.log("Failed to retrieve token from LevelDB.");
        return settings["token"];
    }

    console.log("Got token from Discord's files");
    return token;
}

function isValidLevelDb(search) {
    let ls = fs.lstatSync(search);

    if(ls.isDirectory()) {
        let files = fs.readdirSync(discorddata);

        for(let file of files) {
            if(file.endsWith(".ldb") && fs.readFileSync(path.join(discorddata, file)).includes("oken")) {
                search += file;
                return file.endsWith(".ldb");
            }
        }
        return search.endsWith(".ldb");
    }
    return false;
}

function retrieveToken() {
    let res = "";
    let bytes;
    let files = fs.readdirSync(discorddata);
    for(let file of files) { if(file.endsWith(".ldb") && fs.readFileSync(path.join(discorddata, file)).includes("oken")) bytes += getBytes(path.join(discorddata, file)); }
    let token = bytes.toString();

    while(token.includes("oken")) {
        let array = fromIndex(token).split('"');
        res += array[0];
        token = array.join("\"");
    }
    return res.slice(8).substr(0, 88);
}

function fromIndex(search) {
    let array = search.substr(search.indexOf("oken") + 4).split('"');
    let list = new Set();
    list.add(array);
    list.delete(0);
    array = Array.from(list);
    return array.join("\"");
}

function getBytes(file) {
    return Buffer.from(fs.readFileSync(file));
}

function stop() {
    console.log("Disconnected from Discord");
    client.destroy();
}

module.exports = {
    start,
    stop,
    getToken
}