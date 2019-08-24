const express = require('express');
const bodyParser = require('body-parser');
const bcrypt =require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'dengo2012',
    database : 'smartbrain'
  }
});

// db.select('*').from('users').then(data => {
// 	console.log(data)
// });



const app = express();

app.use(bodyParser.json());
app.use(cors());


// const database = {
// 	users: [
// 		{
// 			id:'777',
// 			nickname: 'End',
// 			email: 'something@gmail.com',
// 			password: 1234,
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id:'776',
// 			nickname: 'Koshak',
// 			email: 'koshak@gmail.com',
// 			password: 'superherodog',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	],
// 	login: [
// 		{
// 			id:'1241',
// 			hash: '',
// 			email: 'koshak@gmail.com'
// 		}
// 	]
// }



app.get('/', (req,res) => { res.send(database.users)} )
app.post('/signin', signin.logUserIn(db, bcrypt) )
app.post('/register', register.createUser(db, bcrypt) )
app.get('/profile/:id', (req,res) =>(req,res) => { profile.getInfo(req,res,db) })
app.put('/image', (req,res) => { image.getImage(req,res,db) })
// app.post('/imageurl', (req,res) => { image.handleApi(req,res) })
app.listen(700, () => {
	console.log('Everythings is just ok');
})



// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

// res = this is working
// signin -> POST = succes/fail
// register -> POST = user
//profile/:userId -> GET = user
//image --> PUT -> user