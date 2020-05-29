CREATE TABLE MembershipTier (
  tier TEXT NOT NULL,
  costMonthSEK INTEGER NOT NULL,
  PRIMARY KEY (tier)
);

CREATE TABLE Member (
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phoneNumber INTEGER NOT NULL,
  socialSecurityNumber INTEGER NOT NULL,
  PRIMARY KEY (socialSecurityNumber)
);

CREATE TABLE Benefits (
  accessTo TEXT NOT NULL,
  tier TEXT NOT NULL,
  PRIMARY KEY (accessTo),
  FOREIGN KEY (tier) REFERENCES MembershipTier(tier)
);

CREATE TABLE Payment (
  paymentMethod TEXT NOT NULL,
  memberSSN INTEGER NOT NULL,
  PRIMARY KEY (memberSSN),
  FOREIGN KEY (memberSSN) REFERENCES Member(socialSecurityNumber)
);

CREATE TABlE MembershipDays (
  duration INTEGER NOT NULL,
  PRIMARY KEY (duration)
);

CREATE TABLE Membership (
  memberSSN INTEGER NOT NULL,
  tier TEXT NOT NULL,
  regDate DATE NOT NULL,
  durationDays INTEGER NOT NULL,
  homeGym INTEGER NOT NULL,
  PRIMARY KEY (memberSSN, regDate),
  FOREIGN KEY (memberSSN) REFERENCES Member(socialSecurityNumber),
  FOREIGN KEY (tier) REFERENCES MembershipTier(tier),
  FOREIGN KEY (durationDays) REFERENCES MembershipDays(duration),
  FOREIGN KEY (homeGym) REFERENCES Facility(name)
);

CREATE TABLE Facility (
  address TEXT NOT NULL,
  name TEXT NOT NULL,
  PRIMARY KEY (name)
);

CREATE TABLE Visit (
  facility TEXT NOT NULL,
  visitDate DATETIME NOT NULL,
  memberSSN INTEGER NOT NULL,
  PRIMARY KEY (memberSSN, visitDate),
  FOREIGN KEY (memberSSN) REFERENCES Member(socialSecurityNumber),
  FOREIGN KEY (facility) REFERENCES Facility(name)
);

CREATE TABLE Leave (
  facility TEXT NOT NULL,
  leaveDate DATETIME NOT NULL,
  memberSSN INTEGER NOT NULL,
  PRIMARY KEY (memberSSN, leaveDate),
  FOREIGN KEY (memberSSN) REFERENCES Member(socialSecurityNumber)
  FOREIGN KEY (facility) REFERENCES Facility(name)

);

CREATE TABLE Room (
  sizeM2 INTEGER NOT NULL,
  purpose TEXT NOT NULL,
  roomName TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  facility TEXT NOT NULL,
  PRIMARY KEY (roomName),
  FOREIGN KEY (facility) REFERENCES Facility(name)
);

CREATE TABLE Equipment (
  type TEXT NOT NULL,
  PRIMARY KEY (type)
);

CREATE TABLE EquipLocation (
  type TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  facility TEXT NOT NULL,
  PRIMARY KEY (type, facility),
  FOREIGN KEY (type) REFERENCES Equipment(type),
  FOREIGN KEY (facility) REFERENCES Facility(name)
);

CREATE TABLE Employee (
  name TEXT NOT NULL,
  phoneNumber INTEGER NOT NULL,
  socialSecurityNumber INTEGER NOT NULL,
  role TEXT NOT NULL,
  email TEXT NOT NULL,
  PRIMARY KEY (socialSecurityNumber)
);

CREATE TABLE WorksAt (
  employeeSSN INTEGER NOT NULL,
  facility TEXT NOT NULL,
  PRIMARY KEY (employeeSSN),
  FOREIGN KEY (employeeSSN) REFERENCES Employee(socialSecurityNumber),
  FOREIGN KEY (facility) REFERENCES Facility(name)
);

CREATE TABLE Classes (
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  capacity INTEGER,
  PRIMARY KEY (name)
);

CREATE TABLE Instructor (
  instructorName TEXT NOT NULL,
  email TEXT NOT NULL,
  phoneNumber INTEGER NOT NULL,
  socialSecurityNumber INTEGER NOT NULL,
  PRIMARY KEY (socialSecurityNumber)
);

CREATE TABLE Schedule (
  classRoom TEXT NOT NULL,
  className TEXT NOT NULL,
  classTime DATETIME NOT NULL,
  durationMin INTEGER NOT NULL,
  PRIMARY KEY (classRoom, classTime),
  FOREIGN KEY (className) REFERENCES Classes(name),
  FOREIGN KEY (classRoom) REFERENCES Room(roomName)
);

CREATE TABLE InstructorBooking (
  classTime DATETIME NOT NULL,
  instructorSSN INTEGER NOT NULL,
  classRoom TEXT NOT NULL,
  PRIMARY KEY (instructorSSN, classTime),
  FOREIGN KEY (classRoom, classTime) REFERENCES Schedule(classRoom, classTime),
  FOREIGN KEY (instructorSSN) REFERENCES Instructor(socialSecurityNumber)
);

CREATE TABLE MemberBooking (
  memberSSN INTEGER NOT NULL,
  classTime DATETIME NOT NULL,
  classRoom TEXT NOT NULL,
  PRIMARY KEY (memberSSN, classTime),
  FOREIGN KEY (classRoom, classTime) REFERENCES Schedule(classRoom, classTime),
  FOREIGN KEY (memberSSN) REFERENCES Member(socialSecurityNumber)
);
