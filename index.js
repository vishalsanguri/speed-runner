const canvas=document.querySelector('canvas')
const c =canvas.getContext('2d')
canvas.width=window.innerWidth-50;
canvas.height=500;
const gravity=1;
let platformwid=580;
let player;
let platforms=[];
let background;
let tramp;
let hill;
let previousVelocity;
function reset(){
  player=new Player({
    velocity:{x:0,y:0},
    imageurl:'./images/spriteStandRight.png',
    spriteImages:{
      standLeft:{
         maxframes:60,
        imageurl:"./images/spriteStandLeft.png"},
      standRight:{
        maxframes:60,
        imageurl:"./images/spriteStandRight.png"},
      runLeft:{
         maxframes:30,
        imageurl:"./images/spriteRunLeft.png"},
      runRight:{
        maxframes:30,
        imageurl:"./images/spriteRunRight.png"}
    }
  })
  platforms=[
  new Platform({position:{x:platformwid*2+400,y:300},velocity:{x:0,y:0},imageurl:'./images/platformSmallTall.png'}),
  new Platform({position:{x:platformwid+400,y:200},velocity:{x:0,y:0},imageurl:'./images/platformSmallTall.png'}),
  new Platform({position:{x:platformwid+400,y:300},velocity:{x:0,y:0},imageurl:'./images/platformSmallTall.png'}),
  new Platform({position:{x:platformwid*4+550,y:200},velocity:{x:0,y:0},imageurl:'./images/platformSmallTall.png'}),
  new Platform({position:{x:platformwid*4+450,y:300},velocity:{x:0,y:0},imageurl:'./images/platformSmallTall.png'}),
  new Staticobject({position:{x:platformwid*5+470,y:350},width:100,height:100,imageurl:"./images/tramp.png"}),
  new Platform({position:{x:0,y:400},velocity:{x:0,y:0},imageurl:'./images/platform.png'}),
  new Platform({position:{x:platformwid+100,y:400},velocity:{x:0,y:0},imageurl:'./images/platform.png'}),
  new Platform({position:{x:platformwid*2+100,y:400},velocity:{x:0,y:0},imageurl:'./images/platform.png'}),
  new Platform({position:{x:platformwid*3+320,y:400},velocity:{x:0,y:0},imageurl:'./images/platform.png'}),
  new Platform({position:{x:platformwid*6+200,y:400},velocity:{x:0,y:0},imageurl:'./images/platform.png'})
  ]

  background=new Staticobject({position:{x:0,y:0},imageurl:"./images/background.png"})
  hill=new Staticobject({position:{x:0,y:0},imageurl:"./images/hills.png"})
  tramp=new Staticobject({position:{x:platformwid,y:340},width:100,height:100,imageurl:"./images/tramp.png"})
}
const keys={
  d:{
    pressed:false
  },
  a:{
    pressed:false
  }
}
function animate(){
  window.requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height)
  background.draw()
  hill.draw()
  // tramp.draw()
  platforms.forEach((platform)=>{
    platform.update()
  })
  player.update()
  
  if((keys.a.pressed && player.position.x >100)||(keys.a.pressed && player.position.x>0 && hill.position.x==0)){
    player.velocity.x = -5;
    previousVelocity=-5;
    player.switchSpriteImage('runLeft')
  }
  else if(keys.d.pressed && player.position.x<400){
    player.velocity.x = 5;
    previousVelocity=5;
    player.switchSpriteImage('runRight')
  }
  else{
    if(player.velocity.x<0 ){
      player.switchSpriteImage('standLeft')
    }else if(player.velocity.x>0){
      player.switchSpriteImage('standRight')
    }
    player.velocity.x = 0;
    if(keys.a.pressed && player.position.x>0){
      hill.position.x += 3
      previousVelocity=-5,
      player.switchSpriteImage('runLeft')
      platforms.forEach((platform)=>{
        platform.position.x += 5
      })
    }else if(keys.d.pressed){
      hill.position.x += -3
      previousVelocity = 5,
      player.switchSpriteImage('runRight')
      platforms.forEach((platform)=>{
        platform.position.x -= 5
      })
    }else if(previousVelocity<0){
      player.switchSpriteImage('standLeft')
    }else if(previousVelocity>0){
      player.switchSpriteImage('standRight')
    }
  }
  platforms.forEach((platform)=>{
    // if((player.position.x+player.width + player.velocity.x>=platform.position.x || player.position.x + player.velocity.x<=platform.position.x + platform.width) && player.position.y <= platform.position.y+platform.height && player.position.y + player.height >= platform.position.y ){
    //   if(player.velocity.x == -5 && player.position.x == platform.position.x+platform.width){
    //     player.velocity.x=0;
    //   }else if(player.velocity.x == 5 && player.position.x+player.width == platform.position.x){
    //     player.velocity.x=0;
    //   }else{
    //     return;
    //   }
    //   player.velocity.x = 0;
    // }
    if(  player.position.y + player.height <platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x+player.width>platform.position.x && player.position.x< platform.position.x + platform.width ){
      if(platform.jump){
        player.velocity.y=-25;
      }else{
        player.velocity.y=0;
      }
    }
  })
  if(player.position.y + player.height > canvas.height){
    reset();
  }
  console.log
}
reset()
animate()
window.addEventListener('keydown',(e)=>{
   switch (e.key) {
    case 'w':
      if(e.repeat){
        return
      }else if( player.velocity.y==0){
        player.velocity.y=-18
      }
        
      break;
    case 'a':
      keys.a.pressed=true;
      break;
    case 's':
    
      break;
    case 'd':
      keys.d.pressed=true;
      break;
    default:
      break;
   }
})
window.addEventListener('keyup',(e)=>{
  switch (e.key) {
   case 'w':
     
     break;
   case 'a':
     keys.a.pressed=false;
     break;
   case 's':
   
     break;
   case 'd':
     keys.d.pressed=false;
     break;
   default:
     break;
  }
})