const Article = require('../../models/Article');
const moment  = require('moment');

module.exports.articles = function(req, res, next) {
	Article.find()
    .lean()
		.then(data => {
      
      data.map((el, i)=>{
        el.likes = el.likes.length;
        el.comments = el.comments.length;
        el.date = moment(el.date).format('MM/DD/YYYY');

        return el;
      })

      res.json({
        status: 'ok',
        data
      })
    })
    .then(null, err => {
      next(err)
    })
}

module.exports.article = function(req, res, next) {
  let _id = req.params.id;

  Article.findById(_id)
    .then(data => {
      res.json({
        status: 'ok',
        data
      })
    })
    .then(null, err => {
      next(err)
    })
}