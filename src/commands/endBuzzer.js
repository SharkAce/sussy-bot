const { ejectMsg } = require('../message.js');
const env = require('dotenv').config().parsed;

module.exports = {
    endBuzzer: (msg) => {
        function Counter(array) {
            array.forEach(val => this[val] = (this[val] || 0) + 1);
        }
        global.result = new Counter(result)
        let max = Math.max(...Object.values(result))
        let selKeys = Object.keys(result).filter((obj) => result[obj] == max);

        if (selKeys.length != 1) {
            console.log(`It's a tie between ${selKeys[0]} and ${selKeys[1]}`);
        } else {
            let bonkedUser = global.players.find(obj => obj.color.name == selKeys[0]);
            console.log(`${bonkedUser.nick} was ejected`);
            global.msg.channel.send(ejectMsg(bonkedUser));
            let vc = global.msg.member.voice.channel
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
                                    global.msg.channel.send('You may now leave the Horny Jail')
                                    console.log('time to get back')
                                    member.voice.setChannel(vc)
                                }, global.timer)
                            }
                        })
                    }, 1000);
                })
            })
        }
    }
}