DROP DATABASE IF EXISTS cog_load;

CREATE DATABASE IF NOT EXISTS cog_load;

USE cog_load;

DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS user_table;


CREATE TABLE user_table
(
    userID     INT PRIMARY KEY AUTO_INCREMENT,
    email      VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL,
    lastLogin  DATETIME,
    session_id VARCHAR(255),
    token      VARCHAR(255)
);


CREATE TABLE task
(
    taskID      INT PRIMARY KEY AUTO_INCREMENT,
    taskName    VARCHAR(255),
    taskType    VARCHAR(255),
    taskSubType VARCHAR(255),
    userID      INT,
    notes       TEXT,
    FOREIGN KEY (userID) REFERENCES user_table (userID)
);


CREATE TABLE answer
(
    answerID      INT PRIMARY KEY AUTO_INCREMENT,
    mental_load   INT,
    physical_load INT,
    time_load     INT,
    performance   INT,
    effort        INT,
    stress        INT,
    score         INT,
    time          VARCHAR(255),
    dateTaken     DATETIME,
    notes         TEXT,
    userID        INT,
    taskID        INT,
    FOREIGN KEY (userID) REFERENCES user_table (userID),
    FOREIGN KEY (taskID) REFERENCES task (taskID)
);



