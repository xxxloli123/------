var storage = storages.create("Auto.js例子:复杂数据");
var arr = [1, 4, 2, 5];
var s="sss";
var obj = {
    name: "Auto.js",
    url: "www.autojs.org"
};
//保存
storage.put("arr", arr);
storage.put("obj", obj);

//console.show();
//取出
log("s = ", storage.get("s"));
log("obj = ", storage.get("obj"));

module.exports = storage.get("obj");