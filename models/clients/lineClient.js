const LINE = require('@line/bot-sdk');
const { CONFIG, BOT_UID }= require('../../constants/lineConfig');
const client = new LINE.Client(CONFIG);

function sendMessage(content = "halo world!"){
    try{
        client.pushMessage(BOT_UID, { type: 'text', text: content });
    }catch(error){
        console.log(`[LineClient] send message occurs error, and error detail: ${error.stack}`);
    }
}

exports.sendMessage = sendMessage;
