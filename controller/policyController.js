/**
 * @Module controller/policy
 */
const Q = require('q'),
      service = require('../model/servicesModel');

const urlService = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';

/**
 * @desc Get policy by id
 * @name getPolicy
 * @function
 * @memberof module:controller/policy
 * @inner
 * @param {string} policyId 
 * @return {Object} policy
 */
var getPolicy = (policyId) => {
    var deferred = Q.defer();

    service.getData(urlService).then((data) => {
        var policiesList = data.policies,
            policy;

        for(var i = 0; i < policiesList.length; i ++){
            if(policiesList[i].id == policyId){
                policy = policiesList[i];
                break
            }
        }

        deferred.resolve(policy);
    }).fail((e) =>{
        deferred.reject(e);
    });

    return deferred.promise;
};

/**
 * @desc Get policy by user name
 * @name getPoliciesByName
 * @function
 * @memberof module:controller/policy
 * @inner
 * @param {string} policyId 
 * @return {Object} policies
 */
var getPoliciesByName = (userName) => {
    var deferred = Q.defer();
    
    clientsController.getClientsByName(userName).then((client) => {
        var role = client.role;
        service.getData(urlService).then((data) => {
            var policiesList = data.policies,
                policies = [];

            for(var i = 0; i < policiesList.length; i ++){
                if(policiesList[i].clientId == client.id){
                    policies.push(policiesList[i]);
                }
            }

            deferred.resolve({'policies': policies, 'role': role});
        }).fail((e) =>{
            deferred.reject(e);
        });
    }).fail((e) => {
        deferred.reject(e);
    });
    
    return deferred.promise;
};
  
module.exports = {
    getPolicy : getPolicy,
    getPoliciesByName : getPoliciesByName
}        