// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = '/json/face_detection/';

let model, webcam, labelContainer, maxPredictions;
let count = 0;
let currentClass = '';

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam($(window).height(), 3 * $(window).height() / 4, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    if(count == 100){
        window.location.href = '/qrcode'
        return;
    }
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    // console.log(prediction);
    let maxClass = '';
    let maxProbability = 0;
    for (let i = 0; i < maxPredictions; i++) {
        if(prediction[i].probability > maxProbability){
            maxProbability = prediction[i].probability;
            maxClass = prediction[i].className;
        }
    }

    console.log(maxClass);

    if(maxClass == 'No Human'){
        count = 0;
        $('#detecting').text(`No Human Detected!`);
    } else {
        if(currentClass == maxClass){
            count++;
        } else {
            currentClass = maxClass;
            count = 0;
        }
        $('#detecting').text(`Detecting ${currentClass}... Please Wait!` + ` ${count}%`);
    }
    
    if(count == 100){
        console.log("Face Detected!");
    }
}

$(document).on('click' , '.mask-start-btn' , function(event){
    init();
});