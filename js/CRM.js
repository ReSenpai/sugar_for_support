/**
 * selectors path
 */
const COMMENT_BUTTON = 'body > crm-app > div > clr-main-container > crm-users > div > crm-user-page > crm-user-detail > div > button:nth-child(1)';
const GENERAL_COMMENT_BUTTON = 'body > crm-app > div > clr-main-container > crm-app-header > clr-header > div.header-actions > a.nav-link.nav-text.add-comment';
const treeCheckbox = 'body > crm-app > div > crm-comment-editor > crm-comment-modal > form > clr-modal > div > div.modal-dialog.ng-trigger.ng-trigger-fadeDown.modal-lg > div.modal-content-wrapper > div > div.modal-body > div:nth-child(1) > div > label';

const miltiLevelScheme = {
    header: 'body > crm-app > div > crm-comment-editor > crm-comment-modal > form > clr-modal > div > div.modal-dialog.ng-trigger.ng-trigger-fadeDown.modal-lg > div.modal-content-wrapper > div > div.modal-header',
    title: 'body > crm-app > div > crm-comment-editor > crm-comment-modal > form > clr-modal > div > div.modal-dialog.ng-trigger.ng-trigger-fadeDown.modal-lg > div.modal-content-wrapper > div > div.modal-header > div > h3',
    description: '#comment_description',
    production: '#multi_level_scheme__lists > div > div:nth-child(1) > select',
    category: '#multi_level_scheme__lists > div > div:nth-child(2) > select',
    subCategory: '#multi_level_scheme__lists > div > div:nth-child(3) > select',
    result: '#multi_level_scheme__lists > div > div:nth-child(4) > select',
    templateDevices: 'body > crm-app > div > crm-comment-editor > crm-comment-modal > form > clr-modal > div > div.modal-dialog.ng-trigger.ng-trigger-fadeDown.modal-lg > div.modal-content-wrapper > div > div.modal-body > div:nth-child(8)',
    platform: '#comment_platform'
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
/**
 * Remove title
 */
const deleteTitle = async () => {
    try {
        const title = await getElement(miltiLevelScheme.title);
        title.remove();
    } catch (error) {
        console.error(error);
    }
}
/**
 * Create button html element
 * @param {string} value Name button
 */
const createButton = (value) => {
    const button = document.createElement('input');
    button.type = 'button';
    button.className = 'ss-button';
    button.value = value;
    return button;
}
/**
 * Set the option
 * @param {string} selector path to element 
 * @param {number} template option value
 */
const setOption = async (selector, template) => {
    const event = new Event('change');
    const element = await getElement(selector);
    element.value = template;
    element.dispatchEvent(event);
}
/**
 * Add description in textaera
 * @param {string} text 
 */
const addDescription = async (text) => {
    const textareaDescription = await getElement(miltiLevelScheme.description);
    textareaDescription.value = text;
}
/**
 * Add a template to the button
 * @param {HTMLElement} button html element
 * @param {Array<number>} template array of select values to generate a pattern
 */
const addTemplateToButton = (button, template) => {
    button.addEventListener('click', async () => {

        const [production, category, subCategory, result, description = ''] = template;

        setOption(miltiLevelScheme.production, production);
        setOption(miltiLevelScheme.category, category);
        setOption(miltiLevelScheme.subCategory, subCategory);
        setOption(miltiLevelScheme.result, result);
        description && addDescription(description);
    })
}
/**
 * Get element and append child
 * @param {string} selector selector path
 * @param {HTMLInputElement} child HTML input element
 */
const getElementAndAppendChild = (selector, child) => {
    getElement(selector)
    .then(element => {
        element.appendChild(child);
    })
    .catch(error => console.error(error));
}

/**
 * Add a button to the header CO
 * @param {string} value Name button
 * @param {Array<number>} template array of select values to generate a pattern
 */
const addButton = (value, template) => {
    const button = createButton(value);
    addTemplateToButton(button, template);
    getElementAndAppendChild(miltiLevelScheme.header, button);
}
/**
 * Add device button
 * @param {string} value Button name
 * @param {string} deviceValue value of platform
 */
const addDeviceButton = (value, deviceValue) => {
    const button = createButton(value);
    button.addEventListener('click', async () => {
        setOption(miltiLevelScheme.platform, deviceValue);
    });
    getElementAndAppendChild(miltiLevelScheme.templateDevices, button);
}
/**
 * Set the checkbox in an active position
 */
const forseCheckbox = () => {
    getElement(treeCheckbox)
        .then(checkbox => {
            checkbox.click();
        })
        .catch(error => console.log(error));
}
/**
 * Template collector
 */
const collectTemplate = () => {
    forseCheckbox();
    deleteTitle();
    addButton('Возврат БК', [1,5,28,95]);
    addButton('Отключение АП', [1,3,22,327]);
    addButton('Мерж', [1,3,20,67]);
    addButton('Отвязать карту', [1,5,30,104]);
    addButton('Удалить акк', [1,3,19,66, 'Удаление аккаунта']);
    addButton('Акции 306/302', [1,4,27,217]);
    addButton('Ошибка 116', [1,3,18,268]);
    addButton('АП', [1,5,30,106]);
    addButton('Изменение Почты/телефона', [1,3,274,276]);
    addDeviceButton('Web', 'Web');
}
/**
 * Setup template
 * @param {string} selector path to element
 */
const setupTemplate = (selector) => {
    getElement(selector)
    .then(element => {
        element.removeEventListener('click', collectTemplate);
        element.addEventListener('click', collectTemplate);
    })
    .catch(error => console.log(error));
}
/**
 * Sets all templates
 */
function runTemplates() {
    setupTemplate(COMMENT_BUTTON);
    setupTemplate(GENERAL_COMMENT_BUTTON);
}

runTemplates();


    