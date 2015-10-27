var express = require('express');
var router = express.Router();

var monk = require('monk');  // an alternative of Monk is Mongoose
var db = monk('localhost:27017/vidzy');

// Display a list of videos
router.get('/', function(req, res) {
	// remember the 'videos' collection we created in robomongo?
	var collection = db.get('videos'); 
	collection.find({}, function(err, videos) {
		if (err) throw err;
		res.json(videos);
	});
});

// Add a new video
router.post('/', function(req, res){
	var collection = db.get('videos');
	collection.insert({
		title: req.body.title,
		description: req.body.description
	}, function(err, video){
		if (err) throw err;

		res.json(video);
	});
});

// Find one particular video
router.get('/:id', function(req, res) {
	var collection = db.get('videos');
	collection.findOne({ _id: req.params.id }, function(err, video){
		if (err) throw err;
		res.json(video);
	});
});

// Edit one particular video
router.put('/:id', function(req, res){
	var collection = db.get('videos');
	collection.update({
		_id: req.params.id
	},
	{
		title: req.body.title,
		description: req.body.description
	}, function(err, video){
		if (err) throw err;
		res.json(video);
	});
});

// Delete one particular video
router.delete('/:id', function(req, res){
	var collection = db.get('videos');
	collection.remove({ _id: req.params.id }, function(err, video){
		if (err) throw err;
		res.json(video);
	});
});

module.exports = router;