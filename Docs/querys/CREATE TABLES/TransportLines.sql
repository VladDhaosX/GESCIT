SELECT * FROM TransportLines


DROP TABLE TransportLines

CREATE TABLE TransportLines (
	Id INT IDENTITY(1,1),
	AccountNum NVARCHAR(50),
	Name NVARCHAR(50),
	LineTypeId INT,
	StatusId INT
)

GO