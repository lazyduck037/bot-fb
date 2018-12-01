class Message {
    constructor(text){
        this.message = {};
        this.message.text = "";
        this.message.text = text
    }

    builder(){
        return this.message
    }
}

module.exports = Message;