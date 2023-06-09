const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);



Reflect.defineProperty(Users.prototype, 'getPoints', {
	value: () => {
		return Users.findAll({
			where: { user_id: this.user_id },
			include: ['points'],
		});
	},
});

module.exports = { Users };