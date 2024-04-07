class login extends Phaser.Scene {
    constructor() {
        super("login");
    }
    preload()
    {
        this.load.html("login", "loginform.html");
        this.load.image('sky', 'assets/background.png');
        this.load.spritesheet("player", "assets/playerSheet.png", {
            frameWidth: 32,
            frameHeight: 32,
          });
        this.load.spritesheet("player", "assets/playerSheet.png", {
            frameWidth: 32,
            frameHeight: 32,
          });
        this.load.image("tiles", 'assets/moon-tileset.png');
        this.load.image("spiketiles", 'assets/spike.png');
        this.load.tilemapTiledJSON('level1','assets/Level1REAL.json');
        this.load.image("asteroid", "assets/asteroid.png");
        this.load.audio("music", ["assets/level-wip1.wav"]);
        this.load.plugin(
            "rexclockplugin",
            "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexclockplugin.min.js",
            true
        );
        this.load.image('dashUI', 'assets/astro-air-dash-scaled.gif');
        this.load.image('pogoUI', 'assets/astro-pogo-scaled.png');
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
        
        const loginForm = this.add.dom(310, 174).createFromCache("login");

        
        const formElement = loginForm.node;

        
        formElement.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const username = formElement.querySelector('#username').value;
            const password = formElement.querySelector('#password').value;

            
            this.registerUser(username, password);
        });

    }

    registerUser(username, password) {
        
        fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.scene.start("levelselect");
        })
        
    }
    
}