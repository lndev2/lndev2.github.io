

function getColumnSlines(beatIndex){

    let columnSoundLines = []

    for (let i=0; i<patternList.length; i++){
        columnSoundLines.push(patternList[i].rythm[beatIndex])
    }

    return columnSoundLines
}



function colorColumnButtons(beatIndex, style){

    let column = getColumnSlines(beatIndex)


    if (typeof style == 'object'){
        var x = 'style[i]'
    }else{
        var x = 'style'
    }


    for (i=0; i<column.length; i++){
        
       column[i].button.className = eval(x)
    }



}

function switchState(button){
    
    
    let patternId = button.id.slice(0,1)
    let pattern = retrievesPattern(patternId)
    let soundlineIndex = button.id.slice(1)
    let soundline = pattern.rythm[soundlineIndex]
    

    if (soundline.on){
        button.className = 'button button-off'
        soundline.on = false
    }else{
        button.className = 'button button-on'
        soundline.on = true
    }

    
}






function ColumnClNames(beatIndex,option){

    let column = getColumnSlines(beatIndex)

    let columnClassNames = []
    for (i=0; i<column.length; i++){
        

        if(option=='restore'){
        if (column[i].on){
            column[i].button.className = 'button'       
        }else{
            column[i].button.className = 'button button-off'            
        }



        }else if(option=='retrieves'){
            if (column[i].on){       
                columnClassNames.push('button button-on')                   
            }else{
                columnClassNames.push('button button-off')
            }
        }
    }

    return columnClassNames
}




function addClassNamesArray(columnClassNames,addClassName){

    
    let addedClass = columnClassNames.map( function(className){ return className + ' '+ addClassName })
    return addedClass

}



