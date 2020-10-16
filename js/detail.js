let positive = 0;
let negative = 0;
let total = 0;
let favorite = 0;
let positive2 = 0;
let negative2 = 0;
let total2 = 0;
let favorite2 = 0;
let message = "El juego ha sido puntuado exitosamente!";

function countPositive(){
    for(i = 0;i < 2; i++){
        if(positive === 0 && negative === 0){
            document.getElementById("countingPositive").innerHTML = ++positive;
            document.getElementById("countingTotal").innerHTML = ++total;
            document.getElementById("countingPositive2").innerHTML = ++positive2;
            document.getElementById("countingTotal2").innerHTML = ++total2;
        }
        else{
            document.getElementById("warning").innerHTML = message;
        }
    }

    for(i = 0;i < 1; i++){
        if(negative === 1 && positive === 0){
            document.getElementById("countingNegative").innerHTML = --negative;
            document.getElementById("countingPositive").innerHTML = ++positive;
            document.getElementById("countingNegative2").innerHTML = --negative2;
            document.getElementById("countingPositive2").innerHTML = ++positive2;
        }
    }
}

function countNegative(){
    for(i = 0;i < 2; i++){
        if(positive === 0 && negative === 0){
            document.getElementById("countingNegative").innerHTML = ++negative;
            document.getElementById("countingTotal").innerHTML = ++total;
            document.getElementById("countingNegative2").innerHTML = ++negative2;
            document.getElementById("countingTotal2").innerHTML = ++total2;
        }
        else{
            document.getElementById("warning").innerHTML = message;
        }
    }

    for(i = 0;i < 1; i++){
        if(positive === 1 && negative === 0){
            document.getElementById("countingNegative").innerHTML = ++negative;
            document.getElementById("countingPositive").innerHTML = --positive;
            document.getElementById("countingNegative2").innerHTML = ++negative2;
            document.getElementById("countingPositive2").innerHTML = --positive2;
        }
    }
}

function countFavorite(){
    for(i = 0;i < 1; i++){
        if(favorite === 0){
            document.getElementById("countingFavorite").innerHTML = ++favorite;
            document.getElementById("countingFavorite2").innerHTML = ++favorite2;
        }
        else{
            document.getElementById("countingFavorite").innerHTML = --favorite;
            document.getElementById("countingFavorite2").innerHTML = --favorite2;
        }
    }
}