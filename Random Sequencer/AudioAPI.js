
let context


function initContext() {
    try {
        context = new AudioContext();
        console.log('NewContext')
    }
    catch (e) {
        alert('Web Audio API is not supported in this browser');
    }
}


async function loadSound(url) {

    try {

        let response = await fetch(url)
        //console.log(response)
        let array = await response.arrayBuffer()
        //console.log(array)
        let AudioBuffer = await context.decodeAudioData(array)
        //console.log(AudioBuffer)
        let buffer = AudioBuffer
        return buffer
    } catch (e) { console.log(e) }
    
}
 

function playSound(buffer,pausetime=null) {
    //console.log('buffer', buffer)

    var source = context.createBufferSource();
    //console.log(source)
    source.buffer = buffer;
    //console.log(source.buffer)
    source.connect(context.destination);
    source.start(0)

    if (pausetime){  
    setTimeout(() => {source.stop(0)}, pausetime);
    }
}












