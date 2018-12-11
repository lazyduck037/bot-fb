


const structScript = [
    /*step0:*/ 
    {
        //pick up language

        rep: [
            {textrep:'',payload:'start-0',index:0,gotoStep:-1},
        ],

        quest:[
                {
                    type:'quick',
                    message : '"Please select your language?\nXin vui lòng chọn ngôn ngữ hiển thị"?',
                    payload: [
                        {text: 'Tiếng Việt', code: 'langvn-1' },
                        {text: 'English', code: 'langeng-1' }
                    ]
                }
            ]
        
    },

    /*step1:*/ 
    {
        rep: [
            {textrep:'Tiếng Việt',payload:'langvn-1',index:0,gotoStep:-1},
            {textrep:'English',payload:'langeng-1',index:1,gotoStep:-1},
        ],
        quest:  [
                    {
                        type:'quick',
                        message : 'Bạn đã sinh sống ở Việt Nam hơn 183 ngày?',
                        payload: [ 
                            {text: 'Yes', code: 'live183-2' },
                            {text: 'No', code: 'notlive183-2' }
                        ]
                    },
                    {
                        type:'quick',
                        message : 'Have you been living in Vietnam more than 183 days?',
                        payload: [
                            {text: 'Yes', code: 'live183-2' },
                            {text: 'No', code: 'notlive183-2' }
                        ]
                    }
                    
                
            ]
        
    },
    /*step2:*/
    {
        rep: [
            {textrep:'Yes',payload:'live183-2',index:0,gotoStep:-1},
            {textrep:'No',payload:'notlive183-2',index:1,gotoStep:-1},
        ],
        quest: [
            {
                type:'quick',
                message : 'Is the labor contract valid more than 3 months?',
                payload: [
                    {text: 'Yes', code: 'contract3month-3' },
                    {text: 'No', code: 'notcontract3month-3' }
                ]
            },
            {
                type:'quick',
                message : 'Do you have a permanent residence card?',
                payload: [
                    {text: 'Yes', code: 'live183-2' },
                    {text: 'No', code: 'notperresidencecard-5' }
                ]
            }
        ]
    },


    /*step3:*/
    {
        rep: [
            {textrep:'Yes',payload:'contract3month-3',index:0,gotoStep:-1},
            {textrep:'No',payload:'notcontract3month-3',index:1,gotoStep:-1},
        ],
        quest: [
            {
                type:'text',
                message : 'How much is your total monthly income in VND?',
                nextPayload:'peoplebelongto-7'
            },
            {
                type:'quick',
                message : 'Is your total monthly income more than 2M VND?',
                payload: [
                    {text: 'Yes', code: 'than2milion-4' },
                    {text: 'No', code: 'notthan2milion-4' }
                ]
            }
        ]
    },


     /*step4:*/
     {
        rep: [
            {textrep:'Yes',payload:'than2milion-4',index:0,gotoStep:-1},
            {textrep:'No',payload:'notthan2milion-4',index:1,gotoStep:-1},
        ],
        quest: [
            {
                type:'text',
                message : 'How much is your total monthly income in VND?',
                nextPayload:'calculatetax-12'
            },
            {
                type:'text',
                message : 'You don\'t have to pay personal income tax.',
                nextPayload:'thankforuse-11'
            }
        ]
    },

    /*step5:*/
    {
        rep: [
            {textrep:'No',payload:'notperresidencecard-5',index:0,gotoStep:-1},
        ],
        quest: [
            {
                type:'quick',
                message : 'Have you been renting in Vietnam more than 183 days in a year?',
                payload: [
                    {text: 'Yes', code: 'live183-2' },
                    {text: 'No', code: 'notthan183day-6' }
                ]
            }
        ]
    },
    /*step6:*/
    {
        rep: [
            {textrep:'No',payload:'notthan183day-6',index:0,gotoStep:-1}
        ],
        quest: [
            {
                type:'text',
                message : 'How much is your total monthly income in VND?',
                nextPayload:'calculatetax-12'
            }
        ]
    },

     /*step7:*/
     {
        rep: [
            {textrep:'No',payload:'peoplebelongto-7',index:0,gotoStep:-1}
        ],
        quest: [
            {
                type:'quick',
                message : 'How many dependents do you register to reduce family circumstances?',
                payload: [
                    {text: '0', code: 'peoplebelong-9' },
                    {text: '1', code: 'peoplebelong-9' },
                    {text: '2', code: 'peoplebelong-9' },
                    {text: '>2', code: 'peoplebelongthan2-8' }
                ]
            }
        ]
    },

     /*step8:*/
    {
        rep: [
            {textrep:'No',payload:'peoplebelongthan2-8',index:0,gotoStep:-1}
        ],
        quest: [
            {
                type:'text',
                message : 'Enter the total number of dependents you have registered to reduce family circumstances',
                nextPayload:'peoplebelong-9'
            }
        ]
    },

    /*step9:*/
    {
        rep: [
            {textrep:'No',payload:'peoplebelong-9',index:0,gotoStep:-1}
        ],
        quest: [
            {
                type:'quick',
                message : 'Are you covered by an official salary?',
                payload: [
                    {text: 'Yes', code: 'haveinsurance-11' },
                    {text: 'No', code: 'nofullinsurance-10' },
                    
                ]
            }
        ]
    },

    /*step10:*/
    {
        rep: [
            {textrep:'No',payload:'nofullinsurance-10',index:0,gotoStep:-1}
        ],
        quest: [
            {
                type:'text',
                message : 'Please enter the amount of money you are entitled to pay insurance',
                nextPayload:'calculatetax-12'
            }
        ]
    },

     /*step 11:*/
     {
        rep: [
            {textrep:'No',payload:'thankforuse-11',index:0,gotoStep:-1}
        ],
        quest: [
            {
                type:'text',
                message : 'Thank you for using Taxpal. An email for detail of personal income tax has been sent to lucylin@gmail.com.',
            }
        ]
    },
    /*step 12:*/
    {
        rep: [
            {textrep:'No',payload:'calculatetax-12',index:0,gotoStep:-1}
        ],
        quest: [
            {
                type:'text',
                message : 'Số tiền bạn chịu thuế là: @TAX@ \n \n Vui lòng nhập địa chỉ email để nhận được bảng kết quả chi tiết về thuế thu nhập cá nhân',
                nextPayload:'thankforuse-11'
            }
        ]
    },
    


]

module.exports = structScript