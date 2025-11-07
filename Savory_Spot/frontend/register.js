//Registration Form
const registerFirstname = document.getElementById('firstName');
const registerLastname = document.getElementById('lastName');
const registerEmail = document.getElementById('email');
const registerUsername = document.getElementById('userName');
const registerPassword= document.getElementById('password');

const registerButton = document.getElementById('Submit');

function toggleRegisterButton() 
{
    registerButton.disabled = !(registerFirstname.value && registerLastname.value && registerEmail.value && registerUsername.value && registerPassword.value);
    
}

registerFirstname.addEventListener('input',toggleRegisterButton);
registerLastname.addEventListener('input',toggleRegisterButton);
registerEmail.addEventListener('input', toggleRegisterButton);
registerUsername.addEventListener('input', toggleRegisterButton);
registerPassword.addEventListener('input', toggleRegisterButton);


