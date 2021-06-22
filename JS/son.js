export default class son extends Phaser.Scene {
    constructor() {
        super('son')
    }

    preload()
    {
        this.load.image('option_son', './assets/optionsSon.png');

    }

    create() {

        this.add.image(960, 540, 'option_son'); 

        let bouttonRetour = this.add.image(this.game.renderer.width / 11.1, this.game.renderer.height / 2.51, 'retour').setDepth(1);

        bouttonRetour.setInteractive();

        bouttonRetour.on("pointerup", () =>{
            this.scene.start('options');
        })

    }

}