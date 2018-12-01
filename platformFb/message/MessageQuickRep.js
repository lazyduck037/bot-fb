const Message = require('./Message')
class MessageQuickRep extends Message {
    constructor(text) {
        super(text);
        this.message.quick_replies = [];
    }

    addSugest(type='text',title,payload,image_url) {  
        var newSugest = {};
        newSugest.content_type = type;
        newSugest.title = title;
        newSugest.payload = payload;
        newSugest.image_url = image_url;
        this.message.quick_replies.push(newSugest)
    }

}
module.exports = MessageQuickRep;
