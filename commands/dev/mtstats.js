const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mtstats')
		.setDescription('monkeytype stats')
		.addStringOption(option =>
            option.setName('user')
                .setDescription('username of the user you want to see stats for')
                .setRequired(true)),

	async execute(interaction) {
		try {
			const response = await axios.get('https://api.monkeytype.com/users/apol/profile', {
				headers: {
					Authorization: 'ApeKey ' + process.env.APE_KEY,
				},
			});
			const statsData = response.data;

			const sendEmbed = new EmbedBuilder()
				.setColor('#f5d362')
				.setTitle(`MonkeyType Stats for ${statsData.data.name}`)
				.setDescription(statsData.data.typingStats.startedTests + ' tests started')

			await interaction.reply({ embeds: [sendEmbed] })
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'An error occurred while fetching MonkeyType stats', ephemeral: true });
		}
	}
};