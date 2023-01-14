const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
     .setName("status")
     .setDescription("Shows the bot's information and current status.")
     .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setAuthor({
            name: "| Bot Status",
            iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription('TheMafia bot was proudly made in Discord.js version 14 by FriedWingis#0420!')
        .setColor(config.color)
        .addFields([
            {
                name: "Bot Status:",
                value: '> **GOOD (ONLINE)**',
                inline: true,
            },
            {
                name: "API Latency:",
                value: '> ' + client.ws.ping + 'ms',
                inline: true,
            },
            {
                name: `Loaded Commands: (${global.commands.length})`,
                value: `> ${global.commands}`,
            },
            {
                name: `Loaded Events: (${global.events.length})`,
                value: `> ${global.events}`,
            },
        ])
        .setFooter({
            text: config.footer,
            iconURL: client.user.displayAvatarURL(),
        });

        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        })
    },
};