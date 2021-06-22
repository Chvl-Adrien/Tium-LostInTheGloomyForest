export default class controleClavier extends Phaser.Scene {
    constructor() {
        super('controleClavier')
    }

    preload()
    {

        this.load.image('controles_clavier', './assets/optionsControleClavier.png');

    }

    create() {

        this.add.image(960, 540, 'controles_clavier');

    let bouttonRetour = this.add.image(this.game.renderer.width / 11.1, this.game.renderer.height / 2.51, 'retour').setDepth(1);

    bouttonRetour.setInteractive();

    bouttonRetour.on("pointerup", () =>{
        this.scene.start('options');
    })
    }

}