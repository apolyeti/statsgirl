const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const { Events } = require('discord.js');
const Users = require('../models/Users.js')(sequelize, Sequelize.DataTypes);


module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		Users.sync();
		const storedPoints = Users.findAll();
		storedPoints.forEach(p => client.points.set(p.user_id, p));
		console.log(`Logged in as ${client.user.tag}`);
	},
};