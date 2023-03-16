	CREATE TABLE Transports (
	  Id int IDENTITY(1,1) PRIMARY KEY,
	  AccountNum VARCHAR(50),
	  TransportTypeId INT,
	  TransportPlate1 varchar(10),
	  TransportPlate2 varchar(10),
	  TransportPlate3 varchar(10),
	  Capacity int,
	  StatusId int
	);
