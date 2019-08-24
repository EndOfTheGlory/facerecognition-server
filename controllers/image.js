const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '849b25282bed4182bae60d7b3c05b3f2'
});

// catch gives an error when running the function,can't create safe version of API call(key is shown in Network tab)
const handleApi = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)	
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to fetch'))
}

const getImage = (req,res,db) => {
	const{ id } = req.body;

	db('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0])
	  })
	  .catch(err => res.status(400).json('Error in incrementing the number'))
	// let found = false;
	// database.users.forEach( user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		user.entries++;
	// 		return res.json(user.entries);
	// 	}
	// })
	// if (!found){
	// 	res.status(400).json('No user found');
	// }
}

module.exports = {
	getImage,
	handleApi
}