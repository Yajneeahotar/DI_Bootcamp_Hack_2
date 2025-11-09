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




app.listen(5009, () => 
{
    console.log('Server is listening on port 5009');
})