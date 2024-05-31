const { Router } = require('express');
const AdminController = require('./Controller/AdminController');

const router = Router();


//Admin
//untuk cek database
router.get('/cek', AdminController.Cek);

//untuk Register
router.post('/RegisterAdmin', AdminController.Register);

//untuk Login
router.post('/LoginAdmin', AdminController.Login);


module.exports = router;