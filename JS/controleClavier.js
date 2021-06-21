export default class controls extends Phaser.Scene {
    constructor() {
        super('controls')
    }
  
    preload()
	{

        
	}

    create() { 
                

    }

    update(){
        this.image.rotation += 0.05;
    }
}