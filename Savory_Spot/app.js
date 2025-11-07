const express = require("express");
const app = express();

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

app.post("/loggedin", (req, res) => 
{
  const username = req.body.userName;
  knex.select('username', 'password').from('users').where({username : username})
  .then(data =>
  {
    if(data.length == 0)
    {
      res.status(404).send("User not found");
    }
    else
    {
      const dbPassword = data[0].password;
      const pwd = req.body.password;
      if(pwd == dbPassword)
      {
        res.sendFile(__dirname + "/frontend/index.html");
      }
      else
      {
        res.status(404).send("Password incorrect")
      }
    }

  }) 
});

app.post("/registered", (req, res) => 
{
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const email = req.body.email;
  const username = req.body.userName;
  const pwd = req.body.password;

  knex('users')
  .insert(
  { 
    first_name : firstname,
    last_name : lastname,
    email : email,
    username : username,
    password : pwd
  })           
  .returning('*')                       
  .then(data => 
  {
      res.json(data);          
  })
  .catch(err => 
  {
      console.error(err);
      res.status(500).json({ error: err.message });
  });


})



app.listen(5009, () => 
{
    console.log('Server is listening on port 5009');
});