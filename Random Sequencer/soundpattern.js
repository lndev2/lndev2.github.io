
let nPatternCounter = -1
let patternList = []
let nOfBeats;
let subdivisions;
let bars = [4,4]

class SoundLine{
    
    constructor(sound,id){
        this.id = id  
        this.sound = sound  
        this.on = false
        this.time = 'duration'
        this.volume = 'volume'  
        this.button = null
}
}


class SoundPattern{

    constructor(sound){  

        this.id = function (){
            nPatternCounter ++
            let id = String.fromCharCode(nPatternCounter+65)
            return  id
        }()
        

        this.sound = sound  
        this.rythm = this.generateRythm()


        this.label = null
        this.endLabel = null
        this.tab = this.generateTab() 
        

        this.random = false

        //intervals of indexes to randomize
        this.intervals = null
        // limits of random beats each iterval
        this.beatLimits = null
        // random indexes to play each patterncycle
        this.selectedIndexes = null
    }




    generateRythm(){

        let rythm = []
        for (let i=0; i<nOfBeats; i++){
            rythm.push(new SoundLine(this.sound,this.id+i))
        }
        return rythm
    }


    
    generateTab(){


        let tab = document.createElement('table')
        tab.className = 'bars'
        tab.id = this.id
        

        let row = document.createElement('tr')
        row.className = 'row-pattern'

        let soundLabel = document.createElement('p')
        soundLabel.innerHTML= this.sound.slice(7,-4)
        soundLabel.className = 'sound-label'
        soundLabel.onclick= function(){clickSoundLabel(this)}
        soundLabel.addEventListener('click',
        
        setLabelColor)
        soundLabel.style.cursor = 'pointer'

        soundLabel.id = 'L'+ this.id
        this.label = soundLabel
        row.appendChild(soundLabel)

        tab.appendChild(row)
        
        let barcounter = 0
        let beatcounter = 0
        for (let i=0;i<nOfBeats;i++){
            
            let cell = document.createElement('td')
            
            let button = document.createElement('button')
            button.id =  this.id + i
            button.className = 'button button-off' 

            if(beatcounter == bars[barcounter]*subdivisions/4){
                beatcounter = 0
                barcounter ++
            }
            button.innerText = beatcounter+1
            beatcounter ++


            button.onclick= function (){switchState(button)}
    
            this.rythm[i].button = button

            cell.appendChild(button)
            row.appendChild(cell)
    
        }    
        
        let endLabel = document.createElement('p')
        endLabel.className = 'end-label'
        endLabel.id =  this.id + 'endLable' 
        this.endLabel = endLabel
        row.appendChild(endLabel)
        

        return tab
    }

    

    barDisplay(tab,add){

        if (add== false){
            document.getElementById('bardiv').replaceChildren(tab)
        }else{
            document.getElementById('bardiv').appendChild(tab)
        }
        
        //document.getElementById('bardiv').appendChild(document.createElement('br'))
        
    }


    
}





function setBars(){

    

    let barinput = splitAndClean(document.getElementById('barinput').value)

    
    if(!validateSplitted(
        
        barinput, 8 , 13, 
        'N of bars between 1 and 8',
        'Bars length between 1 and 13', 
        false
        
        )){
        return false
    }else{
        bars = barinput
        document.getElementById('barsdisplay').innerHTML = 'Bars '+ bars.join(" ");
    }
    
    return true
    

}



function setTotalBeats(subdivisions){

    let barsTotLen = bars.reduce( function (a,b){ return Number(a)+Number(b) })
    console.log('barsTotLen',barsTotLen)
    nOfBeats = barsTotLen  * (subdivisions/4) 
    console.log('nOfBeats',nOfBeats)
     
}


function storePattern(add,sound){

    if(add==false){
        patternList = []
        nPatternCounter = -1
        pattern = new SoundPattern(sound)
        
    }else{
        
        pattern = new SoundPattern(sound)
        
    }

    patternList.push(pattern)

    return pattern
}



function generatePattern(add){

    if(!add){

        

    if(!first){
    if(!setBars()){
        return
    }
    }

    subdivisions = document.getElementById('sdv').value 
    setTotalBeats(subdivisions)

    displayOptions(off = true)

    }
    
    let sound = document.getElementById('soundtype').value
    
    let pattern = storePattern(add,sound)
    pattern.barDisplay(pattern.tab, add)
    console.log(pattern)

}



generatePattern(add=false, first = true)