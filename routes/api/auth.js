const express = require('express');
const router = express.Router();
const { register, login, deleteuser } = require('../../controllers/auth');
const auth = require('../../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.delete('/delete', auth, deleteuser);

module.exports = router;
