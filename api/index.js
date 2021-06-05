var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '1734344757:AAHSxwYD69MjO5dop28Rq2Ruo8swXjOgQVU'
const bot = new TelegramBot(token, {polling: true});


// bots
bot.onText(/\/start/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /predict`
    );   
});

state = 0;
bot.onText(/\/menu/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        `masukkan nilai i|v contohnya 9|9`
    );
    state = 1;
});

bot.on('message', (msg) => {
       if(state == 1){
          console.log(msg.text);
    s = msg.text.split("|");
    i = s[0]
    v = s[1]
     model.predict(
        [
            parseFloat(s[0]), // string to float
            parseFloat(s[1])
        ]
    ).then((jres)=>{
         bot.sendMessage(
        msg.chat.id,
        `nilai v yang diprediksi adalah ${jres[0]} volt`
    );
         bot.sendMessage(
             msg.chat.id,
             `nilai p yang diprediksi adalah ${jres[1]} watt`
         );
     })
}else{
       state = 0
       }
})

//routers
r.get{'predict/:i/:r', function(req, res, next) {
    model.predict(
        [
            parseFloat(req.param.i), // string to float
            parseFloat(req.param.r)
            ]
        ).then(jres)=>{
        res.json(jres);
    })
});
      module.export - r;
