const express = require('express');
const router = express.Router();
const lensesControllers = require('../../controllers/lensesControllers');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get( verifyRoles(ROLES_LIST[0]) , lensesControllers.getAllLenses)
    .post(verifyRoles(ROLES_LIST[0]) , lensesControllers.createNewLens)
    .put( verifyRoles(ROLES_LIST[0]),  lensesControllers.updateLens)
    .delete(verifyRoles(ROLES_LIST[0]) ,lensesControllers.deleteLens);

router.route('/:id')
    .get(lensesControllers.getLens);

module.exports = router;