const { SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js');
const { Users } = require('../../dbObjects.js');
const userPoints = new Collection();


async function subPoints(name, id, points, collection) {
    if (points < 0) {
        return 'negative';
    }
    if (points > 30) {
        return 'null';
    }
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
        let test = await subPoints(interaction.user.username, interaction.user.id, interaction.options.getInteger('points'), userPoints);
        if (test == 'null') {
            await interaction.reply({ephemeral: true, content: "you can't take away more than 30 points, i know you're a bad person but come on"})
            return;
        }
        if (test == 'negative') {
            await interaction.reply({ephemeral: true, content: "nice try, but i planned for that :)"})
            return;
        }
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