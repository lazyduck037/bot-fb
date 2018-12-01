VND_1_TRIEU = 1000000
VND_2_TRIEU = 2000000
VND_5_TRIEU = 5000000
VND_9_TRIEU = 9000000
VND_10_TRTEU = 10000000
VND_18_TRIEU = 18000000
VND_32_TRIEU = 32000000
VND_52_TRIEU = 52000000
VND_80_TRIEU = 80000000

function taxUnder3mon(salary) {
    salaryTax = salary 
    result = 0;
    if(salary <= 0 || salary < VND_2_TRIEU ) {
        result = 0
    } else {
        result = salaryTax * 0.1
    }
    return result
}

function taxOver3mon(salary,reduce){
    salaryTax = salary - reduce - VND_9_TRIEU
    tax = 0
    rate = 0;
    minus = 0;
    if(salaryTax <= 0 ){
        tax = 0
        rate = 0;
        minus = 0;
    } else if(salaryTax < VND_5_TRIEU){
        rate = 0.05;
        minus = 0;
    } else if(salaryTax >= VND_5_TRIEU && salaryTax < VND_10_TRTEU){
        rate = 0.1;
        minus = 0.25;
    } else if(salaryTax >= VND_10_TRIEU && salaryTax < VND_18_TRTEU){
        rate  =  0.15
        minus =  0.75
    } else if(salaryTax >= VND_18_TRIEU && salaryTax < VND_32_TRTEU){
        rate  =  0.2
        minus =  1.65
    } else if(salaryTax >= VND_32_TRIEU && salaryTax < VND_52_TRTEU){
        rate  =  0.25
        minus =  3.25
    } else if(salaryTax >= VND_52_TRIEU && salaryTax < VND_80_TRTEU){
        rate  =  0.3
        minus =  5.85
    } else if(salaryTax >= VND_80_TRTEU){
        rate  =  0.35
        minus =  9.85
    }

    tax =  rate * salaryTax - minus * VND_1_TRIEU
    return tax

}

function personalTaxIsVn(userData){
    salary = userData.salary
    reduce = userData.reduce
    under3mon = userData.under3mon
    peronalTax = 0
    if(under3mon){
        peronalTax = taxUnder3mon(salary)
    } else {
        peronalTax = taxOver3mon(salary,reduce)
    }

    return peronalTax.toString()

}

function personalTaxNotVn(userData){
    salary = userData.salary
    result  = salary  * 0.2
    return result.toString()
}

function taxCalculate(userData){
    result = 0
    console.log('-----------taxCalculate---------')
    console.log(userData)
    if(userData.isVn){
        result = personalTaxIsVn(userData)
    }else {
        result = personalTaxNotVn(userData)
    }
    console.log('tax:'+result)
    console.log('--------------------------------')
    return result
}

module.exports = {
    taxCalculate
};