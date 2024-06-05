--sql queries to create the database

--enum
CREATE TYPE status AS ENUM ('Upcoming', 'Ongoing', 'Completed');
CREATE TYPE role AS ENUM ('Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Substitute', 'Centre-Back', 'Left-Back', 'Right-Back', 'Defensive Midfield', 'Left Midfield', 'Right Midfield', 'Central Midfield', 'Attacking Midfield', 'Left Winger', 'Right Winger', 'Centre-Forward');

--sudah diinput

CREATE TABLE admin (    
    id serial PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    pass char(64) NOT NULL
);

CREATE TABLE teams (
    team_code varchar(3) PRIMARY KEY,
    team_name text UNIQUE NOT NULL
);

CREATE TABLE team_info (
    team_code varchar(3) REFERENCES teams,
    member_name text UNIQUE NOT NULL,
    member_code varchar(6) PRIMARY KEY,
    member_role role NOT NULL
);

CREATE TABLE tournaments (
    tournament_code varchar(3) PRIMARY KEY,
    tournament_name text UNIQUE NOT NULL,
    tournament_status status NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL
);

CREATE TABLE match_info (
    match_code varchar(6) PRIMARY KEY,
    tournament_code varchar(3) REFERENCES tournaments(tournament_code),
    team_1_code varchar(3) REFERENCES teams(team_code),
    team_2_code varchar(3) REFERENCES teams(team_code),
    match_date date NOT NULL,
    match_status varchar(20) NOT NULL,
    team_1_score int NULL,
    team_2_score int NULL,
    match_winner varchar(3) REFERENCES teams(team_code),
    possession_avg_1 float NULL,
    possession_avg_2 float NULL,
    shots_1 int NULL,
    shots_2 int NULL,
    shots_on_goal_1 int NULL,
    shots_on_goal_2 int NULL,
    passing_acc_1 float NULL,
    passing_acc_2 float NULL,
    fouls_1 int NULL,
    fouls_2 int NULL
);


--==================================================================================================
--Catatan--

CREATE TABLE admin (    
    id serial PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    pass char(64) NOT NULL
);

--==================================================================================================

CREATE TABLE teams (
    team_code varchar(3) PRIMARY KEY,
    team_name text UNIQUE NOT NULL
);

--==================================================================================================

INSERT INTO teams (team_code, team_name)
VALUES
('MCI', 'Manchester City'),
('ARS', 'Arsenal'),
('LIV', 'Liverpool'),
('AVL', 'Aston Villa'),
('TOT', 'Tottenham Hotspur'),
('CHE', 'Chelsea'),
('NEW', 'Newcastle United'),
('MUN', 'Manchester United'),
('WHU', 'West Ham United'),
('CRY', 'Crystal Palace'),
('BRI', 'Brighton & Hove Albion'),
('BOU', 'AFC Bournemouth'),
('FUL', 'Fulham'),
('WOL', 'Wolverhampton Wanderers'),
('EVE', 'Everton'),
('BRE', 'Brentford'),
('NOT', 'Nottingham Forest'),
('LUT', 'Luton Town'),
('BUR', 'Burnley'),
('SHU', 'Sheffield United');


CREATE TABLE team_info (
    team_code varchar(3) REFERENCES teams,
    member_name text UNIQUE NOT NULL,
    member_code varchar(6) PRIMARY KEY,
    member_role role NOT NULL
);

--==================================================================================================

CREATE TABLE tournaments (
    tournament_code varchar(3) PRIMARY KEY,
    tournament_name text UNIQUE NOT NULL,
    tournament_status status NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL
);

--Referensinya tanggal 28 Desember 2024, 28-12-2023
INSERT INTO tournaments (tournament_code, tournament_name, tournament_status, start_date, end_date) VALUES
('PL', 'Premier League 2024/2025', 'Ongoing', '2023-08-10', '2024-05-18'),
('FAC', 'FA Cup 2024/2025', 'Upcoming', '2024-01-06', '2024-05-25'),
('EFL', 'EFL Cup (Carabao Cup) 2024/2025', 'Ongoing', '2023-08-13', '2024-02-24'),
('CS', 'Community Shield 2024', 'Completed', '2023-08-04', '2023-08-04'),
('UCL', 'UEFA Champions League 2024/2025', 'Ongoing', '2023-09-17', '2024-05-31');

--==================================================================================================

CREATE TABLE match_info (
    match_code varchar(6) PRIMARY KEY,
    tournament_code varchar(3) REFERENCES tournaments(tournament_code),
    team_1_code varchar(3) REFERENCES teams(team_code),
    team_2_code varchar(3) REFERENCES teams(team_code),
    match_date date NOT NULL,
    match_status varchar(20) NOT NULL,
    team_1_score int NULL,
    team_2_score int NULL,
    match_winner varchar(3) REFERENCES teams(team_code),
    possession_avg_1 float NULL,
    possession_avg_2 float NULL,
    shots_1 int NULL,
    shots_2 int NULL,
    shots_on_goal_1 int NULL,
    shots_on_goal_2 int NULL,
    passing_acc_1 float NULL,
    passing_acc_2 float NULL,
    fouls_1 int NULL,
    fouls_2 int NULL
);

