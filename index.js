const env = require('dotenv').config().parsed;
const { Client, Intents, Message } = require('discord.js');
const keys = require('./src/commands/index.js')



let bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

bot.on('ready', () => {
    //console.log(bot.channels);
    bot.channels.fetch(env.CHANNEL)
        .then((channel) => {
            //channel.send("The sussyness has started")
        });
});

bot.on('message', async(msg) => {
    for (let i = 0; i < keys.data.length; i++) {
        if (keys.data[i].name.indexOf(msg.content) != -1) {
            keys.data[i].func(msg)
        };
    };
});

bot.login(env.TOKEN)