const bonk = require('./bonk.js')

module.exports = (msg) => {
    try {
        function Counter(array) {
            array.forEach(val => this[val] = (this[val] || 0) + 1);
        }
        global.result = new Counter(result)
        let max = Math.max(...Object.values(result))
        let selKeys = Object.keys(result).filter((obj) => result[obj] == max);
        let vc = global.msg.member.voice.channel

        if (selKeys.length != 1) {
            if (selKeys.length != 0) {
                global.msg.channel.send({ content: `It's a tie between ${selKeys[0]} and ${selKeys[1]}.`, code: "txt" })
            }
            vc.leave()
        } else {
            let bonkedUser = global.players.find(obj => obj.color.name == selKeys[0]);
            bonk(bonkedUser)
        }
    } catch (err) {
        console.log(err.message)
        global.msg.channel.send({ content: `Error : No meeting in progress.`, code: 'arm' })
    }
}