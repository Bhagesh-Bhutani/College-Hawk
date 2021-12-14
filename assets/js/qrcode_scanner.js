// import {Html5QrcodeScanner} from "html5-qrcode";

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    // console.log(`Code matched = ${decodedText}`, decodedResult);
    if(isJsonString(decodedText)){
        let obj = JSON.parse(decodedText);
        $('.status').empty();
        $('.status').text("Valid Data Found! Please Wait...");
        // AJAX request to /qrcode/:email
        $.ajax({
            type: 'get',
            url: `/qrcode/${obj.email}`,
            success: function(data){
                window.location.href = `/temperature/${data.data.user._id}`;
            },
            error: function(data){
                // console.log(data);
                errorNotification(data.responseJSON, "Error while processing Barcode Details");
            }
        });
    } else {
        $('.status')[0].empty();
        $('.status').text("Invalid Data in QR Code, Try Again!");
    }
}
  
function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
}
  
  let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: {width: 300 , height: 300} },
    /* verbose= */ false);
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);