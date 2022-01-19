const { ejectMsg } = require('../message.js');
const env = require('dotenv').config().parsed;

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
            console.log(`${bonkedUser.nick} was ejected`);
            global.msg.channel.send(ejectMsg(bonkedUser));
            vc.join().then(connection => {
                const dispatcher = connection.play('./sounds/Bonk.mp3');
                dispatcher.on("finish", () => {
                    setTimeout(() => {
                        vc.members.forEach((member) => {
                            if (member.id == bonkedUser.id) {
                                member.voice.setChannel(
                                    global.msg.guild.channels.cache.get(env.JAIL_CHANNEL)
                                )
                                vc.leave()
                                console.log('timer as started')
                                setTimeout(() => {
                                    global.msg.channel.send({ content: `You may now leave the Horny Jail.`, code: "txt" })
                                    member.voice.setChannel(vc)
                                }, global.timer)
                            }
                        })
                    }, 1000);
                })
            })
        }
    } catch (err) {
        console.log(err.message)
        global.msg.channel.send({ content: `Error : No meeting in progress.`, code: 'arm' })
    }
}