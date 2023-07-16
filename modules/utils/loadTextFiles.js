export const LoadTextFiles=async event=>{
    if(event.target.files && event.target.files[0]) return await event.target.files[0].text();
}