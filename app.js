let mycont = document.querySelectorAll(".cont");
let index = 0;
let nextDom = document.querySelector(".next");
let precDom = document.querySelector(".back");
let leftpDom = document.querySelectorAll(".left .steps .step p");
let switcher = document.querySelector(".right .plan .billing .switch");
let changeMtoY = document.querySelectorAll(".right .plan .billing h4");
let planPriceyearly = document.querySelectorAll(".right .cont .item .des .price");
let planYearly = document.querySelectorAll(".right .cont .item .des .yearly");
let pickOnsYearly = document.querySelectorAll(".right .add-ons ul li .box span");
let chossingPlan = document.querySelectorAll(".right .plan .items .item");
let chossingAddOns = document.querySelectorAll(".right .add-ons ul li");
let myinput = document.querySelectorAll(".add-ons input")
let chosedPlan;
let chosedAddOns;
let addChosedPlan = document.querySelector(".right .box-choice .item .plan-choice");
let addChosedPick = document.querySelector(".right .box-choice .item .item1");
let myObject ; 
 let changeChosed  = document.querySelector(".right .summary .box-choice .item a");
let priceOFadd ;
let planPrice ;
let totalPrice = document.querySelector(".right .summary .box-choice .total");


nextDom.onclick = function(){
    move("next");
}
precDom.onclick = function(){
    move("back");
}
switcher.onclick = () =>{
    switcher.classList.toggle("move");
    changeMtoY[0].classList.toggle("active");
    changeMtoY[1].classList.toggle("active");
    if(changeMtoY[1].classList.contains("active")){
        planPriceyearly[0].innerHTML = "$90/yr";
        planPriceyearly[1].innerHTML = "$120/yr";
        planPriceyearly[2].innerHTML = "$150/yr";
        for(let i = 0 ; i < planYearly.length ; i++){
            planYearly[i].innerHTML = "2 monthes free";
            if(i>0)
            pickOnsYearly[i].innerHTML = "+$20/yr";
            else pickOnsYearly[i].innerHTML = "+$10/yr";

        }
    }
    else {
        planPriceyearly[0].innerHTML = "$9/mo";
        planPriceyearly[1].innerHTML = "$12/mo";
        planPriceyearly[2].innerHTML = "$15/mo";
        for(let i = 0 ; i < planYearly.length ; i++){
            planYearly[i].innerHTML = "";
            if(i>0)
            pickOnsYearly[i].innerHTML = "+$2/mo";
            else pickOnsYearly[i].innerHTML = "+$1/mo";
        }
    }

}
chossingPlan.forEach((e)=>{
    e.onclick = function(){
        chossingPlan.forEach((e)=>{
            e.classList.remove("active");
        })
        e.classList.toggle("active");
        chosedPlan = e;
    }
})
myinput.forEach((e)=>{
    e.onclick = function(){
        e.parentElement.id = "chosed";
            chosedAddOns = e.parentElement;
            
    }
})
changeChosed.onclick = function(){
    sessionStorage.clear();
    addChosedPlan.innerHTML = " ";
    addChosedPick.innerHTML = " ";
    for(let  i = 0 ; i < 2 ; i++ ){
        precDom.click();
    }

}

function move(prop){
    if(index >=0 && index <=3){
        mycont[index].classList.toggle("show");
        if(prop==="next"){
            leftpDom[index].classList.toggle("active");
            ++index;
            leftpDom[index].classList.toggle("active");
            mycont[index].classList.toggle("show");
            precDom.style.setProperty("pointer-events","all");
            precDom.style.setProperty("opacity","1");
            if(index > 2){
                addDataToLocal(chosedPlan,chosedAddOns);
                myObject = getDataFromLocal();
                if(myObject !== null){
                addChosedPlan.innerHTML = myObject.plan;
                addChosedPick.innerHTML = myObject.pickadd;
                priceOFadd = document.querySelector(".summary .box-choice .box span");
                planPrice = document.querySelector(".summary .box-choice .des .price");
                totalPrice.innerHTML = "Total Amount is :  : " + priceOFadd.innerHTML + " " + planPrice.innerHTML;
                }
            }
            if(index ===3){
                nextDom.style.setProperty("pointer-events","none");
                nextDom.style.setProperty("opacity","0.5");
            }
        }
        // "hsl(281.77deg 85.04% 23.06% / 86%)"
        else {
            nextDom.innerHTML = "Next Step";
            leftpDom[index].classList.toggle("active");
            --index;
            leftpDom[index].classList.toggle("active");
            mycont[index].classList.toggle("show");
            nextDom.style.setProperty("pointer-events","all");
                nextDom.style.setProperty("opacity","1");
            if(index ===0){
                precDom.style.setProperty("pointer-events","none");
                precDom.style.setProperty("opacity","0.5");
            }
        }
    }
}
function addDataToLocal(para , para2){
    if(para){
        let paraclo = para.cloneNode(true);
        let para2clo = para2.cloneNode(true)
        paraclo.children[0].remove();
        para2clo.children[0].remove();
    let myObject = {
        plan : `${paraclo.innerHTML}`,
        pickadd:`${para2clo.innerHTML}`
    }

    let myjsonObject = JSON.stringify(myObject);
    sessionStorage.setItem("data",myjsonObject);
}
}
function getDataFromLocal(){
    return JSON.parse(sessionStorage.getItem("data"));
    
}