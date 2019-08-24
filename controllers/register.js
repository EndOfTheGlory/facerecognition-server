const createUser = (db, bcrypt) => (req, res) => {
	const { email,nickname,password } = req.body;
	const hash = bcrypt.hashSync(password);
	if (!email || !nickname || !password ){
		return res.status(400).json('One or more blanks ')
	}
	//When we tested we pushed objects in the array
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email,
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				nickname: nickname,
				joined: new Date()
			}).then(user => {
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => {res.status(400).json('Whoops!There is an error!Can\'t register')}
		)
	// res.json(database.users[database.users.length - 1])

}

module.exports = {
	createUser: createUser
}