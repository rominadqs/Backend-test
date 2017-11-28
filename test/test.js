var request = require('supertest'), 
    mocha = require('mocha'),
    rewire = require('rewire'), 
    expect = require('chai').expect, 
    Q = require('q'),
    app = require('../app'), //Require app
    http = require('http');

var httpServer = http.createServer(app).listen(4200);

/*var mssql = rewire('../model/mssql.js'),
    sqlController = rewire('../controller/sqlConnection.js');*/

var app = require('../app'), //Require app
    http = require('http');


describe('GET /client', function(){
    it('user data filtered by user id', function(done){
        request(httpServer)
            .get('/client')
            .query({ userId: 'test' })
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
            .query({ userName: 'test' })
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

/*
describe('mssql suite', function(){
    
        before('test',function(done){
        mssql.init();
            done();
        });
    
        describe('queries and procedures', function(){
            it('getUserTypesAndName', function(done){
                mssql.__get__("getUserTypesAndName")().then(function(response){
                    expect(response).to.be.an("array");
                    expect(response).to.have.length.above(0);
                    expect(response[0].IdUserType).to.equal(user.idUserType);
                    done();
                }).fail(function (e)
                {
                    done(new Error(e));
                })
            });
            it('getLoginStatus', function(done){
                mssql.__get__("getLoginStatus")().then(function(response){
                    expect(response).to.be.an("array");
                    expect(response).to.have.length.above(0);
                    done();
                }).fail(function (e)
                {
                    done(new Error(e));
                })
            });
            it('getLoginTypes', function(done){
                mssql.__get__("getLoginTypes")().then(function(response){
                    expect(response).to.be.an("array");
                    expect(response).to.have.length.above(0);
                    done();
                }).fail(function (e)
                {
                    done(new Error(e));
                })
            });
            it('checkUser', function(done){
                var md5 = crypto.createHash('md5');
                md5.update(user.password);
                mssql.checkUser(user.email,md5.digest('hex')).then(function(response){
                    expect(response).to.be.an("object");
                    expect(response.IdUser).to.equal(user.userId);
                    //expect(response.IdUserType).to.equal(user.idUserType);
    
                    done();
                }).fail(function (e)
                {
                    done(new Error(e));
                })
            });
            it('set forgot Info',function (done){
                sqlController.setForgotInfo(user.email).then(function(response){
                    done();
                }).fail(function (e) {
                    done(new Error(e));
                });
            });
    
            it('get user by Email', function (done) {
                mssql.getUserInfoByEmail(user.email).then(function(response){
                    expect(response).to.be.an("array");
                    user.token = response[0].ForgotPasswordURL;
                    done();
                }).fail(function (e)
                {
                    done(new Error(e));
                })
            });
    
            it('isAgent', function(done){
    
                mssql.__get__("isAgent")(user.userId).then(function(response){
                    expect(response).to.be.an("array");
                    expect(response[0].IdUser).to.equal(user.userId);
                    done();
                }).fail(function (e)
                {
                    done(new Error(e));
                })
            });
    
            it('Not ip in Customer WhiteList', function(done){
                sqlController.isCustomerValidIp(customersWhiteList,"127.0.0.2").then(function(isValid){
                    if(isValid){
                        done(new Error("Ip is in all the customers"))
                    }else{
                        done();
                    }
                }).fail(function (e)
                {
                    done(new Error(e));
                });
    
            });
    
            it('get user policy', function (done) {
                mssql.getUserPassValidation(user.userId).then(function(response){
                    expect(response).to.be.an("array");
                    done();
                }).fail(function (e)
                {
                    done(new Error(e));
                })
            });
    
            it.skip('save password', function (done) {
                var md5 = crypto.createHash('md5');
                md5.update(user.password);
                mssql.updateUserPassword(user.userId,md5.digest('hex'), 6, 0).then(function(){
                    done();
                }).fail(function (e)
                {
                    done(new Error(e));
                });
            });
    
        });
    
    });

*/