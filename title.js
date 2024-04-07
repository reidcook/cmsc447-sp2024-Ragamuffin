class title extends Phaser.Scene
{
    constructor()
    {
        super("title")
    }
    preload()
    {
        this.load.html("login", "loginform.html");
        this.load.image('sky', 'assets/background.png');
        this.load.spritesheet("player", "assets/playerSheet.png", {
            frameWidth: 32,
            frameHeight: 32,
          });
    }
    create()
    {
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
        this.add.image(320,180,'sky');
        this.add.text(220, 160, 'Interstellar Sprint', {fill: '#0f0'})
        this.add.dom(310, 100).createFromCache("login");
        const startButton = this.add.text(285, 210, 'Start', {fill: '#0f0'})
        startButton.setInteractive();
        startButton.on('pointerdown', () => { this.startGame() });
    }

    startGame()
    {
        this.scene.start("game");
    }
}