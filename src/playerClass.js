module.exports = class Player {
    constructor(id, nick, color) {
        this.id = id;
        this.nick = nick;
        this.color = color;
        this.vote = undefined;
    }
}