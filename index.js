
const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const Sender = require('./platformFb/message/Sender')
const BotActivity = require('./buss/BotActivity')

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Home page. Server running okay.");
});
  
app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === 'bottax') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});
const FACEBOOK_ACCESS_TOKEN = 'EAADkk4BnEx8BAKXrjHWG4G82eLfiQ9kbviekmH5yU1OTR6cpcbz3vp0QCnHJelbjz40qFUl7es2fR6qCBvqNKUeNfrupS0Vs1NYJk4fz7HUpONPBdLOIWdsxvZBHLDVgml24QI0WhF3cLoFrBvmPLQ4AIIKwaZCz0puXJ2LwZDZD';


function createGreetingApi(data) {
    request({
            uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
            method: 'POST',
            json: data
        
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Greeting set successfully!");
            } else {
                console.error("Failed calling Thread Reference API", response.statusCode,     response.statusMessage, body.error);
            }
    });  
}

app.post('/webhook', function(req, res) {
    var entries = req.body.entry;
    for (var entry of entries) {
        var messaging = entry.messaging;
        for (var message of messaging) {
            if (message.message) {
                var bot = new BotActivity();
                var messRep =  bot.parseMessage(message)
                var sender = new Sender(messRep)
                sender.sendMessage();

            }
        }
    }

    res.status(200).send("OK");
});

app.post('/', function(req, res) {
    console.log(req.body);

    
   
});



function setGreetingText() {
    var greetingData = {
        setting_type: "greeting",
        greeting:{
            text:"Chào {{user_first_name}}, Đây là chương trình tính thuế thu nhập cá nhân, gởi 'Hi' để bắt đầu."
        }
    };
    createGreetingApi(greetingData);
}

app.listen(3000, () => {
    console.log("Webhook server is listening, port 3000");
    setGreetingText();
});