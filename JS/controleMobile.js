export default class controleMobile extends Phaser.Scene {
    constructor() {
        super('controleMobile')
    }

    preload()
    {

        this.load.image('controles_mobile', './assets/optionsControleMobile.png');

    }

    create() {

        this.add.image(960, 540, 'controles_mobile');

    let bouttonRetour = this.add.image(this.game.renderer.width / 11.1, this.game.renderer.height / 2.51, 'retour').setDepth(1);

    bouttonRetour.setInteractive();

    bouttonRetour.on("pointerup", () =>{
        this.scene.start('options');
    })
    }

}