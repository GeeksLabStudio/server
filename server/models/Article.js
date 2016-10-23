const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
	title: String,
	image: String,
	short_desc: String,
  likes: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }],
  date: {
    type: Date, 
    default: Date.now
  },
  html: String,
	comments: [{
    author: {
    	type: mongoose.Schema.Types.ObjectId, 
    	ref: 'User'
    },
    date: {
    	type: Date, 
    	default: Date.now
    },
    message: String,
    _id : {id:false}
  }]
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;