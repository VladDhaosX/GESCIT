
	CREATE TABLE TransportType (
	  Id int IDENTITY(1,1) PRIMARY KEY,
	  Type varchar(20) NOT NULL
	);

	INSERT INTO TransportType (Type)
	VALUES ('Torton'), ('Trailer'), ('Flatbed'), ('Box Truck'), ('Full Truckload');
	