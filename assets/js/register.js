$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

let formQRAjaxHandler = function(){
    let message = $('#qrcode>img').attr('src');
    console.log(message);
    let name = $('form').serializeObject().email;
    firebase.storage().ref(`/${name}`).putString(message, 'data_url', {contentType: 'image/png'}).then(function(snapshot) {
        snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
            let url = downloadURL;
            $.ajax({
                type: 'post',
                url: '/register',
                data: $('form').serialize() + `&qrcode_url=${url}`,
                success: function(data){
                    console.log(data);
                    console.log("Success");
                    window.location.href = `/qrcode/show/${data.data.user._id}`
                },
                error: function(data){
                    console.log(data);
                    console.log("Failure");
                    errorNotification(data, "Error while submitting data");
                    $('#submit-btn').prop('disabled', false);
                }
            });
        });
    })
}

$('form').on('submit', async function(event){
    event.preventDefault();
    $('#submit-btn').prop('disabled', true);
    var QR_CODE = new QRCode("qrcode", {
        width: 220,
        height: 220,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
    let formData = $('form').serializeObject();
    console.log(formData);
    QR_CODE.makeCode(JSON.stringify(formData));
    let interval = setInterval(function(){
        if($('#qrcode>img').attr('src')){
            formQRAjaxHandler();
            clearInterval(interval);
        }
    }, 100);
});