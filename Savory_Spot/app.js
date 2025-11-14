// Importing required modules
const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Connecting to PostgreSQL database using Knex
let knex = require('knex')
({
  client: 'pg',
  version: '7.2',
  connection: 
  {
    host : '127.0.0.1', 
    user : 'yajnee',
    password : '1234',
    database : 'Hackathon',
    port:5432
  }
});

// Middleware to serve static frontend files and parse requests
app.use(express.static('frontend'));
app.use(express.json());
app.use(express.urlencoded({ exfrontendtended: true }));

// Route to serve homepage
app.get('/savoryspot', (req, res) => 
{
  res.sendFile(__dirname + "/frontend/index.html");
})

// Route to serve login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + "/frontend/login.html");
})

// Route to serve registration page
app.get('/register', (req, res) => 
{
  res.sendFile(__dirname + "/frontend/register.html");
})

// Route to serve user's cart page
app.get('/mycart', (req, res) => 
{
  res.sendFile(__dirname + "/frontend/cart.html");
})

//-----LOGIN FORM-----//

// Handle login form submission
app.post("/loggedin", (req, res) => 
{
  const username = req.body.userName; //userName is from HTML - name ="userName"

  // Check if username exists in 'users' table
  knex.select('username', 'password').from('users').where({username : username})
  .then(data =>
  {
    if(data.length == 0)     // No such username found — redirect back with error
    {
      res.redirect(`/login?wrongusername=${username}`);  
    }
    else
    {
      // Compare submitted password with stored hashed password
      const dbPassword = data[0].password; 
      const pwd = req.body.password;
      bcrypt.compare (pwd,dbPassword, (err, result) => 
      {
        if (err) 
        {
          console.error('Error comparing password:', err);
          return;
        }
        if (result) 
        {  
        res.redirect(`/savoryspot?username=${username}`);    // Password matches — redirect to main page
        } 
        else 
        {
          res.redirect(`/login?wrongpassword=${username}`);  // Wrong password — redirect back with error
        }
      });
    }
  });
})

app.get('/savoryspot', (req, res) => {
    res.sendFile(__dirname + "/frontend/index.html");
});

//-----REGISTRATION FORM-----//
app.post("/registered", (req, res) => 
{
  // Extract form data
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const email = req.body.email;
  const username = req.body.userName;
  const pwd = req.body.password;


  // Check if username already exists
  knex.select('username').from('users').where({username : username})
  .then(data =>
  {
    if(data.length)
    {
      // If username exists, redirect to registration page with warning
      res.redirect(`/register?wrongusername=${username}`);  
    }
  });

// Encrypt password before saving
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => 
  {
    if (err) 
    {
      res.status(404).json('Encryption error')
    }
    else 
    {
      // Insert new user record into 'users' table
      knex('users')
      .insert(
      { 
        first_name : firstname,
        last_name : lastname,
        email : email,
        username : username,
        password : hash
      })           
      .returning('*')                       
      .then(data => 
      {
        res.redirect(`/savoryspot?username=${username}`);  
         
      })
      .catch(err => 
      {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
    }
  })
})

//-----CREATING ORDERS-----//

// When user adds an item to cart
app.get("/orders", (req, res) => 
{
  let price = 0;
  let allOrders = req.query.allOrders;

  // Determine price based on menu item
  switch(req.query.neworder)
  {
    case "chickenburger":
    case "vegpizza":
      price = 150;
      break;
    
    case "lambburger":
      price = 200;
      break;

    case "vegburger":
      price = 100;
      break;

    case "chickenpizza":
    case "vegpasta":
      price = 250;
      break;

    case "lambpizza":
      price = 300;
      break;

    case "chickenpasta":
      price = 350;
      break;

    case "lambpasta":
      price = 400;
      break;
  }

  // Insert order into database
  knex('orders')
  .insert({
      username: req.query.username,
      //first_name: 'Yajnee',
      //last_name: 'Ahotar',
      menu: req.query.neworder,
      quantity: 1,
      price: price
  })
  .then(() => {
    res.redirect(`/savoryspot?username=${req.query.username}&neworder=${req.query.neworder}&allOrders=${allOrders}`); 
  })
  .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Database insert failed' });
  }); 

})

//-----DELETING AN ORDER-----//

// Delete (cancel) an order
app.get('/ordercancelled', function (request, response) 
{
  console.log(request.query.menu)
  knex('orders')
    .where({username : request.query.username, menu : request.query.menu})
    .del()
  
    .then(data => 
    {
      response.redirect(`/savoryspot?username=${request.query.username}`);          
    })
    .catch(err => 
    {
      console.error(err);
      response.status(500).json({ error: err.message });
    });
});

//-----CART UPDATE-----//

// Update cart item quantity and price
app.post('/mycartlist', function (request, response) 
{

  console.log(request.body)
  const { menu, username, quantity } = request.body;
  // Determine updated price based on menu item
  switch(menu)
  {
    case "chickenburger":
    case "veg pizza":
      price = 150;
      break;
    
    case "lambburger":
      price = 200;
      break;

    case "vegburger":
      price = 100;
      break;

    case "chickenpizza":
    case "vegpasta":
      price = 250;
      break;

    case "lambpizza":
      price = 300;
      break;

    case "chickenpasta":
      price = 400;
      break;
  }

  // Update database with new quantity and total price 
  knex('orders')
    .where({ username : username, menu : menu })
    .update
    ({ 
      price: price * quantity,
      quantity: quantity
    })
    .catch(err => 
    {
        console.error(err);
        response.status(500).json({ error: err.message });
    });
});

//------START SERVER-----//
app.listen(5009, () => 
{
    console.log('Server is listening on port 5009');
})