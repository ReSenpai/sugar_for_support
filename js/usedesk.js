const darkModeButton = () => {
    // const darkModeButton = createButton('DarkMode');
    const style = document.querySelector('link[title="usedesk.css"]');
    chrome.runtime.sendMessage('test');
    console.log(`Reeeeeeeee ${style}`);
    // darkModeButton.addEventListener('click', () => {
    //     const style = document.querySelector('link[title="usedesk.css"]');
    //     console.log(`Reeeeeeeee ${style}`);
    //     if (style) {
    //         style.remove();
    //     }
    //     chrome.runtime.sendMessage('test');
        
    // });
    // getElement('body > crm-app > div > clr-main-container > crm-users > nav > ul')
    // .then(element => {
    //     element.appendChild(darkModeButton);
    // })
}

darkModeButton();