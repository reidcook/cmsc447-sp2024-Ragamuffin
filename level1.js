class level1 extends Phaser.Scene
{
    constructor()
    {
        super('game');
    }
    preload()
    {
        this.load.spritesheet('player', 'assets/running2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('sky', 'assets/back.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.audio("music", ["assets/level-wip1.wav"]);
        this.load.plugin('rexclockplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexclockplugin.min.js', true);

    }
    create()
    {
        clock = this.plugins.get('rexclockplugin').add(this, {timeScale: 1});
        clock.start();
        elapsedTimeText = this.add.text(200, 200, 'dsdfsdf', { fill: '#0f0' });
        music = this.sound.add("music", { loop: true });
        music.play();
        this.add.image(300,300,'sky');
        this.add.image(2048,300,'sky');
        this.add.image(4096,300,'sky');
        this.add.image(8192,300,'sky');
        platform = this.physics.add.staticGroup();
        player = this.physics.add.sprite(100, 250, 'player');
        this.physics.add.collider(player, platform);
        platform.create(200, 355, 'platform').setScale(1, 0.25).refreshBody();
        platform.create(550, 355, 'platform').setScale(0.25, 0.25).refreshBody();
        platform.create(750, 355, 'platform').setScale(0.25, 0.25).refreshBody();
        platform.create(900, 335, 'platform').setScale(0.15, 0.25).refreshBody();
        platform.create(1000, 315, 'platform').setScale(0.15, 0.25).refreshBody();
        platform.create(1100, 295, 'platform').setScale(0.15, 0.25).refreshBody();
        platform.create(1200, 275, 'platform').setScale(0.15, 0.25).refreshBody();
        platform.create(1300, 255, 'platform').setScale(0.15, 0.25).refreshBody();
        platform.create(1450, 355, 'platform').setScale(0.15, 0.25).refreshBody();

        //player.setCollideWorldBounds(true);
        player.body.setGravityY(900);
        camera = this.cameras.main;
        camera.setBounds(0,0,5000,360)
        camera.startFollow(player);
        //camera.setLerp(0,0);
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        //cursors = this.input.keyboard.createCursorKeys();
        player.setVelocityX(160);
        this.physics.world.setBounds(0, 0, 1400, 360);
        dash = this.input.keyboard.addKey('right', true, false);
        jump = this.input.keyboard.addKey('space', true, false);
        clock = this.plugins.get('rexclockplugin').add(this, {timeScale: 1});
        clock.start();
        elapsedTimeText = this.add.text(30, 20, '0', { fill: '#0f0' }).setScrollFactor(0);

    }
    update()
    {
        elapsedTimeText.setText(Math.floor(clock.now / 1000));
        if(player.y > 360){
            music.stop();
            this.scene.restart();
        }
        if(dashStart){
            if(timer < 10){
                timer = timer + 1;
                player.setVelocityY(0)
            }
            else{
                dashStart = false;
                player.setVelocityX(160);
                player.body.setGravityY(900);
                timer = 0;
            }
        }
        else{
            player.anims.play('run', true);
            if (jump.isDown && player.body.touching.down)
            {
                player.setVelocityY(-330);
            }
            else if(dash.isDown && !player.body.touching.down && dashRefresh){
                player.setVelocityY(0);
                player.setVelocityX(500);
                player.setGravityY(0);
                dashStart = true;
                dashRefresh = false;
            }
            if(player.body.touching.down){
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