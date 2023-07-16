let ExamineQuestions = [];
let CurrentExamineQuestion=0;

export const SetupExamine=questions=>{
    ExamineQuestions = questions.split("\r\n");
    CurrentExamineQuestion=0;
    ShowNextExamineQuestion();
    document.getElementById("examine-questions-block").classList.remove("hidden");
}

export const ShowNextExamineQuestion=()=>{
    const elems = [...document.getElementsByClassName("examine-questions-component")];
    elems.forEach(e =>{
        e.textContent="";
        e.classList.remove("bg-green");
    });
    if(ExamineQuestions[CurrentExamineQuestion].length==0){
        elems[1].textContent="Empty Input";
        return;
    }
    const split = ExamineQuestions[CurrentExamineQuestion].split(",");
    elems[0].textContent=ExamineQuestions[CurrentExamineQuestion];
    if(split.length!=6)elems[1].textContent="There was a problem with the input";
    else{
        elems.forEach((e,i) =>{
            if(i==1)e.textContent=split[1];
            else if(i==2)e.textContent=split[0];
            else if(i>2){
                e.textContent=split[i-1];
                if(split[i-1]===split[0])e.classList.add("bg-green");
            }
        });
    }
}

export const ForwardOneQuestion=()=>{
    if(CurrentExamineQuestion==ExamineQuestions.length-1){
        alert("There are no more questions");
        return;
    }
    CurrentExamineQuestion++;
    ShowNextExamineQuestion();
}

export const BackOneQuestion=()=>{
    if(CurrentExamineQuestion==0)return;
    CurrentExamineQuestion--;
    ShowNextExamineQuestion();
}

export const ExitExamineQuestions=()=>{
    ExamineQuestions = [];
    CurrentExamineQuestion=0
    document.getElementById("examine-questions-block").classList.add("hidden");
}