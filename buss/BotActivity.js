const MessageQuickRep = require('../platformFb/message/MessageQuickRep')
const Message = require('../platformFb/message/Message')
const UserData = require('../buss/UserData')
const TaxPersonal = require('./TaxPersonal')
const structScriptVn = require('./StructScriptVn')
const structScriptEn = require('./StructScritpEn')
var structScript = structScriptVn
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


function getDataByLanguage(){
    var structScriptTemp 
    if(userData.lang == 'eng'){
        structScriptTemp = structScriptEn
    } else {
        structScriptTemp = structScriptVn
    }
    return structScriptTemp
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
        builtTextMess()

    }else if(type == 'text') {

        message = message.replace('%tax%',userData.sumtax)
        message = message.replace('%email%',userData.email)

        var messquick = new Message(message)
        next = questMess.next
        objMess =  messquick.builder()
        builtTextMess()
    }
   
    return objMess
}
function parseMessageImprove(message,processNext) {

    var messToUser = {};

    var senderId=  message.sender.id;
    messToUser.senderID = senderId
    var input={};
    userData = getFromTrack(messToUser.senderID)



    isResendFailStyle = false

    var isNextReq
    if(message.message.quick_reply){
        //get next
        var payload = message.message.quick_reply.payload
        input.payload = payload


        handle = structScript[userData.step].quest.preRep.handle
        requireValue = structScript[userData.step].quest.preRep.require
        processNext(handle,input,requireValue,userData)
        structScript = getDataByLanguage(userData.lang)

        userData.step = parseInt(payload.split('@#$')[1])
        if(structScript[userData.step].quest.type == 'text'){
            isResendFailStyle = true
        }
        isNextReq = true

    }else {
        input.text = message.message.text
        // isNextReq = processNext(handle,input,requireValue,userData)
        if(structScript[userData.step].quest.type == 'quick'){
            //resend message
            isResendFailStyle = true
            isNextReq = false
            
        }else {
            handle = structScript[userData.step].quest.preRep.handle
            requireValue = structScript[userData.step].quest.preRep.require
            isNextReq = processNext(handle,input,requireValue,userData)
            structScript = getDataByLanguage(userData.lang)
            
            if(isNextReq){
                if(message.message.quick_reply){
        
                }else {
                    userData.step = structScript[userData.step].quest.next
                }
            }
        }

    }

    numberQuest = userData.step
    questMess = structScript[numberQuest].quest
    handle = structScript[numberQuest].quest.preRep.handle
    requireValue = structScript[numberQuest].quest.preRep.require

    messToUser.messageObj = sendMess(questMess,function(){
        // sizeStruct = structScript.length
        // if(userData.step == sizeStruct-1){
        //     removeTrack(userData.userId)
        // }


    });

 
    pushToTrack(senderId,userData)

    return messToUser;
}

function processNextImp(handle,input,requireValue,userData){


    payloadIn = input.payload
    textIn = input.text
    size = handle.length
    isNextReq = true
    console.log('------handle--------')
    console.log(handle)
    console.log('-------handle-------')
    for(i = 0; i < size ; i++){
        field = handle[i].field
        value = handle[i].value
        code = handle[i].code
        require = handle[i].require
       
        
        if(payloadIn){
  
            codeData = payloadIn.split('@#$')[0]
            if(codeData == code) {

                if(field=='sumtax'){
                    tax = TaxPersonal.taxCalculate(userData)
                    userData[field] = tax
                }else {
                    userData[field] = value
                    if(requireValue == 'ignore'){

                        console.log(userData)
                        return true
                    }
                }
            }
        }else {
            
            
            if(field=='sumtax'){
                tax = TaxPersonal.taxCalculate(userData)
                userData[field] = tax
            }else if(requireValue=='number'){
                if(!isNumeric(textIn)){
                    isNextReq = false
                    break
                }else {
                    userData[field] = parseFloat(textIn)
                }
            }else if(requireValue=='email'){
                userData[field] = textIn
            }


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