




function randomize(origin, maxN) {


    let arrive = []
    let origincopy = origin.map(function (x) { return x })

    for (let i = 0; i < maxN; i++) {
        let n = 0
        let rN = Math.floor(Math.random() * (origincopy.length - n))
        arrive.push(origincopy[rN])
        origincopy.splice(rN, 1)
        n = n + 1
    }
    return arrive

}


function allIndexes(){

    let indexes = []

    for (let i = 0; i < nOfBeats; i++) {
        indexes.push(i)
    }
    //console.log(indexes)

    return indexes


}

function selectBeatsOn(soundPattern){

    let beatsOn = []
    for (let i = 0; i < nOfBeats; i++) {

        if(soundPattern.rythm[i].on){
            beatsOn.push(i)
        }

    }

    return beatsOn
}

function selectBarsIntervals(){

    let indexes = allIndexes()
    
    let barsIntervals = []
    
    let current = []
    let startindex = 0
    for (let i = 0; i < bars.length; i++) {

        //console.log(startindex)
        let endindex = startindex + bars[i]*(subdivisions/4)
        var barIndexes = indexes.slice(startindex, endindex)
        
        current=[...barIndexes]

        var copy = [...current]
        barsIntervals.push(copy)
        current = []
        
        startindex = endindex
        
    }
    


    return barsIntervals
}


function selectIntervals(beatsOn){

    
    let Intervals = []
    
    
    
    let current = []
    
    
    for (let i = 0; i < beatsOn.length; i++) {

        current.push(beatsOn[i])
        //console.log('current',current)
        if(!beatsOn[i+1] || beatsOn[i+1] != beatsOn[i]+1 ){
            
            let copy = [...current]
            Intervals.push(copy)
            current = []

        }
    }

    
    return Intervals
}



function randomizeBeats(intervals,beatLimits) {

    let finalIndexes = []

    /* console.log(intervals) */

    for (let i = 0; i < intervals.length; i++) {
        
        /* console.log('intervals[i]',intervals[i])
        console.log('beatLimits[i]',beatLimits[i]) */
        let randIntIndexes = randomize(intervals[i], beatLimits[i])

        /* console.log('randIntIndexes',randIntIndexes) */

        for (let e of randIntIndexes) {
            finalIndexes.push(e)
        }

    }

    return finalIndexes


}

//randomizeBeats(selectBarsIntervals(),[2,2])
//randomizeBeats(selectIntervals(selectBeatsOn(soundPattern)),[2,2])





function selectIfPlay(soundPattern) {


    if (soundPattern.selectedIndexes.includes(beatIndex)) {
        return true
    }


}


//random types selections
const randomTypes = ['off', 'randomBarPattern', 'randomLine']


// randomBarPattern
function randomBarPattern(soundPattern){


    let beatLimits = splitAndClean(document.getElementById('randomBarPattern').value)

    if(!validateSplitted(

        beatLimits, 
        bars.length, 
        null, 
        'total bars'+' '+bars.length, 
        'Insert numbers between 0 and each bar length', 
        true

    )){return}


    soundPattern.beatLimits = beatLimits
    console.log('beatLimits', beatLimits)
    
    

    soundPattern.selectedIndexes = selectedIndexesCycle(soundPattern,beatLimits)
    console.log('soundPattern.selectedIndexes',soundPattern.selectedIndexes)


    //display 
    selected.endLabel.innerText = 'Rbars' + ' ' + beatLimits 
    
}

function selectedIndexesCycle(soundPattern){
    
    let barsIntervals = selectBarsIntervals()
    //console.log('barsIntervals', barsIntervals)
    let selectedIndexes = randomizeBeats(barsIntervals, soundPattern.beatLimits)

    return selectedIndexes
}



// randomLine
function randomLine(){

    //display 
    selected.endLabel.innerText = 'R'

}



//radiobutton
function switchRandom(soundPattern, type) {

    console.log('type',type)


    if (type =='off') {
        console.log('off')
        soundPattern.random = false
        soundPattern.selectedIndexes = null

        console.log(selected.endLabel.innerText)
        selected.endLabel.innerText = null
    } else {

        soundPattern.random = type

        if(type == 'randomBarPattern') {

            randomBarPattern(soundPattern)

        }else if(type == 'randomLine'){

            randomLine()
        }
    }


        

}












//switchRandom(patternList[0],randomTypePattern,[2,3])
//switchRandom(patternList[0],randomTypeSingle)