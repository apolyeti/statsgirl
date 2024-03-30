const { Events } = require('discord.js');
const cld = require('cld');
const axios = require('../util/deeplconfig');
const document = require('../util/documentdeepl');
const ax = require('axios');
const FormData = require('form-data');
const ocr_key = process.env.OCR_KEY;


module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        if (message.channel.type === 'DM') return;
        if (message.content.startsWith('stats girl')) {
            message.channel.sendTyping();
        }
        console.log('#' + message.channel.name + ' ' + message.author.username + ': ' + message.content + ' ' + message.createdAt);
        // let inChannel = false;
        // message.channel.members.forEach(member => {
        //     if (member.id == process.env.APOL) {
        //         inChannel = true;
        //     }
        // })
        // if (!inChannel) {
        //     console.log('member not found');
        //     await message.guild.members.fetch(process.env.APOL).then((user) => {
        //         user.createDM().then((dm) => {
        //             dm.send(message.author.username + ' in #' + message.channel.name + ': ' + message.content + ' ' + message.createdAt);
        //         })
        //     })
        // }



        if (message.content.startsWith('<@1095069321631387838> ja')) {
            if (message.attachments) {
                console.log('attachment found, sent by ' + message.author.username + ' in #' + message.channel.name);
                message.attachments.forEach(attachment => {
                    console.log(attachment.url);
                    let data = new FormData();
                    data.append('language', 'jpn');
                    data.append('isOverlayRequired', 'false');
                    data.append('url', attachment.url);
                    data.append('iscreatesearchablepdf', 'false');
                    data.append('issearchablepdfhidetextlayer', 'false');
    
                    const config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: 'https://api.ocr.space/parse/image',
                        headers: { 
                          'apikey': ocr_key, 
                          ...data.getHeaders()
                        },
                        data : data
                    };
                    ax(config)
                    .then(function (response) {
                        const original = response.data.ParsedResults[0].ParsedText;
                        if (original.length < 5) return;
                        const data = new URLSearchParams();
                        data.append('text', original);
                        data.append('target_lang', 'EN');
                        axios.post('/translate', data)
                            .then((response) => {
                                if (response.data.translations[0].text.length < 5) return;
                                message.reply(`Original: ${original}\nTranslated: ${response.data.translations[0].text}`);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                })
            }
        }

        if (message.content.startsWith('<@1095069321631387838> de')) {
            if (message.attachments) {
                console.log('attachment found, sent by ' + message.author.username + ' in #' + message.channel.name);
                message.attachments.forEach(attachment => {
                    console.log(attachment.url);
                    let data = new FormData();
                    data.append('language', 'ger');
                    data.append('isOverlayRequired', 'false');
                    data.append('url', attachment.url);
                    data.append('iscreatesearchablepdf', 'false');
                    data.append('issearchablepdfhidetextlayer', 'false');
    
                    const config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: 'https://api.ocr.space/parse/image',
                        headers: { 
                          'apikey': ocr_key, 
                          ...data.getHeaders()
                        },
                        data : data
                    };
                    ax(config)
                    .then(function (response) {
                        const original = response.data.ParsedResults[0].ParsedText;
                        if (original.length < 5) return;
                        const data = new URLSearchParams();
                        data.append('text', original);
                        data.append('target_lang', 'EN');
                        axios.post('/translate', data)
                            .then((response) => {
                                if (response.data.translations[0].text.length < 5) return;
                                message.reply(`Original: ${original}\nTranslated: ${response.data.translations[0].text}`);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                })
            }
        }

        // if (message.attachments) {
        //     const file = message.attachments.first();
        //     if (file.contentType == 'application/pdf') {
        //         console.log('pdf found, sent by ' + message.author.username + ' in #' + message.channel.name);
        //         const data = new URLSearchParams();
        //         data.append('file', file.url);
        //         data.append('target_lang', 'EN');
        //         document.post('/document', data)
        //             .then((response) => {
        //                 message.reply(response.data.translations[0].text);
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             }
        //         );
        //     }
        // }



        let messageLanguage;
        if (message.content.length > 5) {
            try {
                const result = await cld.detect(message.content);
                messageLanguage = result.languages[0].code;
            } catch (err) {
                console.log('message too short')
            }
        }

        // so the program doesnt crash for not knowing the language
 

        if (messageLanguage == 'ja' || messageLanguage == 'de' || messageLanguage == 'ch') {
            console.log(messageLanguage);
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
