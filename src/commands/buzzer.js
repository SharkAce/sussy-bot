const colors = require('../colors.js')
const newMessage = require('../message.js')

const buzzer = async(msg) => {
    class Player {
        constructor(nick, color) {
            this.nick = nick;
            this.color = color
        }
    }
    let players = [],
        i = 0
    msg.member.voice.channel.members.forEach((member) => {
        if (!member.user.bot) {
            let nick
            if (member.nickname == null) {
                nick = member.user.username
            } else {
                nick = member.nickname
            }
            players.push(new Player(nick, colors[i]))
            i++
        }
    })

    let m = await msg.channel.send(newMessage(players));
    for (let player of players) {
        await m.react(player.color.utf8)
    }

}
module.exports = buzzer