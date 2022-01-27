const { endBuzzer } = require('./commands/endBuzzer.js')


module.exports = (vote, id, players) => {
    let player = players.find(obj => {
        return obj.id == id
    })

    if (player != undefined) {
        if (player.vote == undefined) {
            player.vote = vote
        } else {
            console.warn(`error ${player.nick} tried voting twice`)
            global.msg.channel.send({ content: `error : [${player.nick}] tried voting twice`, code: "arm" })
        }
    }

    global.result = [];
    players.forEach((data) => {
        if (data.vote != undefined) { global.result.push(data.vote) }
    })

    if (result.length == players.length) {
        endBuzzer()
    }
}
