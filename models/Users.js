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
		month: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		}
	}, {
		timestamps: false,
	});
};