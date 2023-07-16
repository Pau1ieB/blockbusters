import { CreateBoard } from "./modules/board.js";
import { NewGame,SetQuestion,SelectAnswer,SetSelectedHex,GetSelectedLetter,isGameStarted } from "./modules/game.js";
import { SelectQuestion,SetQuestions,SetMergeQuestions,SetExamineQuestions,AreQuestionsLoaded,Merge,Examine } from "./modules/question.js";
import { ForwardOneQuestion,BackOneQuestion,ExitExamineQuestions } from "./modules/examineQuestions.js";


let menuOpen=false;

document.getElementById("instructions-exit").addEventListener("click",()=>{document.getElementById("instructions").style.cssText="display:none"});

document.getElementById("instructions-show").addEventListener("click",()=>{document.getElementById("instructions").style.cssText=""});

CreateBoard();
[...document.getElementsByClassName("hex")].forEach(element=>{element.addEventListener("click",event=>{
        if(!isGameStarted || !SetSelectedHex(event))return;
        SetQuestion(SelectQuestion(GetSelectedLetter()));
    })
});

[...document.getElementsByClassName("answer")].forEach(element=>{element.addEventListener("click",SelectAnswer)});

document.getElementById("toggle-menu").addEventListener("click",()=>{
    if(isGameStarted)return;
    (!menuOpen)? document.getElementById("sidenav").style.width="250px":document.getElementById("sidenav").style.width="0";
    menuOpen=!menuOpen;
});

document.getElementById("loadQuestions").addEventListener("click",event=>{
    SetMergeQuestions(false);
    SetExamineQuestions(false);
    document.getElementById("loadFiles").click();
});

document.getElementById("mergeQuestions").addEventListener("click",event=>{
    SetMergeQuestions(true);
    SetExamineQuestions(false);
    document.getElementById("loadFiles").click();
});

document.getElementById("examineQuestions").addEventListener("click",event=>{
    SetMergeQuestions(false);
    SetExamineQuestions(true);
    document.getElementById("loadFiles").click();
});

document.getElementById("loadFiles").addEventListener("change",(event)=>SetQuestions(event));

document.getElementById("back-one-question").addEventListener("click",BackOneQuestion);

document.getElementById("forward-one-question").addEventListener("click",ForwardOneQuestion);

document.getElementById("exit-examine-question-block").addEventListener("click",ExitExamineQuestions);

document.getElementById("newGame").addEventListener("click",()=>{
    if(!AreQuestionsLoaded())return alert("There are no questions loaded!");
    NewGame();
    document.getElementById("sidenav").style.width="0";
    menuOpen=false;
});