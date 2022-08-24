let express = require('express');
let Router = express.Router();
const { sendMessage }= require('../models/clients/lineClient');
Router.post('/hookPoint', function (req,res){
    console.log(`Welcome to line hook me!`);
    sendMessage();
    res.json(req.body.events) // req.body will be webhook event object.
});
module.exports = Router;