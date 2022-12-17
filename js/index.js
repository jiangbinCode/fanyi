//index.js
let timer = null;


//监听 bg.js 发送过来的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    enter(request.data);
});


function enter(data) {
    $("#fy").remove(); //插入新的内容时 先删除之前展示的内容
    if (timer != null) clearInterval(timer); //如果定时器不为null 就关闭定时任务
    //插入html代码  在js里面写html真丫的痛苦
    let fy_div = $("<div id='fy'></div>");
    let src_div = $("<div id='sd'></div>");
    src_div.append("<span class='_sp'>原文: </span>")
    src_div.append("<span>" + data.src + "</span>")
    let tgt_div = $("<div id ='td'></div>");
    tgt_div.append("<span class='_sp'>译文: </span>")
    tgt_div.append("<span><i>" + data.tgt + "</i></span>")
    fy_div.append(src_div);
    fy_div.append(tgt_div);
    let describe = data.describe;
    if (describe != null && describe != undefined && describe.length > 0) {
        let ddt = "";
        for (let d of describe) {
            if (ddt != "") ddt = ddt + "\n" + d;
            else ddt = d;
        }
        console.log(ddt);
        let de_div = $("<div id ='de'></div>");
        de_div.append("<span class='_sp'>描述: </span>")
        de_div.append("<span>" + ddt + "</span>")
        fy_div.append(de_div);
    }

    fy_div.append("<div id='tips'><i>双击关闭该窗口，翻译来自有道云翻译</i></div>")
    $("body").append(fy_div);

    //双击关闭该窗口
    $("#fy").on("dblclick", () => {
        $("#fy").remove();
    })

    timer = setTimeout(() => $("#fy").remove(), 13000); //13 秒后自动关闭该窗口

}