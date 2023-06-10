const { SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js');
const userPoints = new Collection();
const { Users } = require('../../dbObjects.js')

async function addPoints(name, id, points, collection) {
    const user = collection.get(id);
    if (user) {
        user.points += Number(points);
        return user.save();
    }
    const newUser = await Users.create({ user_id: id, points, username: name });
    collection.set(name, id, newUser);
    return newUser;
}





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
        const storedPoints = await Users.findAll();
        storedPoints.forEach(p => userPoints.set(p.user_id, p));
        addPoints(interaction.user.username, interaction.user.id, interaction.options.getInteger('points'), userPoints)
        const sendEmbed = new EmbedBuilder()
            .setColor('#54d171')
            .setTitle('good!')
            .setDescription(`${interaction.user.username} did a good thing: ${interaction.options.getString('act')} 
            points deserved: ${interaction.options.getInteger('points')}
            you now have ${userPoints.get(interaction.user.id).points} points`)
            .setImage(interaction.user.avatarURL())
        // add points to user's balance using sequelize and sqlite
        // const user = await Users.findOne({ where: { user_id: interaction.user.id } });
        // if (user) {
        //     user.points += interaction.options.getInteger('points');
        //     await user.save();
        //     return interaction.reply({ content: `You now have ${user.points} points.` });
        // }
        await interaction.reply({ embeds: [sendEmbed] })
    },
};