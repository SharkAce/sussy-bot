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
            let ejectedPlayer = global.players.find(obj => obj.color.name == selKeys[0]);
            console.log(`${ejectedPlayer.nick} was ejected`);
            global.msg.channel.send(ejectMsg(ejectedPlayer));
            global.caller.voice.channel.members.forEach((member) => {
                if (member.id == ejectedPlayer.id) {
                    member.voice.setChannel(global.msg.guild.channels.cache.get(env.JAIL_CHANNEL))
                }
            })
        }
        global.msg.member.voice.channel.join().then(connection => {
            const dispatcher = connection.play('./sounds/Bonk.mp3');
            dispatcher.on("finish", () => {
                global.msg.member.voice.channel.leave()
            })
        })
    }
}