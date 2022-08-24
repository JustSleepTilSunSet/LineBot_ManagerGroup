const {middleware} = require('@line/bot-sdk');
const { CONFIG }= require('../../constants/lineConfig');

exports.middleware = middleware(CONFIG);