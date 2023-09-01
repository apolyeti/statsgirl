const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
       message.guild.members.fetch(process.env.APOL).then((user) => {
              user.createDM().then((dm) => {
                dm.send('Message deleted in #' + message.channel.name + ':\n' + message.content + '\n\nSent by ' + message.author.username + ' at ' + message.createdAt);
              })
         })
    },
};