class levelselect extends Phaser.Scene
{
    constructor()
    {
        super("levelselect")
    }
    init(data){
        this.color = data.color;
        // HERE GET THE TOTAL COINS FROM THE DB
        // SET VALUE TO totalMoney
        this.totalMoney = 100
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
        level3Start.setInteractive();
        level3Start.on('pointerdown', () => { this.startGame3() });
        this.add.text(250, 25, 'Select Level', {fill: '#0f0'})
        this.add.text(40, 25, 'Money: ' + this.totalMoney + " Coins", {fill: '#0f0'})
        const shopButton = this.add.text(550, 25, 'Shop', {fill: '#0f0'})
        this.add.text(80, 80, 'Level 1', {fill: '#0f0'})
        this.add.text(80, 300, 'Dash (\u2192)', {fill: '#0f0'})
        this.add.text(275, 80, 'Level 2', {fill: '#0f0'})
        this.add.text(285, 300, 'Bounce (\u2193)', {fill: '#0f0'})
        this.add.text(470, 80, 'Level 3', {fill: '#0f0'})
        this.add.text(440, 300, 'Gravity Flip (\u2191)', {fill: '#0f0'})

        shopButton.setInteractive();
        shopButton.on('pointerdown', () => { this.enterShop() });
    }

    startGame()
    {
        this.scene.start("level1", {color: this.color});
    }

    startGame2()
    {
        this.scene.start("level2", {color: this.color});
    }

    startGame3()
    {
        this.scene.start("level3"), {color: this.color};
    }
    enterShop()
    {
        this.scene.start("shop", {totalMoney: this.totalMoney});
    }
}