class shop extends Phaser.Scene{
    constructor() {
        super("shop");
    }
    init(data){
        this.totalMoney = data.totalMoney;
    }
    preload(){
        const level1Start = this.add.image(115,200,'dashUI').setScale(0.75,0.75);
    }
    create(){
        this.add.image(320,180,'sky');
        this.add.text(300, 25, 'Shop', {fill: '#0f0'})
        this.add.text(50, 25, 'Money: ' + this.totalMoney + " Coins", {fill: '#0f0'})
        const redSelect = this.add.image(115,200,'dashUI').setScale(0.75,0.75);
        this.add.text(60, 280, 'Select', {fill: '#0f0'})
        redSelect.setInteractive();
        redSelect.on('pointerdown', () => { this.chooseRed() });
    }
    update(){

    }
    chooseRed(){
        this.scene.start("levelselect", {color: "red"})
    }
    chooseMegaman(){
        this.scene.start("levelselect", {color: "megaman"})
    }
    chooseBlue(){
        this.scene.start("levelselect", {color: "blue"})
    }
    chooseYellow(){
        this.scene.start("levelselect", {color: "yellow"})
    }
}