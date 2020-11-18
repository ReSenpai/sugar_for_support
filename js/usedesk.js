const darkModeButton = () => {
    // const darkModeButton = createButton('DarkMode');
    // const style = document.querySelector('link[title="usedesk.css"]');
    // chrome.runtime.sendMessage('test');
    // console.log(`Reeeeeeeee ${style}`);
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

/**
 * Promise - get element
 * @param {string} selectorPath path to selector
 */
const getElement = (selectorPath) => new Promise((resolve, reject) => {

    let count = 0;
    const getSelector = () => {
        count++;
        const selector = document.querySelector(selectorPath);
        if (selector) {
            clearInterval(getSelector);
            resolve(selector);
        }
        if (count === 100) {
            clearInterval(getSelector);
            reject(`getElement false: Time is up, 10 sec...`)
        }
    }

    setInterval(getSelector, 100);
});

