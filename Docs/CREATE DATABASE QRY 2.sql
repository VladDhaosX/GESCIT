	CREATE TABLE Transports (
	  Id int IDENTITY(1,1) PRIMARY KEY,
	  ClientId INT,
	  TransportTypeId INT,
	  LicensePlate1 varchar(10) NOT NULL,
	  LicensePlate2 varchar(10) NOT NULL,
	  LicensePlate3 varchar(10) NOT NULL,
	  Capacity int NOT NULL,
	  StatusId int NOT NULL
	);

	DROP TABLE Transports

	CREATE TABLE TransportType (
	  Id int IDENTITY(1,1) PRIMARY KEY,
	  Type varchar(20) NOT NULL
	);

	INSERT INTO TransportType (Type)
	VALUES ('Torton'), ('Trailer'), ('Flatbed'), ('Box Truck'), ('Full Truckload');
	
	CREATE TABLE TransportLine (
	  Id int IDENTITY(1,1) PRIMARY KEY,
	  ClientId INT,
	  NameLine varchar(50) NOT NULL,
	  TransportLineType INT,
	  Status int NOT NULL
	);

	DROP TABLE TransportLine

	CREATE TABLE TransportLineType (
	  Id int IDENTITY(1,1) PRIMARY KEY,
	  Type varchar(20) NOT NULL
	);

	INSERT INTO TransportLineType (Type)
	VALUES ('Propia'), ('Rentada');

	CREATE TABLE LineTransportMapping (
	  Id int IDENTITY(1,1) PRIMARY KEY,
	  TransportLineId int NOT NULL,
	  TransportId int NOT NULL
	);

	CREATE TABLE Drivers (
	  Id int IDENTITY(1,1) PRIMARY KEY,
	  ClientId INT,
	  Name varchar(50) NOT NULL,
	  PaternalLastName varchar(50) NOT NULL,
	  MaternalLastName varchar(50) NOT NULL,
	  StatusId int NOT NULL
	);

	DROP TABLE Drivers
	
	CREATE TABLE Documents (
	  Id int IDENTITY(1,1) PRIMARY KEY,
	  Name varchar(50) NOT NULL,
	  DocumentTypeId varchar(50) NOT NULL
	);

	DROP TABLE Documents
	
	CREATE TABLE DocumentType (
	  Id int IDENTITY(1,1) PRIMARY KEY,
	  Name varchar(50) NOT NULL,
	);
	
	INSERT INTO DocumentType (Name)
	VALUES ('Linea Transportista'), ('Chofer');

	INSERT INTO Documents (Name,DocumentTypeId)
	VALUES ('Acta constitutiva',1), ('Poderes',1), ('INE',2), ('Licencia',2), ('Identificación',2), ('Comprobante de domicilio',2);

	CREATE TABLE Schedule (
	  Id int IDENTITY(1,1) PRIMARY KEY,
	  StartTime time NOT NULL,
	  EndTime time NOT NULL
	);

	INSERT INTO Schedule (StartTime, EndTime) 
	VALUES ('01:00:00', '08:00:00'),('08:00:00', '12:00:00'),('12:00:00', '16:00:00'),('16:00:00', '20:00:00');

	CREATE TABLE Dates (
		Id INT IDENTITY(1,1),
		TransportLineId INT,
		TransportId INT,
		DriverId INT,
		ProductId INT,
		CapacityId INT,
		Day DATE,
		ScheduleId INT,
		StatusId INT
	); 
