const { SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js');
const userPoints = new Collection();
const { Users } = require('../../dbObjects.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('lb')
        .setDescription("lists all the people"),
        
    async execute(interaction) {
        // ranks people by points from highest to lowest
        // const storedPoints = await Users.findAll((
        //     { order: [ ['points', 'DESC'] ] }
        // ));
        const storedPoints = await Users.findAll((
            { order: [ ['points', 'DESC'] ] }
        ));
        storedPoints.forEach(p => userPoints.set(p.user_id, p));
        let lb = '';
        const guild = interaction.guild;
        let rank = 1;
        for (let i = 0; i < userPoints.size; i++) {
            let user = guild.members.cache.get(userPoints.at(i).user_id);
            if (!user) {
                continue;
            } else {
                lb += `${rank}. ${userPoints.at(i).username}: ${userPoints.at(i).points}\n`;
                rank++;
            }
        }
        const sendEmbed = new EmbedBuilder()
            .setColor('#77d5e6')
            .setTitle('leaderboard')
            .setDescription(lb)
        userPoints.clear();
        await interaction.reply({ embeds: [sendEmbed] })
    },
};