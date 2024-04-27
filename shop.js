class shop extends Phaser.Scene{
    constructor() {
        super("shop");
    }
    init(data){
        this.totalMoney = data.totalMoney;
    }
    preload(){

    }
    create(){
        this.add.image(320,180,'sky');
        this.add.text(300, 25, 'Shop', {fill: '#0f0'})
        this.add.text(50, 25, 'Money: ' + this.totalMoney + " Coins", {fill: '#0f0'})
        const redSelect = this.add.image(115,200,'dashUI').setScale(0.75,0.75);
        const galaxySelect = this.add.image(230,200,'galaxyUI').setScale(0.75,0.75);
        const greenSelect = this.add.image(345,200,'greenUI').setScale(0.75,0.75);
        const parodySelect = this.add.image(460,200,'parodyUI').setScale(0.75,0.75);
        const yellowSelect = this.add.image(575,200,'yellowUI').setScale(0.75,0.75);
        const blueSelect = this.add.image(690,200,'blueUI').setScale(0.75,0.75);
        this.add.text(60, 280, 'Select', {fill: '#0f0'})
        redSelect.setInteractive();
        blueSelect.setInteractive();
        galaxySelect.setInteractive();
        greenSelect.setInteractive();
        parodySelect.setInteractive();
        yellowSelect.setInteractive();
        redSelect.on('pointerdown', () => { this.chooseRed() });
        blueSelect.on('pointerdown', () => {this.chooseBlue() });
        galaxySelect.on('pointerdown', () => {this.chooseGalaxy() });
        greenSelect.on('pointerdown', () => {this.chooseGreen() });
        parodySelect.on('pointerdown', () => {this.chooseParody() });
        yellowSelect.on('pointerdown', () => {this.chooseYellow() });
    }
    update(){

    }
    chooseRed(){
        this.scene.start("levelselect", {color: "Red"})
    }
    chooseGalaxy(){
        this.scene.start("levelselect", {color: "Galaxy"})
    }
    chooseBlue(){
        this.scene.start("levelselect", {color: "Blue"})
    }
    chooseYellow(){
        this.scene.start("levelselect", {color: "Yellow"})
    }
    chooseParody(){
        this.scene.start("levelselect", {color: "Parody"})
    }
    chooseGreen(){
        this.scene.start("levelselect", {color: "Green"})
    }
}