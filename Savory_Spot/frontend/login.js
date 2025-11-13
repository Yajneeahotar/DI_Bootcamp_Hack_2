//Login Form

// Get references to the login input fields by their IDs
const logInUsername = document.getElementById('user_name');
const logInPassword= document.getElementById('pass_word');

// Get the login button element
const logInButton = document.getElementById('log_in');

// Function: Enables the "Log In" button only when both fields have values
function togglelogInButton() 
{
    // The button stays disabled if either username OR password is empty
    logInButton.disabled = !(logInUsername.value && logInPassword.value);
}

// Add 'input' event listeners to trigger the function every time user types
logInUsername.addEventListener('input', togglelogInButton);
logInPassword.addEventListener('input', togglelogInButton);

// If the user clicks "Register", redirect to the registration page
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

    // If user entered an invalid username (not found in database)  
    if(wrongUsername)
    {
        let formTag = document.getElementsByTagName('form');

        // Create a paragraph element for the error message
        let wrongUserMsg = document.createElement('p');
        wrongUserMsg.innerText = 'User does not exist';
        // Add the message inside the form
        formTag[0].appendChild(wrongUserMsg);
    }
    // If user entered a wrong password
    wrongPassword = urlParams.get('wrongpassword');
    if(wrongPassword)
    {
        let formTag = document.getElementsByTagName('form');
        // Create paragraph element for password error message
        let wrongPwdMsg = document.createElement('p');
        wrongPwdMsg.innerText = 'Wrong password';
        // Add the message inside the form
        formTag[0].appendChild(wrongPwdMsg);
    }
}
// When "Home" button is clicked, redirect to the homepage
document.getElementById('homebutton').addEventListener('click', function() 
{
    window.location.href =  "/savoryspot";
})