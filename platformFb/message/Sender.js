const request = require('request');
const FACEBOOK_ACCESS_TOKEN = 'EAADkk4BnEx8BAKXrjHWG4G82eLfiQ9kbviekmH5yU1OTR6cpcbz3vp0QCnHJelbjz40qFUl7es2fR6qCBvqNKUeNfrupS0Vs1NYJk4fz7HUpONPBdLOIWdsxvZBHLDVgml24QI0WhF3cLoFrBvmPLQ4AIIKwaZCz0puXJ2LwZDZD';

class Sender {
    constructor(obj){
        this.senderId  = obj.senderID;
        this.messageObj =   obj.messageObj;
    }
    sendMessage() {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
            method: 'POST',
            json: {
                recipient: { id: this.senderId },
                message: this.messageObj,
                data:'hhhhhhhhhhh'
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("send mess success ");
            } else {
                console.error("send message fail", response.statusCode, response.statusMessage, body.error);
            }
        });
       
    }
}
module.exports = Sender;