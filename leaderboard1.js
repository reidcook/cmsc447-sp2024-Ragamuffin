class leaderboard1 extends Phaser.Scene {
    constructor() {
        super("leaderboard1");
    }
    init(data){
        this.color = data.color;
      }

    preload() {
        this.load.image('refresh', 'assets/refresh.png');
        this.load.image('ls-portal', 'assets/ls-portal.png');
    }

    async create() {
        this.add.image(320,180,'sky');
        try {
            const response = await fetch('http://localhost:3000/leaderboard/level1');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const restartButton = this.add.image(120, 250, 'refresh');
            this.add.text(85, 290, 'Restart\n Level', { fontSize: '18px', fill: '#0f0' });
            const levelButton = this.add.image(540, 250, 'ls-portal').setScale(0.5);
            this.add.text(510, 295, 'Level\nSelect', { fontSize: '18px', fill: '#0f0' });
            restartButton.setInteractive();
            restartButton.on('pointerdown', () => {this.scene.start("level1", {color: this.color});});
            this.input.keyboard.on('keydown-R', () => {
                this.scene.start("level1", {color: this.color});
            });
            levelButton.setInteractive();
            levelButton.on('pointerdown', () => {this.scene.start("levelselect", {color: this.color});});
            this.add.text(150, 50, 'Top Level 1 Scores', { fontSize: '32px', fill: '#0f0' });
            for (let i = 0; i < data.length; i++) {
                const { username, level_1_score } = data[i];
                this.add.text(200, 100 + i * 30, `${i + 1}. ${username}: ${level_1_score}`, { fontSize: '24px', fill: '#0f0' });
            }
        } catch (error) {
            console.error('Error fetching level 1 leaderboard data:', error.message);
            this.add.text(200, 50, 'Error fetching leaderboard data', { fontSize: '24px', fill: '#ff0000' });
        }
    }

    update() {
    }
}
