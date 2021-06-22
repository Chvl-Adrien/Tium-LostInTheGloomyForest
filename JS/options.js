export default class options extends Phaser.Scene {
    constructor() {
        super('options')
    }

preload(){
    this.load.image('menu_option', './assets/optionsMenu.png');
    this.load.image('boutton_manette', './assets/controleManette.png');
    this.load.image('boutton_clavier', './assets/controleClavier.png');
    this.load.image('boutton_mobile', './assets/controleMobile.png');
    this.load.image('retour', './assets/retour.png');
    this.load.image('son', './assets/son.png');

}

create(){
    this.add.image(960, 540, 'menu_option');

    let bouttonSon = this.add.image(this.game.renderer.width / 12.7, this.game.renderer.height / 12.5, 'son').setDepth(1);
    let bouttonControlesManette = this.add.image(this.game.renderer.width / 8, this.game.renderer.height / 8, 'boutton_manette').setDepth(1);
    let bouttonControlesClavier = this.add.image(this.game.renderer.width / 8.3, this.game.renderer.height / 5.8, 'boutton_clavier').setDepth(1);
    let bouttonControlesMobile = this.add.image(this.game.renderer.width / 8.3, this.game.renderer.height / 4.5, 'boutton_mobile').setDepth(1);
    let bouttonRetour = this.add.image(this.game.renderer.width / 11.1, this.game.renderer.height / 3.7, 'retour').setDepth(1);

    bouttonSon.setInteractive();

    bouttonSon.on("pointerup", () => {
    this.scene.start('son');
    })

    bouttonControlesManette.setInteractive();

    bouttonControlesManette.on("pointerup", () =>{
        this.scene.start('controleManette');
    })

    bouttonControlesClavier.setInteractive();

    bouttonControlesClavier.on("pointerup", () =>{
        this.scene.start('controleClavier');
    })

    bouttonControlesMobile.setInteractive();

    bouttonControlesMobile.on("pointerup", () =>{
        this.scene.start('controleMobile');
    })

    bouttonRetour.setInteractive();

    bouttonRetour.on("pointerup", () =>{
        this.scene.start('menu');
    })

}

}