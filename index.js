const env = require('dotenv').config().parsed;
const { Client, Intents, Message, MessageReaction } = require('discord.js');
const board = require('./src/commands/index.js');
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
});

bot.on('message', async(msg) => {
    global.msg = msg
    global.caller = msg.member
    for (let i = 0; i < board.data.length; i++) {
        let args = msg.content.split(' ')
        if (board.data[i].name.indexOf(args[0]) != -1) {
            board.data[i].func(msg, args)
        };
    };
});

bot.on('messageReactionAdd', (MessageReaction, User) => {
    let vote = colors.find(obj => obj.utf8 == MessageReaction.emoji.name)
    newReaction(vote.name, User.id, global.players);
});

bot.login(env.TOKEN)
