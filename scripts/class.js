class Player{
  constructor({width=50,velocity,imageurl,spriteImages}){
    for(const actions in spriteImages){
      let action = spriteImages[actions]
      action.image=new Image();
      action.image.src =action.imageurl; 
    }
    this.position={
      x:100,
      y:100
    };
    this.spriteImages=spriteImages;
    this.maxframes=spriteImages.standRight.maxframes;
    this.image=spriteImages.standRight.image;
    this.velocity=velocity;
    this.height=90;
    this.currentframe = 0;
    this.width=width;
  }
  draw(){
   
    if(this.maxframes>31){
      c.drawImage(this.image,this.currentframe*(this.image.width/this.maxframes),0,this.image.width/this.maxframes,this.image.height,this.position.x,this.position.y,this.width,90)
    }else{
      c.drawImage(this.image,this.currentframe*(this.image.width/this.maxframes),0,this.image.width/this.maxframes,this.image.height,this.position.x,this.position.y,90,90)
    }
    
  }
  animate(){
    if(this.currentframe<this.maxframes-1){
      this.currentframe++
    }else{
      this.currentframe=0;
    }
    
  }
  switchSpriteImage(action){
    switch (action) {
      case "standRight":
        if(this.image !== this.spriteImages.standRight.image){
          this.image=this.spriteImages.standRight.image;
          this.maxframes=this.spriteImages.standRight.maxframes;
          this.currentframe=0;
        }
        break;
      case "standLeft":
        if(this.image !== this.spriteImages.standLeft.image){
            this.image=this.spriteImages.standLeft.image;
            this.maxframes=this.spriteImages.standLeft.maxframes;
            this.currentframe=0;
        }
        break;
      case "runRight":
        if(this.image !== this.spriteImages.runRight.image){
          this.image=this.spriteImages.runRight.image;
          this.maxframes=this.spriteImages.runRight.maxframes;
          this.currentframe=0;
    }
        break;
      case "runLeft":
        if(this.image !== this.spriteImages.runLeft.image){
          this.image=this.spriteImages.runLeft.image;
          this.maxframes=this.spriteImages.runLeft.maxframes;
          this.currentframe=0;
    }
    break; 


    
      default:
        break;
    }
  }
  update(){
    this.position.y+=this.velocity.y
    this.position.x+=this.velocity.x
    this.draw();
    this.animate()
    if(this.position.y + this.height + this.velocity.y < canvas.height){
    this.velocity.y += gravity;
    }
  }
}
class Platform{
  constructor({position,velocity,imageurl}){
    this.position=position;
    this.velocity=velocity;
    this.image=new Image();
    this.image.src=imageurl;
    this.height=this.image.height;
    this.width=this.image.width;
    // this.jump=false;
  }
  draw(){
    c.drawImage(this.image,this.position.x,this.position.y)
  }
  update(){
    this.draw();
  }
}
class Staticobject{
  constructor({position,width,height,imageurl}){
    this.position=position;
    this.image=new Image(width,height)
    this.height=this.image.height;
    this.width=this.image.width;
    this.image.src=imageurl;
    this.jump=true;
  }
  draw(){
    c.drawImage(this.image,this.position.x,this.position.y,this.image.width,this.image.height)
  }
  update(){
    this.draw()
  }
}