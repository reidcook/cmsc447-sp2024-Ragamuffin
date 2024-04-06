class level1 extends Phaser.Scene {
  constructor() {
    super("game");
  }
  preload() {
    this.load.spritesheet("player", "assets/playerSheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("tiles", 'assets/moon-tileset.png');
    this.load.tilemapTiledJSON('map','assets/Level1.json');
    this.load.image("sky", "assets/background.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("asteroid", "assets/asteroid.png");
    this.load.audio("music", ["assets/level-wip1.wav"]);
    this.load.plugin(
      "rexclockplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexclockplugin.min.js",
      true
    );
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

    /*
    function playerHit(player, asteroid) {
      music.stop();
      this.scene.restart();
    }
    */

    clock = this.plugins.get("rexclockplugin").add(this, { timeScale: 1 });
    clock.start();
    elapsedTimeText = this.add.text(200, 200, "dsdfsdf", { fill: "#0f0" });
    music = this.sound.add("music", { loop: true });
    music.play();
    this.add.image(320, 180, "sky");
    this.add.image(640, 180, "sky");
    this.add.image(960, 180, "sky");
    this.add.image(1280, 180, "sky");
    platform = this.physics.add.staticGroup();
    player = this.physics.add.sprite(100, 250, "player");

    this.physics.add.collider(player, platform);

    const map = this.make.tilemap({key: 'map', tileWidth: 16, tileHeight: 16});
    const tileset = map.addTilesetImage('moon-tileset', 'tiles');
    const floor = map.createLayer("Ground", tileset, 0, 0);
    floor.setCollisionBetween(0,39);
    this.physics.add.collider(player, floor);
    
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
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player", { start: 2, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
        key: "dash",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
        frameRate: 25,
        repeat: 2,
      });
    //cursors = this.input.keyboard.createCursorKeys();
    player.setVelocityX(160);
    this.physics.world.setBounds(0, 0, 1400, 360);
    dash = this.input.keyboard.addKey("right", true, false);
    jump = this.input.keyboard.addKey("space", true, false);
    clock = this.plugins.get("rexclockplugin").add(this, { timeScale: 1 });
    clock.start();
    player.anims.play("run", true);
    elapsedTimeText = this.add
      .text(30, 20, "0", { fill: "#0f0" })
      .setScrollFactor(0);
    
  }
  update() {
    elapsedTimeText.setText(Math.floor(clock.now / 1000));
    if (player.y > 360) {
      music.stop();
      this.scene.restart();
    }
    if (dashStart) {
      if (timer < 10) {
        timer = timer + 1;
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
      //player.anims.play("run", true);
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
var camera;
var cursors;
var jump;
var dash;
var music;
var elapsedTimeText;
