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
        this.add.text(220, 160, 'Interstellar Sprint', { fill: '#0f0' });
        const startButton = this.add.text(290, 210, 'Start', {fill: '#0f0'})
        startButton.setInteractive();
        startButton.on('pointerdown', () => { this.startGame() });
    }

    startGame()
    {
        this.scene.start("game");
    }
}