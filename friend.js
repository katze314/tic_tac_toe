
var msg=document.getElementById("msg");



const scores=[0,0];
const xo=["X","O"];


var bias=Math.floor(Math.random()*2);
var counter=0;
const field=[2,2,2,2,2,2,2,2,2];
const history=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
var res=0;

msg.innerHTML="It's "+xo[bias%2]+"'s turn!";



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

function move(x){
    if(counter<9){
    var clicked=document.getElementById(x);
    if(field[x]==2){
        field[x]=(bias+counter)%2;
        clicked.innerHTML=xo[(bias+counter)%2];
        counter++;
        msg.innerHTML="It's "+xo[(bias+counter)%2]+"'s turn!";
    }
    history[counter]=x;
    
    res=end();
    if (res<2){
        msg.innerHTML=xo[res] + " won!";
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
    
    counter=0;
    for(let k=0; k<9; k++){
        document.getElementById(k).innerHTML="";
        field[k]=2;
        history[k]=-1;
    }
    msg.innerHTML="It's "+xo[bias%2]+"'s turn!";

}

function undo(){
    
    if(counter<9&&counter>0){

        document.getElementById(history[counter]).innerHTML="";
        field[history[counter]]=2;
        counter--;
        history[counter]=-1;
        msg.innerHTML="It's "+xo[(counter+bias)%2]+"'s turn!";
        
    }
}
    