const express = require('express');
const router = express.Router();
const {
  register,
  login,
  deleteuser,
  getLoggedUser,
} = require('../../controllers/auth');
const auth = require('../../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/getme', auth, getLoggedUser);
router.delete('/delete', auth, deleteuser);

module.exports = router;
