-- Inserting values into the user_table
INSERT INTO user_table(email, password, lastLogin, session_id, token)
VALUES ('user1@email.com', 'password1', NOW(), 'session_id1', 'token1'),
       ('user2@email.com', 'password2', NOW(), 'session_id2', 'token2'),
       ('user3@email.com', 'password3', NOW(), 'session_id3', 'token3'),
       ('user4@email.com', 'password4', NOW(), 'session_id4', 'token4'),
       ('user5@email.com', 'password5', NOW(), 'session_id5', 'token5'),
       ('user6@email.com', 'password6', NOW(), 'session_id6', 'token6'),
       ('user7@email.com', 'password7', NOW(), 'session_id7', 'token7'),
       ('user8@email.com', 'password8', NOW(), 'session_id8', 'token8');

-- Inserting values into the task table
INSERT INTO task(taskName, taskType, taskSubType, userID, notes)
VALUES ('Driving', 'Transportation', 'Car', 1, 'Notes1'),
       ('Cooking', 'Household', 'Kitchen', 2, 'Notes2'),
       ('Eating', 'Self-care', 'Meal', 3, 'Notes3'),
       ('Drinking water', 'Self-care', 'Hydration', 4, 'Notes4'),
       ('Medication management', 'Healthcare', 'Medicine', 5, 'Notes5'),
       ('Mobility and transfers', 'Physical', 'Mobility', 6, 'Notes6'),
       ('Financial management', 'Administrative', 'Finance', 7, 'Notes7'),
       ('Communication', 'Social', 'Interpersonal', 8, 'Notes8'),
       ('Problem solving', 'Cognitive', 'Critical Thinking', 1, 'Notes9'),
       ('Drinking water', 'Self-care', 'Hydration', 2, 'Notes10'),
       ('Cooking', 'Household', 'Kitchen', 3, 'Notes11'),
       ('Driving', 'Transportation', 'Car', 4, 'Notes12');

-- Inserting values into the answer table
INSERT INTO answer(mental_load, physical_load, time_load, performance, effort, stress, score, time, dateTaken, notes,
                   userID, taskID)
VALUES (1, 5, 1, 9, 2, 3, 8, '15:00', NOW(), 'Answer notes1', 1, 1),
       (2, 1, 3, 8, 3, 4, 7, '15:10', NOW(), 'Answer notes2', 2, 2),
       (3, 1, 4, 7, 4, 5, 6, '15:20', NOW(), 'Answer notes3', 3, 3),
       (4, 2, 6, 6, 5, 6, 5, '15:30', NOW(), 'Answer notes4', 4, 4),
       (5, 2, 7, 5, 6, 7, 4, '15:40', NOW(), 'Answer notes5', 5, 5),
       (6, 3, 9, 4, 7, 8, 3, '15:50', NOW(), 'Answer notes6', 6, 6),
       (7, 3, 1, 3, 8, 9, 2, '16:00', NOW(), 'Answer notes7', 7, 7),
       (8, 4, 1, 2, 9, 1, 1, '16:10', NOW(), 'Answer notes8', 8, 8),
       (5, 2, 7, 7, 6, 5, 8, '16:20', NOW(), 'Answer notes9', 1, 9),
       (6, 2, 8, 7, 7, 6, 8, '16:30', NOW(), 'Answer notes10', 2, 10),
       (7, 3, 1, 6, 8, 7, 7, '16:40', NOW(), 'Answer notes11', 3, 11),
       (8, 3, 1, 6, 9, 8, 7, '16:50', NOW(), 'Answer notes12', 4, 12);
