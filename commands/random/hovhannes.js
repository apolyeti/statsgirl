const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config({path: '../../.env'})
const { joinVoiceChannel, createAudioPlayer, VoiceConnectionStatus, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');


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
        const resource = createAudioResource(process.env.HOVHANNES_PATH);

        player.play(resource);
        player.on(AudioPlayerStatus.Idle, () => {
            console.log('going to disconnect now')
            player.stop();
            connection.destroy();
        });
        connection.subscribe(player);
        await interaction.reply({ content: 'you wont regret it thanks', ephemeral: true })
    }   
}
