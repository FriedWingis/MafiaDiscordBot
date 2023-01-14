const { ActivityType } = require('discord.js');

module.exports = {
    name: "ready",
    once: true,

    async execute(client) {
        await client.user.setPresence({
            activities: [
                {
                    name: "over the gang | .gg/mafiaontop",
                    type: ActivityType.Watching,
                },
            ],

            status: "dnd",
        });

        log(`${client.user.tag} has successfully logged in and authenticated with Discord!`)
    },
};

function log(what) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] [INFO-LOG] ${what}`);
};