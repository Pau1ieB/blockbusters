import { CheckBoard,ResetBoard,AddResultToBoard } from "./board.js";
import { RandomInt } from "./utils/randomInt.js";

let answer="";
let questionsAnswered=0;
let questionsAnsweredCorrectly=0;
let hex=null;

const SelectLetter=(num,currentLetters)=>{
    let letter="";
    while(true){
        letter = String.fromCharCode(RandomInt(num)+65);
        if(!currentLetters.includes(letter)){
            currentLetters.push(letter);
            return letter;
        }
    }
};

const EndGame=(result,elem)=>{
    elem.classList.add("hidden");
    document.getElementById("answers-container").classList.add("hidden");
    document.getElementById("question-block").textContent=(result==2)?`Congratulations. You have won.\nYou answered ${questionsAnsweredCorrectly} of ${questionsAnswered} questions correctly`:`You lose. You have no valid path across.\nYou answered ${questionsAnsweredCorrectly} of ${questionsAnswered} questions correctly`;
    setTimeout(()=>{
        ResetBoard();
        isGameStarted=false;
        document.getElementById("display-container").classList.add("opacity-0");
    },5000)
}

export let isGameStarted=false;

export const NewGame=()=>{
    const currentLetters=[];
    [...document.getElementById("game-container").children].forEach(element => element.children[0].textContent=SelectLetter(26,currentLetters));
    isGameStarted=true;
    questionsAnswered=0;
    questionsAnsweredCorrectly=0;
    hex=null;
    document.getElementById("question-block").textContent="Please make a selection from the grid above";
    document.getElementById("display-container").classList.remove("opacity-0");
};

export const SetSelectedHex=event=>{
    if(hex!=null) return false;
    hex = (event.target.firstChild.nodeName==="#text")?event.target.offsetParent:event.target;
    if(!hex.classList.contains("mouse")){
        hex=null;
        return false;
    }
    return true;
}

export const GetSelectedLetter=()=>hex.textContent;

export const SetQuestion=(question)=>{
    hex.classList.remove("mouse");
    hex.classList.add("blink");
    answer=question.answer;
    document.getElementById("question-block").textContent=question.question;
    [...document.getElementById("answers").children].forEach((child,i)=>{if(i<question.choices.length)child.textContent=question.choices[i];});
    document.getElementById("answers-container").classList.remove("hidden");
};

export const SelectAnswer=event=>{
    hex.classList.remove("blink");
    let elem;
    questionsAnswered++;
    if(event.target.textContent===answer){
        elem = document.getElementById("correctAnswer");
        elem.classList.add("correct");
        hex.classList.add("is-correct");
        AddResultToBoard(parseInt(hex.id),1)
        questionsAnsweredCorrectly++;
    }
    else{
        elem = document.getElementById("wrongAnswer")
        elem.classList.add("wrong");
        hex.classList.add("is-wrong");
        AddResultToBoard(parseInt(hex.id),2)
    }
    const result = CheckBoard();
    document.getElementById("answers-container").classList.add("hidden");
    document.getElementById("question-block").textContent="Please make a selection from the grid above";
    hex.firstChild.textContent="";
    answer="";
    elem.classList.remove("hidden");
    if(result!=1)EndGame(result,elem);
    else{
        hex=null;
        if(result==1){
            setTimeout(()=>{
                elem.classList.add("hidden");
        },1500);
        }
    }
};