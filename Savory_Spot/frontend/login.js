//Login Form
const logInUsername = document.getElementById('user_name');
const logInPassword= document.getElementById('pass_word');

const logInButton = document.getElementById('log_in');

function togglelogInButton() 
{
    logInButton.disabled = !(logInUsername.value && logInPassword.value);
}

logInUsername.addEventListener('input', togglelogInButton);
logInPassword.addEventListener('input', togglelogInButton);

document.getElementById('register').addEventListener('click', function() 
{
    window.location.href =  "/register";
});


let wrongUsername;
let wrongPassword;

 window.onload = function() 

{

    //Get URL query parameters and extract the value of 'username' from the URL, if it exists
    const urlParams = new URLSearchParams(window.location.search);
    wrongUsername = urlParams.get('wrongusername');
    console.log("username" + wrongUsername);

    if(wrongUsername)
    {
        let formTag = document.getElementsByTagName('form');
        let wrongUserMsg = document.createElement('p');
        wrongUserMsg.innerText = 'User does not exist';
        formTag[0].appendChild(wrongUserMsg);
    }

    wrongPassword = urlParams.get('wrongpassword');
    if(wrongPassword)
    {
        let formTag = document.getElementsByTagName('form');
        let wrongPwdMsg = document.createElement('p');
        wrongPwdMsg.innerText = 'Wrong password';
        formTag[0].appendChild(wrongPwdMsg);
    }
}

document.getElementById('homebutton').addEventListener('click', function() 
{
    window.location.href =  "/savoryspot";
})