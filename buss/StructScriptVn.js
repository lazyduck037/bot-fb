


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
                        message : 'Bạn đã sinh sống ở Việt Nam hơn 183 ngày?',
                        payload: [ 
                            {text: 'Có', code: 'live183',next:3 },
                            {text: 'Không', code: 'notlive183-2',next:4 }
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
                        message : 'Have you been living in Vietnam more than 183 days?',
                        payload: [ 
                            {text: 'Có', code: 'live183',next:3 },
                            {text: 'Không', code: 'notlive183-2',next:4 }
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
                        message : 'Hợp đồng lao động của bạn có thời hạn hơn 3 tháng?',
                        payload: [
                            {text: 'Có', code: 'contract3month',next:5 },
                            {text: 'Không', code: 'notcontract3month',next:6 }
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
                message : 'Bạn đã có thẻ thường trú chưa?',
                payload: [
                    {text: 'Có', code: 'live183',next:3 },
                    {text: 'Không', code: 'notperresidencecard',next:7}
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
                message : 'Thu nhập hàng tháng của bạn tính theo VND là bao nhiêu?', 
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
                message : 'Thu nhập hàng tháng của bạn trên 2tr VND?',
                payload: [
                    {text: 'Có', code: 'than2milion',next:9 },
                    {text: 'Không', code: 'notthan2milion',next:10 }
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
                message : 'Bạn đã thuê nhà tại Việt Nam hơn 183 ngày?',
                payload: [
                    {text: 'Có', code: 'live183',next:3 },
                    {text: 'Không', code: 'notthan183day', next:11 }
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
                message : 'Bạn đang đăng ký bao nhiêu người phụ thuộc để giảm trừ gia cảnh?',
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
                message : 'Thu nhập hàng tháng của bạn tính theo VND là bao nhiêu?',
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
                message : 'Bạn không phải đóng thuế thu nhập cá nhân.',
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
                message : 'Thu nhập hàng tháng của bạn tính theo VND là bao nhiêu?',
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
                message : 'Bạn được đóng bảo hiểm trên lương chính thức?',
                payload: [
                    {text: 'Có', code: 'haveinsurance',next:17 },
                    {text: 'Không', code: 'nofullinsurance',next:16 },
                    
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
                message : 'Nhập tổng số người phụ thuộc mà bạn đã đăng ký để giảm trừ gia cảnh',
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
                message : 'Cảm ơn bạn đã sử dụng dịch vụ của Taxpal. Chúng tôi đã gửi bảng kết quả chi tiết về thuế thu nhập cá nhân đến email %email%',
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
                message : 'Cảm ơn bạn đã sử dụng dịch vụ của Taxpal. Chúng tôi đã gửi bảng kết quả chi tiết về thuế thu nhập cá nhân đến email %email%',
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
                message : 'Vui lòng nhập số tiền mà bạn căn cứ để đóng bảo hiểm?',
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
                message : 'Thuế thu nhập cá nhân của bạn là %tax% \n \n Nếu bạn muốn nhận báo cáo đầy đủ về thuế thu nhập cá nhân của mình, vui lòng cung cấp email của bạn.',
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