// module dependencies
const _        	= require('lodash');
const chai     	= require('chai');
const expect   	= chai.expect;
const should   	= chai.should();
const request 	= require('supertest');
const service 	= require('./service');
const config 		= require('../server/core/config/api');
const api 			= config.auth;

describe('Auth', () => {
	it('Authentication: correct', done => {
		let credentials = {
			email: 'admin@admin',
			password: 'admin'
		}

		request(config.server)
			.post(api.path + api.login.path)
			.send(credentials)
			.expect(200)
			.expect(res => {
				expect(res.body.status).to.equal('ok')
				expect(res.body.data).to.have.all.keys('profile', 'token');
				global.Authorization = res.body.data.token;
				global.profile = res.body.data.profile;
			})
			.end(done)
	})

	it('Authentication: incorrect', done => {
		let credentials = {
			email: 'admin15555@1111.ru',
			password: 'admin12'
		}

		request(config.server)
			.post(api.path + api.login.path)
			.send(credentials)
			.expect(404)
			.expect(res => {
				expect(res.body.status).to.equal('not found');
				expect(res.body.error.message).to.equal('Incorrect login or password');
			})
			.end(done)
	})

	it('Authentication: profile', done => {
		let code = service.expectedCode(api.path + api.profile.permissions, profile);

		request(config.server)
			.get(api.path + api.profile.path)
			.set({Authorization})
			.expect(code)
			.expect(res => {
				if (code == 200)
					expect(res.body.data).to.have.all.keys('profile', '_id', 'email');
			})
			.end(done)
	})

	it('Authentication: profile incorrect token', done => {
		request(config.server)
			.get('/auth/')
			.set({Authorization: Authorization + '1'})
			.expect(400)
			.expect(res => {
				expect(res.body.error.message).to.equal('invalid token')
			})
			.end(done)
	})

	it('Authentication: profile without token', done => {
		request(config.server)
			.get(api.path + api.profile.path)
			.expect(400)
			.expect(res => {
				expect(res.body.error.message).to.equal('No token provided')
			})
			.end(done)
	})

	it('Authentication: register', done => {
		let number = Math.round(Math.random() * 10000);
		let email = `${(number + new Date().getTime()).toString()}@mail.ru`;

		let credentials = {
			email,
			password: number
		}

		request(config.server)
			.post(api.path + api.register.path)
			.send(credentials)
			.expect(200)
			.expect(res => {
				expect(res.body.status).to.equal('ok')
				expect(res.body.data).to.have.all.keys('profile', 'token');
			})
			.end(done)
	})

	it('Authentication: register incorrect (email exists)', done => {
		let credentials = {
			email: 'admin@admin',
			password: 'admin'
		}


		request(config.server)
			.post(api.path + api.register.path)
			.send(credentials)
			.expect(400)
			.expect(res => {
				expect(res.body.error.message).to.equal('User with same email already exists')
			})
			.end(done)
	})
})