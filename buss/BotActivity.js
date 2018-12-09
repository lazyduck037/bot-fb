const MessageQuickRep = require('../platformFb/message/MessageQuickRep')
const Message = require('../platformFb/message/Message')
const UserData = require('../buss/UserData')
const TaxPersonal = require('./TaxPersonal')
const structScript = require('./StructScript')

var trackStep = new Map()
function pushToTrack(senderId,userData){
    // trackStep[senderId] = userData
    trackStep.set(senderId, userData)
}

function getFromTrack(senderId){
    userData = trackStep.get(senderId)
    console.log('-----------getFromTrack->->userData--')
    console.log(userData)
    console.log('senderId:'+senderId)
    console.log('-----------getFromTrack--------------')
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


function findStep(payload){
    stringStep = payload.split('-')[1]
    step = parseInt(stringStep)
    return step
}

function findIndexReqs(payload,reps) {
    size = reps.length
    for(i =0;i<size;i++ ) {
        if(payload == reps[i].payload) {
            if(reps[i].index != -1) {
                return {index:reps[i].index,gotoStep:-1} 
            } else {
                return {index:-1,gotoStep:reps[i].gotoStep} 
            }
        }
    }
    return {index:-1,gotoStep:-1}
}



function buildRepFromQuest(questMess){
    if(questMess.type == 'quick') {
            
        var messquick = new MessageQuickRep(questMess.message)
        size = questMess.payload.length;
        for(i = 0 ; i< size ; i++) {
            messquick.addSugest('text',questMess.payload[i].text,questMess.payload[i].code ,'')
        }
        return messquick.builder()
    } 
    if(questMess.type == 'text') {

        var message = new Message(questMess.message);

        return message.builder()
    } 

}

function resendMess(userData,senderID){

    userData.step = findStep(userData.payload)           
    listQuest = structScript[userData.step].quest;
    listReps = structScript[userData.step].rep;
    indexReqs = findIndexReqs(userData.payload,listReps)
    if(indexReqs.index != -1) {
        questMess = listQuest[indexReqs.index]
        object  = buildRepFromQuest(questMess)
        if(questMess.type == 'text'){
            userData.payload =  questMess.nextPayload 
        }
        pushToTrack(senderID,userData)
        return object
    }
    
}
function parseMessageImprove(message,callback) {
        
    var messToUser = {};
    var senderId=  message.sender.id;
    messToUser.senderID = senderId
    userData = getFromTrack(messToUser.senderID)
    textRev = message.message.text
    if(userData.step==-1){
        userData.payload = 'start-0'
    }
   
    if(userData.payload == 'start-0'){
        var isPayload=false;
        if(message.message.quick_reply){
            payload = message.message.quick_reply.payload
            userData.payload = payload
            isPayload = true
        }
        callback(userData,textRev,payload,isPayload)    
        messToUser.messageObj = resendMess(userData,senderId) 
    }else {
        if(message.message.quick_reply){
            var payload = message.message.quick_reply.payload       
            userData.payload = payload 
            userData = callback(userData,textRev,payload,true)
            messToUser.messageObj = resendMess(userData,senderId) 
            
            // if(payload == 'peoplebelong-9'){
            //     userData.belong =  parseInt(message.message.text)
            // }
            // if(payload =='haveinsurance-11') {
            //     userData.insurancefullSalary =  true
            //     userData.payload = 'calculatetax'
            //     pushToTrack(senderId,userData)
            //     messToUser.messageObj = resultTax(userData)

            // }else {
            

                // messToUser.messageObj = resendMess(userData,senderId) 
            // }


        }else {
            userData = callback(userData,textRev,payload,false)
            messToUser.messageObj = resendMess(userData,senderId);
            
            // if(userData.payload == 'notthan183day-6') {
            //     textRev = message.message.text
            //     if(isNumeric(textRev)){
            //         userData.salary = parseFloat(textRev.trim())
            //         userData.isVn = false
            //         userData.under3mon = false
            //         userData.reduce = 0
            //         userData.payload = 'calculatetax'
            //         pushToTrack(senderId,userData)
            //         messToUser.messageObj = resultTax(userData);
                    
            //     }else {
            //         //resend
            //         messToUser.messageObj = resendMess(userData,senderId)
            //     }
            // }else if(userData.payload == 'than2milion-4'){
            //     textRev = message.message.text
            //     if(isNumeric(textRev)){
            //         userData.salary = parseFloat(textRev.trim())
            //         userData.isVn = true
            //         userData.under3mon = true
            //         userData.reduce = 0
            //         userData.payload = 'calculatetax'
            //         pushToTrack(senderId,userData)
            //         messToUser.messageObj = resultTax(userData);
            //     }else {
                    
            //         messToUser.messageObj = resendMess(userData,senderId)
            //     }
            // } else if(userData.payload == 'contract3month-3'){
            //     textRev = message.message.text
            //     if(isNumeric(textRev)){
            //         userData.salary = parseFloat(textRev.trim())
            //         userData.under3mon = false
            //         userData.isVn = true
                    
            //         //send mess 
            //         userData.payload = 'peoplebelongto-7';
            //         pushToTrack(senderId,userData)
            //         messToUser.messageObj = resendMess(userData,senderId) 

            //     }else {
            //         messToUser.messageObj = resendMess(userData,senderId)
            //     }

            // } else if(userData.payload=='peoplebelongthan2-8'){
            //     textRev = message.message.text
            //     if(isNumeric(textRev)){
            //         userData.belong = parseFloat(textRev.trim())
            //         userData.payload = 'peoplebelong-9';
            //         pushToTrack(senderId,userData)
            //         messToUser.messageObj = resendMess(userData,senderId) 
                
            //     }else {
            //         messToUser.messageObj = resendMess(userData,senderId)
            //     }
            // }else if(userData.payload=='nofullinsurance-10'){
            //     textRev = message.message.text
            //     if(isNumeric(textRev)){
            //         userData.insuranceNumber = parseFloat(textRev.trim())
            //         userData.payload = 'calculatetax'
            //         pushToTrack(messToUser.senderID,userData)
            //         messToUser.messageObj = resultTax(userData)

            //     }else {
            //         messToUser.messageObj = resendMess(userData,senderId)
            //     }
            // }else if(userData.payload=='calculatetax'){
            //     userData.payload = 'thankforuse-11'
            //     messToUser.messageObj = resendMess(userData,senderId)
            //     console.log('-------------- messToUser.messageObj------------------------')
            //     console.log(messToUser)
            //     console.log('--------------------------------------')
            //     removeTrack(senderId)
            // } else if(userData.payload=='thankforuse-11'){
            //     removeTrack(senderId)

            // }else{
            //         //fail recall
            //         if(userData.payload == '') {
            //             userData.payload = 'start-0';
            //         }
            //         messToUser.messageObj = resendMess(userData,messToUser.senderID) 
            // }
        }
    }

    return messToUser;
}

class BotActivity {

    parseMessage(message) {
        return parseMessageImprove(message,function(userData,textRev,payload,isQuick){
            var newUserData =  JSON.parse(JSON.stringify(userData));
            if(!isQuick){
                if(!isNumeric(textRev)){
                    return newUserData
                }else{
                    newUserData.payload = payload
                }
                return newUserData
            }else {
                switch(newUserData.payload){
                    case 'peoplebelong-9':
                        newUserData.belong =  parseInt(message.message.text)
                    break;
                    case 'haveinsurance-11':
                    
                    break;
                }
                return newUserData;
            }
            
        })
    }
}
module.exports = BotActivity