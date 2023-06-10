const { SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js');
const userPoints = new Collection();
const { Users } = require('../../dbObjects.js')
  

// helper function for fetching points
async function getPoints(id, collection) {
    const user = collection.get(id);
    if (user) {
        return user.points;
    }
    const newUser = await Users.create({ user_id: id, points: 0 });
    collection.set(id, newUser);
    return newUser.points;
}





module.exports = {
    // make the command
    data: new SlashCommandBuilder()
        .setName('points')
        .setDescription("how many points you have"),

    // execute the command
    async execute(interaction) {
        // grab everything from db
        const storedPoints = await Users.findAll();
        // throw everything into collection
        storedPoints.forEach(p => userPoints.set(p.user_id, p));
        let points = await getPoints(interaction.user.id, userPoints)
        const sendEmbed = new EmbedBuilder()
            .setColor('#77d5e6')
            .setTitle('points')
            .setDescription(`you have ${points} points`)
            .setImage(interaction.user.avatarURL())
        await interaction.reply({ embeds: [sendEmbed] })
    },
};