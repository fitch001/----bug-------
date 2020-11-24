//保存定时开始时间
var time = 0;
//设置是否暂停，true表示暂停
var pause = true;
//设置定时函数
var set_timer;
//以数组保存大div中小div的位置编号
var d = new Array(
    [], //不使用索引0方便计数
    [1], //从索引值为1的位置来表示1号方块
    [2],
    [3],
    [4],
    [5],
    [6],
    [7],
    [8],
    [0], //第九个没有，使用0表示 
);
//保存每个位置的方块的可移动的位置编号
var d_direct = new Array(
    [], //不使用索引0方便计数
    [2, 4],
    [1, 3, 5],
    [2, 6],
    [1, 5, 7],
    [2, 4, 6, 8],
    [3, 5, 9],
    [4, 8],
    [5, 7, 9],
    [6, 8],
);
//按照顺序保存每个位置的div的位置信息，第一个为left，第二个top
var d_positonXY = new Array(
    [], //同样不使用索引0
    [0, 0],
    [110, 0],
    [220, 0],
    [0, 110],
    [110, 110],
    [220, 110],
    [0, 220],
    [110, 220],
    [220, 220],
);

//声明移动函数
function move(id) {
    //for循环找出当前点击的小块对应的位置索引
    var i = 1;
    for (i = 1; i < 10; i++) {
        if (d[i] == id) {
            break; //找到对应的位置索引后跳出循环
        }
    }
    //定义当前点击的div可以移动的位置
    var target_d = 0;
    target_d = canGo(i);
    //当返回的值不为0时，表示可以移动
    if (target_d != 0) {
        //将当前点击的位置设置为0，因为点击的div即将移动离开
        d[i] = 0;
        //把目标位置编号设置为当前点击的位置编号
        d[target_d] = id;
        //修改位置参数使被点击的方块移动到对应的位置
        $('#g' + id).animate({
            "left": d_positonXY[target_d][0] + 'px',
            "top": d_positonXY[target_d][1] + 'px',
        },500);
        // document.getElementById("g" + id).style.left = d_positonXY[target_d][0] + 'px';
        // document.getElementById("g" + id).style.top = d_positonXY[target_d][1] + 'px';
    }
    //设置游戏完成标志,true表示完成
    var finished = true;
    //如果大div中每个小div的编号不对应位置，设为false跳出循环
    for (let i = 1; i < 9; i++) {
        if (d[i] != i) {
            finished = false;
            break;
        }
    }
    //如果完成状态为完成 
    if (finished == true) {
        //如果当前没有暂停则调用pause函数
        if (!pause) start();
        alert('恭喜完成');
        reset();
    }
}

//声明移动判断函数
function canGo(val) {
    //定义返回值,默认为0，不可移动
    var return_d = 0;
    //遍历当前位置可能去的位置
    for (let i = 0; i < d_direct[val].length; i++) {
        //如果当前遍历的位置为0，则说明可以移动，跳出循环
        if (d[d_direct[val][i]] == 0) {
            move_if = true;
            return_d = d_direct[val][i];
            break;
        }
    }
    //返回可移动的位置
    return return_d;

}

//设置定时函数
function timer() {
    //每秒加1
    time += 1;
    var min = parseInt(time / 60); //分钟
    var sec = time % 60; //秒
    $('#time').html(min + "分" + "<br/>" + sec + "秒");
}
//开始和暂停函数
function start() {
    //如果是暂停，则开始
    if (pause) {
        //设置按钮文字为暂停
        $("#stop").text("暂停游戏");
        pause = false;
        //启动定时
        set_timer = setInterval(timer, 1000);
    } else {
        $("#stop").text("开始游戏");
        pause = true;
        //暂停取消定时
        clearInterval(set_timer);
    }
}

//重置函数
function reset() {
    time = 0;
    //打乱排序
    random_d();
    if (pause) {
        //如果暂停
        start();
    }
}

//设置打乱函数
function random_d() {
    //从9开始遍历9个位置，与随机生成的一个位置互换
    for (var i = 9; i > 1; i--) {
        //生成随机数 1-9
        var to = parseInt(Math.random() * 8 + 1)
        //将当前的div位置设置为随机出来的位置
        if (d[i] != 0) {
            // document.getElementById("g" + d[i]).style.left = d_positonXY[to][0] + 'px';
            // document.getElementById("g" + d[i]).style.top = d_positonXY[to][1] + 'px';
            $('#g' + d[i]).animate({
                "left": d_positonXY[to][0] + 'px',
                "top": d_positonXY[to][1] + 'px'
            },500);
        }
        //将随机出来的div位置设置为当前的位置
        if (d[to] != 0) {
            $('#g' + d[to]).animate({
                "left": d_positonXY[i][0] + 'px',
                "top": d_positonXY[i][1] + 'px'
            },500)
            // document.getElementById("g" + d[to]).style.left = d_positonXY[i][0] + 'px';
            // document.getElementById("g" + d[to]).style.top = d_positonXY[i][1] + 'px';
        }
        //保存互换后的编号
        var tem = d[to];
        d[to] = d[i];
        d[i] = tem;
    }
}
//初始化函数，页面加载时调用重置函数，重新开始
window.onload = function () {
    reset();
};