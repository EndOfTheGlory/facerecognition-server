const getInfo = (req,res,db) =>{
	const{ id } = req.params;
	
	db.select('*').from ('users').where({id})
	 .then(user => {
	 	if (user.length) {
	 		res.json(user[0])
	 	} else {
	 		res.status(400).json('Error in accesing profile')
	 	}
	 })
	 .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	getInfo
}


// (req,res) =>{
// 	const{ id } = req.params;	
// 	let found = false;
// 	database.users.forEach( user => {
// 		if (user.id === id) {
// 			found = true;
// 			return res.json(user);
// 		}
// 	})
// 	if (!found){
// 		res.status(400).json('No user found');
// 	}
// }