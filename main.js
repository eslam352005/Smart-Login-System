
var logName=document.getElementById('logName')
var Logemail=document.getElementById('Logemail')
var Logpassword=document.getElementById('Logpassword')
var upButton=document.getElementById('upButton')
var inButton=document.getElementById('inButton')
var inAnchor=document.getElementById('inAnchor')
var upAnchor=document.getElementById('upAnchor')
var theLog=document.getElementById('theLog')
var welcomePage=document.getElementById('welcomePage')
var welcome=document.getElementById('welcome')
var logOut=document.getElementById('logOut')
var success=document.getElementById('success')

var logList=[]

if(localStorage.getItem('logs')){
    logList=JSON.parse(localStorage.getItem('logs'))
}



upButton.addEventListener('click',addOne)
inAnchor.addEventListener('click',logInMode)
upAnchor.addEventListener('click',SignUpMode)
inButton.addEventListener('click',logOne)
logOut.addEventListener('click',logOutFun)
function addOne(){

if(validation(Logemail) && validation(Logpassword)){
    var obj={
        Pname:logName.value,
        Pemail:Logemail.value,
        Ppassword:Logpassword.value
        }
        logList.push(obj)
        localStorage.setItem('logs',JSON.stringify(logList))
        success.classList.replace('d-none','d-block')
        clearForm()
}

}

function clearForm(){
    logName.value=null
    Logemail.value=null
    Logpassword.value=null

}

function uniqueEmail(input){
    if(inButton.classList.contains('d-block')){
        return true;
    }
for(var i=0;i<logList.length;i++){

    if(logList[i].Pemail===input.value){
        return false
    }
}
return true;
}

function validation(input) {
    var regex = {
        logName: /[a-zA-Z0-9]{3}/,
        Logemail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        Logpassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    };
    success.classList.replace('d-block','d-none')
    if (
        regex[input.id].test(input.value) && 
        (inButton.classList.contains('d-block') || uniqueEmail(input))
    ) {
        input.nextElementSibling.classList.replace('d-block', 'd-none'); 
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    } else {
        input.nextElementSibling.classList.replace('d-none', 'd-block');
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return false;
    }
}


function logInMode(event){
    event.preventDefault();
    clearForm()
    logName.classList.add('d-none')
    upButton.classList.add('d-none')
    inButton.classList.replace('d-none','d-block')
    upAnchor.parentElement.classList.replace('d-none','d-block')
    inAnchor.parentElement.classList.add('d-none')
    success.classList.replace('d-block','d-none')
}

function SignUpMode(event){
    event.preventDefault();
    clearForm()
    logName.classList.remove('d-none')
    upButton.classList.remove('d-none')
    inButton.classList.replace('d-block','d-none')
    upAnchor.parentElement.classList.replace('d-block','d-none')
    inAnchor.parentElement.classList.remove('d-none')

}

function logOne() {
    for (var i = 0; i < logList.length; i++) {
        if (
            logList[i].Pemail === Logemail.value && 
            logList[i].Ppassword === Logpassword.value
        ) {
            display(i);
            clearForm()
            return;
        }
    }
    alert('Invalid email or password!');
}


function display(index){
     var box=''
    theLog.classList.add('d-none')
    welcomePage.classList.replace('d-none','d-block')
   
  box=` <h3>Welcome ${logList[index].Pname}</h3>`
welcome.innerHTML=box
}

function logOutFun(){

    welcomePage.classList.replace('d-block','d-none')
    theLog.classList.replace('d-none','d-block')

}