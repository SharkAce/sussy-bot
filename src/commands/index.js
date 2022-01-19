class Command {
    constructor(name, func, help = "No help provided") {
        this.name = name;
        this.func = func;
        this.help = help;
    }
}

class Board {
    constructor() {
        this.data = []
    }
    add(name, func, help) {
        this.data.push(new Command(name, func, help))
    }
}

let commands = new Board();
let requireDir = require('require-dir')
let data = requireDir('./')

/* --Create commands here-- */


commands.add(["!buzzer", "!emergency meeting"], data.buzzer, "Start an emergency meeting");

commands.add(["!end"], data.endBuzzer, "End the current emergency meeting")

commands.add(["!bonk"], data.bonk, "Use your powers to bonk someone without democracy")

/* --End-- */


module.exports = commands