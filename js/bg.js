let yd_cookie = "";
let url = "http://fanyi.youdao.com";


chrome.contextMenus.create({
    title: '翻译', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    onclick: async function (params, tab) {
        let val = params.selectionText;
        let respData = await ajaxRequest(val);
        let text = respData.data;
        chrome.tabs.sendMessage(tab.id, { tgt: text, src: val });
    }
});


window.onload = async () => {
    init();
}

async function init() {
    getCookie();
    setInterval(() => getCookie(), 1000 * 30 * 30); //30分钟刷新一次cookie;
}

async function getCookie() {
    let cookie = await getCookies(url);
    let jointCookie = "";
    for (let i in cookie) {
        jointCookie = jointCookie + cookie[i].name;
        jointCookie = jointCookie + "=";
        jointCookie = jointCookie + cookie[i].value;
        if (i != cookie.length - 1) jointCookie = jointCookie + ";";
    }
    yd_cookie = jointCookie; //赋值到全局变量中
}


function ajaxRequest(val) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://jiangbinyun.cn:8080/api/util/translate",
            type: "post",
            data: { val, cookie: yd_cookie },
            success: (d) => {
                resolve(d);
            },
            error: (d) => {
                console.log(d);
                resolve(d);
            }
        })
    })
}

function getCookies(url) {
    return new Promise((resolve, reject) => {
        chrome.cookies.getAll({
            url: url,
        }, (cookies) => {
            resolve(cookies);
        })
    })
}