const express = require('express');
const router = express.Router();
const lensesControllers = require('../../controllers/lensesControllers');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(lensesControllers.getAllLenses)
   
router.route('/:id')
    .get(lensesControllers.getLens);

module.exports = router;