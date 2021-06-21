
import menu from "./JS/menu.js"
import Jeu from "./JS/sallePrincipale.js"
//import boss from "./JS/salleBoss.js"
//import options from "./JS/options.js"
//import controls from "./JS/controleClavier.js"


var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: "game-container",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1700 },
            debug: false}},
    scene: [menu,Jeu],
    input:{gamepad:true},
    fps:60,
};

var game = new Phaser.Game(config);