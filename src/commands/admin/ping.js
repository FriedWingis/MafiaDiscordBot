const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows current API and Client latency.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("Latency Check")
      .setDescription("Information retrieved at light speed! Kind of. :)")
      .setColor(config.color)
      .addFields([
        {
          name: "API Latency:",
          value: client.ws.ping + "ms",
        },
      ])
      .setFooter({
        text: config.footer,
        iconURL: client.user.displayAvatarURL(),
      });

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
