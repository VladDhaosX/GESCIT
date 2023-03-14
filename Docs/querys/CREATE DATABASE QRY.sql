CREATE TABLE Status (
	Id INT IDENTITY(1,1)
	, [Key] VARCHAR(MAX)
	, Name VARCHAR(MAX)
	)


	CREATE TABLE Roles (
		Id INT IDENTITY(1,1)
		, [Key] VARCHAR(MAX)
		, Name VARCHAR(MAX)
		, Description VARCHAR(MAX)
		, StatusId INT
		)

	INSERT INTO Roles ([Key],Name,Description,StatusId)
		SELECT 'SeguridadPatrimonial','Seguridad Patrimonial','El que registra si llegaron a la citas o no, pide folio de confirmacion, si no llegan a tiempo se bloquean las citas.',1 UNION ALL
		SELECT 'Planeador','Planeador','El que tiene control total de las citas',1 UNION ALL
		SELECT 'Juridico','Juridico','El que se encarga de revisar la documentacion de los choferes y las lineas transportistas.',1 UNION ALL
		SELECT 'Cliente','Cliente','Puede agregar datos de sus catalogos y puede generar sus citas, puede cancelar sus citas.',1 UNION ALL
		SELECT 'Admin','Administrador','Puede hacer todo.',1 

CREATE TABLE Modules (
	Id INT IDENTITY(1,1)
	, [Key] VARCHAR(MAX)
	, Name VARCHAR(MAX)
	, StatusId INT
	)
	
CREATE TABLE RolesPermissions (
	RolId INT
	, ModuleId INT
	)

SELECT * FROM RolesPermissions

INSERT INTO RolesPermissions
SELECT r.Id, m.Id FROM Roles r, Modules m WHERE r.Id = 1

CREATE TABLE Actions (
	Id INT IDENTITY(1,1)
	, [Key] VARCHAR(MAX)
	, Name VARCHAR(MAX)
	, StatusId INT
	)

CREATE TABLE ActionsModules (
	Id INT IDENTITY(1,1)
	, ModuleId INT
	, ActionId INT
	)

CREATE TABLE ActionsPermissions (
	 RolId INT
	, ActionsModulesId INT
	)

CREATE TABLE Users (
	 Id INT IDENTITY(1,1)
	, [User] VARCHAR(MAX)
	, Password VARCHAR(MAX)
	, Name VARCHAR(MAX)
	, LastName VARCHAR(MAX)
	, SecondLastName VARCHAR(MAX)
	, CreateDate DateTime DEFAULT GETDATE()
	, RolId INT
	, StatusId INT
	, PrivacyNotice BIT
	)

CREATE TABLE Clients (
	 Id INT IDENTITY(1,1)
	, Client VARCHAR(MAX)
	, Name VARCHAR(MAX)
	, LastName VARCHAR(MAX)
	, SecondLastName VARCHAR(MAX)
	, CreateDate DateTime DEFAULT GETDATE()
	, StatusId INT
	)

CREATE TABLE TransportLines (
	Id INT IDENTITY(1,1)
	, ClientId INT
	, Name VARCHAR(MAX)
	, LastName VARCHAR(MAX)
	, SecondLastName VARCHAR(MAX)
	, CreateDate DateTime DEFAULT GETDATE()
	, StatusId INT
	)

CREATE TABLE Drivers (
	Id INT IDENTITY(1,1)
	, ClientId INT
	, Name VARCHAR(MAX)
	, LastName VARCHAR(MAX)
	, SecondLastName VARCHAR(MAX)
	, CreateDate DateTime DEFAULT GETDATE()
	, StatusId INT
	)

CREATE TABLE Products (
	Id INT IDENTITY(1,1)
	, [Key] VARCHAR(MAX)
	, Name VARCHAR(MAX)
	, CreateDate DateTime DEFAULT GETDATE()
	, StatusId INT
	)

CREATE TABLE ScheduleType (
	Id INT IDENTITY(1,1)
	, [Key] VARCHAR(MAX)
	, Name VARCHAR(MAX)
	, InitHour Time
	, FinalHour Time
	)

CREATE TABLE DateType (
	Id INT IDENTITY(1,1)
	, [Key] VARCHAR(MAX)
	, Name VARCHAR(MAX)
	)

CREATE TABLE TransportType (
	Id INT IDENTITY(1,1)
	, [Key] VARCHAR(MAX)
	, Name VARCHAR(MAX)
	)

CREATE TABLE Dates (
	Id INT IDENTITY(1,1)
	, UserId INT
	, ClientId INT
	, ScheduleTypeId INT
	, DateTypeId INT
	, TransportTypeId INT
	, TransportLineId INT
	, DriverId INT
	, ProductId INT
	, CreateDate DateTime
	, AppointmentDate DateTime
	, StatusId INT
	)