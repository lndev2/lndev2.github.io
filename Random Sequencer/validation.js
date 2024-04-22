


function valPositiveN(input) {

    let regex = /[1-9]?[0-9]+/;
    let result = regex.test(input);
    
    if (result){
        return true     
}
}

function valLimits(input, limit){

    if(input > 0 && input<=limit){
        return true
    

}
}


function validateSpeed() {

    currentSpeed = document.getElementById('quantity').value
    let valid = valPositiveN(currentSpeed) && valLimits(currentSpeed,300)
    
    if(currentSpeed === ""){
        currentSpeed = document.getElementById('speed').innerText
        return
    }
    
    if (!valid){
        displayError('Speed between 1 and 300')
        return false
    }

    document.getElementById('speed').innerText = currentSpeed


}


function splitAndClean(DOMinput){ //space separated values

    let splitted = DOMinput.split(' ')
    //console.log(splitted)
    let converted = splitted.map( function(x){ return Number(x)})
    //console.log(converted)
    while (converted[converted.length-1] == ''){
        converted.pop()
    }

    return converted
}


function validateSplitted(splitted,lenLimit,valLimit,lenErrMsg,valLerrMsg,barlimit=false){



    if(splitted.length > lenLimit){
        displayError(lenErrMsg)
        return false
    }

    for (let i = 0; i<splitted.length; i++){

        //maximum bar length
        if(barlimit){ valLimit = bars[i]*(subdivisions/4) }


        var valid = valPositiveN(splitted[i]) && valLimits(splitted[i],valLimit)
        if (!valid){
            displayError(valLerrMsg)
            return false
        }
    
    }
      

    return true


}




function displayError(msg){

    document.getElementById('error').innerHTML = msg
    setTimeout(function () { document.getElementById('error').innerHTML = '' }, 2000)
}