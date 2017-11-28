/**
 * @Module model/services
 */
var Q = require('q'),
    request = require('request');
/**
 * @function getData
 * @memberof module:model/services
 * @desc request to a service
 * @inner
 * @param {String} url - service's url
 * @return {Object} promise
 */
var getData = (url) => {
    var deferred = Q.defer()
        params = { 
            url:url, 
            json:true
        };

    request(params, (err, res, body) => {
        if (err) { 
            console.log(err);
            deferred.reject(err); 
        } else{
            deferred.resolve(body);
        }
        
      });

    return deferred.promise;
};

module.exports = {
    getData : getData
}