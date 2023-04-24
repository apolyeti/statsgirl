const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('bad')
        .setDescription("for doing something that negatively affected yourself or others")
        .addStringOption(option =>
            option.setName('act')
                .setDescription('whatever bad thing you did')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('points')
                .setDescription('how many points you think you deserve to lose')
                .setRequired(true)),
        
    async execute(interaction) {
        const sendEmbed = new EmbedBuilder()
        // whats the hex color for green
            .setColor('#d62d4f')
            .setTitle('bad :(')
            .setDescription(`${interaction.user.username} did a bad thing: ${interaction.options.getString('act')} 
            points lost: ${interaction.options.getInteger('points')}`)
            .setImage(interaction.user.avatarURL())
        await interaction.reply({ embeds: [sendEmbed] })
    },
};