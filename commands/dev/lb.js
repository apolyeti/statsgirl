const { SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js');
const userPoints = new Collection();
const { Users } = require('../../dbObjects.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('lb')
        .setDescription("lists all the people"),
        
    async execute(interaction) {
        const storedPoints = await Users.findAll((
            { order: [ ['points', 'DESC'] ] }
        ));
        storedPoints.forEach(p => userPoints.set(p.user_id, p));
        let lb = '';
        for (let i = 0; i < userPoints.size; i++) {
            lb += `${i + 1}. ${userPoints.at(i).username}: ${userPoints.at(i).points}\n`
        }
        const sendEmbed = new EmbedBuilder()
            .setColor('#77d5e6')
            .setTitle('leaderboard')
            .setDescription(lb)
        await interaction.reply({ embeds: [sendEmbed] })
    },
};