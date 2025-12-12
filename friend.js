var counter=0;

const xo=["X","O"];

const field=[2,2,2,2,2,2,2,2,2]


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
        field[x]=counter%2;
        clicked.innerHTML=xo[counter%2];
        counter++;
        
    }

    
        var res=end();
        var msg=document.getElementById("msg");
        if (res<2){
            msg.innerHTML=xo[res] + " won!"
        }
        if(res==2){
            msg.innerHTML="It's a draw!"

        }
        if (res<3){
            counter=9;
        }
    }
}
