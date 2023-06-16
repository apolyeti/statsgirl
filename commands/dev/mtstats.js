const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mtstats')
		.setDescription('monkeytype stats'),
	async execute(interaction) {
		try {
			const response = await axios.get('https://api.monkeytype.com/users/apol/profile', {
				headers: {
					Authorization: 'ApeKey ' + process.env.APE_KEY,
				},
			});
			const statsData = response.data;
			console.log(statsData)

			const sendEmbed = new EmbedBuilder()
				.setColor('#77d5e6')
				.setTitle(`MonkeyType Stats for ${statsData.data.name}`)
				.setDescription(statsData.data.typingStats.startedTests + ' tests started')

			await interaction.reply({ embeds: [sendEmbed] })
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'An error occurred while fetching MonkeyType stats', ephemeral: true });
		}
	}
};