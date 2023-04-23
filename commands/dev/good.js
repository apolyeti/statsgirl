const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('good')
        .setDescription("for all the good things you've done as a person")
        .addStringOption(option =>
            option.setName('good_thing')
                .setDescription('whatever good thing you did')
                .setRequired(true)),
        
    async execute(interaction) {
        await interaction.reply(`${interaction.user.username} is improving themselves by: ${interaction.options.getString('good_thing', true)}`)
    },
};