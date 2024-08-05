// 创建图片控件
function create_img(id, src, x, y) {
    let img = document.createElement("img");
    img.id = id;
    img.src = "./images/" + src + '.png';
    img.style.position = "absolute";
    img.style.left = x + "px";
    img.style.top = y + "px";
    document.body.appendChild(img);
    console.log(`create_img(id:${id},src:${src},x:${x},y:${y})`);
    return img;
}
function create_obj_with_style(id, x, y, w, h, c, d) {
    let obj = document.createElement("div");
    obj.id = id;
    obj.style.position = "absolute";
    obj.style.left = x + "px";
    obj.style.top = y + "px";
    obj.style.width = w + "px";
    obj.style.height = h + "px";
    document.body.appendChild(obj);
    console.log(`create_obj(id:${id},x:${x},y:${y},w:${w},h:${h})`);
    return obj;
}
function set_arc_value_range(obj, startAngle,endAngle ) {
    
}
// 创建按钮控件
function create_btn(id, x, y, w, h) {
    let btn = document.createElement("button");
    btn.id = id;
    btn.style.position = "absolute";
    btn.style.left = x + "px";
    btn.style.top = y + "px";
    btn.style.width = w + "px";
    btn.style.height = h + "px";
    btn.style.opacity = 0;
    document.body.appendChild(btn);
    console.log(`create_btn(id:${id},x:${x},y:${y},w:${w},h:${h})`);
    return btn;
}
// 创建标签控件
function create_label(id, x, y, w, h) {
    let label = document.createElement("label");
    label.id = id;
    label.style.position = "absolute";
    label.style.left = x + "px";
    label.style.top = y + "px";
    label.style.width = w + "px";
    label.style.height = h + "px";
    document.body.appendChild(label);
    console.log(`create_label(id:${id},x:${x},y:${y},w:${w},h:${h})`);
    return label;
}
function get_js_parent() {
    var caller = get_js_parent.caller;
    if (caller && caller.arguments && caller.arguments.callee) {
      var parentObj = caller.arguments.callee.caller;
      return parentObj && parentObj.arguments && parentObj.arguments.callee ? parentObj.arguments.callee : null;
    }
    return null;
  }
  
