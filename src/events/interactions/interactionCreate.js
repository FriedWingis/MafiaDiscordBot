const { CommandInteraction } = require('discord.js');

module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {
        if (!interaction.isChatInputCommand())
            return;

        const command = client.commands.get(interaction.commandName);
        if (!command) {
            const sentMessage = await interaction.reply({
                content: "This command is outdated!",
                ephemeral: true
            });

            return sentMessage;
        }

        command.execute(interaction, client);
        log(`${interaction.user.tag} has issued server command /${command.data.name}`);
    },
};

function log(what) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] [INFO-LOG] ${what}`);
};