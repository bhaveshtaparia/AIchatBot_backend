// Import necessary libraries
const express = require('express');
const csvtojson = require('csvtojson');
const Doubt = require('../../model/DoubtAssistantModel');
const { auth } = require('../../middleware/auth');
const {authorizeRole}=require('../../middleware/role');
const { addDoubt } = require('./doubtAssistanceFunction');
const router=express.Router();
router.route('/doubt').post(auth,addDoubt);
module.exports = router;
