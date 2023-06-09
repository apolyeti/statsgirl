const Users = require('../models/Users.js');

async function addPoints(id, points, collection) {
    const user = collection.get(id);
    if (user) {
        user.points += Number(points);
        return user.save();
    }
    const newUser = await Users.create({ user_id: id, points });
    points.set(id, newUser);
    return newUser;
}
module.exports = { addPoints };