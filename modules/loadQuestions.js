export const LoadQuestions=(event,QuestionBank)=>{
    if(event.target.files && event.target.files[0]){
        const reader = new FileReader();
        reader.onload = function() {
            reader.result.split("\n").forEach(question => {
                if(question.length>0){
                    let split = question.split(",").map(s=>s.trim());
                    const key = split[0][0].toUpperCase();
                    QuestionBank[key].push(
                        {
                            answer:split[0].trim(),
                            question:split[1].trim(),
                            choices:split.filter((s,i)=>i>1)
                        }
                    );
                }    
            });
        };
        reader.readAsText(event.target.files[0]);
    }
}