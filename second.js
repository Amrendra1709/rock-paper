let userscore = 0;
let compscore = 0;
let gameover = false;
const resultScreen=document.querySelector("#result-screen");
const resultTitle=document.querySelector("#result-title");
const finalScore=document.querySelector("#final-score");
const restartBtn=document.querySelector("#restart-btn");
const impact = document.querySelector("#impact");
const lightning = document.querySelector("#lightning");

const choices = document.querySelectorAll(".image");
const msg = document.querySelector("#msg");
const yours = document.querySelector("#ys");
const comps = document.querySelector("#cs");

const battleScreen = document.querySelector("#battle-screen");
const userBattle = document.querySelector("#user-battle");
const compBattle = document.querySelector("#comp-battle");

const gencomchoice = () => {
    const options = ["paper", "scissor", "rock"];
    const index = Math.floor(Math.random() * 3);
    return options[index];
};

const wingame = (compwin, userchoice, compchoice) => {

    if (compwin) {

        compscore++;
        comps.innerText = compscore;

        if (compscore === 5) {
        gameover=true;

resultScreen.style.display="flex";

resultScreen.style.background=
"linear-gradient(darkred,black)";

resultTitle.innerText="💀 GAME OVER 💀";

finalScore.innerText=
`YOU ${userscore} - ${compscore} BOT`;gameover = true;
            msg.innerText = "BOT Wins!";
            msg.style.backgroundColor = "red";
            return;
        }
         
        msg.innerText = `💀 Defeat! ${compchoice} destroys ${userchoice}`;
        msg.style.backgroundColor = "red";

    } else {

        userscore++;
        yours.innerText = userscore;

        if (userscore === 5) {
        gameover=true;

resultScreen.style.display="flex";

resultScreen.style.background=
"linear-gradient(gold,orange)";

resultTitle.innerText="🏆 CONGRATULATIONS 🏆";

finalScore.innerText=
`YOU ${userscore} - ${compscore} BOT`;gameover = true;
            msg.innerText = "YOU WIN!";
            msg.style.backgroundColor = "green";
            return;
        }
        msg.innerText = `Your ${userchoice} beats ${compchoice}`;
    
        msg.style.backgroundColor = "green";
    }
};

const play = (userchoice) => {

    if (gameover) return;

    const compchoice = gencomchoice();

    // Hide main UI
    document.querySelector(".images").style.display = "none";
    document.querySelector(".scoreboard").style.display = "none";
    document.querySelector("#msg").style.display = "none";

    // Show battle screen
    battleScreen.style.display = "flex";

    // Hide effects initially
    lightning.style.display = "none";

    // Set battle images
    userBattle.src = `${userchoice}.png`;
    compBattle.src = `${compchoice}.png`;

    // Restart movement animation
    userBattle.classList.remove("user-enter");
    compBattle.classList.remove("comp-enter");

    void userBattle.offsetWidth;

    userBattle.classList.add("user-enter");
    compBattle.classList.add("comp-enter");

    // Wait until fighters reach center
    setTimeout(() => {

        // Clash effects
        lightning.style.display = "block";
        impact.classList.add("impact-show");
        battleScreen.classList.add("shake");

        if (userchoice === compchoice) {

            msg.innerText = "Draw! Play Again";
            msg.style.backgroundColor = "yellow";

        } else {

            let compwin = true;

            if (userchoice === "rock") {
                compwin = compchoice === "paper";
            }
            else if (userchoice === "paper") {
                compwin = compchoice === "scissor";
            }
            else {
                compwin = compchoice === "rock";
            }

            wingame(compwin, userchoice, compchoice);

            // Loser disappears
            if (compwin) {
                userBattle.classList.add("loser");
            } else {
                compBattle.classList.add("loser");
            }
        }

        // Wait for impact + loser animation
        setTimeout(() => {

            lightning.style.display = "none";

            impact.classList.remove("impact-show");
            battleScreen.classList.remove("shake");

            battleScreen.style.display = "none";

            document.querySelector(".images").style.display = "flex";
            document.querySelector(".scoreboard").style.display = "flex";
            document.querySelector("#msg").style.display = "block";

            userBattle.classList.remove("loser");
            compBattle.classList.remove("loser");

        }, 800);

    }, 1200);
};

choices.forEach((choice) => {

    choice.addEventListener("click", () => {

        const userchoice = choice.getAttribute("id");
        play(userchoice);

    });

});