
function animate(element, obj, fn) {
    if (element.timer) {
        clearInterval(element.timer);
    }

    element.timer = setInterval(function () {

        var flag = true;//假设成立

        for(var k in obj) {

            if(k === "opacity"){
                //说明要改的样式是不透明度
                var attr = k;
                var target = obj[k];

                //1. parseInt改成了parseFloat,因为opacity是一个小数
                var leader = parseFloat(getStyle(element, attr)) || 0;


                //2. 我对leader和target同时放大1000倍
                leader = leader * 1000;
                target = target * 1000;

                var step = (target - leader) / 10;

                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;

                //3. 设置的时候，对leader缩小1000倍
                element.style[attr] = leader/1000;

                if (leader != target) {
                    flag = false;
                }
            }else if(k === "zIndex"){
                //如果是zIndex属性的话，不用做动画，直接设置
                element.style.zIndex = obj[k];
            } else{
                var attr = k;
                var target = obj[k];
                var leader = parseInt(getStyle(element, attr)) || 0;

                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;
                element.style[attr] = leader + "px";

                if (leader != target) {
                    flag = false;
                }
            }

        }

        if(flag) {
            clearInterval(element.timer);
            fn && fn();
        }
    }, 15);
}


function getStyle(element, attr) {
    //能力检测
    if (window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attr];
    } else {
        return element.currentStyle[attr];
    }
}