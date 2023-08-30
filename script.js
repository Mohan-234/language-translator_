const ft = document.querySelector(".from-text"),
tt = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button"),
clearall=document.querySelector(".c"),

selectTag.forEach((tag,id) => {
    for(const code in countries){
        
    let op=`<option value="${code}">${countries[code]}</option>`;
    tag.insertAdjacentHTML("beforeEnd",op);
       }
});

translateBtn.addEventListener("click", () => {
    let text = ft.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        tt.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                tt.value = data.translation;
            }
        });
        tt.setAttribute("placeholder", "Translation");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(!ft.value || !tt.value) return;
        if(target.classList.contains("fa-copy")) {
            if(target.id=="from") {
                navigator.clipboard.writeText(ft.value);
            } else {
                navigator.clipboard.writeText(tt.value);
            }
        } else {
            let u;
            if(target.id=="from") {
                u=new SpeechSynthesisUtterance(ft.value);
                u.lang=selectTag[0].value;
            } else {
                u=new SpeechSynthesisUtterance(tt.value);
                u.lang=selectTag[1].value;
            }
            speechSynthesis.speak(u);
        }
    });
});

function clear(){
    const ft = document.querySelector(".from-text");
    const tt = document.querySelector(".to-text");
    ft.value=''
    tt.value=''
}
clearall.onclick= () =>clear()
