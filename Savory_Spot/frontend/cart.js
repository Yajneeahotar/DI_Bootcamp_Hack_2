// Extract query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
let allOrders = urlParams.get('allOrders');
username = urlParams.get('username');

// Convert the string of orders into an array
let ordersArray = allOrders.split(",");

// Select all elements on the page that have the class "food-details"
let foodDetails = document.querySelectorAll('.food-details');

// Select all elements on the page that have the class "food-details"
for(let i = 0; i < foodDetails.length; i++ )
{
    // If a food item’s ID is NOT present in the user’s order list, remove it from the DOM
    if(!ordersArray.includes(foodDetails[i].id))
    {
        foodDetails[i].remove();
    }
}

// When the home button is clicked, redirect back to the main savoryspot page
// Keep the username and order list in the URL query string
document.getElementById('homebutton').addEventListener('click', function() 
{
    window.location.href =  `/savoryspot?allOrders=${allOrders}&username=${username}`;
});

// Get all "+" and "–" buttons used for adjusting quantity
let increaseButton = document.getElementsByClassName("plus-btn");
let decreaseButton = document.getElementsByClassName("minus-btn");

let numButtons = increaseButton.length;

for (let i = 0; i < numButtons; i++) 
{
    //Get the parent item’s ID
    let parentID = increaseButton[i].parentElement.parentElement.parentElement.id;

    // INCREASE BUTTON
    increaseButton[i].addEventListener("click", function () 
    {
        let qtyElement = document.getElementById(`qty-${parentID}`);
        if (qtyElement) 
        {
            let currentQty = Number(qtyElement.value);
            qtyElement.value = currentQty + 1;

            // Send updated quantity to the server via POST request
            fetch('/mycartlist', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify
                ({
                    menu: parentID,
                    username: username,
                    quantity:  qtyElement.value
                })
            })
        }
    });

    // DECREASE BUTTON
    decreaseButton[i].addEventListener("click", function () 
    {
        let qtyElement = document.getElementById(`qty-${parentID}`);
        if (qtyElement) 
        {
            let currentQty = Number(qtyElement.value);
            if (currentQty > 1) 
            {
                qtyElement.value = currentQty - 1;

            } 
            else 
            {
                qtyElement.value = 1; 
            }

            fetch('/mycartlist', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify
                ({
                    menu: parentID,
                    username: username,
                    quantity:  qtyElement.value
                })
            })
        }
    });
}










