module.exports = {
	login: {
		path: '/login'
	},
	register: {
		path: '/register'
	},
	user: {
		profile: {
			path: '/',
			permissions: [
				'USER'
			]
		}
	}
}