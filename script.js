
const resultEl=document.getElementById('result');
const lengthEl=document.getElementById('length');
const uppercaseEl=document.getElementById('uppercase');
const lowercaseEl=document.getElementById('lowercase');
const numbersEl=document.getElementById('numbers');
const symbolsEl=document.getElementById('symbols');
const generateEl=document.getElementById('generate');
const clipboardEl=document.getElementById('clipboard');

const randomFunc={
    lower:getRandomLowerCase,
    upper:getRandomUpperCase,
    number:getRandomNumber,
    symbol:getRandomSymbol
}

//pass the data when the generate password button clicked
generateEl.addEventListener('click',()=>{
    const length=lengthEl.value;
    const hasLower=lowercaseEl.checked;
    const hasUpper=uppercaseEl.checked;
    const hasNumber=numbersEl.checked;
    const hasSymbol=symbolsEl.checked;
    resultEl.innerText=generatePassword(length,hasLower,hasUpper,hasNumber,hasSymbol);
});

//function for generating the password 
function generatePassword(length,lower,upper,number,symbol){
    let password='';
    const typeCount=lower+upper+number+symbol;
    const typeArr=[{ lower },{ upper },{ number },{ symbol }].filter(item=>
        Object.values(item)[0]
    );
    console.log(typeArr);
    if(typeCount===0){
        return '';
    }
    for(let i=0;i<length;i+=typeCount){
        typeArr.forEach(type=>{
            const funcName=Object.keys(type)[0];
            password+=randomFunc[funcName]();
            
        })
    }
    
    const finalPassword=password.slice(0,length);
    return finalPassword;
}

clipboardEl.addEventListener('click',()=>{
    const textArea=document.createElement('textarea');
    const pass=resultEl.innerText;
    if(!pass){
        return;
    }
    textArea.value=pass;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password Copied to Clipboard')
})


function getRandomLowerCase(){
    return String.fromCharCode(Math.floor(Math.random()*26)+97)
}

function getRandomUpperCase(){
    return String.fromCharCode(Math.floor(Math.random()*26)+65)
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10)+48)
}

function getRandomSymbol(){
    const symbols='!@#$%^&*(){}[]=<>/,.';
    var length=symbols.length;
    return symbols[Math.floor(Math.random()*(length-1))];
    
}

// console.log(getRandomSymbol());
