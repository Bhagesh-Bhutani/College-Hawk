let attachUserVideo = async function(){
    try{
        let stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });
        let video = document.getElementsByClassName('video-box')[0];
        video.srcObject = stream;
        video.play();
    } catch(err){
        console.log(err);
    }
};

attachUserVideo();