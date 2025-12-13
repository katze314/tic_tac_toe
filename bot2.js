var msg=document.getElementById("msg");
msg.innerHTML="<br>";


const scores=[0,0];
const xo=["X","O"];
const player=["You", "Bot"];


var bias=Math.floor(Math.random()*2);
var counter=0;
const field=[2,2,2,2,2,2,2,2,2];
const history=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
var res=0;

if (bias==1){
    play();
}



function end(){
    for(let i=0; i<3; i++){
        if (field[3*i]!=2 && ((field[3*i+1]==field[3*i] && field[3*i]==field[3*i+2]))){
            return field[3*i];
        }
        if(field[i]!=2 && (field[i]==field[3+i] && field[i]==field[6+i])){
            return field[i];
        }
    }
    if(field[4]!=2 && ((field[0]==field[4] && field [0]==field[8])||(field[2]==field[4] && field[2]==field[6]))){
        return field[4];
    }

    if (counter==9){
        return 2;
    }
    return 3;
    

}


function play(){   
    var x;
    do{
        x=Math.floor(Math.random()*9);
    }while(field[x]!=2);
    anymove(x);
}


function move(x){
    anymove(x);
    if(res<9){
        play();
    }
}

function anymove(x){
    if(counter<9){
    var clicked=document.getElementById(x);
    if(field[x]==2){
        field[x]=(bias+counter)%2;
        clicked.innerHTML=xo[(bias+counter)%2];
        counter++;
        msg.innerHTML="<br>";
    }
    history[counter]=x;
    
    res=end();
    if (res<2){
        msg.innerHTML=player[res] + " won!";
    }
    if(res==2){
        msg.innerHTML="It's a draw!";

    }
    if (res<3){
        counter=9;
    }
    }
}


function reset(){

    if (counter==9){
    if(res<2){
        scores[res]++;
        bias=1-res;
    }
    if(res==2){
        scores[0]++;
        scores[1]++;
        bias=Math.floor(Math.random()*2);
    }}else{
        bias=Math.floor(Math.random()*2);
    }
    document.getElementById("score").innerHTML=xo[0]+": "+scores[0]+" - " + scores[1] +" :"+xo[1]; 
    
    counter=0;
    for(let k=0; k<9; k++){
        document.getElementById(k).innerHTML="";
        field[k]=2;
        history[k]=-1;
    }
    msg.innerHTML="<br>";
    if(bias==1){
        play();
    }

}


function undo(){
    if(counter>1&&counter<9){
    undo1();
    undo1();
    }
}

function undo1(){
    
    if(counter<9&&counter>0){

        document.getElementById(history[counter]).innerHTML="";
        field[history[counter]]=2;
        counter--;
        history[counter]=-1;
        msg.innerHTML="<br>";
        
    }
}
    
