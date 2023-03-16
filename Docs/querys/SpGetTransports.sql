
--Stored Procedure para consultar la tabla Transports y reemplazar valores NULL por una cadena vacía
ALTER PROCEDURE SpGetTransports
  @TransportId INT,
  @UserId INT
AS
BEGIN

	DECLARE @ClientId INT;
	SELECT @ClientId = ClientId FROM Users WHERE Id = @UserId;

  IF @TransportId IS NULL OR @TransportId = 0
    SELECT 
        t.Id
      --, t.ClientId
      , t.TransportTypeId
	  , ISNULL([type].Type,'') AS 'Tipo de Transporte'
      , ISNULL(t.TransportPlate1, '') AS 'Placa de Transporte'
      , ISNULL(t.TransportPlate2, '') AS 'Placa de Caja #1'
      , ISNULL(t.TransportPlate2, '') AS 'Placa de Caja #2'
      , ISNULL(t.Capacity,0)  AS 'Capacidad'
      --, t.StatusId
    FROM Transports t
	LEFT JOIN TransportType [type] ON [type].Id = t.TransportTypeId
	WHERE ClientId = @ClientId;
  ELSE
    SELECT 
        t.Id
      --, t.ClientId
      , t.TransportTypeId
	  , ISNULL([type].Type,'') AS 'Tipo de Transporte'
      , ISNULL(t.TransportPlate1, '') AS 'Placa de Transporte'
      , ISNULL(t.TransportPlate2, '') AS 'Placa de Caja #1'
      , ISNULL(t.TransportPlate2, '') AS 'Placa de Caja #2'
      , ISNULL(t.Capacity,0)  AS 'Capacidad'
      --, t.StatusId
    FROM Transports t
	LEFT JOIN TransportType [type] ON [type].Id = t.TransportTypeId
    WHERE t.Id = @TransportId;
END;
GO

