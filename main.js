function init_arr(){
    for (let y = 0; y < MaxY; y+=step) {
      for (let x = 0; x < MaxX; x+=step) {
          arr[get_id(x,y)]=({
              x:x,
              y:y,
              busy:false,
              board:false
          });
      }
 }
// console.log(arr);
}

function init_field(){
    ctx.strokeRect(0,0,MaxX,MaxY);
    ctx.strokeRect(0,0,MaxX,MaxY+30);
    for (let y = 0; y < MaxY; y+=step) {
        for (let x = 0; x < MaxX; x+=step) {  
         ctx.strokeRect(x,y,step,step);
        }
    }
}

function clear_arr(){
    for(var i=0;i<375;i++){
        arr[i].busy = false;
        arr[i].board = false;
    }
}

function draw_all(){
    let color = "blue";
    for (let y = 0; y < MaxY; y+=step) {
        for (let x = 0; x < MaxX; x+=step) { 
                if (arr[get_id(x,y)].busy==true){
                    color = "blue";
                } else color = "white";
                ctx.fillStyle = color;
                ctx.fillRect(x,y,step,step);
                ctx.strokeRect(x,y,step,step);
        }
    }
}

function draw(){
 if (drawed.length!==0){
 let temp = drawed.pop();
 let color = "white";
 if (arr[temp].busy) color = "red";
 if (arr[temp].board) color = "blue";
 ctx.fillStyle = color;
 ctx.fillRect(arr[temp].x,arr[temp].y,step,step);
 ctx.strokeRect(arr[temp].x,arr[temp].y,step,step);
 draw();
 }
}

function get_id(x,y){
    let ans=false;
    try {
        ans = (x/20)+(y/20*15);
        if (((x>=300) || (y>=500)) || (Number.isInteger(ans)==false))
        ans=false;
    } catch (e) {
        ans=false;
    }
    return(ans);
}

function set_rect(x,y,flag=true,b=true){
    x*=step;
    y*=step;
    let temp = get_id(x,y);
    //console.log(temp);
    if (temp!==false){
    arr[temp].busy = flag;
    arr[temp].board = b;
    drawed.push(temp);}
    else return temp;
}

function set_figure(x,y,who = [],flag=true,b=true){
    set_rect(x,y,flag,b);
    for (let i = 0; i < who.length-1; i+=2) {
       set_rect(x+who[i],y+who[i+1],flag,b);  
    }   
}

function can_walk(x,y){
    x*=step;
    y*=step;
    let ans = false;
    let temp=get_id(x,y);
    if ((temp!=false)&&(!arr[temp].board)){
    for (let i = 0; i < car.length-1; i+=2) {
        temp=get_id(x+car[i]*20,y+car[i+1]*20);
        if ((temp!=false)&&(!arr[temp].board)) ans=true; 
         else{
            ans=false;
            break;
    }     
}
}
return ans;
}

function can_exist(x,y,lar = []){
    x*=step;
    y*=step;
    let ans = false;
    let temp;
    for (let i = 0; i < lar.length-1; i+=2) {
        temp=get_id(x+lar[i]*20,y+lar[i+1]*20);
        if ((temp!=false)&&(!arr[temp].board)) ans=true; 
         else{
            ans=false;
            break;
    }     
}
return ans;
}

function moving(){
    for(var i = arr.length-1; i>=0;i--){
        if ((arr[i].busy==true) && (arr[i].board==true)) {
            if (get_id(arr[i].x,arr[i].y+20)!=false){
                if ((arr[get_id(arr[i].x,arr[i].y+20)].busy==true) && (arr[get_id(arr[i].x,arr[i].y+20)].board==false)) {
                    car.pop();
                    car.pop();
                }
            arr[i].busy=false;
            arr[i].board=false;
            drawed.push(i);
            arr[get_id(arr[i].x,arr[i].y+20)].busy=true;
            arr[get_id(arr[i].x,arr[i].y+20)].board=true;
            drawed.push(get_id(arr[i].x,arr[i].y+20));
            } else {
                drawed.push(i);
                arr[i].busy=false;
                arr[i].board=false;
            }
        }
    }
}

function get_rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  } //Рандом

function new_elem(){
    if (counter==5){
        speed-=5;
        counter=0
    }
    let tempX = get_rand(0,14);
    let tempY = get_rand(0,1);
    let tempB = boards[get_rand(0,boards.length)];
    if (can_exist(tempX,tempY,tempB)) {
        counter++;//Увличиваем счетчик
        set_figure(tempX,tempY,tempB,true,true);
    }
    else new_elem();
    //console.log(tempB);
}//Генерация поля

function timers_update(){
    if (last_speed!=speed){
        last_speed=speed;
        score = 35*(1000-speed);
        num.text(score);
        move(true,speed);
        add_board(true,speed);
    }
}

function is_fall(){
    let ans = true;
    for (var i=0;i<375;i++){
        if ((arr[i].board==false) && (arr[i].busy==true)){
            ans = false;
            break;
        }
    }
    return ans;
}

var Timer_move = null; //id таймера
var move = function(flag,speed){
    if(flag){ 
        clearInterval(Timer_move);
        Timer_move = setInterval(move, speed);
    }
    if (flag===false) clearInterval(Timer_move);
    moving();
};

var Ti_Id = null; //id таймера
var add_board = function(flag,sp){
    sp*=5;
    if(flag){ 
        clearInterval(Ti_Id);
        Ti_Id = setInterval(add_board, sp);
    }
    if (flag===false) clearInterval(Ti_Id);
    if(!is_fall()) new_elem();
    else restart_game();
};

function restart_game(){
    car = [0,1,-1,1,1,1,0,2,1,3,-1,3];
    speed = 1000;
    CarX = 7;
    CarY = 20;
    clear_arr();
    init_field();
    setInterval(draw,30);
    setInterval(timers_update,1000);
    set_figure(7,20,car,true,false);
}

function start_game(){
    init_arr();
    setInterval(draw,30);
    setInterval(timers_update,1000);
    set_figure(CarX,CarY,car,true,false);
}

function go_up(){
    if (can_walk(CarX,CarY-1)){
        set_figure(CarX,CarY,car,false,false);
        set_figure(CarX,--CarY,car,true,false);
    } 
}
function go_down(){
    if (can_walk(CarX,CarY+1)){
        set_figure(CarX,CarY,car,false,false);
        set_figure(CarX, ++CarY,car,true,false);
    } 
}
function go_left(){
    if (can_walk(CarX-1,CarY)){
        set_figure(CarX,CarY,car,false,false);
        set_figure(--CarX,CarY,car,true,false);
    } 
}
function go_right(){
    if (can_walk(CarX+1,CarY)){
        set_figure(CarX,CarY,car,false,false);
        set_figure(++CarX,CarY,car,true,false);
    } 
}
document.addEventListener('keydown', function(e) {
    // console.log(e.keyCode);
     if (e.keyCode == 27) set_pause();
     if ((e.keyCode == 68)||(e.keyCode == 39)) go_right();//right
     if ((e.keyCode == 65)||(e.keyCode == 37)) go_left(); //left
     if ((e.keyCode == 87)||(e.keyCode == 38)) go_up(); //up
     if ((e.keyCode == 83)||(e.keyCode == 40)) go_down(); //down
 });

 init_field();