/$# /bin/csh -f

set mysqlargs = "-h localhost -u group10 -pgroup10_pw";
set db = group10_db;

mysql $mysqlargs << EOF
DROP DATABASE group10_db;

CREATE DATABASE group10_db;
USE group10_db;

DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Allocations;
DROP TABLE IF EXISTS Profile;
DROP TABLE IF EXISTS Contributions;
DROP TABLE IF EXISTS Memos;


CREATE TABLE User (
   userId int AUTO_INCREMENT NOT NULL PRIMARY KEY,
   userName character(255),
   firstName character(255),
   lastName character(255),
   email character(255),
   benefitStartDate DATE,
   password character(255),
   isAdmin bool DEFAULT FALSE
);

ALTER TABLE `User` AUTO_INCREMENT = 4000;

CREATE INDEX UserNameIndex ON User ( userName );


CREATE TABLE Allocations (
   userId int PRIMARY KEY,
   stocks real,
   funds real,
   bonds real,

   FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE Profile (
   userId int PRIMARY KEY,
   ssn character(16),
   dob DATE,
   address text,
   bankAcc character(64),
   bankRouting character(64),

   FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE Contributions (
   userId int PRIMARY KEY,
   preTax int DEFAULT 2,
   afterTax int DEFAULT 2,
   roth int DEFAULT 2,

   FOREIGN KEY (userId) REFERENCES User(userId)
);


CREATE TABLE Memos (
   memo text,
   memotime timestamp DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO User VALUES (4001, 'admin', 'Node Goat', 'Admin', NULL, DEFAULT, '4000Admin_123', TRUE);
INSERT INTO User VALUES (4002, 'user1', 'John', 'Doe', NULL, '2030-01-10', '4000User1_123', FALSE);
INSERT INTO User VALUES (4003, 'user2', 'Will', 'Smith', NULL, '2025-11-30', '4000User2_123', FALSE);

INSERT INTO Allocations VALUES (4001, 20, 40, 40);
INSERT INTO Allocations VALUES (4002, 10, 10, 80);
INSERT INTO Allocations VALUES (4003, 5, 5, 90);

INSERT INTO Profile(userId) VALUES (4001);
INSERT INTO Profile(userId) VALUES (4002);
INSERT INTO Profile(userId) VALUES (4003);

INSERT INTO Contributions(userId) VALUES (4001);
INSERT INTO Contributions(userId) VALUES (4002);
INSERT INTO Contributions(userId) VALUES (4003);
