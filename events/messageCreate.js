const { Events } = require('discord.js');
const cld = require('cld');
const axios = require('axios');



module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        console.log(message.content);
        let messageLanguage;
        cld.detect(message.content).then((result) => {
            messageLanguage = (result.languages[0].code);
        })
        // so the program doesnt crash for not knowing the language
        .catch((err) => {
            console.log(err);
        });

        if (messageLanguage == 'ja') {

        }
    }
}
