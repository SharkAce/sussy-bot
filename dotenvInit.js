const readline = require('readline');
const fs = require('fs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Discord token: ', function(token) {
    rl.question('Jail channel ID: ', function(jail) {
        fs.writeFileSync('.env', `TOKEN=${token}\nJAIL_CHANNEL=${jail}`)
        rl.close();
    });
});

rl.on('close', function() {
    process.exit(0);
});
