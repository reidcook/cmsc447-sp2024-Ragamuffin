class levelselect extends Phaser.Scene
{
    constructor()
    {
        super("levelselect")
    }
    preload()
    {
    }
    create()
    {
        this.add.image(320,180,'sky');
        const level1Start = this.add.image(115,200,'dashUI').setScale(0.75,0.75);
        const level2Start = this.add.image(310,200,'pogoUI').setScale(0.75,0.75);
        const level3Start = this.add.image(505,200,'dashUI').setScale(0.75,0.75);
        level1Start.setInteractive();
        level1Start.on('pointerdown', () => { this.startGame() });
        level2Start.setInteractive();
        level2Start.on('pointerdown', () => { this.startGame2() });
        this.add.text(250, 25, 'Select Level', {fill: '#0f0'})
        this.add.text(80, 80, 'Level 1', {fill: '#0f0'})
        this.add.text(80, 300, 'Dash', {fill: '#0f0'})
        this.add.text(275, 80, 'Level 2', {fill: '#0f0'})
        this.add.text(285, 300, 'Bounce', {fill: '#0f0'})
        this.add.text(470, 80, 'Level 3', {fill: '#0f0'})
        this.add.text(440, 300, 'Gravity Flip', {fill: '#0f0'})
    }

    startGame()
    {
        this.scene.start("level1");
    }

    startGame2()
    {
        this.scene.start("level2");
    }
}