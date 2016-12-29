var qrcode = new QRCode(document.getElementById("qrcode"), {});
var ok1 = false;
$(function () {
    $("#desc").bind({
        focus:function(){
            $(".descHint").html("二维码标识不能超过16字符");
        },
        blur:function(){
            $(".descHint").html("");
        }
    });
    $("form").submit(function(e){
        var len=$("#desc").val().length;
        if(len===0){
            $("#desc").val("开票信息");
        }
        if(ok1){
            makeCode();
        }else{
            $(".cnHint").html("不能为空，请填写");
        }
    });
/*    $(".button").on("click", function () {
        var len=$("#desc").val().length;
        if(len===0){
            $("#desc").val("开票信息");
        }
        if(ok1){
            makeCode();
        }else{
            $(".cnHint").html("不能为空，请填写");
        }
    });*/
    // 防止内容区域滚到底后引起页面整体的滚动
    var content = $('main');
    var startY;
    content.addEventListener('touchstart', function (e) {
//起始位置
        startY = e.touches[0].clientY;
    });
    content.addEventListener('touchmove', function (e) {
// 高位表示向上滚动
// 底位表示向下滚动
// 1容许 0禁止
        var status = '11';
        var ele = this;
//当前位置
        var currentY = e.touches[0].clientY;
//如果垂直偏移量scrollTop为0，说明要么内容小于容器没有滚动条，要么大于容器但滚动条在顶部
        if (ele.scrollTop === 0) {
// 如果内容小于容器则同时禁止上下滚动，若大于则可以向下滚动
            status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
        } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
            /*
             1.垂直偏移量scrollTop+整个元素的尺寸offsetHeight(包括边框)=整个内容区域scrollHeight
             证明已经滚到底部了只能向上滚动；
             2.其中offsetHeight(包括边框)是否要换成clientHeight(不包括边框)？
             */
            status = '10';
        }
//若status==11则上面三种情况都不是，这种情况是有滚动条且滚动条不在顶部也不在底部
        if (status != '11') {
// 判断当前的滚动方向
            var direction = currentY - startY > 0 ? '10' : '01';
            /*
             1.操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
             2.status为00，说明没有滚动条，此时无论direction是上还是下，都要阻止滚动
             3.status为01，说明有滚动条，可以向下滚动，此时direction为01则符合向下滚动
             4.status为10，说明有滚动条，可以向上滚动，此时direction为10则符合向上滚动
             5.综上a.没有滚动条 b.滚动条在顶部但还向上滚动 c.滚动条在底部但还向下滚动 都要阻止滚动
             */
            if (!(parseInt(status, 2) & parseInt(direction, 2))) {
                stopEvent(e);
            }
        }
    });
});
function copName(){
    var copName=$("#companyname").val().length;
    if(copName==""){
        $(".cnHint").html("不能为空，请填写");
        ok1 = false;
    }else{
        ok1 = true;
        $(".cnHint").html("");
    }
    testLen();
};
//限制表单字数
/*function infTitle(){
 var len=$("#desc").val().length;
 if(len<17 && len>0){
 $(".hint").html("");
 } else {
 $(".hint").html("字符长度需在1到16之间");
 }
 };*/
function testLen(){
    if(ok1){
        $(".button").removeClass("buttonG").addClass("buttonB");
        //$(".button").removeAttr("disabled");
    }else {
        $(".button").removeClass("buttonB").addClass("buttonG");
        //$(".button").attr("disabled","disabled");
    }
}
function makeCode() {
    clearTimeout(hechen());
    var name = $("#companyname").val();
    var identifier = $("#identifier").val();
    var address = $("#address").val();
    var bank = $("#bank").val();
    var elText = $("#text").val();
    elText = "1:" + name + "\r\n2:" + identifier + "\r\n3:" + address + "\r\n4:" + bank + "\r\n";
    var elText2 = "公司名称:北京华夏聚龙自动化股份公司\r\n纳税人识别号:911101097481361512\r\n地址：北京市丰台区南四环西路188号" + "（总部基地）十区27号楼电话:010-52256809\r\n开户行及账号:交通银行北京丰台支行110061242018010079265";
    qrcode.makeCode(elText);
    setTimeout("hechen()",250);
    //hechen();
    setTimeout("time()",100);
}
function time(){
    $("#result_content").show();
}
function closeResult() {
    $("#result_content").hide()
}
$("#text").on("blur", function () {
    makeCode();
}).on("keydown", function (e) {
    if (e.keyCode == 13) {
        makeCode();
    }
});
function hechen() {
    var mainCtx = getCanvasContext("main");
    var maxWidth = mainCtx.width;
    var maxHeight = mainCtx.height;
    mainCtx.fillStyle = "#fff";
    mainCtx.fillRect(0, 0, 276, 305);
    var mainc = document.getElementById("main");
    var codeImg = new Image();
    codeImg.src = $("#qrcode").children("img")[0].src;
    mainCtx.drawImage(codeImg, 10, 10);
    if ($("#desc").val()) {
        mainCtx.font = "16px Arial";
        mainCtx.fillStyle = "#1c1c1c";
        mainCtx.lineWidth = 1;
        mainCtx.textAlign="start";
        mainCtx.textAlign = "center"; //设置文本的水平对对齐方式
        mainCtx.fillText($("#desc").val(), 138, 295)
    }
    var imageData = mainc.toDataURL("image/jpg");
    document.getElementById("myimage").src = imageData;
}
function getCanvasContext(id) {
    return document.getElementById(id).getContext("2d")
}
function setWidthHeight(img, maxWidth, maxHeight) {
    var imgWidth = img.width;
    var imgHeight = img.height;
    if (imgWidth <= maxWidth && imgHeight <= maxHeight) {
    }
};