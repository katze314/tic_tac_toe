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

function max(a,b){
    if (a<b){
        return b;
    }else{
        return a;
    }
}

function min(a,b){
    if (a<b){
        return a;
    }else{
        return b;
    }
}

function end(f, c){
    for(let i=0; i<3; i++){
        if (f[3*i]!=2 && ((f[3*i+1]==f[3*i] && f[3*i]==f[3*i+2]))){
            return f[3*i];
        }
        if(f[i]!=2 && (f[i]==f[3+i] && f[i]==f[6+i])){
            return f[i];
        }
    }
    if(f[4]!=2 && ((f[0]==f[4] && f[0]==f[8])||(f[2]==f[4] && f[2]==f[6]))){
        return f[4];
    }

    if (c==9){
        return 2;
    }
    return 3;
    

}

function minimax(f, h, c, bot){
    var res=end(f,c);
    if (res<3){
        console.log(f, h, c, bot,res);

        if (res==2){
            return Math.random();
        }
        if (res==1){
            return 1000+Math.random();
        }
        if (res==0){
            return -1000-Math.random();
        }
    }
    if (bot){
        var value=-10000;
        for(let i=0; i<9; i++){
            if (f[i]==2){
                f[i]=1;
                h[c]=i;
                value=max(value,minimax(f, h, c+1, false));    
                f[i]=2;
                h[c]=-1;
            }
        }
    }else{
        var value=10000;
        for(let i=0; i<9; i++){
            if (f[i]==2){
                f[i]=0;
                h[c]=i;
                value=min(value,minimax(f, h, c+1, true));    
                f[i]=2;
                h[c]=-1;

            }
        }
        

    }
    console.log(f, h, c, bot, value);
    return value;

}


function play(){   
    let x=0;
    let score=-1000;
    let cur_score=Math.random();
    for(let i=0; i<9;i++){
        if(field[i]!=2) continue;
        cur_score=Math.random();
        field[i]=1;
        history[counter]=i;
        cur_score=minimax(field, history, counter+1, false)+Math.random();
        if(cur_score>score){
            x=i;
            score=cur_score; 
        }
        history[counter]=-1;
        field[i]=2;
    }
    anymove(x);
    console.log(x);
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
    
    res=end(field,counter);
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
    document.getElementById("score").innerHTML=player[0]+": "+scores[0]+" - " + scores[1] +" :"+player[1]; 
    
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
        history[counter]=-1;
        counter--;
        msg.innerHTML="<br>";
        
    }
}
    
function main(){
    consoloe.log("hi");
}