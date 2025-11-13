//Registration Form

// Get references to all form input elements by their IDs
const registerFirstname = document.getElementById('firstName');
const registerLastname = document.getElementById('lastName');
const registerEmail = document.getElementById('email');
const registerUsername = document.getElementById('userName');
const registerPassword= document.getElementById('password');

// Get the "Submit" button element
const registerButton = document.getElementById('Submit');

// Function: enables the Submit button only when all fields are filled
function toggleRegisterButton() 
{
    registerButton.disabled = !(registerFirstname.value && registerLastname.value && registerEmail.value && registerUsername.value && registerPassword.value);
    
}

// Attach input event listeners to each form field
// Every time the user types or changes input, the toggleRegisterButton() function runs
registerFirstname.addEventListener('input',toggleRegisterButton);
registerLastname.addEventListener('input',toggleRegisterButton);
registerEmail.addEventListener('input', toggleRegisterButton);
registerUsername.addEventListener('input', toggleRegisterButton);
registerPassword.addEventListener('input', toggleRegisterButton);

// Get query parameters from the page URL
const urlParams = new URLSearchParams(window.location.search);
wrongUsername = urlParams.get('wrongusername');

    if(wrongUsername)
    {
        let formTag = document.getElementsByTagName('form');
        let wrongUserMsg = document.createElement('p');
        wrongUserMsg.innerText = 'This username already exists';
        formTag[0].appendChild(wrongUserMsg);
    }

// When the user clicks the "Home" button, navigate back to the homepage
document.getElementById('homebutton').addEventListener('click', function() 
{
    window.location.href =  "/savoryspot";
});