const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json())
app.use(cors())

// MySQL configuration
const connection = mysql.createConnection({
  host: 'sql9.freemysqlhosting.net',
  user: 'sql9605257',
  password: 'c3BZZmSiUR',
  database: 'sql9605257'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

//Check if Credentials are correct
const verifyUser = (req, res, next) => {
  const token = req.headers["x-access-token"]
  if (!token) {
    res.json({auth:false,message:"Invalid Token"})
  } else {
    //TODO: Dumb Ways to Store secret
    jwt.verify(token, "secret", (err, username) => {
      if (err) {
        res.json({ auth: false,message: "Invalid Token" });
      }
      else {
        res.locals.username = username;
        next();
      }
    });
  }

}

// Define API endpoint to fetch user details
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/register', (req, res) => {
  const query = 'insert into users values(?, ?, ?, ?, ?);';
  const { username, name, password, email, cvlink } = req.body;
  connection.query(query, [username, name, password, email, cvlink], (error, results) => {
    if (error) throw error;
    res.json({ created: true, message: "You can Login Now" });
  });
});

app.post('/update',verifyUser, (req, res) => {
  const query = 'update users SET name=?,email=?,cvlink=? where rollnumber=?';
  const { name, email, cvlink } = req.body;
  connection.query(query, [name, email, cvlink, res.locals.username], (error, results) => {
    if (error) throw error;
    res.json({update: true, message:"Updated user details"});
  });
});

app.post('/delete',verifyUser, (req, res) => {
  const query = 'DELETE FROM users WHERE rollnumber=?';
  connection.query(query, [res.locals.username], (error, results) => {
    if (error) throw error;
    res.json({delete: true, message:"Deleted user. Create New Account"});
  });
});

app.post('/login', (req, res) => {
  const query = 'SELECT rollnumber,name,email,cvlink FROM users WHERE rollnumber=? and password=?';
  connection.query(query, [req.body.username, req.body.password], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      //TODO: Dumb ways to store secret
      const token = jwt.sign(req.body.username, "secret");
      // Basically pass token and other details of user
      res.json({ auth: true, token: token, results: results });
    }
    else {
      res.json({ auth: false, message: "Wrong Credentials" });
    }
  });
}
);

app.get('/cv',verifyUser, (req, res) => {
  const query = 'select name, email, cvlink from users';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get('/auth', verifyUser, (req, res) => {
  const query = 'SELECT rollnumber as username,name, email, cvlink FROM users where rollnumber=\''+res.locals.username+"\';";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
})

// Start the server
const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
