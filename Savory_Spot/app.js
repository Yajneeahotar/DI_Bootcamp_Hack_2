const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Accessing the database
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

app.use(express.static('frontend'));
app.use(express.json());
app.use(express.urlencoded({ exfrontendtended: true }));

app.get('/savoryspot', (req, res) => 
{
  res.sendFile(__dirname + "/frontend/index.html");
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + "/frontend/login.html");
})

app.get('/register', (req, res) => 
{
  res.sendFile(__dirname + "/frontend/register.html");
})

app.get('/mycart', (req, res) => 
{
  res.sendFile(__dirname + "/frontend/cart.html");
})


//when user is logging in, checks whether user exists in database
app.post("/loggedin", (req, res) => 
{
  const username = req.body.userName; //userName is from HTML - name ="userName"
  knex.select('username', 'password').from('users').where({username : username})
  .then(data =>
  {
    if(data.length == 0)
    {
      res.redirect(`/login?wrongusername=${username}`);  
    }
    else
    {
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
          //res.sendFile (__dirname + "/frontend/index.html");
          //res.redirect(__dirname + '/frontend/index.html?username=${username}')   
        res.redirect(`/savoryspot?username=${username}`);  
        } 
        else 
        {
          //return res.status(404).send("Wrong password");
          res.redirect(`/login?wrongpassword=${username}`);  
        }
      });
    }
  });
})

app.get('/savoryspot', (req, res) => {
    res.sendFile(__dirname + "/frontend/index.html");
});
app.post("/registered", (req, res) => 
{
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const email = req.body.email;
  const username = req.body.userName;
  const pwd = req.body.password;


  knex.select('username').from('users').where({username : username})
  .then(data =>
  {
    if(data.length)
    {
      res.redirect(`/register?wrongusername=${username}`);  
      //res.redirect(`/login?wrongusername=${username}`);   
    }
  });





  bcrypt.hash(req.body.password, saltRounds, (err, hash) => 
  {
    if (err) 
    {
      res.status(404).json('Encryption error')
    }
    else 
    {
      // Store the generated hash in the database
      console.log('Hashed password:', hash);
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

//creating orders
app.get("/orders", (req, res) => 
{
  let price = 0;
  let allOrders = req.query.allOrders;
  console.log(allOrders);

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

  


  knex('orders')
  .insert({
      username: req.query.username,
      first_name: 'Yajnee',
      last_name: 'Ahotar',
      menu: req.query.neworder,
      quantity: 1,
      price: price
  })
  .then(() => {
      //res.json({ message: 'Order inserted successfully' });
    res.redirect(`/savoryspot?username=${req.query.username}&neworder=${req.query.neworder}&allOrders=${allOrders}`); 
  })
  .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Database insert failed' });
  }); 

})

//DELETE an order
app.get('/ordercancelled', function (request, response) 
{
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

//Updating cart
app.post('/mycartlist', function (request, response) 
{

  console.log(request.body)
  const { menu, username, quantity } = request.body;

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

  console.log("username is" + username)
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




app.listen(5009, () => 
{
    console.log('Server is listening on port 5009');
})