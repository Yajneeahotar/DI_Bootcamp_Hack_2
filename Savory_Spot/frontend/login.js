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