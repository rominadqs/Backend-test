/**
 * @module routers/clients
 * @requires express
 */

const express = require('express'),
      router = express.Router();
      clientsController = require('../controller/clientsController');

/**
 * @desc Get user data filtered	by user id or user name
 * @name get/client
 * @function
 * @memberof module:routers/clients
 * @inner
 * @param {string} userId 
 * @param {string} userName 
 * @return {Object} userData
 */
router.route('/client').get((req, res) => {
    var roles = ['user', 'admin'];
    if(req.query.userId){
        clientsController.getClientsById(req.query.userId).then((userData) =>{
            if (roles.indexOf(userData.role) >= 0){
               res.status(200).json(userData) 
            } else {
                res.status(203).json({'status': 'ko', 'code': '4', 'message': 'no authorize'})
            }
            
        }).fail((e) => {
            res.status(400).json({'status': 'ko', 'code': '1', 'message': e});
        })
    } else if (req.query.userName){
        clientsController.getClientsByName(req.query.userName).then((userData) =>{
            if (roles.indexOf(userData.role) >= 0){
                res.status(200).json(userData) 
             } else {
                 res.status(203).json({'status': 'ko', 'code': '4', 'message': 'no authorize'})
             }
        }).fail((e) => {
            res.status(400).json({'status': 'ko', 'code': '2', 'message': e});
        })
    } else{
        res.status(400).json({'status': 'ko', 'code': '0', 'message': 'Missing params'});
    }
});

 /**
 * @desc Get user data filtered	by policy number
 * @name get/user
 * @function
 * @memberof module:routers/clients
 * @inner
 * @param {string} policyNumber 
 * @return {Object} userData
 */
router.route('/user').get((req, res) => {
    var roles = ['admin'];
    if (req.query.policyNumber){
        clientsController.getUserBypolicy(req.query.policyNumber).then((userData) =>{
            if (roles.indexOf(userData.role) >= 0){
                res.status(200).json(userData) 
             } else {
                 res.status(203).json({'status': 'ko', 'code': '4', 'message': 'no authorize'})
             }
        }).fail((e) => {
            res.status(400).json({'status': 'ko', 'code': '1', 'message': e});
        })
    } else{
        res.status(400).json({'status': 'ko', 'code': '0', 'message': 'Missing params'});
    }
})

module.exports = router;