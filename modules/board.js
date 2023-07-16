import {Create} from "./create.js";
import {Hexagon} from "./templates/hexagon.js";

const positions = [[1,1,3,5],[2,4,4,8],[1,7,3,11],[2,10,4,14],[1,13,3,17],[3,1,5,5],[4,4,6,8],[3,7,5,11],[4,10,6,14],[3,13,5,17],[5,1,7,5],[6,4,8,8],[5,7,7,11],[6,10,8,14],[5,13,7,17],[7,1,9,5],[8,4,10,8],[7,7,9,11],[8,10,10,14],[7,13,9,17]];
const Board = [{value:0,indices:[1]},{value:0,indices:[2,7,6]},{value:0,indices:[3,7]},{value:0,indices:[4,9,8]},{value:0,indices:false},{value:0,indices:[1,6]},{value:0,indices:[7,12,11]},{value:0,indices:[3,8,12]},{value:0,indices:[9,14,13]},{value:0,indices:false},{value:0,indices:[6,11]},{value:0,indices:[12,17,16]},{value:0,indices:[8,13,17]},{value:0,indices:[14,19,18]},{value:0,indices:false},{value:0,indices:[11,16]},{value:0,indices:[17]},{value:0,indices:[13,18]},{value:0,indices:[19]},{value:0,indices:false}];
    
export const CreateBoard=()=>{
    const elems = positions.map((p,i)=>{
        const hex = JSON.parse(JSON.stringify(Hexagon));
        hex.styles.push({gridArea: `${p[0]} / ${p[1]} / ${p[2]} / ${p[3]}`});
        hex.attr.id=i;
        return hex;
    })
    Create(document.getElementById("game-container"),elems);
}

const CheckIndices=(index,dest,validMoves)=>{
    if(Board[index].value==2)return validMoves;
    if(!Board[index].indices){
        let win=true;
        for(const i of dest){
            if(Board[i].value!=1) win=false;
        }
        if(win && Board[index].value==1)return 2;
        if(Board[index].value<2)validMoves=1;
        return validMoves;
    }
    for(const i of Board[index].indices){
        dest.push(index);
        validMoves = CheckIndices(i,dest,validMoves);
        if(validMoves==2)return validMoves;
        dest.pop();
    }
    return validMoves;
}

export const CheckBoard=()=>{
    let validMoves=0;
    for(const index of [0,5,10,15]){
        validMoves = CheckIndices(index,[],validMoves);
        if(validMoves==2) return 2;
    }
    return validMoves;
}

export const AddResultToBoard=(index,result)=>Board[index].value=result;

export const ResetBoard=()=>{
    [...document.getElementsByClassName("hex")].forEach(element=>{
        element.classList.remove("is-correct");
        element.classList.remove("is-wrong");
        element.classList.add("mouse");
        element.childNodes[0].textContent="A";
    });
    Board.forEach(element=>element.value=0)
}