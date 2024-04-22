



//deprecated
function randomizeBeats(beatLimits) {


    let indexes = allIndexes()

    let finalIndexes = []

    let startindex = 0
    for (let i = 0; i < bars.length; i++) {

        //console.log(i)

        let endindex = startindex + bars[i]
        //console.log('startindex',startindex)
        //console.log('endindex',endindex)
        let barIndexes = indexes.slice(startindex, endindex)
        let randBarIndexes = randomize(barIndexes, beatLimits[i])


        for (let e of randBarIndexes) {
            finalIndexes.push(e)
        }

        startindex = endindex
    }

    return finalIndexes


}


function selectIntervals(beatsOn){

    
    let Intervals = []
    
    let current = []
    
    for (let i = 0; i < beatsOn.length; i++) {

        if (!beatsOn[i-1] || beatsOn[i-1] != beatsOn[i] -1){
            current.push(beatsOn[i])
        }

        if(!beatsOn[i+1] || beatsOn[i+1] != beatsOn[i]+1){
           
            current.push(beatsOn[i])
            let copy = [...current]
            Intervals.push(copy)
            current = []

        }
    }
    return Intervals
}