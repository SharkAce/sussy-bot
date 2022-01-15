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

const { buzzer } = require('./buzzer.js');
commands.add(["!buzzer", "!emergency meeting"], buzzer);

const { endBuzzer } = require('./endBuzzer.js');
commands.add(["!end"], endBuzzer)

const { bonk } = require('./bonk.js')
commands.add(["!bonk"], bonk)

module.exports = commands