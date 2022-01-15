const env = require('dotenv').config().parsed;
const { Client, Intents, Message, MessageReaction } = require('discord.js');
const keys = require('./src/commands/index.js');
const colors = require('./src/colors.js')
const message = require('./src/message.js');
const newReaction = require('./src/newReaction.js');

let bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

global.bot = bot
global.msg = undefined
global.caller = undefined
global.players = []
global.result = []

bot.on('ready', () => {
    //insert init code
});

bot.on('message', async(msg) => {
    global.msg = msg
    global.caller = msg.member
    for (let i = 0; i < keys.data.length; i++) {
        let words = msg.content.split(' ')
        if (keys.data[i].name.indexOf(words[0]) != -1) {
            keys.data[i].func(msg, words)
        };
    };
});

bot.on('messageReactionAdd', (MessageReaction, User) => {
    let vote = colors.find(obj => obj.utf8 == MessageReaction.emoji.name)
    newReaction(vote.name, User.id, global.players);
});

bot.login(env.TOKEN)