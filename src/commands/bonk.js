module.exports = (bonkedUser) => {
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
                    }
                })
            }, 1000);
        })
    })
}