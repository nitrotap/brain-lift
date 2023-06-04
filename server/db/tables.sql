DROP DATABASE IF EXISTS cog_load;

CREATE DATABASE IF NOT EXISTS cog_load;

USE cog_load;

DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS user_table;


CREATE TABLE user_table (
  userID INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  lastLogin DATETIME,
  session_id VARCHAR(255),
  token VARCHAR(255)
);


CREATE TABLE task (
  taskID INT PRIMARY KEY AUTO_INCREMENT,
  taskName VARCHAR(255),
  taskType VARCHAR(255),
  taskTime VARCHAR(255),
  userID INT,
  FOREIGN KEY (userID) REFERENCES user_table(userID)
);


CREATE TABLE answer (
  answerID INT PRIMARY KEY AUTO_INCREMENT,
  taskAnswer_1 INT,
  taskAnswer_2 INT,
  taskAnswer_3 INT,
  taskAnswer_4 INT,
  taskAnswer_5 INT,
  taskAnswer_6 INT,
  taskScore INT,
  dateTaken DATETIME,
  userID INT,
  taskID INT,
  FOREIGN KEY (userID) REFERENCES user_table(userID),
  FOREIGN KEY (taskID) REFERENCES task(taskID)
);



