const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears x amount of messages from chat/user.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to clear.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Target to clear messages.")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    const { channel, options, member } = interaction;

    const embed = new EmbedBuilder().setColor(config.color).setFooter({
      text: config.footer,
      iconURL: client.user.displayAvatarURL(),
    });

    if (!member.roles.cache.has(config.roles.moderator)) {
        return await interaction.reply({
            embeds: [embed.setDescription("You do not have permission to use this command.")],
            ephemeral: true,
        });
    }

    const amount = options.getInteger("amount");
    const target = options.getUser("target");

    const messages = await channel.messages.fetch({
      limit: amount + 1,
    });

    if (target) {
        let i = 0;
        const filtered = [];

        (await messages).filter((msg) => {
            if (msg.author.id === target.id && amount > i) {
                filtered.push(msg);
                i++;
            }
        });

        await channel.bulkDelete(filtered).then(messages => {
            return interaction.reply({
                embeds: [embed.setDescription(`Successfully deleted ${messages.size} messages from ${target}.`)],
                ephemeral: true,
            });
        });
    } else {
        await channel.bulkDelete(amount, true).then(messages => {
            return interaction.reply({
                embeds: [embed.setDescription(`Successfully deleted ${messages.size} messages from this channel.`)],
                ephemeral: true,
            });
        });
    }
  },
};
