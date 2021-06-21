export default class boss extends Phaser.Scene {
    constructor() {
        super('boss')
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