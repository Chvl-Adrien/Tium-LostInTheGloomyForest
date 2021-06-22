export default class Jeu extends Phaser.Scene{
    constructor(){
        super("Jeu");
    }
    init(data){

        this.blabla = data.Bonjour
    
    }

    // Chargement des assets 

    preload(){

    //Map
        this.load.image('tiles', 'tiles.png');
        this.load.tilemapTiledJSON('map', 'map.json');
        
    //Background
        this.load.image('plan1', 'assets/arbrePlan1.png');
        this.load.image('plan2', 'assets/arbrePlan2.png');
        this.load.image('plan3', 'assets/arbrePlan3.png');
        this.load.image('plan4', 'assets/arbrePlan4.png');
        this.load.image('plan5', 'assets/arbrePlan5.png');
        this.load.image('fond', 'assets/fond.png');
        this.load.image('plateforme', 'assets/plateforme.png');
        this.load.image('water', 'assets/water.png');

    //Personnage
        this.load.spritesheet('tium', 'assets/spritesheet_tium.png', { frameWidth: 200, frameHeight: 200});
        this.load.image('iconeDash', 'assets/iconeDash.png');


    } 
    // FIN PRELOAD
    

    create(){
  
        this.nbcle = 0;
        this.droite = false;
        this.recuper = 0;
        this.djump = true;
        this.box = false;
        this.jumpCount = 2;
        this.immune = true;
        this.life = 3;
        this.HITTING = false;
        this.isDead = false;
        this.dash = true;            
        this.timerDashOn = false;    
        this.timerDash = 0;          
        this.directionDash = false;  
        this.lessgo = true;
        this.unlocked = false;
        this.etatCam = false;
        this.compteurCam = 250;
        this.passe = false;
        this.once = true;
        this.px = false;
        this.ps = false;
        this.pp = false;
        this.pf = false;
        this.pc = false;
        this.pg = false;

        this.add.image(0, 0, 'plan2').setOrigin(0).setDepth(-2);
        
    // CREATION DE LA MAP

        let map = this.make.tilemap({ key: 'map' });
        let tileset = map.addTilesetImage('tiles', 'tiles');

        map.createLayer('Back', tileset, 0, 0).setDepth(-6);
        this.sol = map.createLayer('Ground', tileset, 0, 0).setDepth(-1);
        this.water = map.createLayer('Death', tileset, 0, 0).setDepth(-1);
        this.plateforme = this.add.image(3840,2215,'plateforme').setDepth(0);
        this.plan1 = this.add.image(3840,2215,'plan1').setScrollFactor(1.3,1).setDepth(1);
        this.plan2 = this.add.image(3840,2170,'plan2').setDepth(-2);
        this.plan3 = this.add.image(3840,2215,'plan3').setScrollFactor(1.15,1).setDepth(-3);
        this.plan4 = this.add.image(3840,2215,'plan4').setScrollFactor(1.1,1).setDepth(-4);
        this.plan5 = this.add.image(3840,2215,'plan5').setScrollFactor(1.05,1).setDepth(-5);
       
       

    // CREATION VARIABLE TOUCHES 
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursorSp = this.input.keyboard.addKey('SPACE');
        this.cursorDash = this.input.keyboard.addKey('SHIFT');


    // CREATION PLAYER
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
		this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'tium').setDepth(0);
        this.player.setCollideWorldBounds(true);

        this.flecheBack = this.add.image(1840, 250, 'iconeDash').setScrollFactor(0).setDepth(3);
        this.flecheBack.setTintFill(0x000000);
        this.fleche = this.add.image(this.flecheBack.x, this.flecheBack.y, 'iconeDash').setScrollFactor(0).setDepth(3);
        
    // AJOUT COLLIDER ENTRE JOUEUR ET OBJETS DE LA MAP
        this.physics.add.collider(this.player, this.water, this.death, null, this);
        this.water.setCollisionByProperty({mortal:true});

        this.physics.add.collider(this.player, this.sol);
        this.sol.setCollisionByProperty({collides:true});



        this.physics.add.collider(this.player,this.untruc, this.bonjour,null,this);

    // AJOUT DE LA CONDITION DE CONNEXION D'UNE MANETTE 
        this.paddleConnected=false;

        this.input.gamepad.once('connected', function (pad) {
            this.paddleConnected = true;
            this.paddle = pad;
            });
        
        // CREATION ANIMATION JOUEUR
       
        this.anims.create({
            key: 'dash',
            frames: [{key : 'tium', frame : 18}],
            frameRate : 10
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('tium', { start: 10, end: 17 }),
            frameRate: 10,
        });

       
        this.anims.create({
            key: 'surplace',
            frames: this.anims.generateFrameNumbers('tium', {start: 0, end: 9}),
            frameRate: 9,
        })
       
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('tium', {start: 22, end: 24}),
            frameRate: 5,
        })

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('tium', {start: 19, end: 21}),
            frameRate: 1,
        })

        this.anims.create({
            key: 'fight',
            frames: this.anims.generateFrameNumbers('tium', {start: 19, end: 21}),
            frameRate: 1,
        })
      
    // AJOUT CAMERA LIGHT

        this.light = this.lights.addLight(200, 100, 100).setIntensity(2);

        this.lights.enable().setAmbientColor(0x5bf2a3);

        // this.input.on('pointermove', function (pointer) {
        this.input.on('tiumMove', function (tium) {

            this.light.x = tium.x;
            // this.light.x = pointer.x;
            this.light.y = tium.y;
            // this.light.y = pointer.y;

        });
        
        this.cameras.main.startFollow(this.player)
		this.cameras.main.setBounds(0,0,Map.widthInPixels, Map.heightInPixels);
        this.physics.world.setBounds(0,0, Map.widthInPixels, Map.heightInPixels);
		this.player.setCollideWorldBounds(true);
        this.plan3 = this.add.image(2850,2000,'plan3').setScrollFactor(0.1);

    } // FIN CREATE  
    
    // FONCTION UPDATE --------------------------------------------------

    update(){
        const onGround = this.player.body.blocked.down;
        const speed = 400;

        
        
        console.log(this.directionDash)



        // CONTROLES CLAVIER ET MANETTE
        if (this.player.body.velocity.y > 1200){
            this.player.setVelocityY(1200);
        }
        
        let pad = Phaser.Input.Gamepad.Gamepad;

        if(this.input.gamepad.total){   //Si une manette est connecté
            pad = this.input.gamepad.getPad(0);  //pad récupère les inputs du joueur
        }
        
        if (this.cursors.left.isDown ) {
            this.player.setVelocityX(-speed);
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown ) {
            this.player.setVelocityX(speed);
            this.player.setFlipX(false);
        } else {
            this.player.setVelocityX(0);
        }
      
       // Dash --------------------

        if (this.cursors.left.isDown) {     
            this.directionDash = true
        }

        if (this.cursors.right.isDown) {     
            this.directionDash = false
        }

        if(this.timerFleche > 0 && this.dash == false){
            this.timerFleche--;
            console.log(this.cropValue);
            if(this.cropValue > this.flecheBack.height || this.cropValue < this.flecheBack.height){this.cropValue = this.flecheBack.height;}
            else{this.cropValue = this.timerFleche;}
        
            if(this.timerFleche%2 != 0){this.fleche.setCrop(0, this.cropValue, this.flecheBack.width, this.flecheBack.height);}
        } else if(this.timerFleche <= 0 && this.timerFleche > -1){
            this.timerFleche = this.timerFleche -0.1;
            this.fleche.setTintFill(0xffffff);
        } else{
            this.fleche.clearTint();
            this.fleche.setCrop(0, 0, this.flecheBack.width, this.flecheBack.height);
        }

        if (this.dash && Phaser.Input.Keyboard.JustDown(this.cursorDash)){
            this.timerDashOn = true;
            this.dash = false;
            this.timerFleche = this.flecheBack.height-1;
            this.dashTime = this.time.addEvent({ delay: 2500, callback: function(){this.dash = true}, callbackScope: this});
            console.log ('DASH!!!!!!' + this.directionDash);
        }



        if (this.timerDashOn){

            this.timerDash += 1

            if (this.directionDash){
                this.player.setVelocityX(-1000);
            }
            else{
                this.player.setVelocityX(1000);
            }
            

            if (this.timerDash >= 20){
                this.timerDashOn = false
                this.timerDash = 0
            }
        }

        // Allow player to jump only if on ground          
        if (this.jumpCount>0 && this.cursors.up.isDown) {
            this.player.setVelocityY(-1200);
            this.jumpCount--;

            console.log(this.jumpCount)
        }

        if(this.player.body.blocked.down){
            this.jumpCount = 2;
        }

        if (this.cursorSp.isDown && this.box){
            this.HITTING = true;
        }

        if (this.cursorSp.isUp){
            this.HITTING = false ;
        }

        if ( this.physics.world.overlap(this.player, this.door) && this.unlocked){
            combat = true;
            this.blibli = true
            //this.scene.start('boss',{AuRevoir:this.blibli})
        }
          

           // Update the animation
        if (onGround) {
            
            this.jumpCount = 2
            
            //Player Running if velocityX != 0 else Player Idle
        
        if (this.cursorSp.isDown && this.box)this.player.anims.play("fight", true);
        else if (this.player.body.velocity.x !== 0) this.player.anims.play("run", true);
        else if (this.isDead){this.player.anims.play("die", true);}
        else this.player.anims.play("surplace", true);
        } else {
            //Stopping Animation to play a Texture for the jump
            this.player.anims.play("jump", true);
          }
    
      
        // UPDATE DE LA VIE AVEC CHANGEMENT VISIBLE DE CETTE DERNIERE
        

        if (this.recuper == 1){
            if(!this.pc){
                this.pc = this.add.image(950,200,'popupcage').setScrollFactor(0);
                this.time.addEvent({ delay: 3000, callback: function(){this.pc.destroy();}, callbackScope: this});
            }
        }
 
}
        
     // FIN UPDATE
    
    // AUTRES FONCTIONS 

    hit(player,ennemy){
        if (this.HITTING){
            ennemy.destroy();
            var key = this.key.create(ennemy.x,ennemy.y,'key')
        }
        else{

            if (!this.timerDashOn){
                if (this.immune){
                    this.life -= 1;
                    this.immune = false;
                    
                    if(this.life > 0){
                        this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){player.visible = !player.visible;}, callbackScope: this});
                    }
    
                    this.ImmuneFrame = this.time.addEvent({ delay : 2000, callback: function(){this.immune = true}, callbackScope: this});
    
                }
            }
            
            
            
            if(this.life == 0){
                this.isDead = true
                this.player.anims.play("die", true);
                this.physics.pause();
                const cam = this.cameras.main;
                cam.fadeOut(1000);
        

                cam.once("camerafadeoutcomplete", ()=> {
                    cam.fadeIn(3000)
                    this.add.image(960, 540, 'game_over').setScrollFactor(0).setDepth(5);
                    this.gameOver = true;
                    this.time.addEvent({delay: 3500, callback: function(){const cam = this.cameras.main;

                        cam.fade(250, 0, 0, 0);
            
                        cam.once("camerafadeoutcomplete", () => {
                            this.scene.restart({Bonjour:this.blabla});
                        });}, callbackScope: this});
            })
            }
        }

    }

    Recup(player, key)
    {
        key.destroy();
        this.nbcle++
        if(this.nbcle == 4){
            if(!this.pp){
                this.pp = this.add.image(950,200,'popupporte').setScrollFactor(0);
                this.time.addEvent({ delay: 3000, callback: function(){this.pp.destroy();}, callbackScope: this});
            }
            this.unlocked = true;
        }
    }

    bonjour(){
        if (this.once){
            if(!this.px){
                this.pix = this.add.image(950,200,'popupcageferme').setScrollFactor(0);
                this.time.addEvent({ delay: 2000, callback: function(){this.pix.destroy();}, callbackScope: this});
            }
            this.once = false
        }
        else{
            this.time.addEvent({ delay: 2000, callback: function(){this.once = true}, callbackScope: this});
            this.time.addEvent({ delay: 2000, callback: function(){this.pix.destroy();}, callbackScope: this});
        }
    }
    
    death(){
        this.isDead = true
        this.player.anims.play("die", true);
        this.physics.pause();
        const cam = this.cameras.main;
        cam.fadeOut(1000);
        

        cam.once("camerafadeoutcomplete", ()=> {

            cam.fadeIn(3000)
            this.add.image(960, 540, 'game_over').setScrollFactor(0).setDepth(5);
            this.gameOver = true;
            this.time.addEvent({delay: 3500, callback: function(){const cam = this.cameras.main;

                cam.fade(250, 0, 0, 0);
    
                cam.once("camerafadeoutcomplete", () => {
                    this.scene.restart({Bonjour:this.blabla});
                });}, callbackScope: this});
        })
        
        
    }
}