module.exports = {
	server: 'localhost:' + 4000,
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
	}
}