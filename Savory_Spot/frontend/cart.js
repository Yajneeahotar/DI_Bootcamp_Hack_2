const urlParams = new URLSearchParams(window.location.search);
let allOrders = urlParams.get('allOrders');
username = urlParams.get('username');

console.log(allOrders);


let ordersArray = allOrders.split(",");
console.log(ordersArray);

/*for (let i = 0; i < ordersArray.length; i++) 
{
  
};*/

let foodDetails = document.querySelectorAll('.food-details');


for(let i = 0; i < foodDetails.length; i++ )
{
    console.log(foodDetails[i].id)

    if(!ordersArray.includes(foodDetails[i].id))
    {
        foodDetails[i].remove();
    }
}

/*let test = document.getElementById('test');
test.addEventListener("click" , function()
{
    console.log('test.parentElement' + test.parentElement.parentElement.parentElement.id)
});*/

document.getElementById('homebutton').addEventListener('click', function() 
{
    window.location.href =  `/savoryspot?allOrders=${allOrders}&username=${username}`;
});

let increaseButton = document.getElementsByClassName("plus-btn");
let decreaseButton = document.getElementsByClassName("minus-btn");

let numButtons = increaseButton.length;

for (let i = 0; i < numButtons; i++) 
{
    let parentID = increaseButton[i].parentElement.parentElement.parentElement.id;

    // INCREASE BUTTON
    increaseButton[i].addEventListener("click", function () 
    {
        let qtyElement = document.getElementById(`qty-${parentID}`);
        if (qtyElement) 
        {
            let currentQty = Number(qtyElement.value);
            qtyElement.value = currentQty + 1;
            //window.location.href = `/mycartlist?menu=${menu}&username=${username}&quantity=${quantity}`;

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
        }
    });
}










