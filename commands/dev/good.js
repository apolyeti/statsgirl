const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('good')
        .setDescription("for all the good things you've done as a person")
        .addStringOption(option =>
            option.setName('act')
                .setDescription('whatever good thing you did')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('points')
                .setDescription('how many points you think you deserve for being better')
                .setRequired(true)),
        
    async execute(interaction) {
        const sendEmbed = new EmbedBuilder()
        // whats the hex color for green
            .setColor('#54d171')
            .setTitle('good!')
            .setDescription(`${interaction.user.username} did a good thing: ${interaction.options.getString('act')} 
            points deserved: ${interaction.options.getInteger('points')}`)
            .setImage(interaction.user.avatarURL())
        await interaction.reply({ embeds: [sendEmbed] })
    },
};