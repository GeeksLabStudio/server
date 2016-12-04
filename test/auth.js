// module dependencies
const _        = require('lodash');
const chai     = require('chai');
const expect   = chai.expect;
const should   = chai.should();
const request = require('supertest');
const config 	= require('../server/core/config/api');

describe('Auth', () => {
	it('Authentication: correct', done => {
		let credentials = {
			email: 'admin@admin',
			password: 'admin'
		}

		request(config.server)
			.post('/auth/login')
			.send(credentials)
			.expect(200)
			.expect(res => {
				expect(res.body.status).to.equal('ok')
				expect(res.body.data).to.have.all.keys('profile', 'token');
				global.Authorization = res.body.data.token;
			})
			.end(done)
	})

	it('Authentication: incorrect', done => {
		let credentials = {
			email: 'admin15555@1111.ru',
			password: 'admin12'
		}

		request(config.server)
			.post('/auth/login')
			.send(credentials)
			.expect(404)
			.expect(res => {
				expect(res.body.status).to.equal('not found');
				expect(res.body.error.message).to.equal('Incorrect login or password');
			})
			.end(done)
	})

	it('Authentication: profile', done => {
		request(config.server)
			.get('/auth/')
			.set({Authorization})
			.expect(200)
			.expect(res => {
				expect(res.body.status).to.equal('ok');
				expect(res.body.data).to.have.all.keys('profile', '_id', 'email');
			})
			.end(done)
	})

	it('Authentication: profile incorrect', done => {
		request(config.server)
			.get('/auth/')
			.set({Authorization: Authorization + '1'})
			.expect(400)
			.expect(res => {
				expect(res.body.error.message).to.equal('invalid token')
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
			.post('/auth/register')
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
			.post('/auth/register')
			.send(credentials)
			.expect(400)
			.expect(res => {
				expect(res.body.error.message).to.equal('User with same email already exists')
			})
			.end(done)
	})
})