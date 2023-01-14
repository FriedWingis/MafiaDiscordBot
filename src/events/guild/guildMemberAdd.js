const { EmbedBuilder } = require("discord.js");
const gifs = [
  "https://media.giphy.com/media/SU83awLaPYgWaMC0XU/giphy.gif",
  "https://media.giphy.com/media/CpcpDSci3ljCU/giphy.gif",
  "https://media.giphy.com/media/SIY7zXY5QMULu/giphy.gif",
];

module.exports = {
  name: "guildMemberAdd",

  async execute(member, client) {
    const channel = member.guild.channels.cache.get(config.channels.welcome);
    const rGif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setTitle(`Welcome to TheMafia, ${member.user.username}!`)
      .setDescription(
        "We are a community Discord server where everyone is treated like family. Featuring **giveaways**, plenty of **voice channels**, free PPV fight **live-streams**, and more! You are an official member of **TheMafia** and we hope you enjoy your stay :)"
      )
      .setImage(rGif)
      .setThumbnail(member.user.displayAvatarURL())
      .setColor(config.color)
      .setFooter({
        text: config.footer,
        iconURL: client.user.displayAvatarURL(),
      });

    await channel.send({
      content: `${member}`,
      embeds: [embed],
    });
  },
};
