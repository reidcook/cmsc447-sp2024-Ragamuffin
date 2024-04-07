class login extends Phaser.Scene {
    constructor() {
        super("login");
    }

    preload() {
        this.load.html("login", "loginform.html");
        this.load.image('sky', 'assets/back.png');
    }

    create() {
        this.add.image(300, 300, 'sky');

        
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
            this.scene.start("title");
        })
        
    }
}