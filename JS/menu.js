

export default class menu extends Phaser.Scene {
    constructor() {
        super('menu')
    }

    preload()
	{
        
        this.load.image('menu', './assets/interface_lancement_without.png')    
        this.load.image('bouttonLancer', './assets/bouttonLancer.png')

        this.load.image('bouttonOptions', './assets/bouttonOptions.png')
        this.load.image('bouttonQuitter', './assets/bouttonQuitter.png')
        this.load.image('fondChargement', './assets/fondChargement.png')
        this.load.image('chargement', './assets/chargement.png')
	}

    create() {

        
        this.blabla = true;

        this.add.image(0, 0, 'menu').setOrigin(0).setDepth(0);

        let bouttonLancer = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 1.38, 'bouttonLancer').setDepth(1);
        let bouttonOptions = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 1.25, 'bouttonOptions').setDepth(1);
        let bouttonQuitter = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 1.14, 'bouttonQuitter').setDepth(1);
        this.image = this.add.image(1730,940,'chargement').setDepth(3).setVisible(false);



        


        /* 
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        bouttonLancer.setInteractive();

        bouttonLancer.on("pointerup", () => {
            
            this.add.image(0,0,'fondChargement').setOrigin(0).setDepth(2);
            this.image.setVisible(true)
            this.time.addEvent({delay: 4000, callback: function(){const cam = this.cameras.main;

                cam.fade(300, 0, 0, 0);
    
                cam.once("camerafadeoutcomplete", () => {
                
                    this.scene.start('Jeu',{Bonjour:this.blabla})
                });}, callbackScope: this});
            
            
        })

        bouttonOptions.setInteractive();

        bouttonOptions.on("pointerup", () => {
            //this.scene.start('options');

        })
        
        bouttonQuitter.setInteractive();

        bouttonQuitter.on("pointerup", () => {
           this.scene.remove()
        })

    }

    update(){
        this.image.rotation += 0.05;
    }
}