INSERT INTO MembershipTier VALUES ("Bronze", 175);
INSERT INTO MembershipTier VALUES ("Silver", 350);
INSERT INTO MembershipTier VALUES ("Gold", 500);

INSERT INTO Benefits VALUES ("Crossfit", "Gold");
INSERT INTO Benefits VALUES ("All facilities", "Silver");
INSERT INTO Benefits VALUES ("Classes", "Bronze");

INSERT INTO Facility VALUES ("Lilla vägen 1", "Lilla Gymmet");
INSERT INTO Facility VALUES ("Stora vägen 2", "Stora Gymmet");

INSERT INTO Member VALUES ("Klara Svensson", "klara_svens@gmail.com", 0707654321, 9001021234);
INSERT INTO Member VALUES ("Erik Månsson", "erik.m@gmail.com", 0707998877, 9505050101);

INSERT INTO Payment VALUES ("Invoice", 9001021234);
INSERT INTO Payment VALUES ("Direct Debit", 9505050101);

INSERT INTO MembershipDays VALUES (30);
INSERT INTO MembershipDays VALUES (90);
INSERT INTO MembershipDays VALUES (180);
INSERT INTO MembershipDays VALUES (365);

INSERT INTO Membership VALUES (9001021234, "Silver", CURRENT_TIMESTAMP, 180, "Stora Gymmet");
INSERT INTO Membership VALUES (9505050101, "Gold", CURRENT_TIMESTAMP, 90, "Lilla Gymmet");

INSERT INTO Visit VALUES ("Lilla Gymmet", CURRENT_TIMESTAMP, 9505050101);
INSERT INTO Visit VALUES ("Stora Gymmet", CURRENT_TIMESTAMP, 9001021234);

INSERT INTO Leave VALUES ("Lilla Gymmet", CURRENT_TIMESTAMP, 9505050101);
INSERT INTO Leave VALUES ("Stora Gymmet", CURRENT_TIMESTAMP, 9001021234);

INSERT INTO Room VALUES (104, "Multi-purpose", "Douglas", "70", "Stora Gymmet");
INSERT INTO Room VALUES (40, "Multi-purpose", "Marcus", "20", "Lilla Gymmet");
INSERT INTO Room VALUES (70, "Spinning", "Astrid", "40", "Stora Gymmet");
INSERT INTO Room VALUES (96, "Multi-purpose", "Max", "62", "Lilla Gymmet");
INSERT INTO Room VALUES (52, "Crossfit", "Fina", "24", "Stora Gymmet");

INSERT INTO Equipment VALUES ("Yoga mat");
INSERT INTO Equipment VALUES ("Bike");
INSERT INTO Equipment VALUES ("Kettlebell 8kg");
INSERT INTO Equipment VALUES ("Kettlebell 12kg");
INSERT INTO Equipment VALUES ("Kettlebell 16kg");
INSERT INTO Equipment VALUES ("Kettlebell 20kg");
INSERT INTO Equipment VALUES ("Kettlebell 24kg");
INSERT INTO Equipment VALUES ("Resistance Band Light");
INSERT INTO Equipment VALUES ("Resistance Band Medium");
INSERT INTO Equipment VALUES ("Resistance Band Hard");

INSERT INTO EquipLocation VALUES ("Kettlebell 8kg", 10, "Stora Gymmet");
INSERT INTO EquipLocation VALUES ("Kettlebell 12kg", 10, "Stora Gymmet");
INSERT INTO EquipLocation VALUES ("Kettlebell 16kg", 10, "Stora Gymmet");
INSERT INTO EquipLocation VALUES ("Kettlebell 20kg", 10, "Stora Gymmet");
INSERT INTO EquipLocation VALUES ("Kettlebell 24kg", 10, "Stora Gymmet");
INSERT INTO EquipLocation VALUES ("Resistance Band Light", 4, "Stora Gymmet");
INSERT INTO EquipLocation VALUES ("Resistance Band Medium", 4, "Stora Gymmet");
INSERT INTO EquipLocation VALUES ("Resistance Band Hard", 2, "Stora Gymmet");
INSERT INTO EquipLocation VALUES ("Yoga mat", 30, "Stora Gymmet");
INSERT INTO EquipLocation VALUES ("Bike", 40, "Stora Gymmet");