// 创建圆弧控件
function create_arc(id, x, y, w, h, startAngle, endAngle, timeLabel) {
    let arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arc.setAttribute("id", id);
    arc.setAttribute("d", describeArc(x, y, w, h, startAngle, endAngle));
    arc.style.fill = "none";
    arc.style.stroke = "black";
    document.body.appendChild(arc);
    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }
    function describeArc(x, y, w, h, startAngle, endAngle) {
        let start = polarToCartesian(x, y, w / 2, endAngle);
        let end = polarToCartesian(x, y, w / 2, startAngle);
        let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        let d = [
            "M", start.x, start.y,
            "A", w / 2, h / 2, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
        return d;
    }
    console.log(`create_arc(id:${id},x:${x},y:${y},w:${w},h:${h},startAngle:${startAngle},endAngle:${endAngle})`);
    return arc;
}
// 创建对象控件
function create_obj(id, x, y, w, h) {
    let obj = document.createElement("div");
    obj.id = id;
    obj.style.position = "absolute";
    obj.style.left = x + "px";
    obj.style.top = y + "px";
    obj.style.width = w + "px";
    obj.style.height = h + "px";
    document.body.appendChild(obj);
    console.log(`create_obj(id:${id},x:${x},y:${y},w:${w},h:${h})`);
    return obj;
}
// 创建线控件
function create_line(id, lineWidth) {
    let line = document.createElement("hr");
    line.id = id;
    line.style.borderTop = `${lineWidth}px solid black`;
    document.body.appendChild(line);
    return line;
}
// 设置图片控件的图片源
function set_img_src(obj, src) {
    obj.src = './images/' + src + '.png';
}
function set_obj_size(obj, w, h) {
    obj.style.width = w + 'px';
    obj.style.height = h + 'px';
}
function set_obj_pos(obj, x, y) {
    obj.style.left = x + 'px';
    obj.style.top = y + 'px';
}
// 设置对象的点击事件
function set_obj_click(obj, func) {
    obj.addEventListener("click", func);
}
// 设置对象隐藏
function set_obj_hidden(obj) {
    obj.style.display = "none";
}
// 设置对象显示
function set_obj_display(obj) {
    obj.style.display = "block";
}
function set_obj_del(obj) {
    obj.parentNode.removeChild(obj);
}
// 获取对象的X轴坐标
function get_obj_x(obj) {
    return obj.getBoundingClientRect().left;
}
// 获取对象的Y轴坐标
function get_obj_y(obj) {
    return obj.getBoundingClientRect().top;
}
// 刷新对象位置
function refr_obj_pos(obj) {
    let rect = obj.getBoundingClientRect();
    obj.style.left = rect.left + "px";
    obj.style.top = rect.top + "px";
}
// 设置 label 内容
function set_label_text(obj, text) {
    obj.innerText = text;
}
// 设置 label 字体
function set_label_font(obj, font) {
    obj.style.fontFamily = "font" + font;
}
// 设置 label 颜色
function set_label_color(obj, color) {
    obj.style.color = color;
}
// 设置 label 内容居中显示
function set_label_content_center(obj) {
    obj.style.textAlign = "center";
}
function set_label_content_align(obj) {
    obj.style.textAlign = "align";
}
// 设置前景色
function set_arc_fg_color(obj, color) {
    obj.style.stroke = color;
}
// 设置前弧宽度
function set_arc_fg_width(obj, width) {
    obj.style.strokeWidth = width + "px";
}
// 设置前弧半径
function set_arc_fg_radius(obj, radius) {
    obj.setAttribute("r", radius);
}
// 设置背景色
function set_arc_bg_color(obj, color) {
    obj.style.fill = color;
}
// 设置背景弧宽度
function set_arc_bg_width(obj, width) {
    obj.style.strokeWidth = width + "px";
}
// 设置背景弧半径
function set_arc_bg_radius(obj, radius) {
    obj.setAttribute("r", radius);
}
// 在 arc 上设置倒计时功能，实时更新 arc 的值
function obj_modify_value(obj, width, height) {
    let total = width + height;
    let value = obj.getAttribute("value");
    if (value) {
        let percent = value / total;
        obj.setAttribute("stroke-dasharray", width * percent + " " + height);
    }
}
// 设置两个点的坐标（2 点确定一条直线）
function set_line_point(obj, x1, y1, x2, y2) {
    obj.setAttribute("x1", x1);
    obj.setAttribute("y1", y1);
    obj.setAttribute("x2", x2);
    obj.setAttribute("y2", y2);
}
// 设置线的宽度
function set_line_width(obj, width) {
    obj.style.strokeWidth = width + "px";
}
// 设置线的颜色
function set_line_color(obj, color) {
    obj.style.stroke = color;
}
// 注册点击事件
function addEvent(obj, eventList, callback) {
    eventList.forEach((event) => {
        obj.addEventListener(getEventType(event), callback);
    });
}
// 销毁点击事件
function registerEvent(obj) {
    // obj.parentNode.replaceChild(obj.cloneNode(true), obj);
}
// 设置对象旋转90度
function rotate_90_degrees(obj, angleX, angleY) {
    obj.style.transform = `rotate3d(1, 0, 0, ${angleX}deg) rotate3d(0, 1, 0, ${angleY}deg)`;
}
// 设置对象在X方向移动
function move_horizontal(obj, startX, endX) {
    obj.style.transform = `translateX(${startX}px)`;
    setTimeout(() => {
        obj.style.transform = `translateX(${endX}px)`;
    }, 1000);
}
// 设置对象在Y方向移动
function move_vertical(obj, startY, endY) {
    obj.style.transform = `translateY(${startY}px)`;
    setTimeout(() => {
        obj.style.transform = `translateY(${endY}px)`;
    }, 1000);
}
// 获取事件类型，实际没有这个函数捏，只是我为了防止代码嵌套
function getEventType(code) {
    switch (code) {
        case 1:
            return "mousedown";
        case 7:
            return "click";
        case 8:
            return "mouseup";
        default:
            return "";
    }
}
function set_animal_over_flag() {
}
function exit_game() {
    alert("退出游戏");
}
function rand_num() {
    let random = Math.random() * 1000;
    return parseInt(random.toString(), 10);
}
function saveDataToFile(obj) {
    sessionStorage.setItem("SAVE_KEY", JSON.stringify(obj));
}
function readDataFromFile(obj) {
    var itemStr = sessionStorage.getItem("SAVE_KEY");
    if (itemStr) {
        var objSave = JSON.parse(itemStr);
        for (var k in objSave) obj[k] = objSave[k];
    }
}
class EventMap {
    constructor(id, events, cb, b) {
        this.id = id;
        this.events = events;
        this.cb = cb;
        this.b = b;
    }
}
const set_obj_style = () => { };
const remove_obj_style = () => { };
