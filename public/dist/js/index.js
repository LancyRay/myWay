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
//��̬��������

//С���飬��ͼƬ
for (var i = 0; i < ulLis.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = i + 1;
    ol.appendChild(li);
}

var olLis=ol.children;
olLis[0].className="current";
var clonLi=ulLis[0].cloneNode(true);
ul.appendChild(clonLi);

//��СԲ��ע�����¼�

for(var i=0;i<olLis.length;i++){
    olLis[i].index=i;//���±�
    olLis[i].onmouseover=function(){
        for(var i=0;i<olLis.length;i++){
            olLis[i].className="";
        }
        this.className="current";
        //�ƶ�ul ,target
        var target = -this.index * imgWidth;
        animate(ul, {"left":target},function(){
            flag=true;
        });

        square = this.index;
        pic = this.index;
    }
}

//���ҽ��㹦��
//��꾭���¼�
box.onmouseover=function(){
    arr.style.display="block";
    clearInterval(timer);
}

//����뿪�¼�
box.onmouseout=function(){
    arr.style.display="none";
    timer = setInterval(function () {
        rightArr.click();
    }, 2000);
}

//�Ҽ�ͷ����¼�
rightArr.onclick=function(){
    if(pic==ulLis.length-1){
        ul.style.left="0";
        pic=0;
    }
    //��������һ�ţ����ɵ�һ��
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

//���ͷ����¼�

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

//�Զ��ֲ�

timer = setInterval(function () {
    rightArr.click();
}, 2000);



