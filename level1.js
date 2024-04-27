  class level1 extends Phaser.Scene {
    constructor() {
      super("level1");
    }
    preload() {
      
    }
    create() {
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

      
      function playerHit(player, asteroid) {
        music.stop();
        this.scene.restart();
      }
      
      music = this.sound.add("music", { loop: true });
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
      this.add.image(3840, 180, "sky");
      this.add.image(3520, 180, "sky");
      this.add.image(4160, 180, "sky");
      platform = this.physics.add.staticGroup();
      portal = this.physics.add.staticGroup();
      player = this.physics.add.sprite(100, 250, "player");

      this.physics.add.collider(player, platform);

      const map = this.make.tilemap({key: 'level1', tileWidth: 16, tileHeight: 16});
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
      portal.create(3750, 120, 'portal').setScale(0.15, 0.25).refreshBody();
      this.physics.add.collider(player, floor);
      let partialCollisions = []; // here to
      spikes.forEachTile((tile) => {
        if(tile.index != -1){
          let partialCollition = this.add.circle(tile.pixelX, tile.pixelY, -10)
          this.physics.add.existing(partialCollition, true);
          partialCollisions.push(partialCollition)
        }
      }); // here is new spike collision may remove
      
      this.physics.add.collider(partialCollisions, player, playerHit, null, this);
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
      dash = this.input.keyboard.addKey("right", true, false);
      jump = this.input.keyboard.addKey("space", true, false);
      clock = this.plugins.get("rexclockplugin").add(this, { timeScale: 1 });
      clock.start();
      player.anims.play("run", true);
      scoreText = this.add
        .text(30, 20, "0", { fill: "#0f0" })
        .setScrollFactor(0);
    }

    collectStar(player, star) {
      star.destroy();
      scoreText.setText(parseInt(scoreText.text) + 1);
    }
    
    update(time, delta) {
      if (player.y > 360) {
        music.stop();
        this.scene.restart();
      }
      if (player.x > 3750){
        this.scene.start("levelselect");
      }
      if(player.body.velocity.x == 0){
        music.stop();
        this.scene.restart();
      }
      if (dashStart) {
        if (timer < 160) {
          timer = timer + 1 * delta;
          player.setVelocityY(0);
        } 
        else {
          dashStart = false;
          player.setVelocityX(160);
          player.body.setGravityY(900);
          timer = 0;
        }
      } 
      else {
        if (jump.isDown && player.body.onFloor()) {
          player.setVelocityY(-330);
        } 
        else if (dash.isDown && !player.body.onFloor() && dashRefresh) {
          player.anims.play("dash").once('animationcomplete', () => {
              player.anims.play("run");
          });
          player.setVelocityY(0);
          player.setVelocityX(500);
          player.setGravityY(0);
          dashStart = true;
          dashRefresh = false;
        }
        if (player.body.onFloor()) {
          dashRefresh = true;
        }
      }
    }
  }

  var timer = 0;
  var clock;
  var dashRefresh = true;
  var dashStart = false;
  var player;
  var platform;
  var portal;
  var camera;
  var cursors;
  var jump;
  var dash;
  var music;
  var scoreText;
