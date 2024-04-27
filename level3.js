class level3 extends Phaser.Scene {
    constructor() {
        super("level3");
    }
    init(data){
        this.color = data.color;
    }
    preload() {

    }
    create() {
        console.log("Color: "+this.color);
        function playerHit(player, asteroid) {
            music.stop();
            this.scene.restart();
        }

        music = this.sound.add("music3", { loop: true });
        music.play();
        this.add.image(320, 180, "sky");
        this.add.image(640, 180, "sky");
        this.add.image(960, 180, "sky");
        this.add.image(1280, 180, "sky");
        this.add.image(1600, 180, "sky");
        this.add.image(1920, 180, "sky");
        this.add.image(2240, 180, "sky");
        this.add.image(2560, 180, "sky");
        this.add.image(2880, 180, "sky");
        this.add.image(3200, 180, "sky");
        this.add.image(3520, 180, "sky");
        platform = this.physics.add.staticGroup();
        portal = this.physics.add.staticGroup();
        player = this.physics.add.sprite(100, 250, "player"+this.color);

        this.physics.add.collider(player, platform);

        const map = this.make.tilemap({key: 'level3', tileWidth: 16, tileHeight: 16});
        const tileset = map.addTilesetImage('moon-tileset', 'tiles');
        const tileset2 = map.addTilesetImage('spike-tileset', 'spiketiles');
        const tileset3 = map.addTilesetImage('star-tileset', 'startiles');
        const floor = map.createLayer("Ground", tileset, 0, 0);
        const spikes = map.createLayer("Spike", tileset2, 0, 0);
        const stars = map.createLayer("Star", tileset3, 0, 0);
        stars.setCollision(1); // this adds new spike collision
        stars.setCollisionByExclusion([-1]);
        stars.forEachTile(tile => {
          // Check if the tile contains a star (indexed by 1)
          if (tile.index !== -1) {      
            let starCollider = this.add.circle(tile.pixelX, tile.pixelY, 8);
            this.physics.add.existing(starCollider, true);
            // Set up overlap detection between the player and the collider
            this.physics.add.overlap(player, starCollider, (player, collider) => {
              // update the score and destroy the collider
              this.collectStar(player, collider);
              tile.alpha = 0;
            }, null, this);
          }
        });
        spikes.setCollision(1); // this adds new spike collision
        floor.setCollisionBetween(0,39);
        spikes.setCollisionByExclusion([-1]);
        portal.create(3750, 260, 'portal').setScale(0.15, 0.25).refreshBody();
        this.physics.add.collider(player, floor);
        let partialCollisions = [];
        spikes.forEachTile((tile) => {
            if (tile.index != -1) {
                let partialCollition = this.add.circle(tile.pixelX, tile.pixelY, -10)
                this.physics.add.existing(partialCollition, true);
                partialCollisions.push(partialCollition)
            }
        }); // here is new spike collision may remove

        /*this.physics.add.collider(player, portal, () => {
            //this.scene.remove("level3");
            //this.scene.start("level1");
            this.scene.start("levelselect");
        });*/

        this.physics.add.collider(partialCollisions, player, playerHit, null, this);
        
        player.body.setGravityY(900);
        camera = this.cameras.main;
        camera.setBounds(0, 0, 5000, 360);
        camera.startFollow(player);

        player.setVelocityX(160);
        this.physics.world.setBounds(0, 0, 1400, 360);
        jump = this.input.keyboard.addKey("space", true, false);
        flip = this.input.keyboard.addKey("up", true, false); // Add flip key
        clock = this.time.addEvent({ delay: 500, callback: () => { canFlip = true; }, callbackScope: this, loop: true }); // Add timer for cooldown
        player.anims.play("run"+this.color, true);
        elapsedTimeText = this.add
            .text(30, 20, "0", { fill: "#0f0" })
            .setScrollFactor(0);

    }

    collectStar(player, star) {
        star.destroy();
        scoreText.setText(parseInt(scoreText.text) + 1);
    }

    update() {
        if(player.x > 3750){
            music.stop();
            this.scene.start("levelselect", {color: this.color})
        }
        if (player.y > 360 || player.y < -280) {
            music.stop();
            this.scene.restart();
        }
        if (player.body.velocity.x == 0) {
            music.stop();
            this.scene.restart();
        }

        if (jump.isDown) {
            if (player.body.gravity.y < 0 && player.body.velocity.y == 0) {
                player.setVelocityY(240);
            } else if (player.body.onFloor()) {
                player.setVelocityY(-330);
            }
        }

        if (player.body.onFloor()) {
            player.anims.play("run"+this.color, true);
        }

        if (flip.isDown && canFlip) { // If up arrow key is pressed and flip is allowed by cooldown
            player.body.gravity.y *= -1; // Flip gravity
            player.flipY = !player.flipY; // Flip player's sprite upside down
            canFlip = false; // Disable flipping until cooldown is over
            clock.paused = true; // Pause the timer
            this.time.delayedCall(200, () => { canFlip = true; clock.paused = false; }); // Resume the timer after 0.5 seconds
        }
    }
}

var clock;
var player;
var platform;
var camera;
var portal;
var jump;
var flip;
var music;
var scoreText;
var canFlip = true; 