import { QuestionBank } from "./data/questionBank.js";
import { LoadTextFiles } from "./utils/loadTextFiles.js";
import { RandomInt } from "./utils/randomInt.js";
import { SetupExamine } from "./examineQuestions.js";

let mergeQuestions=false;
let examineQuestions=false;

const LoadQuestions=questions=>{
    questions.split("\n").forEach(question=>{
        if(question.length>0){
            let split = question.split(",").map(s=>s.trim());
            if(split.length>1){
                const key = split[0][0].toUpperCase();
                QuestionBank[key].push({
                    answer:split[0].trim(),
                    question:split[1].trim(),
                    choices:split.filter((s,i)=>i>1)
                });
            }
        }    
    })
}

export const AreQuestionsLoaded=()=>{
    for(const question of Object.values(QuestionBank)){
        if(question.length>0)return true;
    }
    return false;
}

export const GetQuestions=()=>QuestionBank;

export const SetQuestions=async event=>{
    const questions = await LoadTextFiles(event);
    event.target.value="";
    if(examineQuestions){
        console.log("woof");
        SetupExamine(questions);
        examineQuestions=false;
        return;
    }
    if(!mergeQuestions)ResetQuestionBank();
    mergeQuestions=false;
    LoadQuestions(questions);
};

export const SelectQuestion=letter=>QuestionBank[letter][RandomInt(QuestionBank[letter].length)];

export const SetMergeQuestions=merge=>mergeQuestions=merge;

export const SetExamineQuestions=examine=>examineQuestions=examine;

const ResetQuestionBank=()=>Object.keys(QuestionBank).forEach(k => QuestionBank[k].length=0);

export const Merge=()=>mergeQuestions;

export const Examine=()=>examineQuestions;