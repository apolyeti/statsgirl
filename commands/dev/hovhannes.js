const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, VoiceConnectionStatus, createAudioResource } = require('@discordjs/voice');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('hovhannes')
        .setDescription('you should definitely use this command'),
    async execute(interaction) {
        if (!interaction.member.voice.channel) {
            await interaction.reply({ content: 'hop on vc first', ephemeral: true })
            return;
        }
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        connection.on(VoiceConnectionStatus.Ready, () => {
            console.log('The connection has entered the Ready state - ready to play audio!');
        });

        const player = createAudioPlayer();
        const resource = createAudioResource("/Users/arveenazhand/Documents/repos/statsgirl/util/hovhannes.mp3");

        player.play(resource);
        connection.subscribe(player);
        await interaction.reply({ content: 'you wont regret it thanks', ephemeral: true })
    }   
}
