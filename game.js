const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

let number;
let score = 0;
let scoreText;
let questionText;
let resultText;

function preload() {
    this.load.image('background', 'assets/background.jpg');
}

function create() {
    this.add.image(400, 300, 'background');

    questionText = this.add.text(400, 100, '', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' }).setOrigin(0.5);
    resultText = this.add.text(400, 200, '', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' }).setOrigin(0.5);

    document.getElementById('oddButton').addEventListener('click', function() {
        checkGuess('odd');
    });

    document.getElementById('evenButton').addEventListener('click', function() {
        checkGuess('even');
    });

    scoreText = document.getElementById('scoreValue');

    askQuestion(this);
}

function askQuestion(scene) {
    number = Phaser.Math.Between(1, 100);
    questionText.setText(`Is ${number} odd or even?`);
}

function checkGuess(guess) {
    let result = (number % 2 === 0) ? 'even' : 'odd';
    let correct = (guess === result);

    if (correct) {
        score += 10;
    } else {
        score -= 5;
    }

    if (score < 0) {
        score = 0;
    }

    scoreText.textContent = score;

    if (correct) {
        resultText.setText(`Correct! ${number} is ${result}.`);
    } else {
        resultText.setText(`Wrong! ${number} is ${result}.`);
    }

    setTimeout(() => {
        askQuestion();
        resultText.setText('');
    }, 1500);
}
