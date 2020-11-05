/**
 * Re Senpai [2020]
 */
/**
 * The function of transferring numerical money to capital
 * @param {string} sum money by numbers
 * @returns {string} the cash amount by writing
 */
const moneyWriting = (sum) => {
    let money;
    let price; 
    let litera = sotny = desatky = edinicy = minus = "";
    let k = 0, i, j;
    N = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять",
    "", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать",
    "", "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто",
    "", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот",
    "тысяч", "тысяча", "тысячи", "тысячи", "тысячи", "тысяч", "тысяч", "тысяч", "тысяч", "тысяч",
    "миллионов", "миллион", "миллиона", "миллиона", "миллиона", "миллионов", "миллионов", "миллионов", "миллионов", "миллионов",
    "миллиардов", "миллиард", "миллиарда", "миллиарда", "миллиарда", "миллиардов", "миллиардов", "миллиардов", "миллиардов", "миллиардов"];
    var M = new Array(10);
    for (j = 0; j < 10; ++j)
        M[j] = new Array(N.length);
    for (i = 0; i < N.length; i++)
        for (j = 0; j < 10; j++)
            M[j][i] = N[k++]

    var R = new Array("рублей", "рубль", "рубля", "рубля", "рубля", "рублей", "рублей", "рублей", "рублей", "рублей");
    var K = new Array("копеек", "копейка", "копейки", "копейки", "копейки", "копеек", "копеек", "копеек", "копеек", "копеек");
    function num2str(money, target) {
        let rub = "";
        let kop = "";
        money = money.replace(",", ".");
        if (isNaN(money)) {
            console.log("Не числовое значение");
            return
        }
        if (money.substr(0, 1) == "-") {
            money = money.substr(1);
            minus = "минус "
        }
        else minus = "";
        money = Math.round(money * 100) / 100 + "";
        if (money.indexOf(".") != -1) {
            rub = money.substr(0, money.indexOf(".")); 
            kop = money.substr(money.indexOf(".") + 1); 
            if (kop.length == 1) kop += "0";
        }
        else rub = money; 
        if (rub.length > 12) {
            document.getElementById(target).innerHTML = "Слишком большое число";
            return
        }
        ru = propis(price = rub, R);
        ko = propis(price = kop, K);
        ko != "" ? res = ru + " " + ko : res = ru;
        ru == "Ноль " + R[0] && ko != "" ? res = ko : 0;
        kop == 0 ? res += " ноль " + K[0] : 0;
        return (minus + res).substr(0, 1).toUpperCase() + (minus + res).substr(1);
    }
    function propis(price, D) {
        litera = "";
        for (i = 0; i < price.length; i += 3) {
            sotny = desatky = edinicy = "";
            if (n(i + 2, 2) > 10 && n(i + 2, 2) < 20) {
                edinicy = " " + M[n(i + 1, 1)][1] + " " + M[0][i / 3 + 3];
                i == 0 ? edinicy += D[0] : 0;
            }
            else {
                edinicy = M[n(i + 1, 1)][0];
                (edinicy == "один" && (i == 3 || D == K)) ? edinicy = "одна" : 0;
                (edinicy == "два" && (i == 3 || D == K)) ? edinicy = "две" : 0;
                i == 0 && edinicy != "" ? 0 : edinicy += " " + M[n(i + 1, 1)][i / 3 + 3];
                edinicy == " " ? edinicy = "" : (edinicy == " " + M[n(i + 1, 1)][i / 3 + 3]) ? 0 : edinicy = " " + edinicy;
                i == 0 ? edinicy += " " + D[n(i + 1, 1)] : 0;
                (desatky = M[n(i + 2, 1)][2]) != "" ? desatky = " " + desatky : 0;
            }
            (sotny = M[n(i + 3, 1)][3]) != "" ? sotny = " " + sotny : 0;
            if (price.substr(price.length - i - 3, 3) == "000" && edinicy == " " + M[0][i / 3 + 3]) edinicy = "";
            litera = sotny + desatky + edinicy + litera;
        }
        if (litera == " " + R[0]) return "ноль" + litera;
        else 
        return litera.substr(1);
    }
    function n(start, len) {
        if (start > price.length) return 0;
        else return Number(price.substr(price.length - start, len));
    }
    return num2str(sum);
};
/**
 * Add button for CRM
 * @param {number} counter 
 */
function timer(counter) { 
    setTimeout(function() {
        try {
            let balance = $('crm-user-info > div > div.clr-col-lg-5 > crm-billing-account-preview-card > div > div.card-block > table > tbody > tr:nth-child(5) > td:nth-child(2)');
            if (balance.children().length > 0) {
                counter = 0;
                return;
            } else if (counter > 50) {
                return;
            } else {
                timer(counter + 1)
            }
            $(balance).append('<input type="button" value="Баланс прописью" id="copy_balance" class="ss-button" >');
            coins = balance.text().split('/')[0].slice(0, -1)
            balance = moneyWriting(balance.text().split('/')[0].slice(0, -2))
            $('#copy_balance').on('click', function(){
                let $temp = $("<input>");
                $("body").append($temp);
                $temp.val(`${coins} ( ${balance} )`).select();
                document.execCommand("copy");
                $temp.remove();
            });
        } catch (error) {
            console.error(`Ошибка CRM в function timer; (${error})`);
        }
    }, 300)
} 
/**
 * Сhecks url for changes
 */
function urlChecker () {
    let storedHash = window.location.href;
    window.setInterval(function () {
        if (window.location.href != storedHash) {
            storedHash = window.location.href;
            if (/\d+\/info/.test(storedHash)) {
                timer(0);
            }
            if (/users/i.test(storedHash)) {
                runTemplateOnCommentsButton();
            }
        }
    }, 100); 
}

timer(0);

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
    addButton('Отключение АП', [1,3,22,69]);
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

function runTemplateOnCommentsButton() {
    setupTemplate(COMMENT_BUTTON);
}

function runTemplateForGeneralCommentButton() {
    setupTemplate(GENERAL_COMMENT_BUTTON);
}

runTemplateOnCommentsButton();
runTemplateForGeneralCommentButton();
urlChecker();



    