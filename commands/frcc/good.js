const { SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js');
const userPoints = new Collection();
const { Users } = require('../../dbObjects.js')
  

// helper function for adding points
async function addPoints(name, id, points, collection) {
    if (points < 0) {
        return 'negative';
    }
    if (points > 30) {
        return 'null';
    }
    // perform function
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
    // make the command
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
    // execute the command
    async execute(interaction) {
        // grab everything from db
        const storedPoints = await Users.findAll();
        // throw everything into collection
        storedPoints.forEach(p => userPoints.set(p.user_id, p));
        let test = await addPoints(interaction.user.username, interaction.user.id, interaction.options.getInteger('points'), userPoints)
        if (test == 'null') {
            await interaction.reply({ephemeral: true, content: "you can't give yourself more than 30 points"})
            return;
        }
        if (test == 'negative') {
            await interaction.reply({ephemeral: true, content: "you can't give yourself negative points"})
            return;
        }
        const sendEmbed = new EmbedBuilder()
            .setColor('#54d171')
            .setTitle('good!')
            .setDescription(`${interaction.user.username} did a good thing: ${interaction.options.getString('act')}\npoints deserved: ${interaction.options.getInteger('points')}\nyou now have ${userPoints.get(interaction.user.id).points} points`)
            .setImage(interaction.user.avatarURL())
        await interaction.reply({ embeds: [sendEmbed] })
    },
};