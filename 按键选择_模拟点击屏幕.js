var window = floaty.window(
    <frame >

        <text
            padding="0"
            w="*"
            h="*"
            textStyle="bold"
            id="text" textSize="33" textColor="#f44336" />
    </frame>
);

window.exitOnClose();

window.text.click(() => {
    window.setAdjustEnabled(!window.isAdjustEnabled());


});
window.text.longClick(() => {

})

auto();
//启用按键监听
events.observeKey();

// 读取 keyCode
var kc_ok = getKeyCode("ok");
var kc_top = getKeyCode("top")
var kc_bottom = getKeyCode("bottom")
var kc_left = getKeyCode("left")
var kc_right = getKeyCode("right")
var kc_d_switch = getKeyCode("d_switch")
function getKeyCode(params) {
    /* 
    files.listDir(path[, filter])
    path { string } 路径
    filter { Function } 过滤函数，可选。给出文件名，return （ boolean 值 = 是否添加到jsFiles文件列表）。接收一个string参数（文件名），返回一个boolean值。

    列出脚本目录下所有js脚本文件为:

    var dir = "/sdcard/脚本/";
    var jsFiles = files.listDir(dir, function (name) {
        return name.endsWith(".js") && files.isFile(files.join(dir, name));
    });
    log(jsFiles);
    */
    var dir = "/sdcard/1uiCollection/keyCode";
    /**
    files.createWithDirs(path)
    path {string} 路径
    返回 {boolean}
    创建一个文件或文件夹并返回是否创建成功。如果文件所在文件夹不存在，
    则先创建他所在的一系列文件夹。如果文件已经存在，则直接返回false。
     */
    files.createWithDirs(dir);
    // 列出目录下所有js脚本文件为:
    var jsFiles = files.listDir(dir, function (name) {
        return name.endsWith(".js") && files.isFile(files.join(dir, name));
    });

    if (jsFiles.length != 0) {/* 
        files.getNameWithoutExtension(path)
        path { string } 路径
        返回 { string }
        返回不含拓展名的文件的文件名。例如 files.getName("/sdcard/1.txt")返回"1"。 */
        return (files.getName(dir + "/" + jsFiles[0]) != "6") ?
            files.getName(dir + "/" + jsFiles[0]) : params
    } else {
        files.createWithDirs(dir + "/6." + params);
        return params;
    }
}

var selectedId = -1
var uiCollection
var thisActivity = ""
var directionSwitch = false
var kc_d_s_boolean = false
//监听音量下键弹起
events.on("key", function (code, event) {
    var keyCodeStr = event.keyCodeToString(code);

    // 清除记录到的按键标识=删除文件夹
    files.removeDir("/sdcard/2333/1uiCollection/ACTION_DOWN_key")
    // 记录当前按键标识
    files.createWithDirs("/sdcard/2333/1uiCollection/ACTION_DOWN_key" + keyCodeStr);
    // 长按指定组合按键切换屏幕点击方式 
    if (keyCodeStr == kc_d_switch) {
        kc_d_s_boolean = true
    }
    if (directionSwitch) {

    } else {
        if (event.getAction() == event.ACTION_DOWN) {
            toast(keyName + "被按下");
            // 长按 计时器
            timeoutId = setTimeout(function () {
                switch (keyCodeStr) {
                    //ok按键
                    case "":
                        break;
                    //上按键
                    case "":
                        break;
                    //下按键
                    case "":
                        break;
                    //左
                    case "":
                        toast()
                        directionSwitch = !directionSwitch ? true : false
                        break;
                    //右
                    case "":
                        break;
                }
            }, 1500);
        } else if (event.getAction() == event.ACTION_UP) {
            toast(keyName + "弹起");
            clearTimeout(timeoutId);
            // 判断 uiCollection 里面 是否有控件数据 情况下 ，判断 获取数据的界面 否是 当前界面
            if (selectedId = -1) getXYs()
            else {
                // uiCollection 有控件数据 情况下 ，判断 获取数据的界面 否是 当前界面
                if (thisActivity = currentActivity()) {
                    switch (keyCodeStr) {
                        //ok按键
                        case "":
                            break;
                        //上按键
                        case "":
                            break;
                        //下按键
                        case "":
                            break;
                        //左
                        case "":
                            break;
                        //右
                        case "":
                            break;
                    }
                    showSelected()
                } else {
                    thisActivity = currentActivity()
                    getXYs()
                }
            }
        }
    }

});

events.onKeyDown("back", function (event) {
    curPackage = currentPackage();
    timeoutId = setTimeout(function () {
        backBackBackBack();
    }, 长按间隔 = 1500);
});

events.onKeyUp("back", function (event) {
    clearTimeout(timeoutId);
});

loop();

function backBackBackBack() {
    while (curPackage == currentPackage()) {
        back();
        sleep(200);
    }
}
function onKey() {

}

function getXYs() {
    uiCollection = find()
    if (!uiCollection.empty()) {
        // toast(util.format("size=%d", uiCollection.size()));
        selectedId = 0
        thisActivity = currentActivity()
        showSelected()
    } else {
        toast("界面找不到控件");
    }
}


function showSelected() {
    selectedId++
    toast(selectedId + "")
    var uiObject = uiCollection[selectedId]
    //window.setSize(uiObject.bounds().width(), uiObject.bounds().height())
    //toast(uiObject.bounds().width()+","+uiObject.bounds().height());
    //toast(util.format("xy=%d", uiCollection.size()));
}

// 悬浮窗文字变化开关
var textChange = true
setInterval(() => {
    //对控件的操作需要在UI线程中执行 let paint = itemView.title.paint;
    ui.run(function () {
        if (textChange) {
            window.text.setText("■")
            textChange = false
        } else {
            window.text.setText("")
            textChange = true
        }
        //transformPivotX="10"
        window.text.transformPivotX = "10"

        //   window.setSize(666, 666);
        //   window.text.setText(dynamicText());
    });
}, 700);

function dynamicText() {

    var date = new Date();
    var str = util.format("时间: %d:%d:%d\n", date.getHours(), date.getMinutes(), date.getSeconds());
    str += util.format("内存使用量: %d%%\n", getMemoryUsage());
    str += "当前活动: " + currentActivity() + "\n";
    str += "当前包名: " + currentPackage();
    return str;
}

//获取内存使用率
function getMemoryUsage() {
    var usage = (100 * device.getAvailMem() / device.getTotalMem());
    //保留一位小数
    return Math.round(usage * 10) / 10;
}