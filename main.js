import ClockPlugin from '/node_modules/phaser3-rex-plugins/plugins/clock-plugin.js';
const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    dom: {
        createContainer: true
    },
    parent: "phaser-container",
    scene: [login, title, level1],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    plugins: {
        global: [{
            key: 'rexClock',
            plugin: ClockPlugin,
            start: true
        },
        // ...
        ]
    }
};
  
  
  var game = new Phaser.Game(config);