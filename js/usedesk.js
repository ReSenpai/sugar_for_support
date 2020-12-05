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
const MEDIUM_BAR_BUTTONS = 'body > div.page-container.sidebar-collapsed > div.main-content.main-content_chat > div > div.chat-visible.chat_page_container > div > div.right_column > div.chat-panel.pd-0 > div.main_section > div > section > div.row.chat_container-row > div.new_message_head > div.pull-right';
const TOP_BAR_BUTTONS = 'body > div.page-container.sidebar-collapsed > div.main-content.main-content_chat > div > div.chat-visible.chat_page_container > div > div.right_column > div.chat-panel.pd-0 > div.main_section > div > section > div.row.chat_container-row > div.new_message_head > div.pull-left';
const MENU_BUTTON = '#editable_fields';
const MAIN_CONTENT = 'body > div.page-container.sidebar-collapsed > div.main-content.main-content_chat';
let BUTTONS_TABLE;
const menu = {
    waitCheckbox: '#ticket-fields-form > div:nth-child(2) > div > label.cb-wrapper',
    submit: '#ticket-fields-form > div.popover-content.additional-fields-buttons > div > div > button',
    product: {
        path: '#ticket-fields-form > div:nth-child(6) > select',
    },
    section: {
        path: '#ticket-fields-form > div:nth-child(8) > select',
    },
    category: {
        path: '#ticket-fields-form > div:nth-child(10) > select',
    },
    result: {
        path: '#ticket-fields-form > div:nth-child(12) > select',
    }
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
    const selectElement = await getElement(select);
    let optionValue;
    if (selectElement.hasChildNodes()) {
        const regex = new RegExp(`^${text}$`, 'i');
        selectElement.childNodes.forEach(node => {
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
    const element = await getElement(selector);
    element.value = template;
    element.dispatchEvent(event);
}

const addTemplateToButton = (button, template) => {
    button.addEventListener('click', async () => {
        await openMenu();
        const productPath = menu.product.path;
        const sectionPath = menu.section.path;
        const categoryPath = menu.category.path;
        const resultPath = menu.result.path;
        const paths = [productPath, sectionPath, categoryPath, resultPath];
        const [product, section, category, result] = template.map((name, i) => getOptions(paths[i], name));
        await setOption(productPath, await product);
        await setOption(sectionPath, await section);
        await setOption(categoryPath, await category);
        await setOption(resultPath, await result);
        await submitMenu();
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
    const button = createButton(name);
    addTemplateToButton(button, template);
    BUTTONS_TABLE.appendChild(button);
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
