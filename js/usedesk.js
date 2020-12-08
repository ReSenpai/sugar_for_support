/**
 * selectors path
 */
const MEDIUM_BAR_BUTTONS = 'body > div.page-container.sidebar-collapsed > div.main-content.main-content_chat > div > div.chat-visible.chat_page_container > div > div.right_column > div.chat-panel.pd-0 > div.main_section > div > section > div.row.chat_container-row > div.new_message_head > div.pull-right';
const TOP_BAR_BUTTONS = 'body > div.page-container.sidebar-collapsed > div.main-content.main-content_chat > div > div.chat-visible.chat_page_container > div > div.right_column > div.chat-panel.pd-0 > div.main_section > div > section > div.row.chat_container-row > div.new_message_head > div.pull-left';
const MENU_BUTTON = '#editable_fields';
const MAIN_CONTENT = 'body > div.page-container.sidebar-collapsed > div.main-content.main-content_chat';
let BUTTONS_TABLE;
const MENU = '#ticket-fields-form';
const menu = {
    waitCheckbox: '#ticket-fields-form > div:nth-child(2) > div > label.cb-wrapper',
    submit: '#ticket-fields-form > div.popover-content.additional-fields-buttons > div > div > button',
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

const getSelects = async () => {
    const menu = await getElement(MENU);
    let selects = [];

    const recursy = (element) => {
        element.childNodes.forEach(node => {
            if (/^SELECT/.test(node.nodeName)) {
                selects.push(node);
            } else {
                recursy(node)
            }
        })
    }
    recursy(menu);
    return selects;
}

const addButtonsTable = async () => {
    const main = await getElement(MAIN_CONTENT);
    const wrapper = document.createElement('div');
    wrapper.classList.add('resepnai-wrapper');
    main.appendChild(wrapper);
    BUTTONS_TABLE = wrapper;
}
/**
 * Get the value of the option by name
 * @param {string} select Path to element
 * @param {string} text Option name
 */
const getOptions = async (select ,text) => {
    let optionValue;
    if (select.hasChildNodes()) {
        const regex = new RegExp(`^${text}$`, 'i');
        select.childNodes.forEach(node => {
            if (regex.test(node.textContent) && node.tagName === 'OPTION') {
                return optionValue = node.value;
            }
        })
    }
    return optionValue;
}
/**
 * Create button
 * @param {string} name Name button
 */
const createButton = (name) => {
    const button = document.createElement('input');
    button.type = 'button';
    button.classList.add('btn', 'btn-resenpai');
    button.value = name;
    return button;
}

const createDoubleButton = (name) => {
    const buttonLeft = document.createElement('span');
    const buttonRight = document.createElement('span');
    const buttonContainer = document.createElement('div');

    buttonContainer.classList.add('button-resenpai');
    buttonLeft.classList.add('button-resenpai-left');
    buttonRight.classList.add('button-resenpai-right');
    buttonContainer.textContent = name;
    buttonContainer.append(buttonLeft, buttonRight);
    return {
        buttonLeft,
        buttonRight,
        buttonContainer
    }
}

const forseClick = async (element) => {
    const menu = await getElement(element);
    menu.click();
}

const openMenu = async () => { 
    await forseClick(MENU_BUTTON);
}

const submitMenu = async () => {
    await forseClick(menu.submit);
}

const applyWaitCheckbox = async () => {
    await openMenu();
    await forseClick(menu.waitCheckbox);
    await submitMenu();
}

const setOption = async (selector, template) => {
    const event = new Event('change');
    selector.value = template;
    selector.dispatchEvent(event);
}

const addTemplateToButton = (button, template) => {
    async function setTemplate(right) {
        await openMenu();
        const selects = await getSelects();
        const [product, section, category, result] = selects;
        const [productOption, sectionOption, categoryOption, resultOption] = template.map((name, i) => {
            return getOptions(selects[i], name)
        });
        await setOption(product, await productOption);
        await setOption(section, await sectionOption);
        await setOption(category, await categoryOption);
        right && await setOption(result, await resultOption);
        await submitMenu();
    }

    button.buttonLeft.addEventListener('click', async () => {
        await setTemplate();
    })

    button.buttonRight.addEventListener('click', async () => {
        await setTemplate(true);
    })
}

const getElementAndAppendChild = (selector, child) => {
    getElement(selector)
    .then(element => {
        element.appendChild(child);
    })
    .catch(error => console.error(error));
}

const addButton = async (name, template) => {
    const button = createDoubleButton(name);
    addTemplateToButton(button, template);
    BUTTONS_TABLE.appendChild(button.buttonContainer);
}

const addWaitButton = async () => {
    const playgroundMedium = await getElement(MEDIUM_BAR_BUTTONS);
    const button = createButton('Ждем');
    button.classList.add('btn-resenpai-wait');
    button.addEventListener('click', applyWaitCheckbox);
    playgroundMedium.appendChild(button);
}

const collectTemplate = async () => {
    await addButtonsTable();
    await addWaitButton();
    addButton('Возврат БК', ['Кино', 'Фин вопросы', 'Возврат', 'Возврат на БК']);
    addButton('Возврат Баланс', ['Кино', 'Фин вопросы', 'Возврат', 'Возврат на счёт в Окко']);
    addButton('Мерж', ['Кино', 'Аккаунт', 'Объединение аккаунтов', '-']);
    addButton('Отключение АП', ['Кино', 'Аккаунт', 'Выключение автопродления', 'Отключение автопродления']);
    addButton('Отвязать карту', ['Кино', 'Фин вопросы', 'Проблемы с оплатой', 'Отвязка карты']);
    addButton('АП', ['Кино', 'Продукт', 'Подписки', 'Консультация по подпискам']);
    addButton('Откл Устр', ['Кино', 'Аккаунт', 'Отключение устройств', '-']);
    addButton('Подкл Устр', ['Кино', 'Аккаунт', 'Подключение устройств', 'Ошибка 116']);
    addButton('Удалить АКК', ['Кино', 'Аккаунт', 'Удаление аккаунта', '-']);
    addButton('Изменить Почт/Тел', ['Кино', 'Аккаунт', 'Информация по авторизации', 'Изменения номера телефона_почты']);
    addButton('Альт Сеть', ['Кино', 'Проблемы с просмотром контента', 'Сетевые проблемы со стороны клиента', 'Альтернативная сеть']);
    addButton('Ребут Роут/ТВ', ['Кино', 'Проблемы с просмотром контента', 'Сетевые проблемы со стороны клиента', 'Ребут роутера_устройства по питанию']);
    addButton('Очист кеш', ['Кино', 'Проблемы с просмотром контента', 'Сетевые проблемы со стороны клиента', 'Очистка кеш\\(мобильное устройство\\)']);
    addButton('Переуст Прил', ['Кино', 'Проблемы с просмотром контента', 'Сетевые проблемы со стороны клиента', 'Переустановка приложения']);
    addButton('Обн ПО', ['Кино', 'Проблемы с просмотром контента', 'Сетевые проблемы со стороны клиента', 'Обновление ПО']);
    addButton('Сбр. Завод', ['Кино', 'Проблемы с просмотром контента', 'Сетевые проблемы со стороны клиента', 'Сброс до заводских настроек']);
}

collectTemplate();
