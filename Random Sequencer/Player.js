

let interval = 1000
let loop
let beatIndex = 0
let speed



function loadPlayer(){

    initContext()
    loadAllSounds()
    restoreFirst()
    
}


function restoreFirst() {
    clearInterval(loop)
    beatIndex = 0
    
}


function calculateInterval() {
    interval = 1000 / (currentSpeed / 60)
    interval = interval / (subdivisions/4)
}



function playSoundline(currentSoundPattern,currentSoundLine,isRandom) {

    
    if (!currentSoundLine.on) {
        return
    }

    //Randomizing options
    if(isRandom == 'randomBarPattern' ){
        
        if (!selectIfPlay(currentSoundPattern)) {
            return
        }

    }else if(isRandom == 'randomLine'){
        
        let n =  Math.round(Math.random())
        if( n == 0 ){
            return
        }
        
        
    }


    //select buffer
    let bufferToPlay = buffers[sounds.indexOf(currentSoundPattern.sound)]

    playSound(bufferToPlay);  
          
    
      
}
//patternList[0].random = 'single'
//patternList[0].rythm[0].on = 'random'

function playCurrentPosition(beatIndex){

    for(let j=0; j<patternList.length; j++){


        //randomize cycle
        if (patternList[j].random == 'randomBarPattern'){
        if (beatIndex == 0 ){



            patternList[j].selectedIndexes = selectedIndexesCycle(patternList[j])
            
        }
        }

        
        let currentSoundLine = patternList[j].rythm[beatIndex]
        //console.log(currentSoundLine)
        
        
         
        playSoundline(patternList[j],currentSoundLine,patternList[j].random)    

        

    }  
}


function toNext() {
    beatIndex = (beatIndex + 1) % nOfBeats  
    console.log('Next')
}



function playLoop() {
    
    loop = setInterval(function () { 
        
        
        playCurrentPosition(beatIndex)   
        
        let soundClassNames =addClassNamesArray(ColumnClNames(beatIndex,'retrieves'),'tick-current')
        colorColumnButtons(beatIndex,soundClassNames)     
        let previous = beatIndex       
        toNext()          
        
        setTimeout(function(){ColumnClNames(previous,'restore')
        },interval)
        
        
    }, interval)
}

function start(){

    document.getElementById('newpattern').disabled = true

    loadPlayer()
    restoreFirst()
    

    if (validateSpeed() == false){
        return
    }

    calculateInterval()
    playLoop()

}

function stop() {

    document.getElementById('newpattern').disabled = false

    restoreFirst()
    clearInterval(loop);
}