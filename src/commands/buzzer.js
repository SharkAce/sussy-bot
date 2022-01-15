const colors = require('../colors.js')
const { buzzerMsg } = require('../message.js')
const Player = require('../playerClass.js')

const buzzer = async(msg, args) => {
    args[1] == undefined ? global.timer = 600000 : global.timer = parseInt(args[1] * 1000)

    global.players = []
    let i = 0
    msg.member.voice.channel.join()
    msg.member.voice.channel.members.forEach((member) => {
        if (!member.user.bot) {
            let nick
            if (member.nickname == null) {
                nick = member.user.username
            } else {
                nick = member.nickname
            }
            global.players.push(new Player(member.id, nick, colors[i]))
            i++
        }
    })
    let m = await msg.channel.send(buzzerMsg(global.players));
    for (let player of global.players) {
        await m.react(player.color.utf8)
    }
}

module.exports = {
    buzzer
}