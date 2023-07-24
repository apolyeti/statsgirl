const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const canvacord = require('canvacord');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spotify')
        .setDescription('spotify card')
        .addUserOption(option => option.setName('user').setDescription('user to get spotify card for')),
    async execute(interaction) {
        let user = interaction.options.getMember('user');

        if (user.bot) { 
            return await interaction.reply({ content: 'enter valid user', ephemeral: true });
        }
        let status;
        if (user.presence.activities.length === 1) {
            status = user.presence.activities[0];
        } else if (user.presence.activities.length > 1) {
            status = user.presence.activities[1];
        }

        if (user.presence.activities.length === 0 || status.name !== 'Spotify' && status.type !== 'LISTENING') {
            return await interaction.reply({ content: 'not listening to spotify', ephemeral: true });
        }

        if (status !== null &&  status.name === 'Spotify' && status.assets !== null) {
            let image = 'https://i.scdn.co/image/' + status.assets.largeImage.slice(8),
            name = status.details,
            artist = status.state,
            album = status.assets.largeText,
            time = status.timestamps;
            const card = new canvacord.Spotify()
                .setAuthor(name)
                .setAlbum(album)
                .setStartTimestamp(time.start)
                .setEndTimestamp(time.end)
                .setImage(image)
                .setTitle(artist);

            const Card = await card.build();
            const attachment = new AttachmentBuilder(Card, {name: 'spotify.png'});
            const embed = new EmbedBuilder()
                .setColor('#1DB954')
                .setTitle(`${user.user.username}'s Spotify`)
                .setImage('attachment://spotify.png')
                .setTimestamp();

            await interaction.reply({ embeds: [embed], files: [attachment] });
        }
    }

}