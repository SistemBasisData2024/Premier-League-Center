--sql queries to create the database

--enum
CREATE TYPE status AS ENUM ('Upcoming', 'Ongoing', 'Completed');
CREATE TYPE role AS ENUM (
    'Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Substitute', 
    'Centre-Back', 'Left-Back', 'Right-Back', 'Defensive Midfield', 'Left Midfield', 'Right Midfield', 
    'Central Midfield', 'Attacking Midfield', 'Left Winger', 'Right Winger', 'Centre-Forward'
);

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
    team_code varchar(3) REFERENCES teams(team_code),
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

-- Insert Club Detail
INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('MCI', '31', 'Ederson Ederson', 'Goalkeeper'),
('MCI', '18', 'Stefan Ortega', 'Goalkeeper'),
('MCI', '33', 'Scott Carson', 'Goalkeeper'),
('MCI', '3', 'Ruben Dias', 'Centre-Back'),
('MCI', '25', 'Manuel Akanji', 'Centre-Back'),
('MCI', '6', 'Nathan Ake', 'Centre-Back'),
('MCI', '5', 'John Stones', 'Centre-Back'),
('MCI', '24', 'Josko Gvardiol', 'Left-Back'),
('MCI', '21', 'Sergio Gomez', 'Left-Back'),
('MCI', '82', 'Rico Lewis', 'Right-Back'),
('MCI', '2', 'Kyle Walker', 'Right-Back'),
('MCI', '16', 'Rodri', 'Defensive Midfield'),
('MCI', '27', 'Matheus Nunes', 'Central Midfield'),
('MCI', '8', 'Mateo Kovacic', 'Central Midfield'),
('MCI', '20', 'Bernardo Silva', 'Attacking Midfield'),
('MCI', '17', 'Kevin De Bruyne', 'Attacking Midfield'),
('MCI', '10', 'Jack Grealish', 'Left Winger'),
('MCI', '11', 'Jeremy Doku', 'Left Winger'),
('MCI', '47', 'Phil Foden', 'Right Winger'),
('MCI', '52', 'Oscar Bobb', 'Right Winger'),
('MCI', '9', 'Erling Haaland', 'Centre-Forward'),
('MCI', '19', 'Julian Alvarez', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('ARS', '1', 'David Raya', 'Goalkeeper'),
('ARS', '31', 'Aaron Ramsdale', 'Goalkeeper'),
('ARS', '2', 'Karl Hein', 'Goalkeeper'),
('ARS', '6', 'William Saliba', 'Centre-Back'),
('ARS', '12', 'Gabriel Magalhães', 'Centre-Back'),
('ARS', '35', 'Jurrien Timber', 'Centre-Back'),
('ARS', '15', 'Oleksandr Zinchenko', 'Left-Back'),
('ARS', '4', 'Jakub Kiwior', 'Left-Back'),
('ARS', '18', 'Ben White', 'Right-Back'),
('ARS', '17', 'Takehiro Tomiyasu', 'Right-Back'),
('ARS', '41', 'Cedric Soares', 'Right-Back'),
('ARS', '5', 'Declan Rice', 'Defensive Midfield'),
('ARS', '20', 'Thomas Partey', 'Defensive Midfield'),
('ARS', '25', 'Jorginho', 'Defensive Midfield'),
('ARS', '8', 'Mohamed Elneny', 'Defensive Midfield'),
('ARS', '29', 'Martin Odegaard', 'Attacking Midfield'),
('ARS', '10', 'Kai Havertz', 'Attacking Midfield'),
('ARS', '21', 'Emile Smith Rowe', 'Attacking Midfield'),
('ARS', '11', 'Fabio Vieira', 'Attacking Midfield'),
('ARS', '19', 'Gabriel Martinelli', 'Left Winger'),
('ARS', '7', 'Leandro Trossard', 'Left Winger'),
('ARS', '24', 'Bukayo Saka', 'Right Winger'),
('ARS', '9', 'Reiss Nelson', 'Right Winger'),
('ARS', '14', 'Gabriel Jesus', 'Centre-Forward'),
('ARS', '30', 'Eddie Nketiah', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('LIV', '1', 'Alisson Alisson', 'Goalkeeper'),
('LIV', '62', 'Caoimhin Kelleher', 'Goalkeeper'),
('LIV', '13', 'Adrian Adrian', 'Goalkeeper'),
('LIV', '5', 'Ibrahima Konate', 'Centre-Back'),
('LIV', '4', 'Virgil van Dijk', 'Centre-Back'),
('LIV', '2', 'Joe Gomez', 'Centre-Back'),
('LIV', '78', 'Jarell Quansah', 'Centre-Back'),
('LIV', '32', 'Joel Matip', 'Centre-Back'),
('LIV', '46', 'Rhys Williams', 'Centre-Back'),
('LIV', '26', 'Andrew Robertson', 'Left-Back'),
('LIV', '21', 'Konstantinos Tsimikas', 'Left-Back'),
('LIV', '66', 'Trent Alexander-Arnold', 'Right-Back'),
('LIV', '84', 'Conor Bradley', 'Right-Back'),
('LIV', '3', 'Wataru Endo', 'Defensive Midfield'),
('LIV', '43', 'Stefan Bajcetic', 'Defensive Midfield'),
('LIV', '8', 'Dominik Szoboszlai', 'Central Midfield'),
('LIV', '10', 'Alexis Mac Allister', 'Central Midfield'),
('LIV', '17', 'Curtis Jones', 'Central Midfield'),
('LIV', '38', 'Ryan Gravenberch', 'Central Midfield'),
('LIV', '6', 'Thiago', 'Central Midfield'),
('LIV', '42', 'Bobby Clark', 'Central Midfield'),
('LIV', '19', 'Harvey Elliott', 'Attacking Midfield'),
('LIV', '7', 'Luis Diaz', 'Left Winger'),
('LIV', '18', 'Cody Gakpo', 'Left Winger'),
('LIV', '20', 'Diogo Jota', 'Left Winger'),
('LIV', '11', 'Mohamed Salah', 'Right Winger'),
('LIV', '50', 'Ben Doak', 'Right Winger'),
('LIV', '9', 'Darwin Nunez', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('TOT', '13', 'Guglielmo Vicario', 'Goalkeeper'),
('TOT', '20', 'Fraser Forster', 'Goalkeeper'),
('TOT', '40', 'Brandon Austin', 'Goalkeeper'),
('TOT', '41', 'Alfie Whiteman', 'Goalkeeper'),
('TOT', '17', 'Cristian Romero', 'Centre-Back'),
('TOT', '37', 'Micky van de Ven', 'Centre-Back'),
('TOT', '6', 'Radu Dragusin', 'Centre-Back'),
('TOT', '0', 'Joe Rodon', 'Centre-Back'),
('TOT', '0', 'Ashley Phillips', 'Centre-Back'),
('TOT', '0', 'Japhet Tanganga', 'Centre-Back'),
('TOT', '38', 'Destiny Udogie', 'Left-Back'),
('TOT', '0', 'Sergio Reguilon', 'Left-Back'),
('TOT', '33', 'Ben Davies', 'Left-Back'),
('TOT', '23', 'Pedro Porro', 'Right-Back'),
('TOT', '12', 'Emerson Royal', 'Right-Back'),
('TOT', '8', 'Yves Bissouma', 'Defensive Midfield'),
('TOT', '5', 'Pierre-Emile Højbjerg', 'Defensive Midfield'),
('TOT', '4', 'Oliver Skipp', 'Defensive Midfield'),
('TOT', '29', 'Pape Matar Sarr', 'Central Midfield'),
('TOT', '30', 'Rodrigo Bentancur', 'Central Midfield'),
('TOT', '19', 'Ryan Sessegnon', 'Left Midfield'),
('TOT', '10', 'James Maddison', 'Attacking Midfield'),
('TOT', '18', 'Giovani Lo Celso', 'Attacking Midfield'),
('TOT', '7', 'Heung-min Son', 'Left Winger'),
('TOT', '11', 'Bryan Gil', 'Left Winger'),
('TOT', '27', 'Manor Solomon', 'Left Winger'),
('TOT', '21', 'Dejan Kulusevski', 'Right Winger'),
('TOT', '22', 'Brennan Johnson', 'Right Winger'),
('TOT', '9', 'Richarlison', 'Centre-Forward'),
('TOT', '16', 'Timo Werner', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('AVL', '1', 'Emiliano Martinez', 'Goalkeeper'),
('AVL', '18', 'Joe Gauci', 'Goalkeeper'),
('AVL', '14', 'Robin Olsen', 'Goalkeeper'),
('AVL', '4', 'Pau Torres', 'Centre-Back'),
('AVL', '3', 'Ezri Konsa', 'Centre-Back'),
('AVL', '5', 'Diego Carlos', 'Centre-Back'),
('AVL', '17', 'Tyrone Mings', 'Centre-Back'),
('AVL', '16', 'Clement Lenglet', 'Centre-Back'),
('AVL', '30', 'Calum Chambers', 'Centre-Back'),
('AVL', '15', 'Kortney Hause', 'Centre-Back'),
('AVL', '12', 'Alex Moreno', 'Left-Back'),
('AVL', '2', 'Lucas Digne', 'Left-Back'),
('AVL', '29', 'Matty Cash', 'Right-Back'),
('AVL', '44', 'Kaine Kesler-Hayden', 'Right-Back'),
('AVL', '6', 'Boubacar Kamara', 'Defensive Midfield'),
('AVL', '7', 'Douglas Luiz', 'Central Midfield'),
('AVL', '8', 'John McGinn', 'Central Midfield'),
('AVL', '47', 'Tim Iroegbunam', 'Central Midfield'),
('AVL', '41', 'Jacob Ramsey', 'Attacking Midfield'),
('AVL', '22', 'Nicolo Zaniolo', 'Attacking Midfield'),
('AVL', '31', 'Leon Bailey', 'Left Winger'),
('AVL', '19', 'Morgan Rogers', 'Left Winger'),
('AVL', '10', 'Moussa Diaby', 'Right Winger'),
('AVL', '11', 'Emiliano Buendia', 'Right Winger'),
('AVL', '24', 'Ollie Watkins', 'Centre-Forward'),
('AVL', '25', 'Jhon Duran', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('CHE', '28', 'Djordje Petrovic', 'Goalkeeper'),
('CHE', '13', 'Marcus Bettinelli', 'Goalkeeper'),
('CHE', '26', 'Levi Colwill', 'Centre-Back'),
('CHE', '2', 'Axel Disasi', 'Centre-Back'),
('CHE', '5', 'Benoit Badiashile', 'Centre-Back'),
('CHE', '33', 'Wesley Fofana', 'Centre-Back'),
('CHE', '14', 'Trevoh Chalobah', 'Centre-Back'),
('CHE', '42', 'Alfie Gilchrist', 'Centre-Back'),
('CHE', '6', 'Thiago Silva', 'Centre-Back'),
('CHE', '21', 'Ben Chilwell', 'Left-Back'),
('CHE', '3', 'Marc Cucurella', 'Left-Back'),
('CHE', '24', 'Reece James', 'Right-Back'),
('CHE', '27', 'Malo Gusto', 'Right-Back'),
('CHE', '45', 'Moises Caicedo', 'Defensive Midfield'),
('CHE', '16', 'Romeo Lavia', 'Defensive Midfield'),
('CHE', '8', 'Lesley Ugochukwu', 'Defensive Midfield'),
('CHE', '23', 'Enzo Fernandez', 'Central Midfield'),
('CHE', '17', 'Conor Gallagher', 'Central Midfield'),
('CHE', '31', 'Carney Chukwuemeka', 'Central Midfield'),
('CHE', '20', 'Cesare Casadei', 'Central Midfield'),
('CHE', '18', 'Cole Palmer', 'Attacking Midfield'),
('CHE', '7', 'Raheem Sterling', 'Left Winger'),
('CHE', '10', 'Mykhaylo Mudryk', 'Left Winger'),
('CHE', '43', 'Diego Moreira', 'Left Winger'),
('CHE', '11', 'Noni Madueke', 'Right Winger'),
('CHE', '15', 'Nicolas Jackson', 'Centre-Forward'),
('CHE', '36', 'Deivid Washington', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('NEW', 22, 'Nick Pope', 'Goalkeeper'),
('NEW', 1, 'Martin Dubravka', 'Goalkeeper'),
('NEW', 18, 'Loris Karius', 'Goalkeeper'),
('NEW', 29, 'Mark Gillespie', 'Goalkeeper'),
('NEW', 4, 'Sven Botman', 'Centre-Back'),
('NEW', 5, 'Fabian Schar', 'Centre-Back'),
('NEW', 6, 'Jamaal Lascelles', 'Centre-Back'),
('NEW', 3, 'Paul Dummett', 'Centre-Back'),
('NEW', 0, 'Kell Watts', 'Centre-Back'),
('NEW', 20, 'Lewis Hall', 'Left-Back'),
('NEW', 13, 'Matt Targett', 'Left-Back'),
('NEW', 33, 'Dan Burn', 'Left-Back'),
('NEW', 0, 'Jamal Lewis', 'Left-Back'),
('NEW', 21, 'Tino Livramento', 'Right-Back'),
('NEW', 2, 'Kieran Trippier', 'Right-Back'),
('NEW', 17, 'Emil Krafth', 'Right-Back'),
('NEW', 0, 'Harrison Ashby', 'Right-Back'),
('NEW', 39, 'Bruno Guimaraes', 'Defensive Midfield'),
('NEW', 8, 'Sandro Tonali', 'Defensive Midfield'),
('NEW', 0, 'Isaac Hayden', 'Defensive Midfield'),
('NEW', 7, 'Joelinton', 'Central Midfield'),
('NEW', 28, 'Joe Willock', 'Central Midfield'),
('NEW', 36, 'Sean Longstaff', 'Central Midfield'),
('NEW', 67, 'Lewis Miley', 'Central Midfield'),
('NEW', 32, 'Elliot Anderson', 'Central Midfield'),
('NEW', 0, 'Jeff Hendrick', 'Central Midfield'),
('NEW', 11, 'Matt Ritchie', 'Right Midfield'),
('NEW', 10, 'Anthony Gordon', 'Left Winger'),
('NEW', 15, 'Harvey Barnes', 'Left Winger'),
('NEW', 0, 'Ryan Fraser', 'Left Winger'),
('NEW', 24, 'Miguel Almiron', 'Right Winger'),
('NEW', 23, 'Jacob Murphy', 'Right Winger'),
('NEW', 14, 'Alexander Isak', 'Centre-Forward'),
('NEW', 9, 'Callum Wilson', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('MUN', 24, 'Andre Onana', 'Goalkeeper'),
('MUN', 1, 'Altay Bayindir', 'Goalkeeper'),
('MUN', 22, 'Tom Heaton', 'Goalkeeper'),
('MUN', 6, 'Lisandro Martinez', 'Centre-Back'),
('MUN', 19, 'Raphael Varane', 'Centre-Back'),
('MUN', 5, 'Harry Maguire', 'Centre-Back'),
('MUN', 2, 'Victor Lindelof', 'Centre-Back'),
('MUN', 53, 'Willy Kambwala', 'Centre-Back'),
('MUN', 35, 'Jonny Evans', 'Centre-Back'),
('MUN', 23, 'Luke Shaw', 'Left-Back'),
('MUN', 12, 'Tyrell Malacia', 'Left-Back'),
('MUN', 0, 'Brandon Williams', 'Left-Back'),
('MUN', 20, 'Diogo Dalot', 'Right-Back'),
('MUN', 29, 'Aaron Wan-Bissaka', 'Right-Back'),
('MUN', 39, 'Scott McTominay', 'Defensive Midfield'),
('MUN', 4, 'Sofyan Amrabat', 'Defensive Midfield'),
('MUN', 18, 'Casemiro', 'Defensive Midfield'),
('MUN', 37, 'Kobbie Mainoo', 'Central Midfield'),
('MUN', 14, 'Christian Eriksen', 'Central Midfield'),
('MUN', 8, 'Bruno Fernandes', 'Attacking Midfield'),
('MUN', 7, 'Mason Mount', 'Attacking Midfield'),
('MUN', 10, 'Marcus Rashford', 'Left Winger'),
('MUN', 17, 'Alejandro Garnacho', 'Left Winger'),
('MUN', 21, 'Antony', 'Right Winger'),
('MUN', 16, 'Amad Diallo', 'Right Winger'),
('MUN', 11, 'Rasmus Højlund', 'Centre-Forward'),
('MUN', 9, 'Anthony Martial', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('WHU', 23, 'Alphonse Areola', 'Goalkeeper'),
('WHU', 1, 'Lukasz Fabianski', 'Goalkeeper'),
('WHU', 49, 'Joseph Anang', 'Goalkeeper'),
('WHU', 27, 'Nayef Aguerd', 'Centre-Back'),
('WHU', 4, 'Kurt Zouma', 'Centre-Back'),
('WHU', 15, 'Konstantinos Mavropanos', 'Centre-Back'),
('WHU', 21, 'Angelo Ogbonna', 'Centre-Back'),
('WHU', 33, 'Emerson', 'Left-Back'),
('WHU', 3, 'Aaron Cresswell', 'Left-Back'),
('WHU', 2, 'Ben Johnson', 'Right-Back'),
('WHU', 5, 'Vladimir Coufal', 'Right-Back'),
('WHU', 19, 'Edson Álvarez', 'Defensive Midfield'),
('WHU', 28, 'Tomas Soucek', 'Defensive Midfield'),
('WHU', 11, 'Kalvin Phillips', 'Defensive Midfield'),
('WHU', 0, 'Flynn Downes', 'Defensive Midfield'),
('WHU', 7, 'James Ward-Prowse', 'Central Midfield'),
('WHU', 40, 'George Earthy', 'Central Midfield'),
('WHU', 10, 'Lucas Paqueta', 'Attacking Midfield'),
('WHU', 14, 'Mohammed Kudus', 'Attacking Midfield'),
('WHU', 17, 'Maxwel Cornet', 'Left Winger'),
('WHU', 20, 'Jarrod Bowen', 'Right Winger'),
('WHU', 18, 'Danny Ings', 'Centre-Forward'),
('WHU', 9, 'Michail Antonio', 'Centre-Forward'),
('WHU', 0, 'Callum Marshall', 'Centre-Forward'),
('WHU', 45, 'Divin Mubama', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('CRY', 30, 'Dean Henderson', 'Goalkeeper'),
('CRY', 1, 'Sam Johnstone', 'Goalkeeper'),
('CRY', 41, 'Joe Whitworth', 'Goalkeeper'),
('CRY', 31, 'Remi Matthews', 'Goalkeeper'),
('CRY', 6, 'Marc Guehi', 'Centre-Back'),
('CRY', 16, 'Joachim Andersen', 'Centre-Back'),
('CRY', 26, 'Chris Richards', 'Centre-Back'),
('CRY', 4, 'Rob Holding', 'Centre-Back'),
('CRY', 36, 'Nathan Ferguson', 'Centre-Back'),
('CRY', 5, 'James Tomkins', 'Centre-Back'),
('CRY', 3, 'Tyrick Mitchell', 'Left-Back'),
('CRY', 12, 'Daniel Munoz', 'Right-Back'),
('CRY', 17, 'Nathaniel Clyne', 'Right-Back'),
('CRY', 2, 'Joel Ward', 'Right-Back'),
('CRY', 28, 'Cheick Doucoure', 'Defensive Midfield'),
('CRY', 8, 'Jefferson Lerma', 'Defensive Midfield'),
('CRY', 44, 'Jairo Riedewald', 'Defensive Midfield'),
('CRY', 20, 'Adam Wharton', 'Central Midfield'),
('CRY', 19, 'Will Hughes', 'Central Midfield'),
('CRY', 29, 'Naouirou Ahamada', 'Central Midfield'),
('CRY', 15, 'Jeffrey Schlupp', 'Left Midfield'),
('CRY', 10, 'Eberechi Eze', 'Attacking Midfield'),
('CRY', 11, 'Matheus Franca', 'Attacking Midfield'),
('CRY', 7, 'Michael Olise', 'Right Winger'),
('CRY', 49, 'Jesurun Rak-Sakyi', 'Right Winger'),
('CRY', 14, 'Jean-Philippe Mateta', 'Centre-Forward'),
('CRY', 22, 'Odsonne Edouard', 'Centre-Forward'),
('CRY', 9, 'Jordan Ayew', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('BRI', 1, 'Bart Verbruggen', 'Goalkeeper'),
('BRI', 23, 'Jason Steele', 'Goalkeeper'),
('BRI', 0, 'Carl Rushworth', 'Goalkeeper'),
('BRI', 38, 'Tom McGill', 'Goalkeeper'),
('BRI', 4, 'Adam Webster', 'Centre-Back'),
('BRI', 29, 'Jan Paul van Hecke', 'Centre-Back'),
('BRI', 3, 'Igor', 'Centre-Back'),
('BRI', 5, 'Lewis Dunk', 'Centre-Back'),
('BRI', 0, 'Ed Turns', 'Centre-Back'),
('BRI', 30, 'Pervis Estupinan', 'Left-Back'),
('BRI', 19, 'Valentin Barco', 'Left-Back'),
('BRI', 2, 'Tariq Lamptey', 'Right-Back'),
('BRI', 34, 'Joel Veltman', 'Right-Back'),
('BRI', 20, 'Carlos Baleba', 'Defensive Midfield'),
('BRI', 11, 'Billy Gilmour', 'Defensive Midfield'),
('BRI', 41, 'Jack Hinshelwood', 'Defensive Midfield'),
('BRI', 15, 'Jakub Moder', 'Central Midfield'),
('BRI', 13, 'Pascal Grob', 'Central Midfield'),
('BRI', 0, 'Yasin Ayari', 'Central Midfield'),
('BRI', 6, 'James Milner', 'Central Midfield'),
('BRI', 0, 'Marc Leonard', 'Central Midfield'),
('BRI', 0, 'Jensen Weir', 'Central Midfield'),
('BRI', 10, 'Julio Enciso', 'Attacking Midfield'),
('BRI', 40, 'Facundo Buonanotte', 'Attacking Midfield'),
('BRI', 0, 'Andrew Moran', 'Attacking Midfield'),
('BRI', 14, 'Adam Lallana', 'Attacking Midfield'),
('BRI', 22, 'Kaoru Mitoma', 'Left Winger'),
('BRI', 31, 'Ansu Fati', 'Left Winger'),
('BRI', 0, 'Jeremy Sarmiento', 'Left Winger'),
('BRI', 24, 'Simon Adingra', 'Right Winger'),
('BRI', 7, 'Solly March', 'Right Winger'),
('BRI', 0, 'Abdallah Sima', 'Right Winger'),
('BRI', 28, 'Evan Ferguson', 'Centre-Forward'),
('BRI', 9, 'Joao Pedro', 'Centre-Forward'),
('BRI', 18, 'Danny Welbeck', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('BOU', 42, 'Mark Travers', 'Goalkeeper'),
('BOU', 20, 'Andrei Radu', 'Goalkeeper'),
('BOU', 1, 'Neto', 'Goalkeeper'),
('BOU', 0, 'Will Dennis', 'Goalkeeper'),
('BOU', 12, 'Darren Randolph', 'Goalkeeper'),
('BOU', 27, 'Ilya Zabarnyi', 'Centre-Back'),
('BOU', 25, 'Marcos Senesi', 'Centre-Back'),
('BOU', 5, 'Lloyd Kelly', 'Centre-Back'),
('BOU', 6, 'Chris Mepham', 'Centre-Back'),
('BOU', 23, 'James Hill', 'Centre-Back'),
('BOU', 3, 'Milos Kerkez', 'Left-Back'),
('BOU', 37, 'Max Aarons', 'Right-Back'),
('BOU', 2, 'Ryan Fredericks', 'Right-Back'),
('BOU', 15, 'Adam Smith', 'Right-Back'),
('BOU', 18, 'Tyler Adams', 'Defensive Midfield'),
('BOU', 29, 'Philip Billing', 'Central Midfield'),
('BOU', 14, 'Alex Scott', 'Central Midfield'),
('BOU', 4, 'Lewis Cook', 'Central Midfield'),
('BOU', 0, 'Joe Rothwell', 'Central Midfield'),
('BOU', 0, 'Gavin Kilkenny', 'Central Midfield'),
('BOU', 8, 'Romain Faivre', 'Right Midfield'),
('BOU', 16, 'Marcus Tavernier', 'Left Midfield'),
('BOU', 10, 'Ryan Christie', 'Attacking Midfield'),
('BOU', 0, 'Emiliano Marcondes', 'Attacking Midfield'),
('BOU', 11, 'Dango Ouattara', 'Left Winger'),
('BOU', 17, 'Luis Sinisterra', 'Left Winger'),
('BOU', 19, 'Justin Kluivert', 'Left Winger'),
('BOU', 0, 'Jaidon Anthony', 'Left Winger'),
('BOU', 24, 'Antoine Semenyo', 'Right Winger'),
('BOU', 0, 'David Brooks', 'Right Winger'),
('BOU', 9, 'Dominic Solanke', 'Centre-Forward'),
('BOU', 26, 'Enes Unal', 'Centre-Forward'),
('BOU', 0, 'Kieffer Moore', 'Centre-Forward'),
('BOU', 0, 'Jamal Lowe', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('FUL', 17, 'Bernd Leno', 'Goalkeeper'),
('FUL', 1, 'Marek Rodak', 'Goalkeeper'),
('FUL', 23, 'Steven Benda', 'Goalkeeper'),
('FUL', 4, 'Tosin Adarabioyo', 'Centre-Back'),
('FUL', 31, 'Issa Diop', 'Centre-Back'),
('FUL', 3, 'Calvin Bassey', 'Centre-Back'),
('FUL', 13, 'Tim Ream', 'Centre-Back'),
('FUL', 33, 'Antonee Robinson', 'Left-Back'),
('FUL', 12, 'Fode Ballo-Toure', 'Left-Back'),
('FUL', 21, 'Timothy Castagne', 'Right-Back'),
('FUL', 2, 'Kenny Tete', 'Right-Back'),
('FUL', 26, 'Joao Palhinha', 'Defensive Midfield'),
('FUL', 6, 'Harrison Reed', 'Central Midfield'),
('FUL', 28, 'Sasa Lukic', 'Central Midfield'),
('FUL', 10, 'Tom Cairney', 'Central Midfield'),
('FUL', 22, 'Alex Iwobi', 'Attacking Midfield'),
('FUL', 18, 'Andreas Pereira', 'Attacking Midfield'),
('FUL', 38, 'Luke Harris', 'Attacking Midfield'),
('FUL', 20, 'Willian', 'Left Winger'),
('FUL', 8, 'Harry Wilson', 'Right Winger'),
('FUL', 11, 'Adama Traore', 'Right Winger'),
('FUL', 14, 'Bobby De Cordova-Reid', 'Right Winger'),
('FUL', 9, 'Armando Broja', 'Centre-Forward'),
('FUL', 19, 'Rodrigo Muniz', 'Centre-Forward'),
('FUL', 7, 'Raul Jimenez', 'Centre-Forward'),
('FUL', 65, 'Jay Stansfield', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('WOL', 1, 'Jose Sa', 'Goalkeeper'),
('WOL', 25, 'Daniel Bentley', 'Goalkeeper'),
('WOL', 0, 'Louie Moulden', 'Goalkeeper'),
('WOL', 40, 'Tom King', 'Goalkeeper'),
('WOL', 23, 'Max Kilman', 'Centre-Back'),
('WOL', 24, 'Toti', 'Centre-Back'),
('WOL', 4, 'Santiago Bueno', 'Centre-Back'),
('WOL', 15, 'Craig Dawson', 'Centre-Back'),
('WOL', 3, 'Rayan Ait-Nouri', 'Left-Back'),
('WOL', 17, 'Hugo Bueno', 'Left-Back'),
('WOL', 22, 'Nelson Semedo', 'Right-Back'),
('WOL', 0, 'Ki-Jana Hoever', 'Right-Back'),
('WOL', 2, 'Matt Doherty', 'Right-Back'),
('WOL', 5, 'Mario Lemina', 'Defensive Midfield'),
('WOL', 6, 'Boubacar Traore', 'Defensive Midfield'),
('WOL', 0, 'Joe Hodge', 'Defensive Midfield'),
('WOL', 8, 'Joao Gomes', 'Central Midfield'),
('WOL', 27, 'Jean-Ricner Bellegarde', 'Central Midfield'),
('WOL', 0, 'Luke Cundle', 'Central Midfield'),
('WOL', 0, 'Chem Campbell', 'Attacking Midfield'),
('WOL', 14, 'Noha Lemina', 'Attacking Midfield'),
('WOL', 7, 'Pedro Neto', 'Right Winger'),
('WOL', 21, 'Pablo Sarabia', 'Right Winger'),
('WOL', 12, 'Matheus Cunha', 'Centre-Forward'),
('WOL', 11, 'Hee-chan Hwang', 'Centre-Forward'),
('WOL', 63, 'Nathan Fraser', 'Centre-Forward'),
('WOL', 84, 'Leon Chiwome', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('EVE', 1, 'Jordan Pickford', 'Goalkeeper'),
('EVE', 12, 'Joao Virginia', 'Goalkeeper'),
('EVE', 31, 'Andy Lonergan', 'Goalkeeper'),
('EVE', 32, 'Jarrad Branthwaite', 'Centre-Back'),
('EVE', 6, 'James Tarkowski', 'Centre-Back'),
('EVE', 22, 'Ben Godfrey', 'Centre-Back'),
('EVE', 5, 'Michael Keane', 'Centre-Back'),
('EVE', 0, 'Mason Holgate', 'Centre-Back'),
('EVE', 19, 'Vitaliy Mykolenko', 'Left-Back'),
('EVE', 18, 'Ashley Young', 'Left-Back'),
('EVE', 2, 'Nathan Patterson', 'Right-Back'),
('EVE', 23, 'Seamus Coleman', 'Right-Back'),
('EVE', 8, 'Amadou Onana', 'Defensive Midfield'),
('EVE', 37, 'James Garner', 'Defensive Midfield'),
('EVE', 16, 'Abdoulaye Doucoure', 'Central Midfield'),
('EVE', 21, 'Andre Gomes', 'Central Midfield'),
('EVE', 27, 'Idrissa Gueye', 'Central Midfield'),
('EVE', 20, 'Dele Alli', 'Attacking Midfield'),
('EVE', 7, 'Dwight McNeil', 'Left Winger'),
('EVE', 10, 'Arnaut Danjuma', 'Left Winger'),
('EVE', 61, 'Lewis Dobbin', 'Left Winger'),
('EVE', 9, 'Dominic Calvert-Lewin', 'Centre-Forward'),
('EVE', 14, 'Beto', 'Centre-Forward'),
('EVE', 28, 'Chermiti', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('BRE', 1, 'Mark Flekken', 'Goalkeeper'),
('BRE', 21, 'Thomas Strakosha', 'Goalkeeper'),
('BRE', 31, 'Hakon Rafn Valdimarsson', 'Goalkeeper'),
('BRE', 0, 'Matthew Cox', 'Goalkeeper'),
('BRE', 40, 'Ellery Balcombe', 'Goalkeeper'),
('BRE', 22, 'Nathan Collins', 'Centre-Back'),
('BRE', 20, 'Kristoffer Ajer', 'Centre-Back'),
('BRE', 5, 'Ethan Pinnock', 'Centre-Back'),
('BRE', 13, 'Zanka', 'Centre-Back'),
('BRE', 16, 'Ben Mee', 'Centre-Back'),
('BRE', 0, 'Charlie Goode', 'Centre-Back'),
('BRE', 3, 'Rico Henry', 'Left-Back'),
('BRE', 2, 'Aaron Hickey', 'Right-Back'),
('BRE', 30, 'Mads Roerslev', 'Right-Back'),
('BRE', 0, 'Fin Stevens', 'Right-Back'),
('BRE', 27, 'Vitaly Janelt', 'Defensive Midfield'),
('BRE', 6, 'Christian Nørgaard', 'Defensive Midfield'),
('BRE', 52, 'Yunus Emre Konak', 'Defensive Midfield'),
('BRE', 8, 'Mathias Jensen', 'Central Midfield'),
('BRE', 10, 'Josh Dasilva', 'Central Midfield'),
('BRE', 15, 'Frank Onyeka', 'Central Midfield'),
('BRE', 26, 'Shandon Baptiste', 'Central Midfield'),
('BRE', 0, 'Paris Maghoma', 'Central Midfield'),
('BRE', 32, 'Ryan Trevitt', 'Central Midfield'),
('BRE', 33, 'Yegor Yarmolyuk', 'Attacking Midfield'),
('BRE', 14, 'Saman Ghoddos', 'Attacking Midfield'),
('BRE', 0, 'Myles Peart-Harris', 'Attacking Midfield'),
('BRE', 11, 'Yoane Wissa', 'Left Winger'),
('BRE', 23, 'Keane Lewis-Potter', 'Left Winger'),
('BRE', 24, 'Mikkel Damsgaard', 'Left Winger'),
('BRE', 19, 'Bryan Mbeumo', 'Right Winger'),
('BRE', 9, 'Kevin Schade', 'Right Winger'),
('BRE', 17, 'Ivan Toney', 'Centre-Forward'),
('BRE', 7, 'Neal Maupay', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('NOT', 1, 'Matt Turner', 'Goalkeeper'),
('NOT', 23, 'Odysseas Vlachodimos', 'Goalkeeper'),
('NOT', 26, 'Matz Sels', 'Goalkeeper'),
('NOT', 13, 'Wayne Hennessey', 'Goalkeeper'),
('NOT', 40, 'Murillo', 'Centre-Back'),
('NOT', 19, 'Moussa Niakhate', 'Centre-Back'),
('NOT', 32, 'Andrew Omobamidele', 'Centre-Back'),
('NOT', 30, 'Willy Boly', 'Centre-Back'),
('NOT', 18, 'Felipe', 'Centre-Back'),
('NOT', 3, 'Nuno Tavares', 'Left-Back'),
('NOT', 15, 'Harry Toffolo', 'Left-Back'),
('NOT', 7, 'Neco Williams', 'Right-Back'),
('NOT', 43, 'Ola Aina', 'Right-Back'),
('NOT', 29, 'Gonzalo Montiel', 'Right-Back'),
('NOT', 6, 'Ibrahim Sangare', 'Defensive Midfield'),
('NOT', 8, 'Cheikhou Kouyate', 'Defensive Midfield'),
('NOT', 28, 'Danilo', 'Central Midfield'),
('NOT', 16, 'Nicolas Dominguez', 'Central Midfield'),
('NOT', 22, 'Ryan Yates', 'Central Midfield'),
('NOT', 0, 'Lewis O''Brien', 'Central Midfield'),
('NOT', 0, 'Harry Arter', 'Central Midfield'),
('NOT', 10, 'Morgan Gibbs-White', 'Attacking Midfield'),
('NOT', 20, 'Giovanni Reyna', 'Attacking Midfield'),
('NOT', 0, 'Brandon Aguilera', 'Attacking Midfield'),
('NOT', 21, 'Anthony Elanga', 'Left Winger'),
('NOT', 14, 'Callum Hudson-Odoi', 'Left Winger'),
('NOT', 0, 'Emmanuel Dennis', 'Left Winger'),
('NOT', 0, 'Alex Mighten', 'Left Winger'),
('NOT', 0, 'Josh Bowler', 'Right Winger'),
('NOT', 9, 'Taiwo Awoniyi', 'Centre-Forward'),
('NOT', 11, 'Chris Wood', 'Centre-Forward'),
('NOT', 27, 'Divock Origi', 'Centre-Forward'),
('NOT', 37, 'Rodrigo Ribeiro', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('LUT', 24, 'Thomas Kaminski', 'Goalkeeper'),
('LUT', 23, 'Tim Krul', 'Goalkeeper'),
('LUT', 0, 'Jack Walton', 'Goalkeeper'),
('LUT', 1, 'James Shea', 'Goalkeeper'),
('LUT', 15, 'Teden Mengi', 'Centre-Back'),
('LUT', 0, 'Tom Holmes', 'Centre-Back'),
('LUT', 2, 'Gabriel Osho', 'Centre-Back'),
('LUT', 5, 'Mads Andersen', 'Centre-Back'),
('LUT', 4, 'Tom Lockyer', 'Centre-Back'),
('LUT', 16, 'Reece Burke', 'Centre-Back'),
('LUT', 0, 'Ryan Giles', 'Left-Back'),
('LUT', 29, 'Amari''i Bell', 'Left-Back'),
('LUT', 3, 'Dan Potts', 'Left-Back'),
('LUT', 27, 'Daiki Hashioka', 'Right-Back'),
('LUT', 13, 'Marvelous Nakamba', 'Defensive Midfield'),
('LUT', 17, 'Pelly Ruddock Mpanzu', 'Defensive Midfield'),
('LUT', 6, 'Ross Barkley', 'Central Midfield'),
('LUT', 0, 'Allan Campbell', 'Central Midfield'),
('LUT', 18, 'Jordan Clark', 'Central Midfield'),
('LUT', 8, 'Luke Berry', 'Central Midfield'),
('LUT', 0, 'Louie Watson', 'Central Midfield'),
('LUT', 28, 'Elliot Thorpe', 'Central Midfield'),
('LUT', 45, 'Alfie Doughty', 'Left Midfield'),
('LUT', 32, 'Fred Onyedinma', 'Attacking Midfield'),
('LUT', 0, 'Dion Pereira', 'Left Winger'),
('LUT', 7, 'Chiedozie Ogbene', 'Right Winger'),
('LUT', 14, 'Tahith Chong', 'Right Winger'),
('LUT', 30, 'Andros Townsend', 'Right Winger'),
('LUT', 0, 'John McAtee', 'Attacking Midfield'),
('LUT', 9, 'Carlton Morris', 'Centre-Forward'),
('LUT', 11, 'Elijah Adebayo', 'Centre-Forward'),
('LUT', 19, 'Jacob Brown', 'Centre-Forward'),
('LUT', 10, 'Cauley Woodrow', 'Centre-Forward'),
('LUT', 0, 'Joe Taylor', 'Centre-Forward'),
('LUT', 0, 'Admiral Muskwe', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('BUR', 1, 'James Trafford', 'Goalkeeper'),
('BUR', 49, 'Arijanet Muric', 'Goalkeeper'),
('BUR', 29, 'Lawrence Vigouroux', 'Goalkeeper'),
('BUR', 5, 'Jordan Beyer', 'Centre-Back'),
('BUR', 28, 'Ameen Al-Dakhil', 'Centre-Back'),
('BUR', 2, 'Dara O''Shea', 'Centre-Back'),
('BUR', 18, 'Hjalmar Ekdal', 'Centre-Back'),
('BUR', 33, 'Maxime Esteve', 'Centre-Back'),
('BUR', 44, 'Hannes Delcroix', 'Centre-Back'),
('BUR', 0, 'Luke McNally', 'Centre-Back'),
('BUR', 3, 'Charlie Taylor', 'Left-Back'),
('BUR', 20, 'Lorenz Assignon', 'Right-Back'),
('BUR', 0, 'Connor Roberts', 'Right-Back'),
('BUR', 22, 'Vitinho', 'Right-Back'),
('BUR', 16, 'Sander Berge', 'Defensive Midfield'),
('BUR', 42, 'Han-Noah Massengo', 'Defensive Midfield'),
('BUR', 4, 'Jack Cork', 'Defensive Midfield'),
('BUR', 8, 'Josh Brownhill', 'Central Midfield'),
('BUR', 24, 'Josh Cullen', 'Central Midfield'),
('BUR', 21, 'Aaron Ramsey', 'Attacking Midfield'),
('BUR', 0, 'Scott Twine', 'Attacking Midfield'),
('BUR', 31, 'Mike Tresor', 'Left Winger'),
('BUR', 47, 'Wilson Odobert', 'Left Winger'),
('BUR', 0, 'Anass Zaroury', 'Left Winger'),
('BUR', 34, 'Jacob Bruun Larsen', 'Left Winger'),
('BUR', 30, 'Luca Koleosho', 'Left Winger'),
('BUR', 0, 'Dara Costelloe', 'Left Winger'),
('BUR', 10, 'Benson Manuel', 'Right Winger'),
('BUR', 15, 'Nathan Redmond', 'Right Winger'),
('BUR', 7, 'Johann Berg Gudmundsson', 'Right Winger'),
('BUR', 17, 'Lyle Foster', 'Centre-Forward'),
('BUR', 25, 'Zeki Amdouni', 'Centre-Forward'),
('BUR', 0, 'Michael Obafemi', 'Centre-Forward'),
('BUR', 9, 'Jay Rodriguez', 'Centre-Forward');

INSERT INTO team_info (team_code, member_code, member_name, member_role)
VALUES
('SHU', 13, 'Ivo Grbic', 'Goalkeeper'),
('SHU', 18, 'Wes Foderingham', 'Goalkeeper'),
('SHU', 1, 'Adam Davies', 'Goalkeeper'),
('SHU', 37, 'Jordan Amissah', 'Goalkeeper'),
('SHU', 15, 'Anel Ahmedhodzic', 'Centre-Back'),
('SHU', 5, 'Auston Trusty', 'Centre-Back'),
('SHU', 12, 'John Egan', 'Centre-Back'),
('SHU', 19, 'Jack Robinson', 'Centre-Back'),
('SHU', 6, 'Chris Basham', 'Centre-Back'),
('SHU', 27, 'Yasser Larouci', 'Left-Back'),
('SHU', 3, 'Max Lowe', 'Left-Back'),
('SHU', 33, 'Rhys Norrington-Davies', 'Left-Back'),
('SHU', 20, 'Jayden Bogle', 'Right-Back'),
('SHU', 2, 'George Baldock', 'Right-Back'),
('SHU', 0, 'Femi Seriki', 'Right-Back'),
('SHU', 21, 'Vini Souza', 'Defensive Midfield'),
('SHU', 8, 'Gustavo Hamer', 'Central Midfield'),
('SHU', 22, 'Tom Davies', 'Central Midfield'),
('SHU', 25, 'Anis Slimane', 'Central Midfield'),
('SHU', 35, 'Andre Brooks', 'Central Midfield'),
('SHU', 16, 'Oliver Norwood', 'Central Midfield'),
('SHU', 23, 'Ben Osborn', 'Central Midfield'),
('SHU', 24, 'Oliver Arblaster', 'Central Midfield'),
('SHU', 11, 'Ben Brereton Diaz', 'Left Winger'),
('SHU', 10, 'Cameron Archer', 'Centre-Forward'),
('SHU', 9, 'Oli McBurnie', 'Centre-Forward'),
('SHU', 7, 'Rhian Brewster', 'Centre-Forward'),
('SHU', 32, 'William Osula', 'Centre-Forward'),
('SHU', 36, 'Daniel Jebbison', 'Centre-Forward');
