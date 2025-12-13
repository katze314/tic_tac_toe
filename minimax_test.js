// Minimal test harness for minimax issues
// Copying relevant functions from bot3.js into a Node-friendly script

function max(a,b){ return (a<b)?b:a; }
function min(a,b){ return (a<b)?a:b; }

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
    return value;
}

function playChoice(field, counter){
    let x=0;
    let score=-1000;
    let cur_score=Math.random();
    let history=new Array(9).fill(-1);
    for(let i=0; i<9;i++){
        if(field[i]!=2) continue;
        cur_score=Math.random();
        field[i]=1;
        history[counter]=i;
        cur_score=minimax(field, history, counter, false)+Math.random();
        if(cur_score>score){
            x=i;
            score=cur_score; 
        }
        history[counter]=-1;
        field[i]=2;
    }
    return {move:x,score:score};
}

function testScenario(field, counter, desc){
    console.log('\nTesting: '+desc);
    console.log('field: '+JSON.stringify(field) + ' counter:'+counter);
    const r = playChoice(field.slice(), counter);
    console.log('Choice: '+r.move+' score:'+r.score);
}

// Scenario: bot (1) can win immediately by playing at index 2 (row 0)
let field1=[1,1,2,2,0,2,0,0,2];
// Number of moves already played: count non-2 values
let counter1 = field1.filter(v=>v!=2).length;
testScenario(field1, counter1, 'Bot can win at index 2');

// Another scenario: block user's winning move; user (0) can win by playing at index 8
let field2=[1,1,0,2,0,1,2,1,2];
let counter2 = field2.filter(v=>v!=2).length;
testScenario(field2, counter2, 'Bot should block at index 8');

// Additional random positions
let field3=[0,1,0,1,0,2,2,1,2];
let counter3 = field3.filter(v=>v!=2).length;
testScenario(field3, counter3, 'Complex board');

// Edge case: full board draw
let field4=[0,1,0,1,0,1,1,0,1];
let counter4 = field4.filter(v=>v!=2).length;
testScenario(field4, counter4, 'Full board draw');