--Referensinya tanggal 28 Desember 2024, 28-12-2023
INSERT INTO match_info (
    match_code, tournament_code, team_1_code, team_2_code, match_date, match_status, 
    team_1_score, team_2_score, match_winner, possession_avg_1, possession_avg_2, 
    shots_1, shots_2, shots_on_goal_1, shots_on_goal_2, passing_acc_1, passing_acc_2, 
    fouls_1, fouls_2
) VALUES
--Matches for Premier League 2024/2025
('PL001', 'PL', 'LUT', 'CHE', '2023-12-30', 'Completed', 1, 2, 'CHE', 55.4, 44.6, 14, 8, 6, 3, 85.3, 78.1, 10, 12), 
('PL002', 'PL', 'ARS', 'LIV', '2023-12-31', 'Completed', 1, 1, NULL, 51.2, 48.8, 11, 12, 5, 5, 83.4, 80.2, 8, 9), 
('PL003', 'PL', 'MCI', 'TOT', '2024-01-03', 'Upcoming', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),


-- Matches for FA Cup 2024/2025 (All Upcoming)
('FAC001', 'FAC', 'AVL', 'CRY', '2024-01-06', 'Upcoming', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('FAC002', 'FAC', 'EVE', 'WOL', '2024-01-07', 'Upcoming', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('FAC003', 'FAC', 'WHU', 'FUL', '2024-01-08', 'Upcoming', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),

-- Matches for EFL Cup (Carabao Cup) 2024/2025
('EFL001', 'EFL', 'NEW', 'AVL', '2023-12-15', 'Completed', 2, 2, NULL, 52.3, 47.7, 13, 10, 6, 4, 81.5, 79.3, 9, 10),
('EFL002', 'EFL', 'CRY', 'WOL', '2023-12-20', 'Completed', 1, 3, 'WOL', 48.2, 51.8, 9, 14, 3, 7, 77.4, 83.1, 12, 8),
('EFL003', 'EFL', 'BUR', 'BRE', '2023-12-25', 'Completed', 0, 1, 'BRE', 49.5, 50.5, 10, 11, 4, 5, 82.2, 80.7, 11, 13),

-- Matches for Community Shield 2024
('CS001', 'CS', 'MCI', 'MUN', '2023-08-04', 'Completed', 2, 1, 'MCI', 47.8, 52.2, 12, 13, 4, 6, 80.3, 82.1, 10, 9),

-- Matches for UEFA Champions League 2024/2025
('UCL001', 'UCL', 'MCI', 'MUN', '2023-09-17', 'Completed', 2, 2, NULL, 53.4, 46.6, 15, 14, 7, 6, 86.2, 82.7, 12, 11),
('UCL002', 'UCL', 'CHE', 'ARS', '2023-09-18', 'Completed', 1, 3, 'ARS', 57.1, 42.9, 18, 10, 9, 4, 88.3, 80.1, 14, 13);

--==================================================================================================

--Tabel premier league
CREATE TABLE premier_league (
    position int PRIMARY KEY,
    team_code varchar(3) REFERENCES teams(team_code),
    name text NULL,
    matches_played int NULL,
    wins int NULL,
    draws int NULL,
    losses int NULL,
    points int NULL
);


INSERT INTO premier_league (position, team_code, name, matches_played, wins, draws, losses, points) VALUES
(1, 'LIV', 'Liverpool', 20, 14, 3, 3, 45),
(2, 'AVL', 'Aston Villa', 20, 13, 3, 4, 42),
(3, 'MCI', 'Manchester City', 19, 12, 4, 3, 40),
(4, 'ARS', 'Arsenal', 20, 12, 4, 4, 40),
(5, 'TOT', 'Tottenham Hotspur', 20, 12, 3, 5, 39),
(6, 'WHU', 'West Ham United', 19, 10, 3, 6, 33),
(7, 'MUN', 'Manchester United', 20, 9, 4, 7, 31),
(8, 'BRI', 'Brighton & Hove Albion', 19, 9, 3, 7, 30),
(9, 'NEW', 'Newcastle United', 20, 8, 5, 7, 29),
(10, 'WOL', 'Wolverhampton Wanderers', 20, 8, 4, 8, 28),
(11, 'CHE', 'Chelsea', 20, 8, 4, 8, 28),
(12, 'BOU', 'AFC Bournemouth', 19, 7, 4, 8, 25),
(13, 'FUL', 'Fulham', 20, 7, 3, 10, 24),
(14, 'CRY', 'Crystal Palace', 20, 5, 6, 9, 21),
(15, 'NOT', 'Nottingham Forest', 20, 5, 5, 10, 20),
(16, 'BRE', 'Brentford', 19, 4, 7, 8, 19),
(17, 'EVE', 'Everton', 20, 4, 4, 12, 16),
(18, 'LUT', 'Luton Town', 19, 4, 3, 12, 15),
(19, 'BUR', 'Burnley', 20, 3, 2, 15, 11),
(20, 'SHU', 'Sheffield United', 20, 2, 3, 15, 9);

-- Menampilkan isi tabel admin
SELECT * FROM admin;

-- Menampilkan isi tabel teams
SELECT * FROM teams;

-- Menampilkan isi tabel team_info
SELECT * FROM team_info;

-- Menampilkan isi tabel tournaments
SELECT * FROM tournaments;

-- Menampilkan isi tabel match_info
SELECT * FROM match_info;

-- Menampilkan isi tabel premier_league
SELECT * FROM premier_league;




