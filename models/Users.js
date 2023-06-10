module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		points: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	}, {
		timestamps: false,
	});
};