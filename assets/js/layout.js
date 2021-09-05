// M.AutoInit();
function materializeInit(){
    M.AutoInit();
}

materializeInit();

// Notification Functions
let successNotification = function(data){
    new Noty({
        text: data.message,
        layout: 'topRight',
        theme: 'relax',
        type: 'success',
        timeout: 2500
    }).show();
};

let errorNotification = function(data, defaultMessage){
    new Noty({
        text: data.message || defaultMessage,
        layout: 'topRight',
        theme: 'relax',
        type: 'error',
        timeout: 2500
    }).show();
};