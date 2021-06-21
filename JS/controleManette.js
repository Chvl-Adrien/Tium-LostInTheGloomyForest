class controleManette extends Phaser.Scene {
    constructor() {
        super('controleManette')
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