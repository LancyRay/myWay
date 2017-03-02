/**
 *
 *
 */
var width = document.documentElement.clientWidth;
var box = document.getElementById("bbox");
var bimg = box.children[0];
var ul = bimg.children[0];
var ol = bimg.children[1];
var ulLis = ul.children;
var arr = document.getElementById("arr");
var leftArr = document.getElementById("left");
var rightArr = document.getElementById("right");

var pic=0;
var imgWidth=bimg.offsetWidth;
var square = 0;
var timer = null;

var oli = ul.getElementsByTagName("li");
console.log(oli)
for(var k = 0 ; k < oli.length ; k++){
    oli[k].style.width = width + "px";
}
//动态生成内容

//小方块，假图片
for (var i = 0; i < ulLis.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = i + 1;
    ol.appendChild(li);
}

var olLis=ol.children;
olLis[0].className="current";
var clonLi=ulLis[0].cloneNode(true);
ul.appendChild(clonLi);

//给小圆点注册点击事件

for(var i=0;i<olLis.length;i++){
    olLis[i].index=i;//存下标
    olLis[i].onmouseover=function(){
        for(var i=0;i<olLis.length;i++){
            olLis[i].className="";
        }
        this.className="current";
        //移动ul ,target
        var target = -this.index * imgWidth;
        animate(ul, {"left":target},function(){
            flag=true;
        });

        square = this.index;
        pic = this.index;
    }
}

//左右焦点功能
//鼠标经过事件
box.onmouseover=function(){
    arr.style.display="block";
    clearInterval(timer);
}

//鼠标离开事件
box.onmouseout=function(){
    arr.style.display="none";
    timer = setInterval(function () {
        rightArr.click();
    }, 2000);
}

//右箭头点击事件
rightArr.onclick=function(){
    if(pic==ulLis.length-1){
        ul.style.left="0";
        pic=0;
    }
    //如果是最后一张，换成第一张
    if(pic==ulLis.length-1){
        ulLis.style.left=0;
        pic=0;
    }
    pic++;
    target=-pic*imgWidth;
    animate(ul,{"left":target},function(){
        flag=true;
    });

    square++;
    if (square == olLis.length) {
        square = 0;
    }
    for (var i = 0; i < olLis.length; i++) {
        olLis[i].className = "";
    }
    olLis[square].className = "current";


}

//左箭头点击事件

leftArr.onclick=function(){
    if (pic == 0) {
        ul.style.left = -(ulLis.length - 1) * imgWidth + "px";
        pic = ulLis.length - 1;
    }
    pic--;
    target = -pic * imgWidth;
    animate(ul, {"left":target},function(){
        flag=true;
    });

    square--;
    if (square == -1) {
        square = olLis.length - 1;
    }
    for (var i = 0; i < olLis.length; i++) {
        olLis[i].className = "";
    }
    olLis[square].className = "current";
}

//自动轮播

timer = setInterval(function () {
    rightArr.click();
}, 2000);



