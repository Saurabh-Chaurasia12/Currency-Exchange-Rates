const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector(".exchange");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// console.log(dropdown);
// for(let code in countryList){
//     console.log(code , countryList[code]);
// }



for(let select of dropdown){
    for(let currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newoption.selected = "selected";
        }
        if(select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

const updateflag = (element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/32.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updatexchangerate();
    // responsedata.then((res)=>{
    //     console.log(res.);
    // });
});

const updatexchangerate = async ()=>{
    let amountnode = document.querySelector(".Amount input");
    let amount = amountnode.value;
    if(amount === " " || amount < 1){
        amount = 1;
        amountnode.value = 1;
    };

    // console.log(fromcurr.value,tocurr.value);
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let respnose = await fetch(URL);
    let responsedata = await respnose.json();
    let rate = responsedata[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    msg.innerText = `${amount} ${fromcurr.value} = ${rate*amount} ${tocurr.value}`;
};

window.addEventListener("load",updatexchangerate);