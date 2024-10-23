let userscore=0;
let compscore=0;
let choices=document.querySelectorAll(".image");
let msg=document.querySelector("#msg");
let yours=document.querySelector("#ys");
let comps=document.querySelector("#cs");
const gencomchoice=()=>{
    let option=["paper","scissor","rock"];
    const ind=Math.floor(Math.random()*3);
    return option[ind];
};
const wingame=(compwin,userchoice,compchoice)=>{
    if(compwin){
        console.log("compwin");
       
        compscore++;
        comps.innerText=compscore;
        msg.innerText=`You Loose, ${compchoice} beats your ${userchoice}`;
        msg.style.backgroundColor="red";
    }
    else{
        console.log("userwin");
        userscore++;
        yours.innerText=userscore;
        msg.innerText=`You Won, your ${userchoice} beats  ${compchoice} `;
        msg.style.backgroundColor="green";
    }
};

const play=(userchoice)=>{
   const compchoice=gencomchoice();
    console.log("clicked",userchoice);
    console.log(compchoice);
    if(userchoice===compchoice){
        console.log("draw");
        msg.innerText="Draw,play again!";
        msg.style.backgroundColor="yellow";
    }
    else{
        let compwin=1;
        if(userchoice==="rock"){
            compwin=compchoice==="paper"?1:0;
        }
        else if(userchoice==="paper"){
            compwin=compchoice==="scissor"?1:0;
        }
        else{
            compwin=compchoice==="rock"?1:0;
        }
        wingame(compwin,userchoice,compchoice);
    }
   
};
choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userchoice=choice.getAttribute("id");
        play(userchoice);
    });
});

