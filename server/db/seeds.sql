INSERT INTO user_table (email, password, lastLogin)
VALUES
('user1@example.com', 'password1', '2023-05-15 10:00:00'),
('user2@example.com', 'password2', '2023-05-14 15:30:00'),
('user3@example.com', 'password3', '2023-05-13 09:45:00'),
('user4@example.com', 'password4', '2023-05-12 18:20:00'),
('user5@example.com', 'password5', '2023-05-11 14:10:00'),
('user6@example.com', 'password6', '2023-05-10 11:25:00'),
('user7@example.com', 'password7', '2023-05-09 17:40:00'),
('user8@example.com', 'password8', '2023-05-08 12:55:00');

INSERT INTO task (taskName, taskType, taskTime, userID)
VALUES
('Driving', 'Type A', '10:00', 1),
('Cooking', 'Type B', '12:00', 1),
('Eating and Drinking', 'Type A', '15:00', 2),
('Medication Management', 'Type C', '09:00', 3),
('Mobility and Transfers', 'Type B', '11:00', 3),
('Financial Management', 'Type A', '14:00', 4),
('Communication', 'Type C', '17:00', 5),
('Problem-Solving', 'Type B', '13:00', 6);

INSERT INTO answer (taskAnswer_1, taskAnswer_2, taskAnswer_3, taskAnswer_4, taskAnswer_5, taskAnswer_6, taskScore, dateTaken, userID, taskID)
VALUES
(1, 0, 1, 0, 1, 0, 85, '2023-05-15 11:30:00', 1, 1),
(1, 1, 0, 1, 0, 1, 75, '2023-05-14 16:00:00', 1, 2),
(0, 1, 1, 0, 0, 1, 90, '2023-05-13 10:30:00', 2, 3),
(1, 0, 0, 1, 0, 0, 65, '2023-05-12 19:45:00', 3, 4),
(0, 1, 1, 1, 1, 1, 80, '2023-05-11 15:20:00', 3, 5),
(1, 0, 1, 0, 1, 0, 95, '2023-05-10 12:40:00', 4, 6),
(0, 0, 1, 1, 0, 1, 70, '2023-05-09 18:55:00', 5, 7),
(1, 1, 0, 0, 1, 0, 85, '2023-05-08 14:15:00', 6, 8);




