const { Router } = require('express');
const AdminController = require('./Controller/AdminController');
const TeamController = require('./Controller/TeamController');
const MatchController = require('./Controller/MatchController');
const router = Router();


//Admin
//untuk cek database admin
router.get('/cek', AdminController.Cek);

//untuk Register
router.post('/RegisterAdmin', AdminController.Register);

//untuk Login
router.post('/LoginAdmin', AdminController.Login);

//-------------------------------------------------------------

//Teams
//Untuk cek Teams
router.get("/Teams", TeamController.Teams);

//Untuk Insert Team
router.post("/InsertTeam", TeamController.InsertTeam);

//Untuk Delete Team
router.delete("/DeleteTeam", TeamController.DeleteTeam);

//Untuk table Matches
//Untuk Upcoming Matches
router.get("/UpcomingMatches", MatchController.UpcomingMatches);


module.exports = router;

