// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = '/json/';

let model, webcam, labelContainer, maxPredictions;
let countMaskOn = 0;

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
    // labelContainer = document.getElementById("label-container");
    // for (let i = 0; i < maxPredictions; i++) { // and class labels
    //     labelContainer.appendChild(document.createElement("div"));
    // }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    if(countMaskOn == 100){
        window.location.href = '/qrcode'
        return;
    }
    window.requestAnimationFrame(loop);
}

// [
//     {
//         "className": "Mask On",
//         "probability": 0.9911903738975525
//     },
//     {
//         "className": "Mask Off",
//         "probability": 0.008790425956249237
//     },
//     {
//         "className": "No Human",
//         "probability": 0.000019324068489368074
//     }
// ]

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    // console.log(prediction);
    let maxClass = '';
    let maxProbability = 0;
    for (let i = 0; i < maxPredictions; i++) {
        // const classPrediction =
        //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        // labelContainer.childNodes[i].innerHTML = classPrediction;
        if(prediction[i].probability > maxProbability){
            maxProbability = prediction[i].probability;
            maxClass = prediction[i].className;
        }
    }

    if(maxClass == 'Mask On'){
        countMaskOn++;
        // if(countMaskOn == 1){
            $('#detecting').text('Detecting... Please Wait!' + ` ${countMaskOn}%`);
        // }
    } else {
        countMaskOn = 0;
        $('#detecting').empty();
    }

    if(countMaskOn == 100){
        console.log("Person Wearing Mask Found!");
    }
}

$(document).on('click' , '.mask-start-btn' , function(event){
    init();
});