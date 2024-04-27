class login extends Phaser.Scene {
    constructor() {
        super("login");
    }
    preload()
    {
        this.load.html("login", "loginform.html");
        this.load.image('sky', 'assets/background.png');
        this.load.image('portal', 'assets/portal.png');
        this.load.spritesheet("playerRed", "assets/playerSheet.png", {
            frameWidth: 32,
            frameHeight: 32,
          });
          this.load.spritesheet("playerBlue", "assets/playerSheetBlue.png", {
            frameWidth: 32,
            frameHeight: 32,
          });
          this.load.spritesheet("playerGalaxy", "assets/playerSheetGalaxy.png", {
            frameWidth: 32,
            frameHeight: 32,
          });
          this.load.spritesheet("playerGreen", "assets/playerSheetGreen.png", {
            frameWidth: 32,
            frameHeight: 32,
          });
          this.load.spritesheet("playerParody", "assets/playerSheetParody.png", {
            frameWidth: 32,
            frameHeight: 32,
          });
          this.load.spritesheet("playerYellow", "assets/playerSheetYellow.png", {
            frameWidth: 32,
            frameHeight: 32,
          });
        this.load.image("tiles", 'assets/moon-tileset.png');
        this.load.image("spiketiles", 'assets/spike.png');
        this.load.tilemapTiledJSON('level1','assets/Level1REAL.json');
        this.load.tilemapTiledJSON('level2','assets/level2.json');
        this.load.tilemapTiledJSON('level3','assets/level3.json');
        this.load.image("asteroid", "assets/asteroid.png");
        this.load.audio("music", ["assets/level-1.ogg"]);
        this.load.audio("music2", ["assets/level-2.ogg"]);
        this.load.audio("music3", ["assets/level-3.mp3"]);
        this.load.plugin(
            "rexclockplugin",
            "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexclockplugin.min.js",
            true
        );
        this.load.image('dashUI', 'assets/astro-air-dash-scaled.gif');
        this.load.image('pogoUI', 'assets/astro-pogo-scaled.png');
        this.load.image('blueUI', 'assets/astro-air-dash-blue-scaled.gif')
        this.load.image('galaxyUI', 'assets/astro-air-dash-galaxy-scaled.gif')
        this.load.image('greenUI', 'assets/astro-air-dash-green-scaled.gif')
        this.load.image('parodyUI', 'assets/astro-air-dash-parody-scaled.gif')
        this.load.image('yellowUI', 'assets/astro-air-dash-yellow-scaled.gif')
    }
    create()
    {
    this.anims.create({
      key: "runRed",
      frames: this.anims.generateFrameNumbers("playerRed", { start: 2, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
        key: "dashRed",
        frames: this.anims.generateFrameNumbers("playerRed", { start: 0, end: 1 }),
        frameRate: 25,
        repeat: 2,
      });
      this.anims.create({
        key: "bounceRed",
        frames: this.anims.generateFrameNumbers("playerRed", { start: 6, end: 6 }),
        frameRate: 25,
        repeat: -1,
      });

      this.anims.create({
        key: "runBlue",
        frames: this.anims.generateFrameNumbers("playerBlue", { start: 3, end: 6 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
          key: "dashBlue",
          frames: this.anims.generateFrameNumbers("playerBlue", { start: 0, end: 1 }),
          frameRate: 25,
          repeat: 2,
        });
        this.anims.create({
          key: "bounceBlue",
          frames: this.anims.generateFrameNumbers("playerBlue", { start: 2, end: 2 }),
          frameRate: 25,
          repeat: -1,
        });

        this.anims.create({
            key: "runGalaxy",
            frames: this.anims.generateFrameNumbers("playerGalaxy", { start: 3, end: 6 }),
            frameRate: 10,
            repeat: -1,
          });
          this.anims.create({
              key: "dashGalaxy",
              frames: this.anims.generateFrameNumbers("playerGalaxy", { start: 0, end: 1 }),
              frameRate: 25,
              repeat: 2,
            });
            this.anims.create({
              key: "bounceGalaxy",
              frames: this.anims.generateFrameNumbers("playerGalaxy", { start: 2, end: 2 }),
              frameRate: 25,
              repeat: -1,
            });

            this.anims.create({
                key: "runParody",
                frames: this.anims.generateFrameNumbers("playerParody", { start: 3, end: 6 }),
                frameRate: 10,
                repeat: -1,
              });
              this.anims.create({
                  key: "dashParody",
                  frames: this.anims.generateFrameNumbers("playerParody", { start: 0, end: 1 }),
                  frameRate: 25,
                  repeat: 2,
                });
                this.anims.create({
                  key: "bounceParody",
                  frames: this.anims.generateFrameNumbers("playerParody", { start: 2, end: 2 }),
                  frameRate: 25,
                  repeat: -1,
                });

                this.anims.create({
                    key: "runYellow",
                    frames: this.anims.generateFrameNumbers("playerYellow", { start: 3, end: 6 }),
                    frameRate: 10,
                    repeat: -1,
                  });
                  this.anims.create({
                      key: "dashYellow",
                      frames: this.anims.generateFrameNumbers("playerYellow", { start: 0, end: 1 }),
                      frameRate: 25,
                      repeat: 2,
                    });
                    this.anims.create({
                      key: "bounceYellow",
                      frames: this.anims.generateFrameNumbers("playerYellow", { start: 2, end: 2 }),
                      frameRate: 25,
                      repeat: -1,
                    });

                    this.anims.create({
                        key: "runGreen",
                        frames: this.anims.generateFrameNumbers("playerGreen", { start: 1, end: 3 }),
                        frameRate: 10,
                        repeat: -1,
                      });
                      this.anims.create({
                          key: "dashGreen",
                          frames: this.anims.generateFrameNumbers("playerGreen", { start: 5, end: 6 }),
                          frameRate: 25,
                          repeat: 2,
                        });
                        this.anims.create({
                          key: "bounceGreen",
                          frames: this.anims.generateFrameNumbers("playerGreen", { start: 0, end: 0 }),
                          frameRate: 25,
                          repeat: -1,
                        });
        this.add.image(320,180,'sky');
        
        const loginForm = this.add.dom(310, 174).createFromCache("login");

        
        const formElement = loginForm.node;

        this.errorText = this.add.text(225, 50, ' ', {
        fill: '#ff0000',
        fontSize: '16px',
        fontFamily: 'Arial',
        fontStyle: 'bold'});

        formElement.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const username = formElement.querySelector('#username').value;
            const password = formElement.querySelector('#password').value;

            const createAcc = formElement.querySelector('#create-account').checked;
            if (createAcc) {
                this.registerUser(username, password);
            } else {
                
                this.loginUser(username, password, this.errorText);
            }
        });

    }

    registerUser(username, password) {
        const errorText = this.errorText;
    
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
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status === 400 ? 'Username already in use' : 'Server error');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            this.scene.start("levelselect", { color: "Red" });
        })
        .catch(error => {
            console.error(error.message);
            errorText.setText(error.message);
        });
    }
    

    loginUser(username, password, errorText) {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid username or password');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            this.scene.start("levelselect", { color: "red" });
        })
        .catch(error => {
            console.error(error.message);
            errorText.setText('Invalid login! Try Again');
        });
    }
    
}