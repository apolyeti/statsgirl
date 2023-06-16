const { Events } = require('discord.js');
const cld = require('cld');
const axios = require('../util/deeplconfig');



module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        console.log(message.content);
        let messageLanguage;
        try {
            const result = await cld.detect(message.content);
            messageLanguage = result.languages[0].code;
        } catch (err) {
            console.log(err);
        }
        // so the program doesnt crash for not knowing the language
 

        if (messageLanguage == 'ja') {
            const data = new URLSearchParams();
            data.append('text', message.content);
            data.append('target_lang', 'EN');

            axios.post('/translate', data)
                .then((response) => {
                    message.reply(response.data.translations[0].text);
                })
                .catch((error) => {
                    console.log(error);
                }
            );
        }
    }
}
