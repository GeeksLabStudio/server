const Article = require('../../models/Article');

module.exports.articles = function(req, res, next) {
	Article.find()
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