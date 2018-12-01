const MessageQuickRep = require('../platformFb/message/MessageQuickRep')
const Message = require('../platformFb/message/Message')
const UserData = require('../buss/UserData')
const TaxPersonal = require('./TaxPersonal')
var trackStep = new Map()

function pushToTrack(senderId,userData){
    // trackStep[senderId] = userData
    trackStep.set(senderId, userData)
}

function getFromTrack(senderId){
    userData = trackStep.get(senderId)
    console.log('-----------getFromTrack----')
    console.log(userData)
    console.log('-----------getFromTrack----')
    if(userData){
        return userData;
    }
    userData = new UserData(senderId);
    pushToTrack(senderId,userData);
    return userData;
}

function removeTrack(senderID){
    trackStep.delete(senderID)
}

function messageReAsk(mess) {
    mess = 'Xin lỗi chúng tôi không hiểu ý bạn. '+ mess
    return mess
}


function askRemain() {
    mess = 'Chào bạn, Đây là chương trình tính thuế thu nhập cá nhân, gởi "Hi" để bắt đầu.'
    var message = new Message(mess);
    return message.builder()
}
 
function askIsVietnamPeople(reAsk=false){
    console.log('askIsVietnamPeople');
    mess = "Chào bạn. Đây là chương trình tư vấn thuế thu nhập cá nhân. Vui lòng cho biết thông tin sau.\nBạn là người Việt Nam?"
    if(reAsk){
        mess = messageReAsk(mess)
    }
    var messquick = new MessageQuickRep(mess)
    messquick.addSugest('text','Ờ','isVn-yes','')
    messquick.addSugest('text','Không phải','isVn-no','')
    return messquick.builder()
}


function askConstractMore3Mon(reAsk=false){
    console.log('askConstractMore3Mon');
    mess = 'Hợp đồng của bạn trên 3 tháng?'
    if(reAsk){
        mess = messageReAsk(mess)
    }
    var messquick = new MessageQuickRep(mess)
    messquick.addSugest('text','Đúng rồi','constract-more-3mon-yes','')
    messquick.addSugest('text','Không phải','constract-more-3mon-no','')
    return messquick.builder()
}

function askSalary(reAsk=false){
    console.log('askSalary');
    mess = 'Thu nhập của bạn 1 tháng là bao nhiêu?'
    if(reAsk){
        mess = messageReAsk(mess)
    }
    var message = new Message(mess);
    return message.builder()
}

function askCaseReduce(reAsk=false){
    console.log('askCaseReduce');
    mess = 'Số tiền được giảm trừ? \nTổng của giảm trừ gia cảnh, phụ cấp, công tác phí, người phụ thuộc(3 triệu 6 nếu có)'
    if(reAsk){
        mess = messageReAsk(mess)
    }
    var message = new Message(mess);
    return message.builder()
}

function thankUseService(){
    console.log('thankUseService');
    var message = new Message("Cám ơn bạn đã sử dụng dịch vụ! gởi 'Hi' để tiếp tục tính thuế thu nhập cá nhân");
    return message.builder()
}

function resultTax(userData){
    console.log('resultTax');
    tax = TaxPersonal.taxCalculate(userData)
    mess = 'Số tiền bạn chịu thuế là:' + tax + '\n Xin vui lòng để lại email. Nếu luật thay đổi chúng tôi sẽ cập nhật cho bạn'
    var message = new Message(mess);
    return message.builder()
}

function isNumeric(n) {
    n = n.trim()
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function processResend(senderId,textRev){
    var userData = getFromTrack(senderId);
    strackFunc = userData.step

    if(strackFunc=='askIsVietnamPeople'){
        messObj =  askIsVietnamPeople(true);
    } else if(strackFunc=='askConstractMore3Mon'){
        messObj =  askConstractMore3Mon(true);
    } else if(strackFunc=='askSalary') {
        if(isNumeric(textRev)){
            userData = getFromTrack(senderId)
            userData.salary = parseFloat(textRev.trim())

            //reduce when people is vn and constract >= 3 month
            if(userData.isVn &&  !userData.under3mon) {
                userData.step = 'askCaseReduce';
                pushToTrack(senderId,userData)
                messObj = askCaseReduce();
            } else {
                userData.step = 'resultTax';
                pushToTrack(senderId,userData)
                messObj = resultTax(userData);
                // cal tax
            }
        }else {
            userData = getFromTrack(senderId)
            userData.step = 'askSalary';
            pushToTrack(senderId,userData)
            messObj = askSalary(true);
        }
    } else if(strackFunc=='askCaseReduce') {
        if(isNumeric(textRev)){
            console.log('=====>isNumeric'+textRev)
            userData.reduce = parseFloat(textRev.trim())
            console.log('=====>isNumeric' + userData.reduce)
            userData.step = 'resultTax';
            pushToTrack(senderId,userData)
            messObj = resultTax(userData);
        }else {
            console.log('=====>is not Numeric')
            userData = getFromTrack(senderId)
            userData.step = 'askCaseReduce';
            pushToTrack(senderId,userData)
            messObj = askCaseReduce(true);
        }
    } else if(strackFunc=='resultTax'){
        // get email
        userData.email = textRev;
        userData.step = 'thankUseService';
        messObj = thankUseService();
        // removeTrack(senderId);

    } else if(strackFunc=='thankUseService'){
        removeTrack(senderId);
        if(textRev=='hi' || textRev=='Hi') {
            userData = getFromTrack(senderId)
            userData.step = 'askIsVietnamPeople';
            pushToTrack(senderId,userData)
            messObj =  askIsVietnamPeople();
        } else {
            messObj  = askRemain();
        }
    } else if(textRev=='hi' || textRev=='Hi') {
        userData = getFromTrack(senderId)
        userData.step = 'askIsVietnamPeople';
        pushToTrack(senderId,userData)
        messObj =  askIsVietnamPeople();
    } else {
        messObj = askRemain()
    }
    return messObj;

}

class BotActivity {

    parseMessage(message) {
        
        var messToUser = {};
        messToUser.senderID = message.sender.id;
        if(message.message.quick_reply){
            var payload = message.message.quick_reply.payload
            console.log('payload:'+payload)
            switch(payload){
                case 'isVn-yes':
                    userData = getFromTrack(messToUser.senderID)
                    userData.step = 'askConstractMore3Mon';
                    userData.isVn = true;
                    pushToTrack(messToUser.senderID,userData)
                    messToUser.messageObj = askConstractMore3Mon();
                break;
                case 'isVn-no':
                    userData = getFromTrack(messToUser.senderID)
                    userData.step = 'askSalary';
                    userData.isVn = false;
                    pushToTrack(messToUser.senderID,userData)
                    messToUser.messageObj = askSalary();
                break;
                case 'constract-more-3mon-yes':
                    userData = getFromTrack(messToUser.senderID)
                    userData.step = 'askSalary';
                    userData.under3mon = false; 
                    pushToTrack(messToUser.senderID,userData)
                    messToUser.messageObj = askSalary(); 
                break;
                case 'constract-more-3mon-no':
                    userData = getFromTrack(messToUser.senderID)
                    userData.step = 'askSalary';
                    userData.under3mon = true; 
                    pushToTrack(messToUser.senderID,userData)
                    messToUser.messageObj = askSalary(); 
                break;
            }

            return messToUser;
            
        }

        messToUser.messageObj = processResend(messToUser.senderID,message.message.text);
       
        return messToUser;

    }
}
module.exports = BotActivity