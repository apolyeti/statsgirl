const { SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js');
const { Users } = require('../../dbObjects.js');
const userPoints = new Collection();


async function subPoints(name, id, points, collection) {
    const user = collection.get(id);
    if (user) {
        user.points -= Number(points);
        return user.save();
    }
    points *= -1;
    const newUser = await Users.create({ user_id: id, points, username: name });
    collection.set(id, newUser);
    return newUser;
}


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
        const storedPoints = await Users.findAll();
        storedPoints.forEach(p => userPoints.set(p.user_id, p));
        subPoints(interaction.user.username, interaction.user.id, interaction.options.getInteger('points'), userPoints)
        const sendEmbed = new EmbedBuilder()
        // whats the hex color for green
            .setColor('#d62d4f')
            .setTitle('bad :(')
            .setDescription(`${interaction.user.username} did a bad thing: ${interaction.options.getString('act')} 
            points lost: ${interaction.options.getInteger('points')}
            you now have ${userPoints.get(interaction.user.id).points} points`)
            .setImage(interaction.user.avatarURL())
        await interaction.reply({ embeds: [sendEmbed] })
    },
};