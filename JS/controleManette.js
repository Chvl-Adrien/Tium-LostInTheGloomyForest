export default class controleManette extends Phaser.Scene {
    constructor() {
        super('controleManette')
    }

    preload()
    {
        this.load.image('controles_manette', './assets/optionsControleManette.png');

    }

    create() {

        this.add.image(960, 540, 'controles_manette');

    let bouttonRetour = this.add.image(this.game.renderer.width / 11.1, this.game.renderer.height / 2.51, 'retour').setDepth(1);

    bouttonRetour.setInteractive();

    bouttonRetour.on("pointerup", () =>{
        this.scene.start('options');
    })
    }

}