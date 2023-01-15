
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
const rapportoPx = 60; //zoom
var larghezza = canvas.width/rapportoPx;
var altezza = canvas.height/rapportoPx;

function point(x1, y1, can){
    can.strokeRect(x1,y1,0.1,0.1);
}

function assiCart(x1,y1,can){
    can.lineTo(0,y1);
    can.lineTo(x1+x1,y1);
    can.lineTo(x1,y1);
    can.lineTo(x1,0);
    can.lineTo(x1,y1+y1);
    can.moveTo(rapportoPx,y1-3);
    for(var i=1;i<larghezza;i++){
        can.lineTo(i*rapportoPx,y1+3);
        can.moveTo(i*rapportoPx+rapportoPx,y1-3);
    }
    can.moveTo(x1-3,rapportoPx);
    for(var i=1;i<larghezza;i++){
        can.lineTo(x1+3,i*rapportoPx);
        can.moveTo(x1-3,i*rapportoPx+rapportoPx);
    }
    can.moveTo(x1,y1);
}

function f(x1){
    return Math.sin(x1)*Math.sin(x1)/x1;
}

function d(x1){
    return (f(x1+0.01)-f(x1))/0.01;
}

function intg(x1,prec){
    var area = prec;
    area += f(x1)*0.01;
    return area;
}

function draw(){
    var xCentro=larghezza/2;
    var yCentro=altezza/2;
    assiCart(xCentro*rapportoPx,yCentro*rapportoPx,context);
    for(var i=-xCentro;i<=xCentro;i+=0.005){
        var x = xCentro+i;
        var y = yCentro-f(i);
        var xCanv = rapportoPx*x;
        var yCanv = rapportoPx*y;
        point(xCanv,yCanv,context);
    }

    context.strokeStyle = "green";
    for(var i=-xCentro;i<=xCentro;i+=0.005){
        var x = xCentro+i;
        var y = yCentro-d(i);
        var xCanv = rapportoPx*x;
        var yCanv = rapportoPx*y;
        point(xCanv,yCanv,context);
    }

    context.strokeStyle = "blue";
    var p = 0;
    var inInt=1; //inizio integrazione
    var fineInt=5; //fine integrazione
    for(var i=inInt;i<=fineInt;i+=0.005){
        var x = xCentro+i;
        p = intg(i,p);
        var y = yCentro-p;
        var xCanv = rapportoPx*x;
        var yCanv = rapportoPx*y;
        point(xCanv,yCanv,context);
    }

    context.strokeStyle = "black";
}

context.beginPath();
draw();
context.stroke();
context.closePath();
