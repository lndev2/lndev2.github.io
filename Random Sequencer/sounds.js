


let sounds = [
    'Sounds\\Tick.mp3',
    'Sounds\\Snare.mp3',
    'Sounds\\Acoustic snare.mp3',
    'Sounds\\Cmaj7.mp3',
    'Sounds\\Open Hat.mp3',
    'Sounds\\Hi-Hat.wav',
    'Sounds\\Kick.wav'
]

let buffers = []


async function loadAllSounds(){


    for (let sound of sounds){
        buffers.push(await loadSound(sound))
    } 

    
}


