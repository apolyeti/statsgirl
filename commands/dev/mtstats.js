const { SlashCommandBuilder } = require('discord.js');
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
			const user = interaction.options.getString('user');
			const response = await axios.get('https://api.monkeytype.com/users/' + user + '/profile', {
				headers: {
					Authorization: 'ApeKey ' + process.env.APE_KEY,
				},
			});

			const statsData = response.data;
			const sendEmbed = {
				color: 0xf5d362,
				title: 'MonkeyType Stats for ' + statsData.data.name,
				url: 'https://monkeytype.com/profile/' + statsData.data.name,
				author: {
					name: statsData.data.name,
					icon_url: 'https://cdn-1.webcatalog.io/catalog/monkeytype/monkeytype-icon-filled-256.png?v=1675597498781',
				},
				fields: [
					{
						name: 'Completed Tests',
						value: statsData.data.typingStats.completedTests,
						inline: false,
					},
					{
						name: 'Started Tests',
						value: statsData.data.typingStats.startedTests,
						inline: false,
					},
					{
						name: 'Total XP',
						value: statsData.data.xp,
						inline: false,
					},
				],
				footer: {
					text: 'Time added: ' + statsData.data.addedAt,
				},
			}
			await interaction.reply({ embeds: [sendEmbed] })
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'An error occurred while fetching MonkeyType stats', ephemeral: true });
		}
	}
};