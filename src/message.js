const { MessageEmbed } = require('discord.js');

module.exports = {
    buzzerMsg: (players) => {
        let playerInfo = ``
        players.forEach(player => {
            playerInfo += `${player.color.emoji}  ${player.nick} \n`
        })

        return new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Emergency Meeting')
            .setDescription('The tension is tense between the sussy\nbakas. You are tasked to decide who will\nbe the next among us to go spend\nsome time in the infamous Horny Jail.\nGood Luck! ඞ')
            .setThumbnail('https://static.wikia.nocookie.net/among-us-wiki/images/b/b5/MIRA_HQ_Emergency_Button.png/revision/latest/scale-to-width-down/250?cb=20210206205127')
            .addFields({ name: 'Who is the impostor?', value: playerInfo }, )
            .setImage('https://guides.gamepressure.com/among-us/gfx/word/199189343.jpg')
            .setTimestamp()
    },
    ejectMsg: (ejectedPlayer) => {
        return new MessageEmbed()
            .setColor(ejectedPlayer.color.hex)
            .setTitle(`${ejectedPlayer.nick} has been ejected.`)
            .setThumbnail('https://ih1.redbubble.net/image.1938982133.2116/pp,840x830-pad,1000x1000,f8f8f8.jpg')
    }
}