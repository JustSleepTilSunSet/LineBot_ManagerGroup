const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const LINE = require('@line/bot-sdk')
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed

const app = express()

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET_TOKEN,
};
const BOT_UID = process.env.LINE_BOT_UID;
const PORT = process.env.LINE_BOT_PORT;
const client = new LINE.Client(config);
app.use(middleware(config));
app.get('/',(req,res)=>{
  console.log(`Welcome to app main page.`);
  res.send('OK');
});
app.post('/webhook', (req, res) => {
  console.log(`Welcome to line hook me!`);
  client.pushMessage(BOT_UID, 
      { type: 'text', text: 'hello, world' }
  );
  res.json(req.body.events) // req.body will be webhook event object
})

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500.
});

console.log(`Server running.`);
app.listen(PORT);