INSERT INTO EquipLocation VALUES ("Kettlebell 8kg", 10, "Lilla Gymmet");
INSERT INTO EquipLocation VALUES ("Kettlebell 12kg", 10, "Lilla Gymmet");
INSERT INTO EquipLocation VALUES ("Kettlebell 16kg", 10, "Lilla Gymmet");
INSERT INTO EquipLocation VALUES ("Kettlebell 20kg", 10, "Lilla Gymmet");
INSERT INTO EquipLocation VALUES ("Kettlebell 24kg", 10, "Lilla Gymmet");
INSERT INTO EquipLocation VALUES ("Resistance Band Light", 4, "Lilla Gymmet");
INSERT INTO EquipLocation VALUES ("Resistance Band Medium", 4, "Lilla Gymmet");
INSERT INTO EquipLocation VALUES ("Resistance Band Hard", 2, "Lilla Gymmet");
INSERT INTO EquipLocation VALUES ("Yoga mat", 16, "Lilla Gymmet");

INSERT INTO Employee VALUES ("Maja Lok", 0707889900, 6501010990, "Admin", "Majan.65@hotmail.com");
INSERT INTO Employee VALUES ("Ruben Lok", 0707889901, 9308089999, "Receptionist", "Ruben.Lok@hotmail.com");
INSERT INTO Employee VALUES ("Ivan Hoffenburg", 0708445566, 7406064567, "Admin", "Hoffenburg@gmail.com");
INSERT INTO Employee VALUES ("Katarina Lilja", 0708334455, 8702023344, "Receptionist", "KatarinaLilja@gmail.com");

INSERT INTO WorksAt VALUES (6501010990, "Stora Gymmet");
INSERT INTO WorksAt VALUES (9308089999, "Stora Gymmet");
INSERT INTO WorksAt VALUES (7406064567, "Lilla Gymmet");
INSERT INTO WorksAt VALUES (8702023344, "Lilla Gymmet");

INSERT INTO Classes VALUES ("Cardio", "Intense Spinning", 40);
INSERT INTO Classes VALUES ("Hiit", "HIIT IT", 40);
INSERT INTO Classes VALUES ("Crossfit", "Crossfit Basics", 24);
INSERT INTO Classes VALUES ("Crossfit", "Crossfit Intense", 24);

INSERT INTO Instructor VALUES ("Björn Spinh", "Mysig_Björn@hotmail.com", 0707575757, 7903318989);
INSERT INTO Instructor VALUES ("Lisa Reling", "Crossfit.Lisa@outlook.com", 0708123456, 9007258675);

INSERT INTO Schedule VALUES ("Astrid", "Intense Spinning", '2020-05-14 16:00:00');
INSERT INTO Schedule VALUES ("Astrid", "HIIT IT", '2020-04-04 18:00:00');
INSERT INTO Schedule VALUES ("Fina", "Crossfit Basics", '2020-05-14 13:00:00');
INSERT INTO Schedule VALUES ("Fina", "Crossfit Intense", '2020-04-24 09:00:00');

INSERT INTO InstructorBooking VALUES ('2020-05-14 16:00:00', 7903318989, "Astrid");
INSERT INTO InstructorBooking VALUES ('2020-04-04 18:00:00', 7903318989, "Astrid");
INSERT INTO InstructorBooking VALUES ('2020-05-14 13:00:00', 9007258675, "Fina");
INSERT INTO InstructorBooking VALUES ('2020-04-24 09:00:00', 9007258675, "Fina");


INSERT INTO MemberBooking VALUES (9505050101, '2020-05-14 13:00:00', "Fina");
INSERT INTO MemberBooking VALUES (9001021234, '2020-04-04 18:00:00', "Fina");
INSERT INTO MemberBooking VALUES (9505050101, '2020-05-14 16:00:00', "Astrid");
INSERT INTO MemberBooking VALUES (9001021234, '2020-04-24 09:00:00', "Astrid");
