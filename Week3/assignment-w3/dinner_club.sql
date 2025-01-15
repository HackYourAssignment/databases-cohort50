CREATE TABLE Members (
    member_id INT PRIMARY KEY,
    member_name VARCHAR(100),
    member_address VARCHAR(255)
);

INSERT INTO Members VALUES (1, 'Amit', '325 Max park');
INSERT INTO Members VALUES (2, 'Ben', '24 Hudson lane');
INSERT INTO Members VALUES (3, 'Cristina', '516 6th Ave');
INSERT INTO Members VALUES (4, 'Dan', '89 John St');
INSERT INTO Members VALUES (5, 'Gabor', '54 Vivaldi St');
INSERT INTO Members VALUES (6, 'Hema', '9 Peter St');


CREATE TABLE Venues (
    venue_code VARCHAR(10) PRIMARY KEY,
    venue_description VARCHAR(255)
);

INSERT INTO Venues VALUES ('B01', 'Grand Ball Room');
INSERT INTO Venues VALUES ('B02', 'Zoku Roof Top');
INSERT INTO Venues VALUES ('B03', 'Goat Farm');
INSERT INTO Venues VALUES ('B04', 'Mama\'s Kitchen');
INSERT INTO Venues VALUES ('B05', 'Hungry Hungary');


CREATE TABLE Dinners (
    dinner_id VARCHAR(20) PRIMARY KEY,
    dinner_date DATE,
    venue_code VARCHAR(10),
    FOREIGN KEY (venue_code) REFERENCES Venues(venue_code)
);


INSERT INTO Dinners VALUES ('D00001001', '2020-03-15', 'B01');
INSERT INTO Dinners VALUES ('D00001002', '2020-03-15', 'B02');
INSERT INTO Dinners VALUES ('D00001003', '2020-03-20', 'B03');
INSERT INTO Dinners VALUES ('D00001004', '2020-03-25', 'B04');
INSERT INTO Dinners VALUES ('D00001005', '2020-03-26', 'B05');
INSERT INTO Dinners VALUES ('D00001006', '2020-04-01', 'B03');


CREATE TABLE Food (
    food_code VARCHAR(10) PRIMARY KEY,
    food_description VARCHAR(255)
);


INSERT INTO Food VALUES ('C1', 'Curry');
INSERT INTO Food VALUES ('C2', 'Cake');
INSERT INTO Food VALUES ('S1', 'Soup');
INSERT INTO Food VALUES ('P1', 'Pie');
INSERT INTO Food VALUES ('T1', 'Tea');
INSERT INTO Food VALUES ('M1', 'Mousse');
INSERT INTO Food VALUES ('F1', 'Falafal');
INSERT INTO Food VALUES ('G1', 'Goulash');
INSERT INTO Food VALUES ('P2', 'Pasca');


CREATE TABLE DinnerFood (
    dinner_id VARCHAR(20),
    food_code VARCHAR(10),
    PRIMARY KEY (dinner_id, food_code),
    FOREIGN KEY (dinner_id) REFERENCES Dinners(dinner_id),
    FOREIGN KEY (food_code) REFERENCES Food(food_code)
);


INSERT INTO DinnerFood VALUES ('D00001001', 'C1');
INSERT INTO DinnerFood VALUES ('D00001001', 'C2');
INSERT INTO DinnerFood VALUES ('D00001002', 'S1');
INSERT INTO DinnerFood VALUES ('D00001002', 'C2');
INSERT INTO DinnerFood VALUES ('D00001003', 'P1');
INSERT INTO DinnerFood VALUES ('D00001003', 'T1');
INSERT INTO DinnerFood VALUES ('D00001003', 'M1');
INSERT INTO DinnerFood VALUES ('D00001004', 'F1');
INSERT INTO DinnerFood VALUES ('D00001004', 'M1');
INSERT INTO DinnerFood VALUES ('D00001005', 'G1');
INSERT INTO DinnerFood VALUES ('D00001005', 'P2');


CREATE TABLE Attendance (
    member_id INT,
    dinner_id VARCHAR(20),
    PRIMARY KEY (member_id, dinner_id),
    FOREIGN KEY (member_id) REFERENCES Members(member_id),
    FOREIGN KEY (dinner_id) REFERENCES Dinners(dinner_id)
);


INSERT INTO Attendance VALUES (1, 'D00001001');
INSERT INTO Attendance VALUES (2, 'D00001002');
INSERT INTO Attendance VALUES (3, 'D00001002');
INSERT INTO Attendance VALUES (4, 'D00001003');
INSERT INTO Attendance VALUES (1, 'D00001003');
INSERT INTO Attendance VALUES (3, 'D00001004');
INSERT INTO Attendance VALUES (5, 'D00001005');
INSERT INTO Attendance VALUES (6, 'D00001003');