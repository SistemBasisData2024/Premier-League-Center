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




