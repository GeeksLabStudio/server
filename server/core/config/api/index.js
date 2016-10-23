module.exports = {
	auth: {
		login: {
			path: '/login'
		},
		register: {
			path: '/register'
		},
		profile: {
			path: '/',
			permissions: [
				'USER',
				'ADMIN'
			]
		}
	},
	articles: {
		path: '/',
		children: {
			article: {
				path: '/:id',
			}
		}
	}
}