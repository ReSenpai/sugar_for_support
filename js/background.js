// Тут будущий задел под переключение найтмода из popup

let state = false;

chrome.runtime.onMessage.addListener((message, callback) => {
    if (message == 'test') {
        if (!state) {
            console.log(state)
            chrome.tabs.insertCSS(null, { file: "usedesk.css" });
            state = !state;
            return;
        }
        state = !state;
    }
    console.log(message);
});

document.addEventListener("DOMContentLoaded", function () {
    const crm =  document.getElementById('crm_nightmode');
    console.log(crm)
    // document.getElementById('crm_nightmode').ontoggle = function () {
    //     chrome.tabs.insertCSS(null, {
    //         file: "usedesk.css"
    //     });
    // }
});