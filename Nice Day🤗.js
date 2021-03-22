// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: leaf;
let widget = new ListWidget();

// 样式
let fontSmall = new Font("PingFangSC-Regular", 12);
let fontTiny = new Font("PingFangSC-Regular", 10)
let fontLarge = new Font("PingFangSC-Thin", 34)
let colorGrey = new Color("#bbb");
let colorWhite = new Color("#fff");

// 元素
let hour= new Date().getHours();
let title = widget.addText("一个标题");
title.textColor = colorWhite;
title.font = new Font("DIN Alternate",20);

// 文字
let ctext = widget.addText("一个副标题");
ctext.textColor = colorWhite;
ctext.font = fontSmall;
widget.addSpacer();

// 时间与日期
let date = new Date();
let timer = new Timer();


// 日期
let month = 1 + date.getMonth();
let day = date.getDate();
// let cdate = widget.addText("一个日期");
if (month >= 0 && month <= 9) {
  month = "0" + month;
}

if (day >= 0 && day <= 9) {
  day = "0" + day;
}

let weekday = ["日", "一", "二", "三", "四", "五", "六"];
let week = weekday[date.getDay()];
// let dtext = widget.addText("一个副标题");
let btStackGb = widget.addStack()
let btStackL= btStackGb.addStack()
let btStackR = btStackGb.addStack()
btStackR.layoutVertically()
let a = btStackL.addText(day.toString())
let b = btStackR.addText(month.toString())
let c = btStackR.addText("星期" + week)
btStackGb.layoutHorizontally()
btStackGb.centerAlignContent()
btStackL.setPadding(0, 0, 0, 5)
a.font = fontLarge;
a.textColor = colorWhite;
b.font = fontSmall;
b.textColor = colorWhite;
c.font = fontTiny;
c.textColor = colorWhite;

widget.setPadding(15, 15, 8, 15)
// let etext = widget.addText("一个副标题");

// let btSpacer = widget.addSpacer()
// let d = btSpacer.addText("1111")
// let e = btSpacer.addText("2222")

// 按时间显示问候逻辑
let remTime = (24 - hour).toString() + " 小时";
if (hour >= 0 && hour <= 5) {
  title.text = "Before Dawn";
  ctext.text = "凌晨，今天还有 " + remTime;
} else if (hour >= 6 && hour <= 8) {
  title.text = "Good Morning";
  ctext.text = "早安";
} else if (hour >= 9 && hour <= 17) {
  title.text = "Good Day";
  ctext.text = "日安，今天还有 " + remTime;
} else if (hour >= 18 && hour <= 22){
  title.text = "Good Night";
  ctext.text = "今天还有 " + remTime;
} else if (hour >= 23 && hour <= 24){
  title.text = "Midnight";
  ctext.text = "夜深了";
} 

// 背景图
let boardId = "65154899"
// let boardId = "481662"
//async function loadItems() {
  let url = "https://api.huaban.com/boards/" + boardId + "/pins"
  let req = new Request(url)
  let json = await req.loadJSON()
  let order = Math.floor(Math.random() * json.pins.length)
  let imgURL = "https://" + json.pins[order].file.bucket + ".huabanimg.com/" + json.pins[order].file.key;
  req = new Request(imgURL)
  let sImg = await req.loadImage()
  widget.backgroundImage = sImg;
  let dateImgUrl = "http://download.huaban.com/assets/date.png"
  req = new Request(dateImgUrl)
  let dateImg = await req.loadImage()
//   widget.addImage(dateImg)

  log(json.pins[order].link);
  log(json.pins.length);
  log(imgURL);
//}
// loadItems();


// 
Script.setWidget(widget);
widget.presentSmall();
Script.complete();
