const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/registerController');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(registerController.handleNewUser)



module.exports = router;