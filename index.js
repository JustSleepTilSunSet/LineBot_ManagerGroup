const express = require('express');
const { PORT } = require('./constants/lineConfig');
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
const { middleware } = require('./models/middleware/lineMiddleware');

const app = express();
app.use(middleware);

app.get('/',(req,res)=>{
  console.log(`Welcome to app main page.`);
  res.send('OK');
});

app.use('/webhook', require('./routers/router'));

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

console.log(`Server running port ${PORT}.`);
app.listen(PORT);