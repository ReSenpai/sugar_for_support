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
                console.log('Скрипт для кнопки "Баланс прописью" - не подхватился. Перезагрузите страницу');
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
            console.log(`Ошибка CRM в function timer; (${error})`);
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
        }
    }, 100); 
}

timer(0);
urlChecker();