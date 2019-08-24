const logUserIn = (db, bcrypt) => (req,res) => {
	const { email,password } = req.body;
	if (!email || !password ){
		return res.status(400).json('One or more blanks ')
	}
	db.select('email', 'hash').from('login')
	 .where('email', '=', email)
	 .then(data => {
	 	const validOrNot = bcrypt.compareSync(password, data[0].hash);
	 	if (validOrNot){
	 		return db.select('*').from('users')
	 		 .where('email', '=', email)
	 		 .then(user => {
	 		 	res.json(user[0])
	 		 })
	 		 .catch(err => res.status(400).json('Invalid password or email'))
	 	} else {
	 		res.status(400).json('Invalid password or email')
	 	}
	 })
	 .catch(err => res.status(400).json('Wrong user'));
	// if (req.body.email === database.users[1].email && 
	// 	req.body.password === database.users[1].password){
	// 	res.json(database.users[1]) ;
	// } else {
	// 	res.status(400).json('Invalid email or password');
	// }
}

module.exports = {
	logUserIn: logUserIn
}