/**
 * @module routers/policies
 * @requires express
 */

const express = require('express'),
      router = express.Router(),
      policyController = require('../controller/policyController');

/**
 * @desc Get user data filtered	by user id or user name
 * @name get/policies
 * @function
 * @memberof module:routers/policies
 * @inner
 * @param {string} userName 
 * @return {Object} policies
 */      
router.route('/policies').get((req, res) => {
    if(req.query.userName){
        policyController.getPoliciesByName(req.query.userName).then((userData) =>{
            res.status(200).json(userData)
        }).fail((e) => {
            res.status(400).json({'status': 'ko', 'code': '1', 'message': e});
        })
    } else{
        res.status(400).json({'status': 'ko', 'code': '0', 'message': 'Missing params'});
    }
});

module.exports = router;