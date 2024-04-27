class level2 extends Phaser.Scene {
    constructor() {
        super("level2");
    }
    init(data){
        this.color = data.color;
    }
    preload() {

    }
    create() {
        console.log("Color: "+this.color);
        /*
        function spawnAsteroids() {
          var pX = player.x + 400;
          var pY = player.y - 100;
          var asteroid = asteroids.create(pX, pY, "asteroid");
          asteroid.setScale(0.05);
          asteroid.body.velocity.x = -40;
          asteroid.body.velocity.y = 0;
          asteroid.body.setAllowGravity(false);
          asteroid.refreshBody();
        }
        */


        function playerHitAsteroid(player, asteroid) {
            music.stop();
            this.scene.restart();
        }

        function playerHitSpike(player, spike) {
            if (!isBouncing || spike.body.blocked.up)
            {
                music.stop();
                this.scene.restart();
            }
        }

        music = this.sound.add("music2", { loop: true });
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
        this.add.image(3840, 180, "sky");
        platform = this.physics.add.staticGroup();
        portal = this.physics.add.staticGroup();
        player = this.physics.add.sprite(100, 250, "player"+this.color);

        this.physics.add.collider(player, platform);

        const map = this.make.tilemap({ key: 'level2', tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage('moon-tileset', 'tiles');
        const tileset2 = map.addTilesetImage('spike-tileset', 'spiketiles');
        const floor = map.createLayer("Ground", tileset, 0, 0);
        const spikes = map.createLayer("Spike", tileset2, 0, 0);
        spikes.setCollision(1); // this adds new spike collision
        floor.setCollisionBetween(0, 39);
        spikes.setCollisionByExclusion([-1]);
        portal.create(3750, 120, 'portal').setScale(0.15, 0.25).refreshBody();
        this.physics.add.collider(player, floor);
        let partialCollisions = []; // here to
        spikes.forEachTile((tile) => {
            if (tile.index != -1) {
                let partialCollition = this.add.circle(tile.pixelX, tile.pixelY, -10)
                this.physics.add.existing(partialCollition, true);
                partialCollisions.push(partialCollition)
            }
        }); // here is new spike collision may remove

        /*this.physics.add.collider(player, portal, () => {
            //this.scene.remove("level2");
            //this.scene.start("level3");
            this.scene.start("levelselect");
        });*/

        this.physics.add.collider(player, partialCollisions, playerHitSpike, null, this);
        /*
        var asteroids = this.physics.add.group();
        this.timer = this.time.addEvent({
          delay: 5000,
          loop: true,
          callback: spawnAsteroids,
          callbackScope: this,
        });
    
        this.physics.add.collider(player, asteroids, playerHit, null, this);
        */
        //player.setCollideWorldBounds(true);
        player.body.setGravityY(900);
        camera = this.cameras.main;
        camera.setBounds(0, 0, 5000, 360);
        camera.startFollow(player);
        //camera.setLerp(0,0);
        //cursors = this.input.keyboard.createCursorKeys();
        player.setVelocityX(160);
        this.physics.world.setBounds(0, 0, 1400, 360);
        bounce = this.input.keyboard.addKey("down", true, true);
        jump = this.input.keyboard.addKey("space", true, false);
        clock = this.plugins.get("rexclockplugin").add(this, { timeScale: 1 });
        clock.start();
        player.anims.play("run"+this.color, true);
        elapsedTimeText = this.add
            .text(30, 20, "0", { fill: "#0f0" })
            .setScrollFactor(0);

    }
    update() {
        elapsedTimeText.setText(Math.floor(clock.now / 1000));
        if(player.x > 3750 && player.y < 150){
            music.stop();
            this.scene.start("levelselect", {color: this.color});
        }
        if (player.y > 360) {
            music.stop();
            this.scene.restart();
        }
        if (player.body.velocity.x == 0) {
            music.stop();
            this.scene.restart();
        }

        if (jump.isDown && player.body.onFloor()) {
            player.setVelocityY(-330);
        }
        else if (bounce.isDown && !player.body.onFloor()) {
            isBouncing = true;
        }
        else if (!bounce.isDown)
        {
            isBouncing = false;
        }

        if (isBouncing)
        {
            player.anims.play("bounce"+this.color, true);
        }
        else
        {
            player.anims.play("run"+this.color, true);
        }
        
        if (player.body.onFloor()) {
            if (isBouncing)
            {
                // Player just hit the ground from bouncing
                player.setVelocityY(-500);
            }
        }
    }
}

var clock;
var player;
var platform;
var portal;
var camera;
var cursors;
var jump;
var bounce;
var isBouncing;
var music;
var elapsedTimeText;
