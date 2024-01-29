const router = require('express').Router();
const { register, login, usersData } = require('../../controller/authentication/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/users' , usersData);

module.exports = router;