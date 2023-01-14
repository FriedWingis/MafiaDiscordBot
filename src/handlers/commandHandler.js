const { REST, Routes } = require('discord.js');

function loadCommands(client) {
    const fs = require('fs');
    let commands = [];

    const folders = fs.readdirSync('./src/commands');
    for (const folder of folders) {
        const files = fs.readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const command = require(`../commands/${folder}/${file}`);

            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());

            global.commands.push(file);
            log(`Successfully loaded command ${file}`);

            continue;
        }
    }

    const rest = new REST({ version: '10' }).setToken(config.token);
    (async () => {
        try {
            log(`Started refreshing ${commands.length} application (/) commands.`);
    
            const data = await rest.put(
                Routes.applicationGuildCommands(config.clientID, config.guildID),
                { body: commands },
            );
    
            log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            log(error);
        }
    })();
}

function log(what) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] [INFO-LOG] ${what}`);
}

module.exports = { loadCommands };