const { Router } = require('express');
const AdminController = require('./Controller/AdminController');
const TeamController = require('./Controller/TeamController');
const router = Router();


//Admin
//untuk cek database
router.get('/cek', AdminController.Cek);

//untuk Register
router.post('/RegisterAdmin', AdminController.Register);

//untuk Login
router.post('/LoginAdmin', AdminController.Login);

router.get("/teams", TeamController.Teams);

module.exports = router;