const MessageQuickRep = require('../platformFb/message/MessageQuickRep')
const Message = require('../platformFb/message/Message')
const UserData = require('../buss/UserData')
const TaxPersonal = require('./TaxPersonal')
const structScript = require('./StructScript')
const structScriptEn = require('./StructScritpEn')
var trackStep = new Map()

function pushToTrack(senderId,userData){
    // trackStep[senderId] = userData
    trackStep.set(senderId, userData)
}

function getFromTrack(senderId){
    userData = trackStep.get(senderId)
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

function resultTax(userData){
    console.log('resultTax');
    tax = TaxPersonal.taxCalculate(userData)
    mess = 'Số tiền bạn chịu thuế là:' + tax + '\n \n Vui lòng nhập địa chỉ email để nhận được bảng kết quả chi tiết về thuế thu nhập cá nhân'
    var message = new Message(mess);
    return message.builder()
}

function isNumeric(n) {
    n = n.trim()
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function getDataByLanguage(isEng){
    var structScript 
    if(userData.eng){
        structScript = structScriptEn
    } else {
        structScript = structScriptVn
    }
    return structScript
}
function sendMess(questMess,builtTextMess){
    type = questMess.type
    message = questMess.message
    payloads = questMess.payload
    
    var objMess
    if(type == 'quick') {
        var messquick = new MessageQuickRep(message)
        size = payloads.length;
        for(i = 0 ; i< size ; i++) {
            messquick.addSugest('text',payloads[i].text,payloads[i].code +'@#$'+ payloads[i].next.toString() ,'')
        }
        objMess =  messquick.builder()
        builtTextMess(-2)

    }else if(type == 'text') {
        var messquick = new Message(message)
        next = questMess.next
        objMess =  messquick.builder()
        builtTextMess(next)
    }
   
    return objMess
}
function parseMessageImprove(message,processNext) {

    console.log('--------------message------------')
    console.log(message)
    console.log('--------------------------')
    var messToUser = {};

    var senderId=  message.sender.id;
    messToUser.senderID = senderId
    var input={};
    userData = getFromTrack(messToUser.senderID)


    console.log('--------------userData get------------')
    console.log(userData)
    console.log('--------------------------')
    isResendFailStyle = false

    
    if(message.message.quick_reply){
        //get next
        var payload = message.message.quick_reply.payload
        input.payload = payload
        userData.step = parseInt(payload.split('@#$')[1])
        console.log('------------payload-------------:' +payload +'--------userData.step-------:' + userData.step)
    }else {
        input.text = message.message.text
        if(structScript[userData.step].quest.type == 'quick'){
            //resend message
            isResendFailStyle = true
        }
    }

    
    numberQuest = userData.step
    questMess = structScript[numberQuest].quest
    handle = questMess.preRep.handle
    requireValue = questMess.preRep.require
    
    messToUser.messageObj = sendMess(questMess,function(indexNext){
        if(indexNext || indexNext==0){
            //get next
            isNextReq = processNext(handle,input,requireValue,userData)
            console.log("isNextReq:"+isNextReq)
            console.log("isResendFailStyle:"+isResendFailStyle)
            console.log("indexNext:"+indexNext)
            if( isNextReq) {
                if(!isResendFailStyle){
                    if(indexNext != -2 ){
                        userData.step = indexNext
                    }
                }
            }
        }
        console.log('--------------userData push------------')
        console.log(userData)
        console.log('--------------------------')
        pushToTrack(senderId,userData)
    });

    
   
    return messToUser;
}

function processNextImp(handle,input,requireValue,userData){
    if(requireValue == 'ignore'){
        return true
    }

    payloadIn = input.payload
    textIn = input.text
    size = handle.length
    isNextReq = true
    for(i = 0; i < size ; i++){
        field = handle[i].field
        value = handle[i].value
        code = handle[i].code
        require = handle[i].require
       
        if(payloadIn){
            codeData = payloadIn.split('@#$')[0]
            if(codeData == code) {
                userData[field] = value
                break;
            }
        }else {
            if(requireValue=='number'){
                if(!isNumeric(textIn)){
                    isNextReq = false
                    break
                }else {
                    userData[field] = parseInt(textIn)
                    break
                }
            }
            
            userData[field] = parseInt(textIn)
            break

        }
    }
    return isNextReq
}

class BotActivity {
    
    parseMessage(message) {
       
        return parseMessageImprove(message,processNextImp)
    }
}
module.exports = BotActivity