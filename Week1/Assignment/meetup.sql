CREATE DATABASE IF NOT EXISTS meetup;
USE meetup;

DROP TABLE IF EXISTS Meeting;
DROP TABLE IF EXISTS Room;
DROP TABLE IF EXISTS Invitee;


CREATE TABLE Invitee (
    invitee_no INT(6) NOT NULL AUTO_INCREMENT,
    invitee_name VARCHAR(255) NOT NULL,
    invited_by VARCHAR(255),
    PRIMARY KEY (invitee_no)
);

CREATE TABLE Room (
    room_no INT(6) NOT NULL,
    room_name VARCHAR(255),
    floor_number INT(3),
    PRIMARY KEY (room_no)
);

CREATE TABLE Meeting (
    meeting_no INT(6) AUTO_INCREMENT,
    meeting_title VARCHAR(255),
    starting_time DATETIME NOT NULL,
    ending_time DATETIME,
    room_no INT(6) NOT NULL,
    PRIMARY KEY (meeting_no),
    FOREIGN KEY (room_no) REFERENCES Room(room_no) ON DELETE CASCADE
);

