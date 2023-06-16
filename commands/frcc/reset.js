const { SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js');
const { Users } = require('../../dbObjects.js');
const userPoints = new Collection();

async function resetPoints(id, collection) {
    const user = collection.get(id);
    if (user) {
        user.points = 0;
        return user.save();
    }
    const newUser = await Users.create({ user_id: id, points: 0 });
    collection.set(id, newUser);
    return newUser;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription("resets your points"),
    async execute(interaction) {
        const storedPoints = await Users.findAll();
        storedPoints.forEach(p => userPoints.set(p.user_id, p));
        await resetPoints(interaction.user.id, userPoints)
        const sendEmbed = new EmbedBuilder()
            .setColor('#ffffff')
            .setTitle('cleared')
            .setDescription(`your points have been reset!`)
            .setImage(interaction.user.avatarURL())
        await interaction.reply({ embeds: [sendEmbed] })
    }
}