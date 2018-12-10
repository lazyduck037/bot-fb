


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
                            message : 'Bạn đã sinh sống ở Việt Nam hơn 183 ngày ?',
                            payload: [ 
                                {text: 'Có', code: 'live183-2' },
                                {text: 'Không', code: 'notlive183-2' }
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
                    message : 'Hợp đồng lao động của bạn có thời hạn hơn 3 tháng?',
                    payload: [
                        {text: 'Có', code: 'contract3month-3' },
                        {text: 'Không', code: 'notcontract3month-3' }
                    ]
                },
                {
                    type:'quick',
                    message : 'Bạn đã có thẻ thường trú chưa?',
                    payload: [
                        {text: 'Có', code: 'live183-2' },
                        {text: 'Không', code: 'notperresidencecard-5' }
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
                    message : 'Thu nhập hàng tháng của bạn tính theo VND là bao nhiêu?',
                    nextPayload:'peoplebelongto-7'
                },
                {
                    type:'quick',
                    message : 'Thu nhập hàng tháng của bạn trên 2tr VND?',
                    payload: [
                        {text: 'Có', code: 'than2milion-4' },
                        {text: 'Không', code: 'notthan2milion-4' }
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
                    message : 'Thu nhập hàng tháng của bạn tính theo VND là bao nhiêu?',
                    nextPayload:'calculatetax-12'
                },
                {
                    type:'text',
                    message : 'Bạn không phải đóng thuế thu nhập cá nhân.',
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
                    message : 'Bạn đã thuê nhà tại Việt Nam hơn 183 ngày?',
                    payload: [
                        {text: 'Có', code: 'live183-2' },
                        {text: 'Không', code: 'notthan183day-6' }
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
                    message : 'Thu nhập hàng tháng của bạn tính theo VND là bao nhiêu?',
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
                    message : 'Bạn đang đăng ký bao nhiêu người phụ thuộc để giảm trừ gia cảnh?',
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
                    message : 'Nhập tổng số người phụ thuộc mà bạn đã đăng ký để giảm trừ gia cảnh',
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
                    message : 'Bạn được đóng bảo hiểm trên lương chính thức?',
                    payload: [
                        {text: 'Có', code: 'haveinsurance-11' },
                        {text: 'Không', code: 'nofullinsurance-10' },
                        
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
                    message : 'Vui lòng nhập số tiền mà bạn căn cứ để đóng bảo hiểm?',
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
                    message : 'Cảm ơn bạn đã sử dụng dịch vụ của Taxpal. Chúng tôi đã gửi bảng kết quả chi tiết về thuế thu nhập cá nhân đến email lucylin@gmail.com.',
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