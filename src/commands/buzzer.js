const { VoiceChannel } = require('discord.js')
const { buzzerMsg } = require('../message.js')
const colors = require('../colors.js')
const Player = require('../playerClass.js')

module.exports = async(msg, args) => {
    args[1] == undefined ? global.timer = 600000 : global.timer = parseInt(args[1] * 1000)

    global.players = []
    try {
        msg.member.voice.channel.join()
    } catch (err) {
        console.log(err.message)
        global.msg.channel.send({ content: `Error : Could not connect to the vc`, code: 'arm' })
        return
    }
    let i = 0
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
    if (global.players.length <= 1) {
        global.msg.channel.send({ content: `Error : Not enough users in the vc.`, code: 'arm' })
        msg.member.voice.channel.leave()
        return
    } else if (global.players.length > colors.length) {
        global.msg.channel.send({ content: `Error : Too many users in the vc.`, code: 'arm' })
        msg.member.voice.channel.leave()
    } else {
        let m = await msg.channel.send(buzzerMsg(global.players));
        for (let player of global.players) {
            await m.react(player.color.utf8)
        }
    }
}
