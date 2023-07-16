export const Create=(parent,content,clear=true)=>{
    if(clear)ClearParent(parent);
    for(const obj of content){
        const elem = CreateComponent(obj);
        if(obj.content!=null)Create(elem,obj.content,false);
        parent.append(elem);
    }
}

const ClearParent=(parent)=>{while(parent.children.length>0){parent.removeChild(parent.lastChild)}}

const CreateComponent=obj=>{
    const elem = document.createElement(obj.type);
    if(obj.classes!=null){
        for(const c of obj.classes)elem.classList.add(c);
    }
    if(obj.attr!=null){
        for(const [k,v] of Object.entries(obj.attr))elem[k]=v;
    }
    if(obj.styles!=null){
        obj.styles.forEach(e => {
            elem.style[Object.keys(e)]=Object.values(e);
        });
    }
    if(obj.text!=null)elem.textContent=obj.text;
    return elem;
}