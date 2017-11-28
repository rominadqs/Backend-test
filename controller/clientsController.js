/**
 * @Module controller/clients
 */

const Q = require('q'),
      service = require('../model/servicesModel'),
      policy = require('../controller/policyController');

const urlService = 'http://www.mocky.io/v2/5808862710000087232b75ac';

 /**
 * @desc Get user data filtered	by user id
 * @name getClientsById
 * @function
 * @memberof module:controller/clients
 * @inner
 * @param {string} userId 
 * @return {Object} userData
 */
var getClientsById = (userId) => {
    var deferred = Q.defer();
        
    service.getData(urlService).then((data) => {
            var clientsList = data.clients,
                client;
            for(var i = 0; i < clientsList.length; i ++){
                if(clientsList[i].id == userId){
                    client = clientsList[i];
                    break;
                }
            }
            deferred.resolve(client);
    }).fail((e) => {
        deferred.reject(e);
    });
        
    return deferred.promise;
};
 
/**
 * @desc Get user data filtered	by user	name
 * @name getClientsByName
 * @function
 * @memberof module:controller/clients
 * @inner
 * @param {string} userName 
 * @return {Object} userData
 */
var getClientsByName = (userName) => {
    var deferred = Q.defer();
        
    service.getData(urlService).then((data) => {
        var clientsList = data.clients,
            client;

        for(var i = 0; i < clientsList.length; i ++){
            if(clientsList[i].name == userName){
                client = clientsList[i];
                break;
            }
        }

        deferred.resolve(client);
    }).fail((e) => {
        deferred.reject(e);
    });
        
    return deferred.promise;
};

/**
 * @desc Get user data filtered	by policy
 * @name getUserBypolicy
 * @function
 * @memberof module:controller/clients
 * @inner
 * @param {string} policyId 
 * @return {Object} userData
 */
var getUserBypolicy = (policyId) => {
    var deferred = Q.defer();
            
    policy.getPolicy(policyId).then((policy) => {
        getClientsById(policy.clientId).then((userData) => {
            deferred.resolve(userData);
        }).fail((e) => {
            deferred.reject(e);
        });        
    }).fail((e) => {
        deferred.reject(e);
    });
        
    return deferred.promise;
};	
        
module.exports = {
    getClientsById : getClientsById,
    getClientsByName : getClientsByName,
    getUserBypolicy : getUserBypolicy
}        