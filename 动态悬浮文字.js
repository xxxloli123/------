var window = floaty.window(
    <frame gravity="center">
        
        <text
        textStyle="bold"
        id="text" textSize="32" textColor="#f44336"/>
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
//监听音量下键弹起
events.onKeyDown("volume_down", function(event) {
    toast("音量上键弹起");
    setXY()
});

function setXY() {
    var uiCollection = find()
    var selectedIdx = 0
    if (!uiCollection.empty()) {
        toast(util.format("size=%d", uiCollection.size()));
        window.setSize(uiCollection.get(selectedIdx).bounds().width()
        , uiCollection.selectedIdx.bounds().height())

    } else {
        toast("没找到╭(╯^╰)╮");
    }

}

setInterval(() => {
    //对控件的操作需要在UI线程中执行
    ui.run(function() {
        window.text.setText("■■■")
        //   window.setSize(666, 666);
        setTimeout(function() {
            window.text.setText("")
        }, 1000);

        //   window.text.setText(dynamicText());
    });
}, 2000);

function dynamicText() {
    setInterval(function() {
        window.text.setText("□□□")
        window.text
        setTimeout(function() {
            window.text.setText("")
        }, 1000);

    }, 2000);

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