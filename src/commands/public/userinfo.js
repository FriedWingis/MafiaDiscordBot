const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("whois")
    .setDescription("Get information about a specific user.")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user.").setRequired(false)
    ),

  async execute(interaction, client) {
    const { options } = interaction;
    const user = options.getUser("user") || interaction.user;
    const member = await interaction.guild.members.cache.get(user.id);

    const embed = new EmbedBuilder()
      .setColor(config.color)
      .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .addFields(
        { name: "Name", 
          value: `${user}`,
          inline: false,
        },
        {
          name: "Roles",
          value: `${member.roles.cache.map((r) => r).join(`, `)}`,
          inline: false,
        },
        {
          name: "Joined TheMafia",
          value: `${member.joinedAt.toLocaleDateString("en-US")}`,
          inline: true,
        },
        {
          name: "Created On",
          value: `${member.user.createdAt.toLocaleDateString("en-US")}`,
          inline: true,
        },
      )
      .setFooter({
        text: config.footer,
        iconURL: client.user.displayAvatarURL(),
      });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
