const { Router } = require("express");
const AdminController = require("./Controller/AdminController");
const TeamController = require("./Controller/TeamController");
const MatchController = require("./Controller/MatchController");
const router = Router();

//Admin
//untuk cek database admin
router.get("/cek", AdminController.Cek);

//untuk Register
router.post("/RegisterAdmin", AdminController.Register);

//untuk Login
router.post("/LoginAdmin", AdminController.Login);

//-------------------------------------------------------------

//Teams
//Untuk cek Teams
router.get("/Teams", TeamController.Teams);

//Untuk detail team
router.get("/teamInfo/:team_code", TeamController.TeamInfo);

//-------------------------------------------------------------

//Untuk Match Tables
//Untuk Upcoming Matches
router.get("/UpcomingMatches", MatchController.UpcomingMatches);

//Untuk Result Matches
router.get("/UpcomingMatches", MatchController.UpcomingMatches);

//Untuk PL Table
router.get("/PremierLeague", MatchController.PremLeagTable);

//-------------------------------------------------------------

module.exports = router;
