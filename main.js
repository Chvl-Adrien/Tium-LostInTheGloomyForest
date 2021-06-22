
import menu from "./JS/menu.js"
import Jeu from "./JS/sallePrincipale.js"
import options from "./JS/options.js"
import son from "./JS/son.js"
import controleMobile from "./JS/controleMobile.js" 
import controleClavier from "./JS/controleClavier.js" 
import controleManette from "./JS/controleManette.js"
//import boss from "./JS/salleBoss.js"
//import controls from "./JS/controleClavier.js"


var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: "game-container",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1300 },
            debug: true}},
    scene: [menu,Jeu,options,son,controleManette,controleClavier,controleMobile],
    input:{gamepad:true},
    fps:60,
};



var game = new Phaser.Game(config);