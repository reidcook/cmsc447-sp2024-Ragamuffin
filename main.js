const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: [title, level1],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
};
  
  
  var game = new Phaser.Game(config);