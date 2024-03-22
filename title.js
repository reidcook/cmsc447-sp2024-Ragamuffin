class title extends Phaser.Scene
{
    constructor()
    {
        super("title")
    }
    preload()
    {
        this.load.image('sky', 'assets/back.png');
    }
    create()
    {
        this.add.image(300,300,'sky');
        const helloButton = this.add.text(100, 100, 'Start', { fill: '#0f0' });
        helloButton.setInteractive();
        helloButton.on('pointerdown', () => { this.startGame() });
    }

    startGame()
    {
        this.scene.start("game");
    }
}