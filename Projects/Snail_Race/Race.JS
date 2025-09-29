const S_Button = document.getElementById("Start");
const Snails = [
    document.getElementById("0"),
    document.getElementById("1"),
    document.getElementById("2"),
    document.getElementById("3")
];
const Message = document.getElementById("Message");
const Flag = document.querySelector(".Flag"); // Get the first flag element

const Music = document.getElementById("Music")

let positions = [0, 0, 0, 0];
let raceInterval;

function getRandomNumber(min = 10, max = 50) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Start() {
    S_Button.hidden = true;
    Message.innerText = "";
    positions = [0, 0, 0, 0];

    Music.play()

    // Reset snail visuals
    Snails.forEach(snail => {
        snail.style.left = '0px';
    });

    // Dynamically calculate finish line position
    const finishLine = Flag.offsetLeft;

    raceInterval = setInterval(() => {
        const index = Math.floor(Math.random() * Snails.length);
        const Snail = Snails[index];

        positions[index] += getRandomNumber(0, 10);
        Snail.style.left = positions[index] + 'px';

        // Check for finish
        const snailRightEdge = Snail.offsetLeft + Snail.offsetWidth;
        if (snailRightEdge >= finishLine) {
            clearInterval(raceInterval);
            Message.innerText = `Snail #${index + 1} wins the race!`;
        }
    }, 100);
}
