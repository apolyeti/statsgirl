const { SlashCommandBuilder } = require('discord.js');

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
        await interaction.reply(`${interaction.user.username} is improving themselves by: ${interaction.options.getString('act', true)}
        
${interaction.user.username} deserves ${interaction.options.getInteger('points', true)} points for this!`)
    },
};