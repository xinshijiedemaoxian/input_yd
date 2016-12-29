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