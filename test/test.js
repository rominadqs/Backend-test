var request = require('supertest'), 
    mocha = require('mocha'),
    rewire = require('rewire'), 
    expect = require('chai').expect, 
    Q = require('q'),
    app = require('../app'), //Require app
    http = require('http');

var httpServer = http.createServer(app).listen(4200);

var app = require('../app'), //Require app
    http = require('http');


describe('GET /client', function(){
    it('user data filtered by user id', function(done){
        request(httpServer)
            .get('/client')
            .query({ userId: 'a0ece5db-cd14-4f21-812f-966633e7be86' })
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    }); 
    it('user data filtered by name', function(done){
        request(httpServer)
            .get('/client')
            .query({ userName: 'Britney' })
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });       
    it('400 with not parameters', function(done){
        request(httpServer)
            .get('/client')
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });  
});

describe('GET /policies', function(){
    it('list of policies linked	to a user name', function(done){
        request(httpServer)
            .get('/policies')
            .query({ userName: 'Britney' })
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });       
    it('400 with not parameters', function(done){
        request(httpServer)
            .get('/policies')
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });  
});