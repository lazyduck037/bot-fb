


const structScript = [
    /*step0:*/ 
    {
        quest: {
            type:'quick',
            message : '"Please select your language?\nXin vui lòng chọn ngôn ngữ hiển thị"?',
            payload: [
                {text: 'Tiếng Việt', code: 'langvn',next:1 },
                {text: 'English', code: 'langeng',next:2 }
            ],
            preRep:{
                require:'ignore',
                handle:[
                    {field:'lang',value:'vn',code:'langvn'},
                    {field:'lang',value:'eng',code:'langeng'}
                ]
            }
            
        }
    },
    /*step1:*/ 
    {
        quest: {
                    type:'quick',
                    message : 'Have you been living in Vietnam more than 183 days in 1 year?',
                    payload: [ 
                        {text: 'Yes', code: 'live183',next:3 },
                        {text: 'No', code: 'notlive183-2',next:4 }
                    ],
                    preRep:{
                        handle:[
                        ]
                    }
                }
            
        
    },
     /*step2:*/ 
    {
        quest: {
                    
                    type:'quick',
                    message : 'Have you been living in Vietnam more than 183 days in 1 year?',
                    payload: [ 
                        {text: 'Yes', code: 'live183',next:3 },
                        {text: 'No', code: 'notlive183-2',next:4 }
                    ],
                    preRep:{
                        handle:[
                        ]
                    }
                }
            
        
    },
     /*step3:*/ 
    {
        quest: {
                    type:'quick',
                    message : 'Is the employment contract valid more than 3 months?',
                    payload: [
                        {text: 'Yes', code: 'contract3month',next:5 },
                        {text: 'No', code: 'notcontract3month',next:6 }
                    ],
                    preRep: {
                        handle:[
                            {field:'under3mon',value:false,code:'contract3month'},
                            {field:'under3mon',value:true,code:'notcontract3month'}
                        ]
                    }
                }
            
        
    },
     /*step4:*/ 
     {
        quest: {
            type:'quick',
            message : 'Do you have a permanent residence card?',
            payload: [
                {text: 'Yes', code: 'live183',next:3 },
                {text: 'No', code: 'notperresidencecard',next:7}
            ],
            preRep: {
                handle:[
                ]
            }
        }
            
        
    },
     /*step5:*/ 
    {
        quest: {
            type:'text',
            message : 'How much is your total monthly income in VND?', 
            next:8,
            preRep: {
                require:'number',
                handle:[
                    {
                        field:'salary',value:'getrep',code:''
                    }
                ]
            }
        }
    },
    /*step6:*/ 
    {
        quest: {
            type:'quick',
            message : 'Is your total monthly income more than 2M VND?',
            payload: [
                {text: 'Yes', code: 'than2milion',next:9 },
                {text: 'No', code: 'notthan2milion',next:10 }
            ],
            preRep: {
                handle:[
                ]
            }
        }
    },
     /*step7:*/ 
     {
        quest: {
            type:'quick',
            message : 'Have you been renting in Vietnam more than 183 days in a year?',
            payload: [
                {text: 'Yes', code: 'live183',next:3 },
                {text: 'No', code: 'notthan183day', next:11 }
            ],
            preRep: {
                handle:[
                    {field:'isVn',value:false ,code:'notthan183day'},
                ]
            }
        }
    },
     /*step8:*/ 
     {
        quest: {
            type:'quick',
            message : 'How many dependents do you cover that need to be deducted from your income?',
            payload: [
                {text: '0', code: 'peoplebelong90',next:12 },
                {text: '1', code: 'peoplebelong91',next:12 },
                {text: '2', code: 'peoplebelong92',next:12 },
                {text: '>2', code: 'peoplebelongthan2',next:13 }
            ],
            preRep: {
                require:'number',
                handle:[
                        {field:'belong',value:0,code:'peoplebelong90'},
                        {field:'belong',value:1,code:'peoplebelong91'},
                        {field:'belong',value:2,code:'peoplebelong92'},
                ]
            }
        }
    },
    /*step9:*/ 
    {
        quest: {
            type:'text',
            message : 'How much is your total monthly income in VND?',
            next:17, 
            preRep: {
                require:'number',
                handle:[
                    {field:'salary',value:'getrep',code:''},
                    {field:'sumtax',value:'getrep',code:''}
                ]
            }
        }
    },
    /*step10:*/ 
    {
        quest: {
            type:'text',
            message : "You don't have to pay personal income tax.",
            next:14,
            preRep: {
                handle:[
                ]
            }
        }
    },
     /*step11:*/ 
     {
        quest: {
            type:'text',
            message : 'How much is your total monthly income in VND?',
            next:17,
            preRep: {
                require:'number',
                handle:[
                    {field:'salary',value:'getrep',code:''},
                    {field:'sumtax',value:'getrep',code:''}
                ]
            }
        }
    },
    /*step12:*/ 
    {
        quest: {
            
            type:'quick',
            message : 'Are you covered by an official salary?',
            payload: [
                {text: 'Yes', code: 'haveinsurance',next:17 },
                {text: 'No', code: 'nofullinsurance',next:16 },
                
            ],

            preRep: {
                handle:[
                    {field:'insurancefullSalary',value:true,code:'haveinsurance'},
                    {field:'insurancefullSalary',value:false,code:'nofullinsurance'},
                    {field:'sumtax',value:true,code:'haveinsurance'}
                ]
            }
        }
    },
    /*step13:*/ 
    {
        quest: {
            
            type:'text',
            message : 'Enter the total dependents whom you cover that need to be deducted from your income.',
            next:12,
            preRep: {
                require:'number',
                handle:[
                    {field:'belong',value:'getrep',code:''},
                ]
            }
        }
    },
    /*step14:*/ 
    {
        quest: {
            type:'text',
            message : 'An email for full report of your personal income tax has been sent to %email%.',
            next:0,
            preRep: {
                handle:[
                ]
            }
        }
    },
    /*step15:*/ 
    {
        quest: {
            type:'text',
            message : 'An email for full report of your personal income tax has been sent to %email%.',
            next:0,
            preRep: {
                handle:[
                ]
            }
        }
    },
     /*step16:*/ 
     {
        quest: {
            type:'text',
            message : 'Please enter the amount of money you are entitled to pay insurance.',
            next:17,
            preRep: {
                require:'number',
                handle:[
                    {field:'insuranceNumber',value:'getrep',code:''},
                    {field:'sumtax',value:'getrep',code:''}
                ]
            }
        }
    },
    /*step17:*/ 
    {
        quest: {
            type:'text',
            message : 'Your personal income tax is %tax% \n \n Should you want to receive a full report of your personal income tax, please provide your email.',
            next:15,
            preRep: {
                require:'email',
                handle:[
                    {field:'email',value:'getrep',code:''}
                ]
            }
        }
    }
]

module.exports = structScript