class title extends Phaser.Scene
{
    constructor()
    {
        super("title")
    }
    preload()
    {
        this.load.html("login", "loginform.html");
        this.load.image('sky', 'assets/back.png');
    }
    create()
    {
        this.add.image(300,300,'sky');
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