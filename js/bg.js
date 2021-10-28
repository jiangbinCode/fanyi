//bg.js
chrome.contextMenus.create({
    title: '翻译', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    onclick: async function (params, tab) {
        let val = params.selectionText;
        let respData = await ajaxRequest(val); //请求服务器接口
        chrome.tabs.sendMessage(tab.id, { data:respData.data }); //发送翻译结果给指定的tab页面进行处理
    }
});

function ajaxRequest(val) {
    return new Promise((resolve, reject) => {
        //用java代码写的翻译接口
        $.ajax({
            url: "http://jiangbinyun.cn:8080/api/util/translate",
            // url: "http://127.0.0.1:8080/api/util/translate",
            type: "post",
            data: { val },
            success: (d) => {
                resolve(d);
            },
            error: (d) => {
                resolve(d);
            }
        })
    })
}
