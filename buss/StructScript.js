


const structScript = [
        /*step0:*/ 
        {
            quest: {
                        type:'quick',
                        message : 'question 0?',
                        payload: [
                            {text: 'Tiếng Việt', code: 'langvn',next:1,field:'',value:''},
                            {text: 'English', code: 'langeng',next:2 }
                        ],
                        preRep:{
                            require:'ignore'
                        }
                        
                    }
                
            
        },
        /*step1:*/ 
        {
            quest: {
                        type:'quick',
                        message : 'question 1',
                        payload: [
                            {text: 'Tiếng Việt', code: 'langvn-1',next:2 },
                            {text: 'English', code: 'langeng-1',next:3 }
                        ],
                        preRep:{
                            handle:[
                                {
                                    field:'lang',value:'vn',code:'langvn'
                                },
                                {
                                    field:'lang',value:'vn',code:'langeng'
                                }
                            ]
                        }
                    }
                
            
        },
         /*step2:*/ 
        {
            quest: {
                        type:'quick',
                        message : 'question 2',
                        payload: [
                            {text: 'Tiếng Việt', code: 'langvn-1',next:4 },
                            {text: 'English', code: 'langeng-1',next:5}
                        ],
                        preRep:{
                            handle:[
                                    {
                                        field:'lang',value:'vn',code:'langvn'
                                    },
                                    {
                                        field:'lang',value:'vn',code:'langvn'
                                    }
                                ]
                        }
                    }
                
            
        },
         /*step3:*/ 
        {
            quest: {
                        type:'text',
                        message : 'question 3',
                        next: 6,
                        preRep: {
                            require:'number',
                            handle:[
                                {
                                    field:'moiw',value:'getrep',code:''
                                }
                            ]
                        }
                    }
                
            
        },
         /*step4:*/ 
         {
            quest: {
                        type:'text',
                        message : 'question 4',
                        next:6,
                        preRep: {
                            require:'number',
                            handle:[
                                {
                                    field:'reduce',value:'getrep',code:''
                                }
                            ]
                        }
                    }
                
            
        },
         /*step5:*/ 
         {
            quest: {
                        type:'text',
                        message : 'question 5',
                        next:6,
                        preRep: {
                            require:'number',
                            handle:[
                                {
                                    field:'belong',value:'getrep',code:''
                                }
                            ]
                        }
                    }
        },
        /*step6:*/ 
        {
            quest: {
                        type:'text',
                        message : 'question 6',
                        next: 7,
                        preRep: {
                            require:'number',
                            handle:[
                                {
                                    field:'insuranceNumber',value:'getrep',code:''
                                }
                            ]
                        }
                    }
        },

         /*step7:*/ 
         {
            quest: {
                        type:'text',
                        message : 'question 7',
                        next: 0,
                        preRep: {
                            require:'number',
                            handle:[
                                {
                                    field:'insuranceNumber',value:'getrep',code:''
                                }
                            ]
                        }
                    }
        }

    ]

module.exports = structScript