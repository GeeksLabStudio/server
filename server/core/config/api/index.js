module.exports = {
	server: 'localhost:' + 4000,
	auth: {
		path: '/auth',
		login: {
			path: '/login'
		},
		register: {
			path: '/register'
		},
		profile: {
			path: '/',
			permissions: [
				'ADMIN',
				'USER'
			]
		}
	}
}